// netlify/functions/openai.ts
import OpenAI from 'openai';
import { Handler } from '@netlify/functions';
import * as dotenv from 'dotenv';
dotenv.config();

// OpenAI クライアント初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,   // ← .env / Netlify 環境変数
});

const handler: Handler = async (event) => {
  // POST 以外は拒否
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    console.log("🌟 API Key exists:", !!process.env.OPENAI_API_KEY);
    console.log("🌟 Request body:", event.body);

    /** -------------------------------------------------
     * 1. リクエストボディを取得 & バリデーション
     * ------------------------------------------------*/
    const body = JSON.parse(event.body || '{}');
    const messages = body.messages;

    console.log("🌟 Using model: 'ft:gpt-3.5-turbo-1106:parsonal::BmZ5rsAl' (ファインチューニング)");
    console.log("🌟 Messages:", messages);

    // messages が配列でなければ 400
    if (!Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'messages が配列じゃないよ' }),
      };
    }

    /** -------------------------------------------------
     * 2. system メッセージを追加
     * ------------------------------------------------*/
    const messagesWithSystem = [
         ...messages,
    ];

    console.log("🌟 Final messages:", messagesWithSystem);

    /** -------------------------------------------------
     * 3. OpenAI へリクエスト (ファインチューニングモデルでテスト)
     * ------------------------------------------------*/
    const completion = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0125:parsonal::BpC8FstH', // ← ファインチューニングモデル
      // model: 'gpt-3.5-turbo', // ← 通常モデルでテスト
      messages: messagesWithSystem,
      temperature: 0.6,
      max_tokens: 600,
    });

    console.log("🌟 OpenAI response:", completion);

    const assistantMessage = completion.choices[0].message?.content ?? '';

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: assistantMessage }),
    };
  } catch (error: any) {
    console.error('🔥 GPT ERROR:', error);
    console.error('🔥 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'サーバーでエラーが発生しました。',
        error: error.message ?? 'Unknown error',
        details: error.toString(),
      }),
    };
  }
};

export { handler };