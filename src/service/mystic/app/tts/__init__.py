import os
from gtts import gTTS
from io import BytesIO
import tempfile
from pydub import AudioSegment

def init(text, slow=False):
    mp3_fp = BytesIO()
    gtts = gTTS(text=text, lang="ko", slow=slow)
    gtts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return mp3_fp

def forward(mp3_fp):
    audio = AudioSegment.from_file(mp3_fp, format="mp3")
    with tempfile.TemporaryFile() as temp_file:
        audio.export(temp_file, format="mp3")
        temp_file.seek(0)
        return temp_file.read()

def tts(text, slow):
    mp3_fp = init(text, slow)
    return forward(mp3_fp)