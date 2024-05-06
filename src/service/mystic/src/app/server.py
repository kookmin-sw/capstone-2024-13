import sys
sys.path.append('/code/src')

from fastapi	import FastAPI
from .router	import llm, stt, tts

app = FastAPI(
	title="Mystic",
	description="LLM, STT, TTS intergrated server",
	version="0.1.0",
	docs_url='/docs'
)
app.include_router(llm.router, tags=["llm"])
app.include_router(stt.router, tags=["stt"])
app.include_router(tts.router, tags=["tts"])

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="https://0.0.0.0", port=8000)