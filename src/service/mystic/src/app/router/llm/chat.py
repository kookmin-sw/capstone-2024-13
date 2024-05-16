from fastapi 		import APIRouter, HTTPException
from pydantic 		import BaseModel
from openai			import OpenAI
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
	response = ChatInvokeResponse(content=invoke_output)
	print('memory: ', connection[request.connection_id]['chain'].memory.chat_memory)
	if '종료' in response.content:
		print('DISCONNECTED')
		response.content = 'END'
		connection[request.connection_id]['conversation'] = connection[request.connection_id]['chain'].memory.chat_memory
		return response
	else:
		return response
	
@router.post("/summary", response_model=ChatInvokeResponse)
async def summary(request: ChatInvokeRequest):

	conversation = connection[request.connection_id]['conversation']

	client = OpenAI()
	response = client.chat.completions.create(
	model="gpt-3.5-turbo",
	messages=[
		{
		"role": "system",
		"content": [
			{
			"type": "text",
			"text": f"<meta>\n<conversation>\n{conversation}\n</conversation>\n<situation>위 대화는 Human과 ai의 하루 있었던 일에 대한 대화야.</situation>\n<role>대화를 보고 Human의 관점으로 일기를 작성해줘. Human의 대답만을 일기를 구성해줘. 일기에 대화를 했다는 사실이 들어가면 안 돼.</role>\n</meta>"
			}
		]
		}
	],
	temperature=0.01,
	max_tokens=256,
	top_p=0.01,
	frequency_penalty=0,
	presence_penalty=0
	)

	summary = response.choices[0].message.content

	# model = connection[request.connection_id]['chain']
	if summary is None:
		raise HTTPException(status_code=400, detail="Bad Request")
	summary = summary
	response = ChatInvokeResponse(content=summary)
	return response