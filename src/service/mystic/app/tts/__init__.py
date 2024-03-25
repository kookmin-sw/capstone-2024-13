import os
from gtts import gTTS
from io import BytesIO
from glob import glob
from pydub import AudioSegment

def clean_cache():
        for file in glob("./ffcache*"):
            os.remove(file)
def init(text, slow = False):
    mp3_fp = BytesIO()
    gtts = gTTS(text=text, lang="ko", slow=slow)
    gtts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return mp3_fp

def forward(mp3_fp):
	audio = AudioSegment.from_file(mp3_fp, format="mp3")
	for file in glob("./ffcache*"):
		os.remove(file)
	return audio.export(format="mp3").read()

def tts(text, slow):
	mp3_fp = init(text, slow)
	return forward(mp3_fp)