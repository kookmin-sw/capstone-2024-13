from fastapi			import FastAPI
from fastapi.responses	import RedirectResponse
from pydantic 			import BaseModel, Field
from typing				import List, Union
from langchain.schema	import AIMessage, HumanMessage, SystemMessage
from app.chain			import ChainV1, ChainV2, ChainV3
from app.stt			import Stt
from bson 				import ObjectId

app = FastAPI(title = "LLMChain", description = "Large Language Model Chain", version = "0.1.0")

models_dict = {}

stt_set = Stt()

# Pydantic 모델에서 ObjectId를 사용하기 위한 클래스
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

class ConnectRequest(BaseModel):
    #history_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
	history_id: str

class ChatRequest(BaseModel):
    #history_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    history_id: str
    content: str

class ChatResponse(BaseModel):
	content: str

class STTRequest(BaseModel):
    file: bytes

class STTResponse(BaseModel):
	text: str

@app.post("/v1/chat/connect", response_model=ChatResponse)
async def connect_v1(request : ConnectRequest):
	chain = ChainV1(history_id = request.history_id, template = "cool_headed")
	models_dict[request.history_id]= chain
	return ChatResponse(content="Connected to v1")

@app.post("/v2/chat/connect", response_model=ChatResponse)
async def connect_v2(request : ConnectRequest):
	chain = ChainV2(history_id = request.history_id, template = "cool_headed")
	models_dict[request.history_id]= chain
	return ChatResponse(content="Connected to v2")

@app.post("/v3/chat/connect", response_model=ChatResponse)
async def connect_v3(request : ConnectRequest):
	chain = ChainV3(history_id = request.history_id, template = "cool_headed")
	models_dict[request.history_id]= chain
	return ChatResponse(content="Connected to v3")

# 이렇게 하면 v1, v2, v3 모두 같은 endpoint를 사용할 수 있게 됩니다.
@app.post("/v1/chat/disconnect", response_model=ChatResponse)
async def disconnect_v1(request : ConnectRequest):
	models_dict.pop(request.history_id)
	return ChatResponse(content="Disconnected from v1")

@app.post("/v2/chat/disconnect", response_model=ChatResponse)
async def disconnect_v2(request : ConnectRequest):
	models_dict.pop(request.history_id)
	return ChatResponse(content="Disconnected from v2")

@app.post("/v3/chat/disconnect", response_model=ChatResponse)
async def disconnect_v3(request : ConnectRequest):
	models_dict.pop(request.history_id)
	return ChatResponse(content="Disconnected from v3")


#phi2
@app.post("/v1/chat/invoke", response_model=ChatResponse)
async def chatV1(request: ChatRequest):
	return ChatResponse(content=models_dict[request.history_id](request.content))
#gpt2
@app.post("/v2/chat/invoke", response_model=ChatResponse)
async def chatV2(request: ChatRequest):
	return ChatResponse(content=models_dict[request.history_id](request.content))
#gpt3.5-turbo
@app.post("/v3/chat/invoke", response_model=ChatResponse)
async def chatV2(request: ChatRequest):
	return ChatResponse(content=models_dict[request.history_id](request.content)['text'])

#stt api
@app.post("/chat/stt", response_model=STTResponse)
async def stt(request: STTRequest):
	return ChatResponse(text = stt_set.execution(request.file))



if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)