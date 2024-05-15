import os
from app.util	import YamlParser

#from langchain_openai.chat_models		import ChatOpenAI
#from langchain_openai.embeddings		import OpenAIEmbeddings
#from langchain_community.vectorstores	import FAISS
from langchain.chains					import LLMChain
from langchain.memory					import ConversationSummaryBufferMemory
from langchain.prompts					import (
											ChatPromptTemplate,
											MessagesPlaceholder,
											SystemMessagePromptTemplate,
											HumanMessagePromptTemplate
										)
from time import time
class BaseChain(LLMChain):
	def __init__(self, connection_id, template_id, llm, caption: str = None, filename = "./src/template/character.yml"):
		prompt, memory = self.__set_configuration(connection_id, template_id, filename, llm, caption=caption)
		super().__init__(
			llm=llm,
			prompt=prompt,
			memory=memory,
			verbose=True,
		)
	def __call__(self, content):
		try:
			return super().__call__(content)
		except Exception as e:
			return "Error: " + str(e)

	def __set_configuration(self, connection_id, template_id, filename, llm, caption=None):
		yaml_parser = YamlParser(filename)
		name = yaml_parser[template_id]['name']
		age = yaml_parser[template_id]['age']
		job = yaml_parser[template_id]['job']
		personality = yaml_parser[template_id]['personality']
		background = yaml_parser[template_id]['background']
		few_shot = yaml_parser[template_id]['few_shot']
		counterpart = yaml_parser[template_id]['counterpart']
		with open("./src/template/meta.xml", 'r') as f:
			meta = f.read()
		Template = meta.format(name=name, age=age, job=job, personality=personality, background=background, few_shot=few_shot, counterpart=counterpart, caption=caption)
		system_template = SystemMessagePromptTemplate.from_template(Template)
		prompt = ChatPromptTemplate.from_messages([
					system_template,											# 역할 부여
					MessagesPlaceholder(variable_name=connection_id),			# 대화 내역을 메모리 저장소에 저장
					HumanMessagePromptTemplate.from_template("{human_input}"),	# 사용자 입력을 템플릿에 삽입
				])
		memory = ConversationSummaryBufferMemory(
					llm=llm,					# LLM 모델
					memory_key=connection_id,	# memory key
					ai_prefix=job,				# AI 메시지 접두사
					human_prefix=counterpart,	# 사용자 메시지 접두사
					return_messages=True,		# 메시지 반환 여부
					max_token_limit=256			# 토큰 제한
				)

		return prompt, memory