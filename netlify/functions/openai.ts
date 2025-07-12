import OpenAI from 'openai';
import { Handler } from '@netlify/functions';
import * as dotenv from 'dotenv';
dotenv.config();
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
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI APIキーが設定されていません。');
    }

    const body = JSON.parse(event.body || '{}');
    const messages = body.messages;

    console.log("🌟 Request body:", body);
    console.log("🌟 Using model:", body.model);
    console.log("🌟 Messages:", body.messages); 

    if (!Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'messages が配列じゃないよ' }),
      };
    }

    // 必要なら system メッセージ追加
    const messagesWithSystem = [...messages];

    const completion = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-1106:parsonal::BmZ5rsAl',
      messages: messagesWithSystem,
      temperature: 0.6,
      max_tokens: 600,
    });

    const assistantMessage = completion.choices?.[0]?.message?.content ?? '（返答が取得できませんでした）';

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
