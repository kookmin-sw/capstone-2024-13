import os
from gtts import gTTS
from io import BytesIO
import tempfile
from pydub import AudioSegment

class Basic:
    def __init__(self):
        pass
    def forward(self,mp3_fp):
        audio = AudioSegment.from_file(mp3_fp, format="wav")
        with tempfile.TemporaryFile() as temp_file:
            audio.export(temp_file, format="wav")
            temp_file.seek(0)
            return temp_file.read()

    def __call__(self,text):
        mp3_fp = BytesIO()
        gtts = gTTS(text=text, lang="ko", slow=False)
        gtts.write_to_fp(mp3_fp)
        mp3_fp.seek(0)
        return self.forward(mp3_fp)