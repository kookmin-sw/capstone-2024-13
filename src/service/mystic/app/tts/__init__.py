import os
from gtts import gTTS
from io import BytesIO
from glob import glob
from pydub import AudioSegment

def clean_cache():
        for file in glob("./ffcache*"):
            os.remove(file)
class TTS:
    def invoke(text, toSlow = False):
        mp3_fp = BytesIO()
        tts = gTTS(text=text, lang="ko", slow=toSlow)
        tts.write_to_fp(mp3_fp)
        # """ For debugging purposes
        mp3_fp.seek(0)
        audio = AudioSegment.from_file(mp3_fp, format="mp3")
        clean_cache()
        return audio.export(format="mp3").read()