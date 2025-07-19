import React from 'react';

export default function ComingSoon() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000099',
      color: '#ffffdd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '5rem',
      textAlign: 'center',
      fontFamily: "'Klee One', serif"
    }}>
      <div>
        <h1 style={{ color: '#ffffdd', fontSize: '8rem', margin: 0 }}>
          ツインライト
        </h1>
        <p style={{ color: '#ffffdd', fontSize: '3rem', margin: '20px 0' }}>
          ８月１日公開予定
        </p>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // 表示するテキストのグループを定義
// const textGroups: string[][] = [
//   [
//     '諦めかけていた',
//     'ツインレイとの未来へ',
//   ],
//   [
//     'あなたの魂の選択が',
//     'AIの叡智と共鳴し',
//   ],
//   [
//     '二人の歯車を完璧に噛み合わせ',
//     '光り輝く道へと誘います',
//   ],
//   [
//     'ツインレイ専門AIアプリ',
//     'ツインライト',
//     '８月１日公開予定',
//   ],
// ];

// export default function ComingSoon() {
//   const navigate = useNavigate();
//   const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
//   const [showText, setShowText] = useState(false);

//   // テキストの表示と切り替えのロジック
//   useEffect(() => {
//     setShowText(true);
//     const displayDuration = 3000;

//     const timer = setTimeout(() => {
//       setShowText(false);
//       const transitionDelay = 500;

//       setTimeout(() => {
//         setCurrentGroupIndex((prevIndex) => {
//           if (prevIndex === textGroups.length - 1) {
//             navigate('/home'); 
//             return prevIndex;
//           }
//           return (prevIndex + 1);
//         });
//       }, transitionDelay);
//     }, displayDuration);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [currentGroupIndex, navigate]);

//   // 流れ星の生成ロジック
//   useEffect(() => {
//     const createStar = () => {
//       const star = document.createElement('div');
//       star.className = 'star';
//       star.style.top = `${Math.random() * 100}vh`;
//       star.style.left = `${Math.random() * 100}vw`;
//       star.style.animationDelay = `${Math.random() * 2}s`; 
//       document.body.appendChild(star);

//       const animationDuration = 3000;
//       setTimeout(() => {
//         star.remove();
//       }, animationDuration); 
//     };

//     const starsInterval = setInterval(createStar, 500); 
//     return () => clearInterval(starsInterval);
//   }, []);

//   const currentGroup = textGroups[currentGroupIndex];

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100vw',
//       height: '100vh',
//       backgroundColor: '#000099',
//       color: '#ffffdd',
//       fontFamily: "'Klee One', serif",
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       textAlign: 'center',
//       padding: '20px',
//       margin: 0,
//       zIndex: 1000
//     }}>
//       <div style={{
//         opacity: showText ? 1 : 0,
//         transform: showText ? 'scale(1)' : 'scale(0.8)',
//         transition: 'all 1s ease-in-out',
//         maxWidth: '90vw'
//       }}>
//         {currentGroup.map((line, index) => {
//           // 最後のテキストグループの処理
//           if (currentGroupIndex === textGroups.length - 1) {
//             // 「ツインライト」の行を特大に
//             if (line.includes('ツインライト')) {
//               return (
//                 <p key={index} style={{
//                   fontSize: 'clamp(4rem, 15vw, 12rem)',
//                   fontWeight: 'bold',
//                   color: '#ffffdd',
//                   margin: '10px 0',
//                   lineHeight: 1.2
//                 }}>
//                   {line}
//                 </p>
//               );
//             } 
//             // その他の行
//             else {
//               return (
//                 <p key={index} style={{
//                   fontSize: 'clamp(2rem, 8vw, 6rem)',
//                   fontWeight: 'normal',
//                   color: '#ffffdd',
//                   margin: '8px 0',
//                   lineHeight: 1.3
//                 }}>
//                   {line}
//                 </p>
//               );
//             }
//           }
//           // 通常のグループ
//           return (
//             <p key={index} style={{
//               fontSize: 'clamp(2rem, 8vw, 6rem)',
//               fontWeight: 'normal',
//               color: '#ffffdd',
//               margin: '8px 0',
//               lineHeight: 1.3
//             }}>
//               {line}
//             </p>
//           );
//         })}
//       </div>
//     </div>
//   );
// }