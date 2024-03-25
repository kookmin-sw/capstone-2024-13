from ..base import BaseChain

class ChainV1(BaseChain):
	def __init__(self, connection_id, template):
		super().__init__(connection_id, template, undefined)