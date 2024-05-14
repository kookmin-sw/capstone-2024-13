import os

from fastapi	import APIRouter, HTTPException
from pydantic 	import BaseModel
from bson	import ObjectId
from chain	import ChainV1, ChainV2, ChainV3
from app.util	import redis_instance
from app.util	import connection
from app.util	import YamlParser

router = APIRouter(prefix="/connect", tags=["connect"])

class ConnectRequest(BaseModel):
	version: str
	template_id: int

class ConnectResponse(BaseModel):
	connection_id: str
	content : str

@router.post("/", response_model=ConnectResponse)
async def connect(request: ConnectRequest):
	if request.version not in ["v1", "v2", "v3"]:
		raise HTTPException(status_code=400, detail="Bad Request")
	connection_id = str(ObjectId())
	connection[connection_id] = {
		'version': request.version,
		'template_id': request.template_id,
		'caption': None
	}
	content = YamlParser("src/template/character_first.yml")[request.template_id]

	return ConnectResponse(connection_id=connection_id, content = content)
