// full-service-test.cjs
// チャネリングサービス全体の流れをテスト

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// .envファイルを読み込み
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      const lines = envFile.split('\n');
      
      for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    console.log('💡 .envファイルが見つかりません');
  }
}

loadEnv();

// 1. ChatGPTでスクリプト生成
async function generateChannelingScript(userQuestion) {
  console.log('🤖 ChatGPTでスクリプト生成中...');
  
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY が設定されていません');
  }

  const prompt = `
あなたは経験豊富なスピリチュアルガイドです。以下の質問に応じて、パーソナライズされたチャネリング練習スクリプトを作成してください。

【質問】: ${userQuestion}

以下の構造でJSONレスポンスを生成してください：

{
  "theme": "質問をそのまま",
  "opening": "約1分の導入部分。魂との対話の準備、呼吸法の指示を含む温かい誘導文",
  "sessions": [
    {
      "method": "この質問に最適なチャネリング手法1",
      "title": "チャネリング①",
      "script": "手法の説明、質問の提示、具体的な誘導文（沈黙時間の指示は除く）",
      "silenceDuration": 60
    },
    {
      "method": "この質問に最適なチャネリング手法2", 
      "title": "チャネリング②",
      "script": "2つ目の手法による誘導文",
      "silenceDuration": 75
    },
    {
      "method": "この質問に最適なチャネリング手法3",
      "title": "チャネリング③", 
      "script": "3つ目の手法による誘導文",
      "silenceDuration": 60
    }
  ],
  "closing": "メモの整理、キーワード準備の案内を含む締めくくり"
}

【重要】:
- 質問の性質を深く理解し、最も効果的な3つのチャネリング手法を選択
- 温かく包み込むような、安心感のある文体
- 各セッションで「それでは、感じてみてください。」で締める

JSONのみを返してください。
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let scriptText = data.choices[0].message.content;
    
    // マークダウンのコードブロックを除去
    scriptText = scriptText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    console.log('📄 生成されたスクリプト（一部）:');
    console.log(`   テーマ: ${JSON.parse(scriptText).theme}`);
    
    return JSON.parse(scriptText);
    
  } catch (error) {
    console.error('❌ スクリプト生成エラー:', error.message);
    throw error;
  }
}

// 2. Google TTSで音声生成
async function generateTTSAudio(text, filename) {
  console.log(`🗣️ Google TTSで音声生成中: ${filename}`);
  
  const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
  
  if (!GOOGLE_CLOUD_API_KEY) {
    throw new Error('GOOGLE_CLOUD_API_KEY が設定されていません');
  }

  const requestBody = {
    input: { text: text },
    voice: {
      languageCode: 'ja-JP',
      name: 'ja-JP-Neural2-B',
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.7,
      pitch: -2.0,
      volumeGainDb: 3.0,
      effectsProfileId: ['large-home-entertainment-class-device'],
      sampleRateHertz: 24000
    }
  };

  try {
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google TTS API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const audioBuffer = Buffer.from(result.audioContent, 'base64');
    
    // ファイル保存
    const outputDir = './test-audio';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, audioBuffer);
    
    console.log(`✅ 音声ファイル生成完了: ${filename} (${audioBuffer.length} bytes)`);
    return filePath;
    
  } catch (error) {
    console.error('❌ TTS生成エラー:', error.message);
    throw error;
  }
}

// 3. SoXでリバーブ追加
async function addReverbToAudio(inputFile, outputFile) {
  console.log('🏛️ リバーブ効果追加中...');
  
  return new Promise((resolve, reject) => {
    const sox = spawn('sox', [inputFile, outputFile, 'reverb', '50']);
    
    sox.stderr.on('data', (data) => {
      console.log('SoX:', data.toString().trim());
    });
    
    sox.on('close', (code) => {
      if (code === 0) {
        const stats = fs.statSync(outputFile);
        console.log(`✅ リバーブ追加完了: ${path.basename(outputFile)} (${stats.size} bytes)`);
        resolve(outputFile);
      } else {
        reject(new Error(`SoX failed with code ${code}`));
      }
    });
    
    sox.on('error', (error) => {
      console.error('❌ SoXエラー:', error.message);
      reject(error);
    });
  });
}

// 4. 全体の統合テスト
async function runFullServiceTest() {
  console.log('🎙️ チャネリングサービス統合テスト開始');
  console.log('='.repeat(50));
  
  // テスト用の質問
  const userQuestion = "彼にはもう会えないのでしょうか？";
  console.log(`📝 テスト質問: "${userQuestion}"`);
  console.log('');
  
  try {
    // Step 1: 環境変数チェック
    console.log('🔧 環境変数チェック...');
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasGoogle = !!process.env.GOOGLE_CLOUD_API_KEY;
    console.log(`   OpenAI API Key: ${hasOpenAI ? '✅ 設定済み' : '❌ 未設定'}`);
    console.log(`   Google Cloud API Key: ${hasGoogle ? '✅ 設定済み' : '❌ 未設定'}`);
    
    if (!hasOpenAI || !hasGoogle) {
      throw new Error('必要なAPI Keyが設定されていません');
    }
    console.log('');
    
    // Step 2: スクリプト生成
    console.log('📋 Step 1: スクリプト生成');
    const script = await generateChannelingScript(userQuestion);
    console.log(`   ✅ スクリプト生成完了`);
    console.log(`   📖 テーマ: ${script.theme}`);
    console.log(`   📝 セッション数: ${script.sessions.length}`);
    console.log(`   🎯 手法1: ${script.sessions[0].method}`);
    console.log(`   🎯 手法2: ${script.sessions[1].method}`);
    console.log(`   🎯 手法3: ${script.sessions[2].method}`);
    console.log('');
    
    // Step 3: 音声生成（固定オープニング・トークン節約版）
    console.log('🎵 Step 2: 音声生成（固定オープニング）');
    const timestamp = Date.now();
    
    // 固定のオープニングテキスト（トークン節約）
    const fixedOpening = `いまから、あなたの魂の声と静かにつながる時間をひらきます。

言葉を超えたところに、光のようにそっと降りてくる感覚を、ただ、まっすぐに受け取ってください。

これは答えを探すための時間ではなく、あなた自身の内なる宇宙に、耳をすますための練習です。

目を閉じて、呼吸を深くしていきましょう。`;
    
    const openingFile = `test_opening_${timestamp}.mp3`;
    const openingPath = await generateTTSAudio(fixedOpening, openingFile);
    console.log('');
    
    // Step 4: リバーブ追加（冒頭）
    console.log('🏛️ Step 3: リバーブ追加（冒頭）');
    const reverbOpeningFile = `reverb_${openingFile}`;
    const reverbOpeningPath = await addReverbToAudio(openingPath, path.join('./test-audio', reverbOpeningFile));
    console.log('');
    
    // Step 5: セッション音声生成（重複チェック付き）
    console.log('🧘‍♀️ Step 4: セッション音声生成（1つ目）');
    let sessionText = script.sessions[0].script;
    
    // 「それでは、感じてみてください」が含まれていない場合のみ追加
    if (!sessionText.includes('それでは、感じてみてください') && !sessionText.includes('感じてみてください')) {
      sessionText += '\n\nそれでは、感じてみてください。';
      console.log('   💡 終了文を追加しました');
    } else {
      console.log('   ✅ 終了文は既に含まれています');
    }
    
    const sessionFile = `test_session1_${timestamp}.mp3`;
    const sessionPath = await generateTTSAudio(sessionText, sessionFile);
    console.log('');
    
    // Step 6: リバーブ追加（セッション）
    console.log('🏛️ Step 5: リバーブ追加（セッション）');
    const reverbSessionFile = `reverb_${sessionFile}`;
    const reverbSessionPath = await addReverbToAudio(sessionPath, path.join('./test-audio', reverbSessionFile));
    console.log('');
    
    // 完了報告
    console.log('🎉 統合テスト完了！');
    console.log('='.repeat(50));
    console.log('📁 生成されたファイル:');
    console.log(`   🎤 ${reverbOpeningFile} (冒頭部分・リバーブ付き)`);
    console.log(`   🧘‍♀️ ${reverbSessionFile} (セッション1・リバーブ付き)`);
    console.log('');
    console.log('🎧 音声ファイルを再生して品質を確認してください！');
    console.log('');
    console.log('💡 次のステップ:');
    console.log('   1. 音声品質の確認');
    console.log('   2. 全セッションの生成（必要に応じて）');
    console.log('   3. フロントエンドUIの実装');
    console.log('   4. セッション管理システムの統合');
    
  } catch (error) {
    console.error('❌ 統合テスト失敗:', error.message);
    console.log('');
    console.log('🔧 トラブルシューティング:');
    console.log('   1. .envファイルのAPI Key設定を確認');
    console.log('   2. インターネット接続を確認');
    console.log('   3. SoXがインストールされているか確認 (brew install sox)');
  }
}

// 実行
runFullServiceTest();