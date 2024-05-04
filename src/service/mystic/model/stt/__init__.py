import openai
from pydub import AudioSegment

class STT:
	def __init__(self) :
		self.client = openai.OpenAI()
		
	def __call__(self, audio_file):
		return self.client.audio.transcriptions.create(
			model='whisper-1',
			file=audio_file,
			response_format='text'
		) 

	def __new__(cls, *args, **kwargs):
		if not hasattr(cls, 'instance'):
			cls.instance = super(STT, cls).__new__(cls)
		return cls.instance