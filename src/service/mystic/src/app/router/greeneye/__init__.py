from fastapi	import UploadFile, APIRouter
from dotenv		import load_dotenv
import os, json, requests, base64, uuid, time, tempfile as temp

load_dotenv()

router = APIRouter(prefix="/greeneye", tags=["greeneye"])

def load_image(path:str):
    #to tempfile
    with open(path, 'rb') as f:
        file_data = f.read()
    
    return file_data

def Image_filter(file_data: bytes):
	request_json = {
		"images": [{
			"format": "jpg",
			"name": "demo",
			"data": base64.b64encode(file_data).decode()
		}],
		"requestId": str(uuid.uuid4()),
		"version": "V1",
		"timestamp": int(round(time.time() * 1000)),
	}


	payload = json.dumps(request_json).encode("UTF-8")

	headers = {
		"X-GREEN-EYE-SECRET": os.environ["CLOVA_API_SECRET_KEY"],
		'Content-Type': 'application/json'
	}

	response = requests.request("POST", os.environ["CLOVA_API_URL"], headers=headers, data=payload)
	response = response.json()

	confidence_values = dict()

	try:
		result = response["images"][0]["result"]

		confidence_values["normal"] = result["normal"]["confidence"]
		confidence_values["adult"] = result["adult"]["confidence"]
		confidence_values["sexy"] = result["sexy"]["confidence"]
		confidence_values["porn"] = result["porn"]["confidence"]
	except KeyError:
		print("Key not found in response")

	return confidence_values
	
def greenEye(path: str):
    temp = load_image(path)
    confidence = Image_filter(temp)

    # public criteria
    if confidence['normal'] > 0.6 and confidence['adult'] < 0.1 and confidence['sexy'] < 0.4 and confidence['porn'] < 0.1:
        flag = 'Public'
        return flag, confidence
    
    else:
        flag = 'Private'
        return flag, confidence
	
class GreeneyeRequest(BaseModel):
	path : str

class GreeneyeResponse(BaseModel):
	flag : str
	confidence : dict
	
@router.post("/", response_model=GreeneyeResponse)
async def image_filtering(request: GreeneyeRequest):
	flag, confidence = greenEye(path=request.path)
	return GreeneyeResponse(flag=flag, confidence=confidence)