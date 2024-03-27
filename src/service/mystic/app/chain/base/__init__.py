import os
from ...util	import YamlParser

from langchain.chains					import LLMChain
from langchain_openai.chat_models		import ChatOpenAI
from langchain_openai.embeddings		import OpenAIEmbeddings
from langchain_community.vectorstores	import FAISS
from langchain.memory					import ConversationBufferMemory
from langchain.prompts					import (
											ChatPromptTemplate,
											MessagesPlaceholder,
											SystemMessagePromptTemplate,
											HumanMessagePromptTemplate
										)

class BaseChain(LLMChain):
	def __init__(self, connection_id, template_id, llm, filename="template/default.yml"):
		prompt, memory = self.__set_configuration(connection_id, template_id, filename)
		
		super().__init__(
			llm=llm,
			prompt=prompt,
			memory=memory,
			verbose=True,
		)

	def __set_configuration(self, connection_id, template_id, filename):
		yaml_parser = YamlParser(filename)

		system_template = SystemMessagePromptTemplate.from_template(
			yaml_parser[template_id]["system_template_content"].format(Q_list=yaml_parser[template_id]["question_list"])
		)
		ai_prefix = yaml_parser[template_id]['ai_prefix']
		human_prefix = yaml_parser[template_id]['human_prefix']
		prompt = ChatPromptTemplate.from_messages([
					system_template,											# 역할 부여
					MessagesPlaceholder(variable_name=connection_id),				# 대화 내역을 메모리 저장소에 저장
					HumanMessagePromptTemplate.from_template("{human_input}"),	# 사용자 입력을 템플릿에 삽입
				])
		memory = ConversationBufferMemory(
					memory_key=connection_id,	# memory key
					ai_prefix=ai_prefix,		# AI 메시지 접두사
					human_prefix=human_prefix,	# 사용자 메시지 접두사
					return_messages=True		# 메시지 반환 여부
				)

		return prompt, memory