# import sys
# import os
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

# def aptitude_questions(company, subject, type_of_question, no_of_questions=3, language=None):
#     prompt1 = PromptTemplate(
#         input_variables=["company", "no_of_questions", "subject", "type_of_question", "language"],
#         template="""
#         I am preparing a question paper for placement training. I need {no_of_questions} MCQS with answers (only options and correct answer)
#         with the following specifications:
#         company - {company}, 
#         subject - {subject},
#         type of question - {type_of_question},
#         language - {language} (choose this option if the subject is about a programming language, else ignore this)
#         """
#     )
#     chain1 = prompt1 | llm

#     prompt2 = PromptTemplate(
#         input_variables=["questions"],
#         template="""
#         {questions}
#         From this prompt, give a list of dictionaries containing only the question, options, and the answer.
#         Example:
#         [
#             {{"question": question, "option1": option1, "option2": option2, "option3": option3, "option4": option4, "answer": answer}}
#         ]
#         """
#     )
#     chain2 = prompt2 | llm

#     overall_chain = chain1 | chain2

#     # Run the chain with the input variables
#     response = overall_chain.invoke({
#         "company": company, 
#         "no_of_questions": no_of_questions, 
#         "subject": subject, 
#         "type_of_question": type_of_question, 
#         "language": language
#     })
#     return response.content  # Return the content of the response

# if __name__ == "__main__":
#     # Set default encoding to UTF-8
#     sys.stdout.reconfigure(encoding='utf-8')

#     input_data = json.loads(sys.argv[1])
#     # input_data = {"company": "infosys", "no_of_questions": 3, "subject": "quantitative ability", "type_of_question": "geometry and measurement"}
#     company = input_data['company']
#     no_of_questions = input_data['no_of_questions']
#     subject = input_data["subject"]
#     type_of_question = input_data["type_of_question"]
#     response = aptitude_questions(company, subject, type_of_question, no_of_questions)
#     print(response)
#     # print(type(response))
