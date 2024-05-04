from fastapi 		import APIRouter
from pydantic 		import BaseModel
from app.connection	import connection

router = APIRouter(prefix="/disconnect", tags=["disconnect"])

class DisconnectRequest(BaseModel):
	connection_id: str

class DisconnectResponse(BaseModel):
	content: str

@app.post("/", response_model=DisconnectResponse)
async def disconnect(request: DisconnectRequest):
	if connection.get(request.connection_id) is not None:
		connection.pop(request.connection_id)
		
	return DisconnectResponse(content="Disconnected from mystic successfully")