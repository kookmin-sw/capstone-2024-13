from ..base 						import BaseChain
from dotenv 						import load_dotenv
from langchain_openai.chat_models	import ChatOpenAI

load_dotenv()
class ChainV3(BaseChain): #gpt-3.5-turbo
	def __init__(self, connection_id, template_id, caption: str = None):
		super().__init__(connection_id, template_id, ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0,top_p = 0.01), caption=caption)