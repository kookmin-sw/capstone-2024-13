from fastapi			import FastAPI
from fastapi.responses	import RedirectResponse, Response
from pydantic 			import BaseModel, Field
from typing				import List, Union
from langchain.schema	import AIMessage, HumanMessage, SystemMessage
from app.chain			import ChainV1, ChainV2, ChainV3
from app.stt			import Stt
from app.tts			import TTS
from bson 				import ObjectId

app = FastAPI(title = "Mystic", description = "LLM, STT, TTS intergrated server", version = "0.1.0")

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
    #connection_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
	connection_id: str

class ChatRequest(BaseModel):
    #connection_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    connection_id: str
    content: str

class ChatResponse(BaseModel):
	content: str

class STTRequest(BaseModel):
    file: bytes

class STTResponse(BaseModel):
	text: str

class TTSRequest(BaseModel):
	text: str
	toSlow: bool = False



@app.post("/connect/v1", response_model=ChatResponse)
async def connect_v1(request : ConnectRequest):
	chain = ChainV1(connection_id = request.connection_id, template = "cool_headed")
	models_dict[request.connection_id]= chain
	return ChatResponse(content="Connect v1 successfully")

@app.post("/connect/v2", response_model=ChatResponse)
async def connect_v2(request : ConnectRequest):
	chain = ChainV2(connection_id = request.connection_id, template = "cool_headed")
	models_dict[request.connection_id]= chain
	return ChatResponse(content="Connect v2 successfully")

@app.post("/connect/v3", response_model=ChatResponse)
async def connect_v3(request : ConnectRequest):
	chain = ChainV3(connection_id = request.connection_id, template = "cool_headed")
	models_dict[request.connection_id]= chain
	return ChatResponse(content="Connect v3 successfully")

# 이렇게 하면 v1, v2, v3 모두 같은 endpoint를 사용할 수 있게 됩니다.
@app.post("/disconnect", response_model=ChatResponse)
async def disconnect(request : ConnectRequest):
	if models_dict.get(request.connection_id) is not None:
		models_dict.pop(request.connection_id)
	return ChatResponse(content="Disconnected from mystic successfully")


#phi2
@app.post("/chat/invoke/v1", response_model=ChatResponse)
async def chatV1(request: ChatRequest):
	if models_dict.get(request.connection_id) is None:
		return ChatResponse(content="Bad Request: Connection not found", status_code=400)
	return ChatResponse(content=models_dict[request.connection_id](request.content))

#gpt2
@app.post("/chat/invoke/v2", response_model=ChatResponse)
async def chatV2(request: ChatRequest):
	if models_dict.get(request.connection_id) is None:
		return ChatResponse(content="Bad Request: Connection not found", status_code=400)
	return ChatResponse(content=models_dict[request.connection_id](request.content))

#gpt3.5-turbo
@app.post("/chat/invoke/v3", response_model=ChatResponse)
async def chatV2(request: ChatRequest):
	if models_dict.get(request.connection_id) is None:
		return ChatResponse(content="Bad Request: Connection not found", status_code=400)
	return ChatResponse(content=models_dict[request.connection_id](request.content)['text'])

#stt api
@app.post("/stt", response_model=STTResponse)
async def stt(request: STTRequest):
	return ChatResponse(text = stt_set.execution(request.file))

#tts api
@app.post("/tts")
async def tts(request: TTSRequest):
	# TTS.invoke 함수를 수정하여 BytesIO 대신 바이트 데이터를 직접 반환하게 해야 합니다.
	audio_data = TTS.invoke(request.text, request.toSlow)
	return Response(content=audio_data, media_type="audio/mp3")

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)