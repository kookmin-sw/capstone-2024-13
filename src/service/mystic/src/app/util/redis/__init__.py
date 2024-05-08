import redis

redis_instance = redis.StrictRedis(
	host='localhost',
	port=6379,
	db=0,
	decode_responses=True
)