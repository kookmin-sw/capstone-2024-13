<div align="center">

# Text-to-Speech & Voice Clonning

## Table of Contents
 ### [Abstract](#abstract)
 ### [Used Model](#used-model)
 ### [Fine-tuning Trial](#fine-tuning-trial)
 ### [Prompt Engineering](#prompt-engineering)

</div>


## Abstract
### 2024 캡스톤 디자인 프로젝트 팀 '아니 근데 오늘 진짜'는 사용자와 Large-Language-Model(이하 LLM)를 이용한 대화를 통해 하루의 일기를 작성하는 서비스를 구현한다. 챗봇을 통한 자연스러운 대화와, 대화를 통한 일기 생성을 위해 LLM이 필요하다. 이를 위해 Prompt Engineering과 Fine-tuning을 진행하였다.

## Used Model
### 현재 사용중인 모델은 ChatGPT-3.5-turbo이다. 이 모델은 OpenAI에서 개발한 LLM 모델이다. 현재 가장 많이 사용되는 모델 중 하나이다. 대화를 진행하는데 가격, 속도 측면에서 가장 적절하여 선택하였다. 질문에 대해 빠른 속도로 적절한 답변을 생성한다. 모델은 API를 불러서 사용하였다.

## Fine-tuning Trial
### ChatGPT를 사용하기 전, microsoft에서 개발한 소형 LLM인 Phi-2를 사용하기 위해 한국어 능력을 향상시키기 위한 Task에서 Fine-tuning을 진행하였다. Phi-2 모델은 소형 LLM으로 다른 LLM 모델에 비해 작은 크기를 갖고 있어 적은 리소스에서 사용할 수 있기 때문에 선택하였다.

자세한 내용은 [여기](./phi-2/)에서 확인할 수 있습니다.


### ChatGPT를 사용하기 전, yanolja에서 개발한 LLM인 EEVE를 사용하기 위해 대화를 일기로 작성하는 요약 Task에서 Fine-tuning을 진행하였다. EEVE 모델은 한국어를 효율적으로 tokenize 하도록 학습되었으며, 한국어에서 높은 성능을 보여 선택하였다.

자세한 내용은 [여기](./eeve/)에서 확인할 수 있습니다.

## Prompt Engineering
### 본 프로젝트에서는 4가지 유형의 챗봇이 존재한다. 각각의 다른 특징, 성격, 말투 등을 반영하기 위해 Prompt engineering을 활용하였다. 

자세한 내용은 [여기](../../template/)에서 확인할 수 있습니다.