import transformers

transformers.utils.move_cache()

class ImageCaptioner:
	def __init__(self):
		self.model = transformers.pipeline('image-to-text', 'src/model/nlpconnect/vit-gpt2-image-captioning')

	def __call__(self, path):
		return self.model(path)[0]['generated_text']

image_captioning = ImageCaptioner()