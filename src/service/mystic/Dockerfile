FROM python:3.11-slim

WORKDIR /code

COPY ./pyproject.toml ./README.md ./poetry.lock* ./

COPY ./package[s] ./packages

COPY ./tool ./tool

COPY ./src ./src

# Build dependencies not supported by poetry PEP 518
RUN apt-get update

RUN	apt-get install -y --no-install-recommends build-essential python3-dev curl && \
	pip install --upgrade pip && \
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    export PATH="$HOME/.cargo/bin:$PATH" && \
	pip install poetry==1.6.1 && \
	pip install cython marisa-trie sudachipy

RUN	poetry config virtualenvs.create false && \
	poetry install --no-interaction --no-ansi

RUN apt-get install wget && \
	wget https://download.redis.io/releases/redis-7.2.0.tar.gz && \
	tar xzf redis-7.2.0.tar.gz && \
	cd redis-7.2.0 && \
	make && \
	make install && \
	sed -i 's/daemonize no/daemonize yes/g' redis.conf && \
	mkdir -p /etc/redis && \
	cp redis.conf /etc/redis/redis.conf && \
	cd .. && \
	rm -rf redis-7.2.0 && \
	rm redis-7.2.0.tar.gz

RUN chmod +x ./tool/docker-entrypoint.sh && \
	cp ./tool/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

#EXPOSE $PORT

CMD [ "docker-entrypoint.sh" ]