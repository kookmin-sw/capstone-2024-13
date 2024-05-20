from fastapi	import APIRouter, HTTPException
from pydantic	import BaseModel
from model.tts      import tts
import re
router = APIRouter(prefix="/tts", tags=["tts"])

speaker = {
	"Basic": tts("basic"),
	"Park": tts("park"),
	"Lee": tts("lee"),
	"Young": tts("young"),
	'Ral': tts("ral"),
}

class TTSRequest(BaseModel):
	text: str
	speaker: str = "Basic"

class TTSResponse(BaseModel):
	audio_data: str

@router.post("/")
async def tts(request: TTSRequest):
	if request.speaker not in speaker:
		raise HTTPException(status_code=400, detail="Bad Request")
	text = re.sub(r'[^\w\s]', '', request.text)
	audio_data = speaker[request.speaker](text)
	print(audio_data)
	return TTSResponse(audio_data=audio_data)