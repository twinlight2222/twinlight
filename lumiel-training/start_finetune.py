import openai

client = openai.OpenAI(
    api_key="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"
)

response = client.fine_tuning.jobs.create(
    training_file="file-GDPiGkKn3C29XnVeZNzJQx",
    model="gpt-3.5-turbo"
)

print(response)

