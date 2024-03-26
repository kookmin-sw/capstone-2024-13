import openai
from pydub import AudioSegment


client = openai.OpenAI()

audio_file = open('voice_sample.mp3', 'rb')

transcript = client.audio.transcriptions.create(
    model='whisper-1',
    file=audio_file,
    response_format='text'
)

print(transcript)