import base64
import tempfile

from fastapi	import APIRouter
from pydantic	import BaseModel
from model.stt	import stt as STT
from typing		import Any

router = APIRouter(prefix="/stt", tags=["stt"])

class STTRequest(BaseModel):
	audio_data: Any
	type: str = "audio/webm"

class STTResponse(BaseModel):
	data: Any

@router.post("/", response_model=STTResponse)
async def stt(request: STTRequest):
	audio_data = base64.b64decode(request.audio_data.encode())
	suffix = "." + request.type.split("/")[1]

	with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
		with open(temp_file.name, "wb") as audio_file:
			audio_file.write(audio_data)
		with open(temp_file.name, "rb") as audio_file:
			transcription = STT(audio_file)
	print(transcription)

	return STTResponse(text=transcription.text)
