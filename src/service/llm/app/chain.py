import os
from dotenv import load_dotenv
from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)


load_dotenv()

# os.environ['OPENAI_API_KEY'] = os.environ.get("OPENAI_API_KEY")
# os.environ["HUGINGFACEHUB_API_TOKEN"] = os.environ.get("HUGINGFACEHUB_API_TOKEN")

vector_store = FAISS.from_texts(
    '../vector_store/a.txt',
    embedding=OpenAIEmbeddings(),
)

retreiver = vector_store.as_retriever()



system_template = SystemMessagePromptTemplate.from_template(\
    "너는 내 대화를 통해서 일기를 작성해주는 친절한 말투의 작가야.\
    오늘 나의 하루에 대해서 {질문리스트}중에서 하나씩 골라서 중복되지 않게 10번 질문해줘. \
    답변을 들은 후에 최대한 친근하게 공감해주고 다음 질문을 이어가 줘\
    혹시 대화가 그만하고 싶다거나 10번의 질문에 모두 답하면 지금까지의 오늘 나의 정보를 정리해서 오늘 나에게 일어난 사실만으로 영어로 한줄일기를 50자내로 작성해서 보여줘.")
system_message = system_template.format(질문리스트="오늘의 기분, 오늘의 일정, 오늘의 감정, 오늘의 사건, 오늘의 인상적인 사람, 오늘의 인상적인 대화, 오늘의 인상적인 장소, 오늘의 인상적인 음식, 오늘의 인상적인 음악, 오늘의 인상적인 영화, 오늘의 인상적인 책, 오늘의 인상적인 사진, 오늘의 인상적인 영상, 오늘의 인상적인 기사, 오늘의 인상적인 뉴스, 오늘의 인상적인 이슈, 오늘의 인상적인 트렌드")

prompt = ChatPromptTemplate.from_messages([
    system_message,                                              # 역할부여
    MessagesPlaceholder(variable_name="chat_history"),           # 메모리 저장소 설정. ConversationBufferMemory의 memory_key 와 동일하게 설정
    HumanMessagePromptTemplate.from_template("{human_input}"),   # 사용자 메시지 injection
])


memory = ConversationBufferMemory(memory_key="chat_history", 
                                  ai_prefix="작가",
                                  human_prefix="사용자",
                                  return_messages=True)

llm = ChatOpenAI(model_name='gpt-3.5-turbo')

chain = LLMChain(
                            llm = llm,
                            prompt = prompt,
                            memory = memory,
                            verbose = True,
)