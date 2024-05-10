from fastapi 	import APIRouter
from pydantic 	import BaseModel
from app.util	import redis_instance

router = APIRouter(prefix="/disconnect", tags=["disconnect"])

class DisconnectRequest(BaseModel):
	connection_id: str

class DisconnectResponse(BaseModel):
	content: str

@router.post("/", response_model=DisconnectResponse)
async def disconnect(request: DisconnectRequest):
	model = redis_instance.get(request.connection_id)
	if model is not None:
		redis_instance.delete(request.connection_id)
	return DisconnectResponse(content="Disconnected from mystic successfully")