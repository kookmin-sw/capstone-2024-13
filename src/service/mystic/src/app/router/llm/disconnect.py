from fastapi 	import APIRouter
from pydantic 	import BaseModel
from app.util	import connection

router = APIRouter(prefix="/disconnect", tags=["disconnect"])

class DisconnectRequest(BaseModel):
	connection_id: str

class DisconnectResponse(BaseModel):
	content: str

@router.post("/", response_model=DisconnectResponse)
async def disconnect(request: DisconnectRequest):
	model = connection.get(request.connection_id)
	if model is not None:
		del connection[request.connection_id]
	
	for key, value in connection.items():
		print(f'connection {key}: {value}')

	return DisconnectResponse(content="Disconnected from mystic successfully")