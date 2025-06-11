import { useState, useEffect, useRef } from "react";

export default function Chat24h() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const botResponses = [
    "……静かに聞いている",
    "それは　大切な想い",
    "言葉にしてくれて　ありがとう",
    "ただ　そばに在る",
    "今　そのままで　大丈夫",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-screen bg-[#000099] text-[#ffffdd] font-[Klee_One] flex flex-col overflow-hidden">
      {/* タイトル */}
      <h1 className="text-xl text-center mt-4 mb-2">２４時間寄り添いの間</h1>

      {/* チャット履歴 */}
      <div className="flex-1 w-full overflow-y-auto px-2">
        <div className="flex flex-col gap-2 w-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`text-sm max-w-[90%] px-2 py-1 rounded-lg ${
                msg.sender === "user"
                  ? "self-end bg-[#ffffdd]/80 text-[#000099]"
                  : "self-start bg-[#ffffdd]/20 text-[#ffffdd]"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 入力エリア */}
      <div className="w-full px-2 py-2 bg-[#000099]">
        <div className="flex items-start gap-2 w-full max-w-full">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
            }
            placeholder="ことばを預ける…"
            rows={2}
            className="flex-grow h-20 resize-none px-2 py-1 text-[#000099] bg-[#ffffdd]/90 rounded-none outline-none"
          />
          <button
            onClick={handleSend}
            className="min-w-[60px] h-12 mt-1 bg-[#ffffdd]/70 text-[#000099] hover:shadow-[0_0_60px_30px_#ffffff] transition-all p-0"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
