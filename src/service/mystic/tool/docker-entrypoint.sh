#!/bin/bash

set -e

mkdir -p ./src/model/nlpconnect/vit-gpt2-image-captioning && \
pip install -U "huggingface_hub[cli]" && \
huggingface-cli download nlpconnect/vit-gpt2-image-captioning --local-dir ./src/model/nlpconnect/vit-gpt2-image-captioning

redis-server /etc/redis/redis.conf

uvicorn src.app.server:app --host 0.0.0.0 --port 8000 --reload