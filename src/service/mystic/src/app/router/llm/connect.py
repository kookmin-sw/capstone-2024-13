import os
import threading
import time as time_module
from fastapi	import APIRouter, HTTPException, BackgroundTasks
from pydantic 	import BaseModel
from bson	import ObjectId
from chain	import ChainV1, ChainV2, ChainV3
from app.util	import redis_instance
from app.util	import connection
from app.util	import YamlParser
import schedule

router = APIRouter(prefix="/connect", tags=["connect"])

def monitor_connection():
    global connection
    try:
        if len(connection) != 0:
            print('number of connection: ', len(connection))
            flush_connections()
        else:
            print('no connection')
    except Exception as e:
        print('monitor_connection error', exc_info=True)

def flush_connections():
    global connection
    for i in list(connection):
        if time_module.time() - connection[i]['latest'] > 600:
            print('latest: ', connection[i]['latest'], 'time: ', time_module.time(), 'diff: ', time_module.time() - connection[i]['latest'])
            del connection[i]
            print(f'connection {i} is deleted')

schedule.every(5).minutes.do(monitor_connection)

def run_schedule():
    print('run_schedule started')
    while True:
        schedule.run_pending()
        time_module.sleep(1)

@router.on_event("startup")
async def startup_event():
    print('startup_event')
    print('-'*50)
    thread = threading.Thread(target=run_schedule)
    thread.start()

class ConnectRequest(BaseModel):
    version: str
    template_id: int

class ConnectResponse(BaseModel):
	connection_id: str

@router.post("/", response_model=ConnectResponse)
async def connect(request: ConnectRequest):
	if request.version not in ["v1", "v2", "v3"]:
		raise HTTPException(status_code=400, detail="Bad Request")
	connection_id = str(ObjectId())
	connection[connection_id] = {
		'version': request.version,
		'template_id': request.template_id,
		"latest": time_module.time()
	}

	return ConnectResponse(connection_id=connection_id)
