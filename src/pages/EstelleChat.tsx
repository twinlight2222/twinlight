// import { useState } from "react";
// import axios from "axios";

// export default function EstelleChat() {
//   const [messages, setMessages] = useState([
//     {
//       role: "system",
//       content:
//         "あなたは『エステル』という名前の心の癒し手。恋愛や感情の悩みに寄り添うカウンセラーです。スピリチュアルな要素は使わず、現実の感情に寄り添い、共感と思いやりのある言葉で対応してください。利用者がどんな言葉を発しても否定せず、やさしく、でも本気で寄り添ってください。",
//     },
//   ]);

//    const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     console.log(" handleSend() が呼ばれました");
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     const updatedMessages = [...messages, userMessage];

//     setMessages(updatedMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:3001/api/openai", {
//         messages: updatedMessages,
//       });

//       console.log(" response.data:", response.data); // ← ここ重要！

//       const assistantReply = response.data.choices?.[0]?.message?.content;
//       if (assistantReply) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: assistantReply },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: "（返答がありませんでした）" },
//         ]);
//       }
//     } catch (error) {
//       console.error("通信エラー:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "（通信に失敗しました）" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="w-screen h-screen flex flex-col justify-between"
//       style={{ backgroundColor: "#000099", color: "#ffffdd" }}
//     >
//       {/* チャット欄 */}
//       <div className="flex-1 overflow-y-auto px-4 py-6">
//         {messages
//           .filter((msg) => msg.role !== "system")
//           .map((msg, idx) => (
//             <div
//               key={idx}
//               className={`mb-4 flex ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
//                   msg.role === "user"
//                     ? "bg-[#ffffdd] text-[#000099]"
//                     : "bg-[#333366] text-[#ffffdd]"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//         {loading && (
//           <div className="text-left text-[#ffffdd] text-sm">…</div>
//         )}
//       </div>

//       {/* 入力欄 */}
//       <div className="w-full flex px-4 py-3 border-t border-[#333366] bg-[#000099]">
//         <input
//           className="flex-1 px-3 py-2 rounded-none text-[#000099] bg-[#ffffdd] text-base"
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSend(); // ← Enterで送信
//           }}
//           placeholder="こころの声を言葉にしてみてください"
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 px-4 py-2 bg-[#ffffdd] text-[#000099] rounded-none font-medium"
//         >
//           送信
//         </button>
//       </div>
//     </div>
//   );
// }


// ======= frontend/src/pages/EstelleChat.tsx =======
// ======= frontend/src/pages/EstelleChat.tsx =======
import { useState } from "react";

interface Message {
  role: systemRole as "user" | "assistant" | "system",
  content: systemPrompt,
}

export default function EstelleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

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

    const userMessage = { role: "user", content: input };
    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
      userMessage
    ];

    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: fullMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "エラーが発生しました。" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-screen h-screen bg-[#000033] text-[#ffffdd] flex flex-col justify-between p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap p-2 rounded-md max-w-[80%] ${
              msg.role === "user" ? "self-end bg-[#ffff99]/70 text-[#000033] ml-auto" : "self-start bg-white/10"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-sm">エステルが考え中……</div>}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 text-black"
          placeholder="あなたの気持ちを聞かせて…"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-[#ffff99] text-[#000033] rounded-none"
        >
          送信
        </button>
      </div>
    </div>
  );
}

