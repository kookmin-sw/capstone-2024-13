import os
import asyncio

from fastapi					import APIRouter, HTTPException
from pydantic 					import BaseModel
from bson						import ObjectId
from chain						import ChainV1, ChainV2, ChainV3
from app.util					import redis_instance
from app.util					import connection
from app.util.image_captioner	import image_captioning

router = APIRouter(prefix="/connect", tags=["connect"])

chain = {
	"v1": ChainV1,
	"v2": ChainV2,
	"v3": ChainV3
}

class ConnectRequest(BaseModel):
	template_id: int

class ConnectResponse(BaseModel):
	connection_id: str

# register_connection 함수를 비동기로 실행하여, connection_id 반환을 빠르게 할 수 있도록 함
async def register_connection(version: str, connection_id: str, template_id: int):
	text_data = None
	if version == "v3":
		text_data = image_captioning(os.getcwd() + '/src/public/test-image.jpg')
		print('text_data:', text_data)
	connection[connection_id] = chain[version](
		connection_id=connection_id,
		template_id=template_id,
		caption=text_data
	)

	# redis를 이용하여 model을 저장하려했지만 실패
	#redis_instance.set(connection_id, chain[version](
	#	connection_id=connection_id,
	#	template_id=template_id,
	#	caption=text_data
	#))
	#print(redis_instance.get(connection_id))

@router.post("/{version}", response_model=ConnectResponse)
async def connect(version: str, request: ConnectRequest):
	if version not in chain:
		raise HTTPException(status_code=400, detail="Bad Request")
	connection_id = str(ObjectId())
	asyncio.create_task(register_connection(version, connection_id, request.template_id))
	return ConnectResponse(connection_id=connection_id)