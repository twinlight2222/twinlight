console.log(process.env.OPENAI_API_KEY)
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/.netlify/functions/openai", async (req, res) => {
    const userMessage = req.body.message; 
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
        messages: [
        { role: "system", content: "あなたは優しいカウンセラーです。" },
        { role: "user", content: userMessage },
      ],
    });

    // ✅ 必要な情報だけ返す！
    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("OpenAIエラー:", err);
    res.status(500).send("OpenAI API呼び出しエラー");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
