from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field
from typing import List, Union
from langchain.schema import AIMessage, HumanMessage, SystemMessage
import chain

app = FastAPI(title = "LLMChain", description = "Language Model Chain", version = "0.1.0")


class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response_message = chain.chain(request.message)['text']
    return ChatResponse(response=response_message)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)