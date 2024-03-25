import openai
from pydub import AudioSegment

class Stt:
    def __init__(self) :
        self.client = openai.OpenAI()
        
    def execution(self, audio_file):
        # audio_file = open('audio_file_name', 'rb')

        self.transcript = self.client.audio.transcriptions.create(
                        model='whisper-1',
                        file=audio_file,
                        response_format='text'
                    )
        
        return self.transcript