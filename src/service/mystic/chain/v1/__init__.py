from ..base import BaseChain

class ChainV1(BaseChain):
	def __init__(self, connection_id, template_id, caption: str = None):
		super().__init__(connection_id, template_id, caption)