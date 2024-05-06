import os

from fastapi				import APIRouter, HTTPException
from pydantic 				import BaseModel
from bson					import ObjectId
from chain					import ChainV1, ChainV2, ChainV3
from app.connection			import connection
from app.util.image_captioning	import ImageCaptioning

router = APIRouter(prefix="/connect", tags=["connect"])
ImageCaption = ImageCaptioning()
chain = {
	"v1": ChainV1,
	"v2": ChainV2,
	"v3": ChainV3
}

class ConnectRequest(BaseModel):
	template_id: int
	version: str = "v3"

class ConnectResponse(BaseModel):
	connection_id: str

@router.post("/{version}", response_model=ConnectResponse)
async def connect_v1(request: ConnectRequest):
	if request.version not in chain:
		raise HTTPException(status_code=400, detail="Bad Request")

	connection_id = str(ObjectId())
	text_data = None
	if request.version == "v3":
		text_data = ImageCaption(os.getcwd() + '/public/test-image.jpg')
		print('text_data:', text_data)
	connection[connection_id] = chain[request.version](
		connection_id=connection_id,
		template_id=request.template_id,
		caption=text_data
	)

	return ConnectResponse(connection_id=connection_id)