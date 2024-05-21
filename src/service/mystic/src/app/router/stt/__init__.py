import base64
import tempfile

from fastapi	import APIRouter
from pydantic	import BaseModel
from model.stt	import stt as STT
from typing		import Any

router = APIRouter(prefix="/stt", tags=["stt"])

class STTRequest(BaseModel):
	audio_data: Any

class STTResponse(BaseModel):
	text: str

@router.post("/", response_model=STTResponse)
async def stt(request: STTRequest):
	audio_data = base64.b64decode(request.audio_data.encode())

	with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_file:
		with open(temp_file.name, "wb") as audio_file:
			audio_file.write(audio_data)
		with open(temp_file.name, "rb") as audio_file:
			transcription = STT(audio_file)
	print(transcription)

	return STTResponse(text=transcription.text)