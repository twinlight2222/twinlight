// src/pages/TopPage.tsx
import Logo from './components/Logo';
import WelcomeMessage from './components/WelcomeMessage';
import DiagnosisButton from './components/DiagnosisButton';
import ContactLink from './components/ContactLink'; 
import { Link } from 'react-router-dom';
import './TopPage.css';

export default function TopPage() {
  return (
  <div className="top-page-wrapper">
      {/* 光の背景 */}
      <div className="glow-background" />

      {/* 中央コンテンツ */}
      <div className="content">
        <Logo />
        <WelcomeMessage />
        <DiagnosisButton />
        <Link
          to="/menus"
          className="menu-link"
        >
          すべてのメニューを見る
        </Link>
        <ContactLink />
        </div>
      </div>
  );
}