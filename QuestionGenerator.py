# import os
# import sys
# import json
# from dotenv import load_dotenv
# from langchain_openai import ChatOpenAI
# from langchain_core.prompts import PromptTemplate
# from langchain_core.runnables import RunnableSequence

# load_dotenv()

# api_key = os.getenv("OPENAI_API_KEY")

# llm = ChatOpenAI(
#     temperature=0.9,
#     model_name="gpt-4-turbo",
#     api_key=api_key
# )

# def aptitude_questions(company, no_of_questions=3):
#     prompt1 = PromptTemplate(
#         input_variables=["company", "no_of_questions"],
#         template="I need {no_of_questions} aptitude MCQs with answers (only options and correct answer) from {company} placement paper."
#     )
#     chain1 = prompt1 | llm

#     prompt2 = PromptTemplate(
#         input_variables=["questions"],
#         template="""
#         {questions}
#         From this prompt give a list of dictionary containing only the question, options and the answer.
#         Example:
#         [
#             {{"question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "answer": answer}}
#         ]
#         """
#     )
#     chain2 = prompt2 | llm

#     overall_chain = chain1 | chain2

#     # Run the chain with the input variables
#     response = overall_chain.invoke({"company": company, "no_of_questions": no_of_questions})
#     return response.content  # Return the content of the response

# if __name__ == "__main__":
#     input_data = json.loads(sys.argv[1])
#     # input_data = {"company": "infosys", "no_of_questions": 3}
#     company = input_data['company']
#     no_of_questions = input_data['no_of_questions']
#     response = aptitude_questions(company, no_of_questions)
#     print(response)
#     # print(type(response))