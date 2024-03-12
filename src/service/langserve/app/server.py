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

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    return ChatResponse(content=Chain(request.content)['text'])

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)