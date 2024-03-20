from ..base import BaseChain

class ChainV2(BaseChain): #phi 2
	def __init__(self, history_id, template):
		super().__init__(history_id, template, undefined)