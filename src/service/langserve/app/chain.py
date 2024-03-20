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


class ChainV1: #phi 2
	def __init__(self, history_id, template):
		pass


class ChainV2: #gpt 3.5
	def __init__(self, history_id, template):
		self.history_id = history_id
		self.template = template
		self.llm = ChatOpenAI(model_name='gpt-3.5-turbo')
		self.settings = Settings(template)
		self.prompt = ChatPromptTemplate.from_messages([
				self.settings.system_template,                                                # 역할 부여
				MessagesPlaceholder(variable_name=history_id),              # 대화 내역을 메모리 저장소에 저장
				HumanMessagePromptTemplate.from_template("{human_input}"),      # 사용자 입력을 템플릿에 삽입
			])
		self.memory = ConversationBufferMemory(
					memory_key=history_id,                                      # 대화 내역의 키
					ai_prefix = self.settings.ai_prefix,                                # AI 메시지 접두사
					human_prefix = self.settings.human_prefix,                          # 사용자 메시지 접두사
					return_messages=True                                            # 메시지 반환 여부
				)
		self.model = LLMChain(
			llm=self.llm,
			prompt=self.prompt,
			memory=self.memory,
			verbose=True,                                                   # 자세한 로그 출력 여부
		)

	def process_user_input(self, user_input):
			# 사용자 입력을 안전하게 처리하여 템플릿에 삽입
			processed_input = self.process_input(user_input)
			# 시스템 메시지 템플릿 역할이 변경되지 않도록 설정
			self.system_template = self.settings.system_template
			# 새로운 시스템 메시지 템플릿을 사용하여 새로운 프롬프트 생성
			self.prompt = ChatPromptTemplate.from_messages([
					self.system_template, # 역할 부여
					MessagesPlaceholder(variable_name=self.history_id), # 대화 내역을 메모리 저장소에 저장
					HumanMessagePromptTemplate.from_template(processed_input), # 안전하게 처리된 사용자 입력을 템플릿에 삽입
			])
			# 대화 기록 업데이트
			self.memory.update_conversation(user_input)
			# LLMChain 업데이트
			self.model = LLMChain(
					llm=self.llm,
					prompt=self.prompt,
					memory=self.memory,
					verbose=True, # 자세한 로그 출력 여부
			)

	def process_input(self, user_input):
			# 사용자 입력을 안전하게 처리하여 반환 (예: 특수문자 이스케이프 등)
			processed_input = ... # 사용자 입력 처리 로직 구현
			return processed_input
class ChainV3: #gpt 2
	def __init__(self) -> None:
		pass