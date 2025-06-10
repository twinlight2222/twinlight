import React, { useState } from "react";
import { useEffect } from "react";

// チャットの発言内容を保持するインターフェース
interface Message {
  sender: "ルミエルbot" | "ユーザー";
  name: string;
  text: string;
}

const Chat = () => {
  // ユーザーとボットの発言内容を管理する状態
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "あなた");
  const [partnerName, setPartnerName] = useState(localStorage.getItem("partnerName") || "お相手");

  // ユーザーのメッセージを送信した際の処理
  const handleUserMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userMessage.trim()) {
      const newMessages = [
        ...messages,
        { sender: "ユーザー", name: userName, text: userMessage }
      ];
      setMessages(newMessages);
      setUserMessage("");

      // ルミエルbotの返答を模倣（簡単な例）
      setTimeout(() => {
        const botReply = { sender: "ルミエルbot", name: "ルミエル", text: "お話を聞いています..." };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container" style={{ backgroundColor: "#000099", color: "#ffffdd", fontFamily: "Klee One" }}>
      <div className="messages-container" style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }}>
        {/* 発言のリスト表示 */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "ユーザー" ? "user-message" : "bot-message"}`}
            style={{
              display: "flex",
              justifyContent: message.sender === "ユーザー" ? "flex-end" : "flex-start",
              marginBottom: "15px"
            }}
          >
            <div
              className="message-content"
              style={{
                maxWidth: "65%",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: message.sender === "ユーザー" ? "#ffffdd" : "#333333",
                color: message.sender === "ユーザー" ? "#000099" : "#ffffdd",
                wordWrap: "break-word"
              }}
            >
              <div
                className="sender-name"
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: message.sender === "ユーザー" ? "#000099" : "#ffffdd",
                  fontSize: "0.9rem"
                }}
              >
                {message.name}
              </div>
              <div className="message-text" style={{ fontSize: "1rem" }}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ユーザーがメッセージを入力するためのテキストボックス */}
      <div className="input-container" style={{ padding: "10px", position: "fixed", bottom: "0", width: "100%" }}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleUserMessage}
          placeholder="メッセージを入力..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            fontSize: "1rem",
            outline: "none",
            color: "#000099",
            backgroundColor: "#ffffdd",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
