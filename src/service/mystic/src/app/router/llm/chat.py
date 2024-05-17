from fastapi 		import APIRouter, HTTPException
from pydantic 		import BaseModel
from openai			import OpenAI
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

class ChatSummaryRequest(BaseModel):
	connection_id: str

class ChatSummaryResponse(BaseModel):
	content: str

@router.post("/invoke", response_model=ChatInvokeResponse)
async def invoke(request: ChatInvokeRequest):
	content = preprocess_user_input(request.content)
	model = connection[request.connection_id]['chain']
	if model is None:
		raise HTTPException(status_code=400, detail="Bad Request")

	invoke_output = model(content)['text']
	connection[request.connection_id]['latest'] = time()
	print(f'invoke_output: {invoke_output}')

	response = ChatInvokeResponse(content=invoke_output)
	print('memory: ', connection[request.connection_id]['chain'].memory.chat_memory)

	if '종료' in response.content:
		connection[request.connection_id]['conversation'] = connection[request.connection_id]['chain'].memory.chat_memory

	return response
	
@router.post("/summary", response_model=ChatSummaryResponse)
async def summary(request: ChatSummaryRequest):
	conversation = connection[request.connection_id]['conversation']
	conversation = await conversation.aget_messages()
	conversation = conversation[1:-2]
	print(conversation)
	print(type(conversation))
	print(len(conversation))

	response = OpenAI().chat.completions.create(
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

	if summary is None:
		raise HTTPException(status_code=400, detail="Bad Request")

	return ChatSummaryResponse(content=summary)