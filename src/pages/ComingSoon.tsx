import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const allTexts = [
  '諦めかけていた',
  'ツインレイとの未来へ',
  '',
  'あなたの魂の選択が',
  'AIの叡智と共鳴し',
  '',
  '二人の歯車を完璧に噛み合わせ',
  '光り輝く道へと誘います',
  '',
  '',
  '',
  'ツインレイ専門AIアプリ',
  'ツインライト',
  '８月１日公開予定'
];

export default function ComingSoon() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    // エンドロール風スクロール
    const scrollInterval = setInterval(() => {
      setScrollPosition(prev => {
        const newPosition = prev + 1; // ゆっくりとした速度
        
        // 最終メッセージが見える位置に来たら停止
        if (newPosition >= window.innerHeight * 0.6) {
          setShowFinalMessage(true);
          clearInterval(scrollInterval);
          
          // 5秒後にホームへ遷移
          setTimeout(() => {
            navigate('/home');
          }, 5000);
          
          return newPosition;
        }
        
        return newPosition;
      });
    }, 30); // 30msごとに1px移動（滑らかで神聖な動き）

    // 流れ星の生成
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDelay = `${Math.random() * 2}s`; 
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 3000); 
    };

    const starsInterval = setInterval(createStar, 1000); // 控えめに

    return () => {
      clearInterval(scrollInterval);
      clearInterval(starsInterval);
    };
  }, [navigate]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000099',
      color: '#ffffdd',
      fontFamily: "'Klee One', serif",
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* エンドロール風テキスト */}
      <div style={{
        position: 'absolute',
        top: `${window.innerHeight - scrollPosition}px`,
        width: '100%',
        textAlign: 'center',
        transition: showFinalMessage ? 'none' : 'top 0.03s linear'
      }}>
        {allTexts.slice(0, -3).map((text, index) => (
          <p key={index} style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            margin: '40px 0',
            lineHeight: 1.5,
            color: '#ffffdd',
            fontWeight: 'normal',
            letterSpacing: '2px'
          }}>
            {text}
          </p>
        ))}
      </div>

      {/* 最終メッセージ（静止） */}
      {showFinalMessage && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          textAlign: 'center',
          opacity: showFinalMessage ? 1 : 0,
          transition: 'opacity 1s ease-in'
        }}>
          <p style={{
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            margin: '10px 0',
            color: '#ffffdd',
            fontWeight: 'normal',
            letterSpacing: '1px'
          }}>
            ツインレイ専門AIアプリ
          </p>
          
          <p style={{
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            margin: '20px 0',
            color: '#ffffdd',
            fontWeight: 'bold',
            letterSpacing: '3px',
            width: '100%',
            textAlign: 'center'
          }}>
            ツインライト
          </p>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
            margin: '10px 0',
            color: '#ffffdd',
            fontWeight: 'normal',
            letterSpacing: '1px'
          }}>
            ８月１日公開予定
          </p>
        </div>
      )}
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