import openai

openai_key = "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"
openai.api_key = openai_key

prompt = open( "cv_job_description.txt" , "r" ).read()
print( prompt )

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "user", "content": prompt },
    ]
)

open( "response.txt" , "w" ).write( str(response) )