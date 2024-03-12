FROM python:3.11-slim

WORKDIR /code

COPY ./pyproject.toml ./README.md ./poetry.lock* ./

COPY ./package[s] ./packages

COPY ./app ./app

RUN apt-get update && \
	pip install poetry==1.6.1 && \
	poetry config virtualenvs.create false && \
	poetry install --no-interaction --no-ansi

#EXPOSE $PORT

CMD [ "uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]
