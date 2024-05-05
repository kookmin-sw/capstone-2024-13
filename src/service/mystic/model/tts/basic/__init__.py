from gtts import gTTS
from io import BytesIO
from pydub import AudioSegment

class Basic:
    def __init__(self):
        pass

    def forward(self, audio_data):
        audio = AudioSegment.from_mp3(BytesIO(audio_data))
        output = BytesIO()
        audio.export(output, format="wav")
        output.seek(0)
        return output.read()

    def __call__(self, text):
        mp3_fp = BytesIO()
        gtts = gTTS(text=text, lang="ko", slow=False)
        gtts.write_to_fp(mp3_fp)
        mp3_fp.seek(0)
        return self.forward(mp3_fp.read())
