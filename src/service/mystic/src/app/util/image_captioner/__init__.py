from transformers import pipeline

class ImageCaptioner:
	def __init__(self) :
		self.model = pipeline("image-to-text", model="./app/util/image_captioner/vit-gpt2-image-captioning")

	def __call__(self, path) :
		return self.model(path)[0]['generated_text']

	@classmethod
	def __new__(cls, *args, **kwargs):
		if not hasattr(cls, '_instance'):
			cls._instance = super().__new__(cls)
		return cls._instance