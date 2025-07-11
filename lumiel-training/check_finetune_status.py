import openai

# OpenAI APIキー（セキュリティのため本番では環境変数で管理してね）
openai.api_key = "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"

# さっきのFineTuningジョブID
job_id = "ftjob-QxT7QXu0mQpmfT70aPJleszi"

# 状態を取得
response = openai.fine_tuning.jobs.retrieve(job_id)

# 状態を表示
print("現在のステータス:", response.status)
print("詳細：", response)
