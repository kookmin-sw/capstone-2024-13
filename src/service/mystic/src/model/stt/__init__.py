import openai
from pydub import AudioSegment

class STT:
	def __init__(self) :
		self.client = openai.OpenAI()
		
	def __call__(self, audio_file):
		return self.client.audio.transcriptions.create(
			model='whisper-1',
			file=audio_file,
			language='ko'
		)
	
stt = STT()
