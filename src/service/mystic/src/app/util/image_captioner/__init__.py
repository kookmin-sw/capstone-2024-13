import transformers

transformers.utils.move_cache()

class ImageCaptioner:
	def __init__(self):
		self.model = transformers.pipeline('image-to-text', 'src/model/nlpconnect/vit-gpt2-image-captioning')

	def __call__(self, path):
		return self.model(path)[0]['generated_text']

	@classmethod
	def __new__(cls, *args, **kwargs):
		if not hasattr(cls, '_instance'):
			cls._instance = super().__new__(cls)
		return cls._instance

image_captioning = ImageCaptioner()