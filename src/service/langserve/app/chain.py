import os
import yaml
from dotenv import load_dotenv
# langchain 관련 라이브러리들을 가져옵니다.
from langchain.chains import LLMChain
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)

# .env 파일에서 환경변수를 로드합니다.
load_dotenv()

def load_yaml(file_name):
    with open(file_name) as file:
        settings = yaml.safe_load(file)
    return settings

class Settings:

    def __init__(self, type):
        settings = load_yaml('template/template.yml')

        # 시스템 메시지 템플릿을 생성합니다. {Q_list} 부분은 질문 리스트로 대체됩니다.
        self.system_template = SystemMessagePromptTemplate.from_template(
            settings[type]["system_template_content"].format(Q_list=settings[type]["question_list"])
        )

        self.ai_prefix = settings[type]['ai_prefix']
        self.human_prefix = settings[type]['human_prefix']
        
settings = Settings('cool_headed')

# 벡터 스토어를 생성합니다. 여기서는 텍스트 파일로부터 FAISS 인덱스를 생성합니다.
vector_store = FAISS.from_texts(
    '../vector_store/a.txt',
    embedding=OpenAIEmbeddings(),
)

# 검색기(retriever)를 벡터 스토어로부터 생성합니다.
retriever = vector_store.as_retriever()

# OpenAI의 Chat 모델을 생성합니다. 모델명은 설정에 따라 달라질 수 있습니다.
llm = ChatOpenAI(model_name='gpt-3.5-turbo')

# 대화 프롬프트를 생성합니다. 이 프롬프트는 대화의 구조를 정의합니다.
prompt = ChatPromptTemplate.from_messages([
    settings.system_template,                                                # 역할 부여
    MessagesPlaceholder(variable_name="chat_history"),              # 대화 내역을 메모리 저장소에 저장
    HumanMessagePromptTemplate.from_template("{human_input}"),      # 사용자 입력을 템플릿에 삽입
])

# 대화 메모리를 생성합니다. 이 메모리는 대화 내역을 저장하고 관리합니다.
memory = ConversationBufferMemory(
    memory_key="chat_history",                                      # 대화 내역의 키
    ai_prefix = settings.ai_prefix,                                # AI 메시지 접두사
    human_prefix = settings.human_prefix,                          # 사용자 메시지 접두사
    return_messages=True                                            # 메시지 반환 여부
)

# LLM 체인을 생성합니다. 이 체인은 대화 프롬프트, 메모리, 모델 등을 연결하여 대화를 처리합니다.
Chain = LLMChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=True,                                                   # 자세한 로그 출력 여부
)
