import os
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts
import tempfile
import TTS
from gtts import gTTS
from io import BytesIO
from pydub import AudioSegment

class tts:
    def __init__(self,version):
        self.version = version
        if version == "basic":
            pass
        else:
            pwd = os.path.dirname(os.path.abspath(__file__))
            CONFIG_PATH = pwd + "/" + version + "/config.json"
            TOKENIZER_PATH = pwd + "/" + version + "/vocab.json"
            XTTS_CHECKPOINT = pwd + "/" + version + "/best_model.pth"
            SPEAKER_REFERENCE = pwd + "/"+ version + "/reference.wav"
            self.config = XttsConfig()
            self.config.load_json(CONFIG_PATH)
            self.model = Xtts.init_from_config(self.config)
            self.model.load_checkpoint(self.config, checkpoint_path = XTTS_CHECKPOINT, vocab_path = TOKENIZER_PATH, use_deepspeed = False)
            self.model.cuda()
            self.gpt_cond_latent, self.speaker_embedding = self.model.get_conditioning_latents(audio_path=[SPEAKER_REFERENCE])
            self.output_path = os.path.join(pwd,"./output/output.wav")


    def __call__(self, text):
        print("Inference...")
        print('text :', text)
        if self.version == 'basic':
            mp3_fp = BytesIO()
            gtts = gTTS(text=text, lang="ko", slow=False)
            gtts.write_to_fp(mp3_fp)
            mp3_fp.seek(0)
            audio = AudioSegment.from_mp3(BytesIO(mp3_fp.read()))
            output = BytesIO()
            audio.export(output, format="wav")
            output.seek(0)
            return output.read()
        else:
            out = self.model.inference(
                            text,
                            language = "ko",
                            gpt_cond_latent=self.gpt_cond_latent,
                            speaker_embedding=self.speaker_embedding,
                            temperature=0.7,
                        )
            torchaudio.save(self.output_path, torch.tensor(out["wav"]).unsqueeze(0), 24000)

            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
                # 파일 저장
                torchaudio.save(temp_file, torch.tensor(out["wav"]).unsqueeze(0), 24000, format='wav')
                # 생성된 파일의 경로 저장
                temp_file_path = temp_file.name

            # 파일 읽기
            with open(temp_file_path, "rb") as file:
                temp_data = file.read()

            # 파일 삭제
            os.remove(temp_file_path)

            return temp_data
        