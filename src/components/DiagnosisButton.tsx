import { useNavigate } from 'react-router-dom';

export default function DiagnosisButton() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/diagnosis');  // 診断ページへの遷移
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={handleClick}
        disabled={false}
        className="bg-[#ffffdd] opacity-80 hover:opacity-100 text-[#000099] px-6 py-3 rounded-xl text-base font-semibold hover:bg-yellow-200 transition hover:shadow-[0_0_12px_4px_#ffffdd] transition duration-300"
      >
        魂の診断をはじめる
      </button>
    </div>
  );
}

