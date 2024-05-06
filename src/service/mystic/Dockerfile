FROM python:3.11-slim

WORKDIR /code

COPY ./pyproject.toml ./README.md ./poetry.lock* ./

COPY ./package[s] ./packages

COPY ./src ./src

# Build dependencies not supported by poetry PEP 518
RUN apt-get update && \
	apt-get install -y --no-install-recommends build-essential python3-dev curl && \
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    export PATH="$HOME/.cargo/bin:$PATH" && \
	pip install --upgrade pip && \
	pip install poetry==1.6.1 && \
	pip install cython marisa-trie sudachipy

RUN	poetry config virtualenvs.create false && \
	poetry install --no-interaction --no-ansi

#EXPOSE $PORT

CMD [ "uvicorn", "src.app.server:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]