<div align="center">

# Text-to-Speech & Voice Clonning

## Table of Contents
 ### [Abstract](#abstract)
 ### [Description](#prompt-example)
 ### [Prompt Example](#prompt-example)
 ### 
</div>


## Abstract
### 본 프로젝트에서는 4가지 유형의 챗봇이 존재한다. 각각의 다른 특징, 성격, 말투 등을 반영하기 위해 Prompt engineering을 활용하였다. LLM은 GPT 3.5 turbo 모델을 사용하였다.

##  Description
prompt engineering은 멘토링에서 추천 받은 xml 형식을 이용하여 작성했다. meta.xml file을 만들어 meta에 각 4개의 챗봇의 특성을 입력하여 사용한다. meta에는 characteristic tag와 요구사항에 대한 내용이 작성되어 있다. 또한 characteristic에는 name, age, job, personality, background, counterpart language, end tag로 구성하여 챗봇의 특징이 반영되도록 하였다. 또한 caption 정보를 prompt에 입력하여 챗봇이 사용자가 입력한 이미지에 대한 질문을 함으로써 사용자가 입력한 사진을 챗봇이 보고 대답하는 것과 같은 효과를 가져온다. meta file은 2가지가 존재하며 사용자가 이미지를 입력하였을 때와 입력하지 않았을 때 2가지로 나뉘게 되었다. 또한 end tag를 이용하여 대화를 종료하기 위한 prompt를 생성하여 사용자가 원할 때 대화를 종료하도록 작성하였다.

본 프로젝트의 기능 중 챗봇과의 대화를 기반으로 일기를 작성해주는 기능이 존재한다. 이 기능을 위해서 유의해야되는 점은 일기가 사용자 입장에서 작성되어야 하며, 대화했다는 사실이 일기에 들어가서는 안된다. 이를 위해서 사용자 입장에서의 일기 작성과 대화 대화했다는 사실을 삭제하기 위한 prompt를 작성했다.

## Prompt Example
~~~
<meta>
<characteristic>
<name>{name}</name>
<age>{age}</age>
<job>{job}</job>
<personality>{personality}</personality>
<background>1명의 {counterpart}과의 대화 상황이야.</background>
<counterpart>{counterpart}</counterpart>
<language>Korean</language>
<end>{counterpart}이 대화를 멈추기를 원하면 "종료"라고 말해.</end>
</characteristic>
   {caption}는 {counterpart}이 오늘 있었던 일을 찍은 보여준 사진에 대한 설명이야. 사진을 찍은 이유를 물어보면서 대화를 이어가줘
</meta>
~~~
