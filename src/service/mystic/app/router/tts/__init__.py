from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from model.tts import Basic

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

@router.post("/")
async def tts(request: TTSRequest):
    if request.speaker not in speaker:
        raise HTTPException(status_code=400, detail="Bad Request")
    
    audio_data = speaker[request.speaker](request.text)
    
    return Response(content=audio_data, media_type="audio/wav")