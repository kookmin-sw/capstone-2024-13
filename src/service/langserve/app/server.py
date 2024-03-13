from fastapi			import FastAPI
from fastapi.responses	import RedirectResponse
from pydantic 			import BaseModel, Field
from typing				import List, Union
from langchain.schema	import AIMessage, HumanMessage, SystemMessage
from app.chain			import Chain

app = FastAPI(title = "LLMChain", description = "Large Language Model Chain", version = "0.1.0")

class ChatRequest(BaseModel):
    content: str

class ChatResponse(BaseModel):
    content: str

# 자체 제작하는 LLM을 v1으로, GPT-3.5-turbo를 v2로 설정하면 어떨까?
@app.post("/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
	return ChatResponse(content=Chain(request.content)['text'])

@app.post("/v2/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    return ChatResponse(content=Chain(request.content)['text'])

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)