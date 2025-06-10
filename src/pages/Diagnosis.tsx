// 


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// type SoulType =
//   | "消失型"
//   | "投影型"
//   | "自罰型"
//   | "抜け殻型"
//   | "希望恐怖型"
//   | "混乱型";

// interface Option {
//   text: string;
//   value: SoulType;
// }

// interface Question {
//   question: string;
//   options: Option[];
// }

// const questions: Question[] = [
//   {
//     question: "最後にかけてほしかった言葉は？",
//     options: [
//       { text: "「また会おう」", value: "消失型" },
//       { text: "「悪かったよ」", value: "投影型" },
//       { text: "「ごめんね…」", value: "自罰型" },
//       { text: "「さようなら」", value: "抜け殻型" },
//       { text: "「信じていいよ」", value: "希望恐怖型" },
//       { text: "「間違いだったの？」", value: "混乱型" },
//     ],
//   },
//   {
//     question: "眠れない夜に浮かぶものは？",
//     options: [
//       { text: "届かないLINE", value: "消失型" },
//       { text: "責める言葉", value: "投影型" },
//       { text: "過去の後悔", value: "自罰型" },
//       { text: "無音の時間", value: "抜け殻型" },
//       { text: "笑顔の残像", value: "希望恐怖型" },
//       { text: "ツインの定義", value: "混乱型" },
//     ],
//   },
//   {
//     question: "心に焼きついた最後の姿は？",
//     options: [
//       { text: "背を向けた背中", value: "消失型" },
//       { text: "怒った顔", value: "投影型" },
//       { text: "泣かせた自分", value: "自罰型" },
//       { text: "無表情な横顔", value: "抜け殻型" },
//       { text: "微笑んだままの目", value: "希望恐怖型" },
//       { text: "夢だった気もする", value: "混乱型" },
//     ],
//   },
//   {
//     question: "戻れないと思った理由は？",
//     options: [
//       { text: "連絡が途絶えた", value: "消失型" },
//       { text: "許せない言葉", value: "投影型" },
//       { text: "自分が壊れた気がする", value: "自罰型" },
//       { text: "感情が動かない", value: "抜け殻型" },
//       { text: "傷つくのが怖い", value: "希望恐怖型" },
//       { text: "正しさが分からない", value: "混乱型" },
//     ],
//   },
//   {
//     question: "「愛してた」とはどういうこと？",
//     options: [
//       { text: "消えた人を想うこと", value: "消失型" },
//       { text: "恨んでしまうこと", value: "投影型" },
//       { text: "自分を責めること", value: "自罰型" },
//       { text: "何も感じなくなること", value: "抜け殻型" },
//       { text: "まだ信じたいこと", value: "希望恐怖型" },
//       { text: "答えを探し続けること", value: "混乱型" },
//     ],
//   },
//   {
//     question: "何度も繰り返してしまうことは？",
//     options: [
//       { text: "既読の確認", value: "消失型" },
//       { text: "言葉の再生", value: "投影型" },
//       { text: "自己反省", value: "自罰型" },
//       { text: "ぼんやりする時間", value: "抜け殻型" },
//       { text: "占いの検索", value: "希望恐怖型" },
//       { text: "ツインの調べもの", value: "混乱型" },
//     ],
//   },
//   {
//     question: "今のあなたに一番近い言葉は？",
//     options: [
//       { text: "待ちぼうけ", value: "消失型" },
//       { text: "被害者意識", value: "投影型" },
//       { text: "自己否定", value: "自罰型" },
//       { text: "抜け殻のよう", value: "抜け殻型" },
//       { text: "信じたいけど怖い", value: "希望恐怖型" },
//       { text: "情報に溺れてる", value: "混乱型" },
//     ],
//   },
// ];

// export default function Diagnosis() {
//   const [currentQ, setCurrentQ] = useState(0);
//   const navigate = useNavigate();

//   const handleAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.currentTarget.blur();
//   const buttons = document.querySelectorAll("button"); // この部分を追加
//     buttons.forEach((button) => {
//       button.classList.remove("active"); // active状態をリセット
//       button.classList.remove("focus");  // focus状態をリセット
//     }); 
//     setTimeout(() => {
//       if (currentQ < questions.length - 1) {
//         setCurrentQ((prev) => prev + 1);
//       } else {
//         navigate("/result");
//       }
//     }, 500);
//   };

//   const current = questions[currentQ];

//   return (
//     <div className="p-0 m-0 w-screen bg-[#000099] flex flex-col items-center justify-center px-0 py-4">
//       {/* 設問の中央揃え */}
//       <div className="w-full flex justify-center">
//         <h1 className="text-center text-[#ffffdd] text-xl sm:text-2xl md:text-3xl mb-6 leading-snug tracking-tight w-full max-w-[90%] mx-auto">
//           {current.question}
//         </h1>
//       </div>

//       {/* ボタン群 */}
//       <div className="flex flex-col items-center w-full gap-1.5">
//         {current.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={handleAnswer}
//             className="w-4/5 h-10 bg-[#ffffdd]/70 text-[#000099] text-base font-medium
//                        p-0 rounded-none border-none outline-none
//                        transition-all duration-300
//                        hover:shadow-[0_0_60px_30px_#ffffff]
//                        focus:outline-none active:shadow-none"
//           >
//             {option.text}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type SoulType =
  | "消失型"
  | "投影型"
  | "自罰型"
  | "抜け殻型"
  | "希望恐怖型"
  | "混乱型";

interface Option {
  text: string;
  value: SoulType;
}

interface Question {
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    question: "最後にかけてほしかった言葉は？",
    options: [
      { text: "「また会おう」", value: "消失型" },
      { text: "「悪かったよ」", value: "投影型" },
      { text: "「ごめんね…」", value: "自罰型" },
      { text: "「さようなら」", value: "抜け殻型" },
      { text: "「信じていいよ」", value: "希望恐怖型" },
      { text: "「間違いだったの？」", value: "混乱型" },
    ],
  },
  {
    question: "眠れない夜に浮かぶものは？",
    options: [
      { text: "届かないLINE", value: "消失型" },
      { text: "責める言葉", value: "投影型" },
      { text: "過去の後悔", value: "自罰型" },
      { text: "無音の時間", value: "抜け殻型" },
      { text: "笑顔の残像", value: "希望恐怖型" },
      { text: "ツインの定義", value: "混乱型" },
    ],
  },
  {
    question: "心に焼きついた最後の姿は？",
    options: [
      { text: "背を向けた背中", value: "消失型" },
      { text: "怒った顔", value: "投影型" },
      { text: "泣かせた自分", value: "自罰型" },
      { text: "無表情な横顔", value: "抜け殻型" },
      { text: "微笑んだままの目", value: "希望恐怖型" },
      { text: "夢だった気もする", value: "混乱型" },
    ],
  },
  {
    question: "戻れないと思った理由は？",
    options: [
      { text: "連絡が途絶えた", value: "消失型" },
      { text: "許せない言葉", value: "投影型" },
      { text: "自分が壊れた気がする", value: "自罰型" },
      { text: "感情が動かない", value: "抜け殻型" },
      { text: "傷つくのが怖い", value: "希望恐怖型" },
      { text: "正しさが分からない", value: "混乱型" },
    ],
  },
  {
    question: "「愛してた」とはどういうこと？",
    options: [
      { text: "消えた人を想うこと", value: "消失型" },
      { text: "恨んでしまうこと", value: "投影型" },
      { text: "自分を責めること", value: "自罰型" },
      { text: "何も感じなくなること", value: "抜け殻型" },
      { text: "まだ信じたいこと", value: "希望恐怖型" },
      { text: "答えを探し続けること", value: "混乱型" },
    ],
  },
  {
    question: "何度も繰り返してしまうことは？",
    options: [
      { text: "既読の確認", value: "消失型" },
      { text: "言葉の再生", value: "投影型" },
      { text: "自己反省", value: "自罰型" },
      { text: "ぼんやりする時間", value: "抜け殻型" },
      { text: "占いの検索", value: "希望恐怖型" },
      { text: "ツインの調べもの", value: "混乱型" },
    ],
  },
  {
    question: "今のあなたに一番近い言葉は？",
    options: [
      { text: "待ちぼうけ", value: "消失型" },
      { text: "被害者意識", value: "投影型" },
      { text: "自己否定", value: "自罰型" },
      { text: "抜け殻のよう", value: "抜け殻型" },
      { text: "信じたいけど怖い", value: "希望恐怖型" },
      { text: "情報に溺れてる", value: "混乱型" },
    ],
  },
];

export default function Diagnosis() {
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    // 0.5秒後に次の質問または結果ページに遷移
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        navigate("/result");
      }
    }, 500); // 0.5秒遅延
  };

  useEffect(() => {
    // 画面遷移後にフォーカスを解除する処理
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // ボタンのホバー・アクティブ状態をリセット
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active", "focus");
      button.style.boxShadow = "none"; // ホバーエフェクトのリセット
    });
  }, [currentQ]);

  const current = questions[currentQ];

  console.log(current.question);  // 現在の質問内容をコンソールに出力して確認


  return (
    <div className="p-0 m-0 w-screen bg-[#000099] flex flex-col items-center justify-center px-0 py-4 h-screen">
      {/* 設問の中央揃え */}
      <div className="w-full flex justify-center mb-6">
        <h1 className="text-center text-[#ffffdd] text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight w-full max-w-[90%] mx-auto">
          {current.question}
        </h1>
      </div>

      {/* ボタン群 */}
      <div className="flex flex-col items-center w-full gap-3">
        {current.options.map((option, index) => (
          <button
            key={index}
            onClick={handleAnswer}
            className="w-4/5 h-12 bg-[#ffffdd]/70 text-[#000099] text-base font-medium p-0 rounded-none border-none outline-none transition-all duration-300 hover:shadow-[0_0_60px_30px_#ffffff] focus:outline-none active:shadow-none"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}


