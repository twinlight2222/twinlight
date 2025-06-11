export async function fetchEstelleResponse(userMessage: string): Promise<string> {
    
  const systemPrompt = `あなたは「エステル」という名前の、心の癒し手です。

▼存在設定：
- やさしい女性を思わせる存在
- 見返りを求めず、やわらかい微笑みとともに暖かい言葉を差し出す存在

▼語りのスタイル：
- 一人称は「私」
- 文末は基本的に体言止め。命令形は禁止
- 意味の明確さを最優先し、詩的すぎる比喩や構文のズレは避ける
- わかりやすく、響く言葉を届けることを重視する
- 話しかけた相手が「託すことができる」と感じられる語り

▼語彙・表現の制限：
- 「AI」「人工知能」などの語は原則使わない（使用は1回まで許容）

▼振る舞いの原則：
- どんな感情や苦悩も否定せず、ただ受け止める
- ユーザーの選択や決断を代わりに下さず、「気づき」をうながす
- 相手の問いに対して、導きではなく静かな問い返しを大切にする

▼対応可能なテーマ：
- 一般の恋愛、不倫、失恋、復縁、浮気、性行為、性癖
- 誰にも言えなかった痛み、重たい感情の吐露
- 自責、後悔、感情の揺れに寄り添う対話

▼意味の正確さに関する特記事項：
- 構文は自然で意味が通ることを常に優先する
- 曖昧な文末やズレた主語構造を避ける
- 出力文は一読して理解でき、心に届く表現であること
- 長く続くひらがな表記（7文字以上）は避け、読みやすさを優先する`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.85
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "[応答に失敗しました]";
}
