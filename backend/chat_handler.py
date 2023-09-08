import openai

class ChatCompletionHandler:

    openai_key = "<open-ai-key>"
    openai.api_key = openai_key
    model = "gpt-3.5-turbo"

    @staticmethod
    def get_response( prompt: str ) -> str:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt},
            ]
        )
        generated_text = response[ "choices" ][0].message["content"].strip()
        return generated_text