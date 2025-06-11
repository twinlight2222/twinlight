





//デモに向けて固定バージョンロジック出来たら戻すこと
//テストのためコメントアウト16:40
// export default function Result() {
//   const navigate = useNavigate();

import { useNavigate } from "react-router-dom";
export default function Result() {
  const navigate = useNavigate();

  const menus = [
    "誰にも言えない相談",
    "過去世リーディングセッション",
    "自己対話セッション",
    "魂の設計図を読むセッション",
    "今生のテーマを知るリーディング",
  ];

  return (
    <div
      style={{
        backgroundColor: "#000099",
        color: "#ffffdd",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        fontFamily: "'Klee One', sans-serif",
      }}
    >
      {/* ラベル */}
      <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        現在の魂の状態は
      </p>

      {/* タイプ名 */}
      <h2 style={{ color: "#FF6600", fontSize: "1.75rem", marginBottom: "1rem" }}>
        消失型
      </h2>

      {/* 導きの見出し */}
      <h1 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
        あなたに今必要な導き
      </h1>

      {/* メニューボタン群 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {menus.map((menu, index) => (
          <button
            key={index}
            onClick={() => {
              if (menu === "誰にも言えない相談") {
                navigate("/estelle");
              }
            }}
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "#000099",
              fontSize: "1rem",
              fontWeight: 500,
              border: "none",
              borderRadius: "0px",
              textAlign: "center",
              whiteSpace: "normal",
              lineHeight: "1.4",
              padding: "6px 0",
              margin: "0",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 0 60px 30px #ffffff";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.boxShadow = "0 0 60px 30px #ffffff";
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {menu}
          </button>
        ))}
      </div>
    </div>
  );
}

//       <p className="text-[#ffffdd] text-sm tracking-wide mb-2">
//         現在の魂の状態は
//       </p>

//       {/* タイプ名：〇〇型（→ オレンジ色 #FF6600 に修正） */}
//       <h2 className="text-[#FF6600] text-2xl sm:text-3xl font-bold mb-6">
//         消失型
//       </h2>

//       {/* 導きの見出し（h1） */}
//       <h1 className="text-[#ffffdd] text-xl sm:text-2xl font-bold mb-6">
//         あなたに今必要な導き
//       </h1>

//       {/* メニューのボタン群 */}
//       <div className="flex flex-col items-center w-full gap-2">
//         {menus.map((menu, index) => (
//           <button
//             key={index}
//             className="w-4/5 h-12 bg-[#ffffdd]/70 text-[#000099] text-base font-medium p-0 rounded-none border-none outline-none transition-all duration-300 hover:shadow-[0_0_60px_30px_#ffffff] focus:outline-none active:shadow-none"
//             onClick={() => {
//               // メニューごとの遷移は後で設定
//               if (menu === "２４時間寄り添いの間") {
//                 navigate("/support");
//               }
//             }}
//           >
//             {menu}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }




// src/pages/Result.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// type SoulType = "消失型" | "投影型" | "自罰型" | "抜け殻型" | "希望恐怖型" | "混乱型";

// const menuMap: Record<SoulType, string[]> = {
//   消失型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "自己対話セッション"],
//   投影型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "自己対話セッション"],
//   自罰型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "自己対話セッション"],
//   抜け殻型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "境界線を取り戻すエネルギーワーク"],
//   希望恐怖型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "今生のテーマを知るリーディング"],
//   混乱型: ["24時間寄り添いの間", "祈りの泉", "インナーチャイルドの癒しセッション", "過去世リーディングセッション", "毎日相談、月額"],
// };

// export default function Result() {
//   const [soulType, setSoulType] = useState<SoulType | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const result = localStorage.getItem("diagnosisResult") as SoulType | null;
//     if (result && menuMap[result]) {
//       setSoulType(result);
//     } else {

//       navigate("/"); // 結果が無ければトップへ戻す
//     }
//   }, [navigate]);

//  return (
//     <div className="min-h-screen bg-[#000099] flex flex-col items-center justify-start text-[#ffffdd] px-0 py-10">
//       {/* メイン見出し（h1と同サイズに揃える） */}
//       <h2 className="text-lg font-semibold mb-4 tracking-wide">あなたに今必要な導き</h2>

//       {/* 説明文と結果 */}
//       <p className="text-lg text-center mb-2">現在の魂の状態は</p>
//       <p className="text-4xl font-bold text-center mb-6" style={{ color: "#ff6600" }}>
//         {soulType}
//       </p>
//           <ul className="flex flex-col gap-3 w-full max-w-md">
//             {menuMap[soulType].map((menu, index) => (
//               <li
//                 key={index}
//                 className="bg-[#ffffdd]/80 text-[#000099] text-center py-3 px-4 rounded-md shadow hover:shadow-[0_0_30px_15px_#ffffff] transition-all duration-300"
//               >
//                 {menu}
//               </li>
//             ))}
//           </ul>
//     </div>
//   );
// }

