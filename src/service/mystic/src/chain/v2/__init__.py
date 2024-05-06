from ..base import BaseChain

class ChainV2(BaseChain): #phi 2
	def __init__(self, connection_id, template, caption: str = None):
		super().__init__(connection_id, template, caption)