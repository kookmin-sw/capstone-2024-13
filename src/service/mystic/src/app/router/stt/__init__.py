from fastapi	import APIRouter
from pydantic 	import BaseModel
from model.stt	import STT

router = APIRouter(prefix="/stt", tags=["stt"])

class STTRequest(BaseModel):
    file: bytes

class STTResponse(BaseModel):
	text: str

@router.post("/", response_model=STTResponse)
async def stt(request: STTRequest):
	return STTResponse(text=STT(request.file))