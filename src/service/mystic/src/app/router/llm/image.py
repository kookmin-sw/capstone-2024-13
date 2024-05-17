from typing		import Optional
from fastapi	import APIRouter, HTTPException
from pydantic 	import BaseModel
from app.util	import connection
from app.util	import image_captioning
from chain		import ChainV1, ChainV2, ChainV3

router = APIRouter(prefix="/image", tags=["image"])

chain = {
	"v1": ChainV1,
	"v2": ChainV2,
	"v3": ChainV3
}

class ImageUploadRequest(BaseModel):
	connection_id: str
	url: Optional[str] = None

class ImageUploadResponse(BaseModel):
	content: str

@router.post("/upload", response_model=ImageUploadResponse)
async def image_upload(request: ImageUploadRequest):
	if request.url == " ":
		caption = None
	else:
		caption = image_captioning(request.url)
		print('caption:', caption)
	
	connection[request.connection_id]["caption"] = caption
	connection[request.connection_id]['chain'] = chain[connection[request.connection_id]['version']](
		connection_id=request.connection_id,
		template_id=connection[request.connection_id]["template_id"],
		caption=caption
	)

	print('connection:', connection[request.connection_id])
	print('chain:', connection[request.connection_id]["chain"])

	return ImageUploadResponse(content=connection[request.connection_id]['chain'].greeting)