from typing import Any
from transformers import pipeline

class ImageCaptioning:

    def __init__(self) :

        self.model = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

    def __call__(self, path) :
        
        result = self.model(path)

        return result
    

tmp = ImageCaptioning()
print(tmp('/home/woonsan/문서/카카오톡 받은 파일/test.jpg'))