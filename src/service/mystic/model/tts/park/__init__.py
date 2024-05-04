import os
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts
import tempfile
import TTS
print('TTS:', TTS.__version__)
pwd = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = pwd + "/training/GPT_XTTS_FT-May-02-2024_12+12AM-dbf1a08a/config.json"
TOKENIZER_PATH = pwd + "/training/GPT_XTTS_FT-May-02-2024_12+12AM-dbf1a08a/vocab.json"
XTTS_CHECKPOINT = pwd + "/training/GPT_XTTS_FT-May-02-2024_12+12AM-dbf1a08a/best_model.pth"
SPEAKER_REFERENCE = pwd + "/config/reference_park.wav"


print('speaker:', SPEAKER_REFERENCE)

OUTPUT_PATH = os.path.join(pwd,"./output/output.wav")

class Park:
    def __init__(self):
        print("Loading model...")
        self.config = XttsConfig()
        self.config.load_json(CONFIG_PATH)
        self.model = Xtts.init_from_config(self.config)
        self.model.load_checkpoint(self.config, checkpoint_path = XTTS_CHECKPOINT, vocab_path = TOKENIZER_PATH, speaker_file_path = None, use_deepspeed = False)
        self.model.cuda()

        print("Computing speaker latents...")
        self.gpt_cond_latent, self.speaker_embedding = self.model.get_conditioning_latents(audio_path=[SPEAKER_REFERENCE])

    def __call__(self, text):
        print("Inference...")
        print('text :', text)
        out = self.model.inference(
                        text,
                        language = "ko",
                        gpt_cond_latent=self.gpt_cond_latent,
                        speaker_embedding=self.speaker_embedding,
                        temperature=0.7,
                    )
        # torchaudio.save(OUTPUT_PATH, torch.tensor(out["wav"]).unsqueeze(0), 2400, format="wav") # for test
        torchaudio.save(OUTPUT_PATH, torch.tensor(out["wav"]).unsqueeze(0), 24000)

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