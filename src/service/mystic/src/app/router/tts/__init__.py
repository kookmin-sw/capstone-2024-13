from fastapi	import APIRouter, HTTPException, Response
from pydantic	import BaseModel
from model.tts	import Basic

router = APIRouter(prefix="/tts", tags=["tts"])

speaker = {
	"Basic": Basic(),
	#"Park": Park(),
	#"Lee": Lee(),
	#"Joo": Joo(),
	#"Son": Son(),
	#"Shin": Shin()
}

class TTSRequest(BaseModel):
	text: str
	speaker: str = "Basic"

class TTSResponse(Response):
	media_type = "audio/wav"

@router.post("/")
async def tts(request: TTSRequest):
	if request.speaker not in speaker:
		raise HTTPException(status_code=400, detail="Bad Request")
	return TTSResponse(content=speaker[request.speaker](request.text))