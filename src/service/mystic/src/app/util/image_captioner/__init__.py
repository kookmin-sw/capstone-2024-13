import transformers
import time
import requests

transformers.utils.move_cache()


class ImageCaptioner:
    def __init__(self):
        self.model = transformers.pipeline('image-to-text', 'src/model/nlpconnect/vit-gpt2-image-captioning')

    def __call__(self, path):
        for _ in range(20):
            response = requests.get(path)
            if response.status_code == 200:
                return self.model(path)[0]['generated_text']
            time.sleep(0.5)
        raise Exception("Failed to get the image from the path after 10 attempts")

image_captioning = ImageCaptioner()