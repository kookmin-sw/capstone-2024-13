from ..base import BaseChain

class ChainV1(BaseChain):
	def __init__(self, history_id, template):
		super().__init__(history_id, template, undefined)