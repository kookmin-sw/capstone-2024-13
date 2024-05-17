from fastapi 		import APIRouter, HTTPException
from pydantic 		import BaseModel
from app.util		import redis_instance
from app.util		import connection
from app.util		import preprocess_user_input
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
	content = preprocess_user_input(request.content)
	model = connection[request.connection_id]['chain']
	print('model :', model)
	if model is None:
		raise HTTPException(status_code=400, detail="Bad Request")
	invoke_output = model(content)['text']
	connection[request.connection_id]['latest'] = time()
	print(f'invoke_output: {invoke_output}')
	response = ChatInvokeResponse(content=invoke_output)
	if '종료' in response.content:
		print('DISCONNECTED')
		response.content = 'END'
		return response
	else:
		return response
	
@router.post("/summary", response_model=ChatInvokeResponse)
async def summary(request: ChatInvokeRequest):
	model = connection[request.connection_id]['chain']
	if model is None:
		raise HTTPException(status_code=400, detail="Bad Request")
	summary = model('학생의 입장에서 일기로 만들어줘. 구구절절하게 쓰지 말고 사실로만 작성해줘. 대화에 대한 내용은 제외해줘.')['text']
	response = ChatInvokeResponse(content=summary)
	return response