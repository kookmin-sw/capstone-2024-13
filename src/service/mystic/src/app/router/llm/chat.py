from fastapi 		import APIRouter, HTTPException
from pydantic 		import BaseModel
from app.util		import redis_instance
from app.util		import connection
from bson.objectid	import ObjectId
from time			import time
router = APIRouter(prefix="/chat", tags=["chat"])

class PyObjectId(ObjectId):
	@classmethod
	def __get_validators__(cls):
		yield cls.validate

	@classmethod
	def validate(cls, v):
		if not ObjectId.is_valid(v):
			raise ValueError('Invalid ObjectId')
		return ObjectId(v)

	@classmethod
	def __modify_schema__(cls, field_schema):
		field_schema.update(type='string')

class ChatInvokeRequest(BaseModel):
	connection_id: str
	content: str

class ChatInvokeResponse(BaseModel):
	content: str

@router.post("/invoke", response_model=ChatInvokeResponse)
async def invoke(request: ChatInvokeRequest):
	model = connection[request.connection_id]['chain']
	print('model :', model)
	if model is None:
		raise HTTPException(status_code=400, detail="Bad Request")
	invoke_output = model(request.content)['text']
	connection[request.connection_id]['latest'] = time()
	print(f'invoke_output: {invoke_output}')
	return ChatInvokeResponse(content=invoke_output)