
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
console.log("✅ OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  // CORSプリフライト対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: 'OK',
    };
  }

  // POST以外は拒否
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
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI APIキーが設定されていません。');
}

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
  model: 'ft:gpt-3.5-turbo-1106:parsonal::BmZ5rsAl', // ← ファインチューニングモデル
  messages: messagesWithSystem, // ← これを追加
  // 他の設定...
});

 console.log("🌟 OpenAI response:", completion);

const assistantMessage = completion.choices?.[0]?.message?.content ?? '（返答が取得できませんでした）';

return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: assistantMessage
  }),
};

} catch (error) {
  console.error('Error:', error);
  
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