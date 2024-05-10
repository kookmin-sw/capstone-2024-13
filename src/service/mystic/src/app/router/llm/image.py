from typing		import Optional
from fastapi	import APIRouter, HTTPException
from pydantic 	import BaseModel
from app.util	import connection
from app.util	import image_captioning
from chain		import V1, V2, V3

router = APIRouter(prefix="/image", tags=["image"])

chain = {
	"v1": V1,
	"v2": V2,
	"v3": V3
}

class ImageUploadRequest(BaseModel):
	connection_id: str
	url: Optional[str] = None

class ImageUploadResponse(BaseModel):
	content: str

@router.post("/upload", response_model=ImageUploadResponse)
async def image_upload(request: ImageUploadRequest):
	caption = None
	if request.url is not None:
		caption = image_captioning(request.url)
		print('caption:', caption)
	connection[request.connection_id].caption = caption
	connection[request.connection_id].chain = chain[connection[request.connection_id].version](
		connection_id=request.connection_id,
		template_id=connection[request.connection_id].template_id,
		caption=caption
	)

	return ImageUploadResponse(content="Image uploaded successfully")