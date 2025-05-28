import { useNavigate } from 'react-router';
import useHeaderStore from 'store/useHeaderStore';
import LeftChance from './LeftChance';
import useStepStore from 'store/useStepStore';

function Header() {
  const navigate = useNavigate();
  const { title, resetLeftChance } = useHeaderStore((state) => state);
  const initStep = useStepStore((state) => state.initStep);

  /** 사용자에게 나가기 확인을 받고, 확인 시 홈 페이지로 이동하는 함수 */
  const handleExitClick = () => {
    const isReallyExit = confirm('정말 나가시겠습니까?');

    if (isReallyExit) {
      initStep();
      resetLeftChance();
      navigate('/');
    }
  };

  return (
    <header className="flex items-center justify-between w-full h-20 bg-[#5773b5] px-18">
      <div className="flex align-center justify-start">
        <LeftChance />
      </div>
      <div className="flex items-centers justify-center">
        <h1 className="text-3xl text-white" style={{ fontFamily: 'BMJUA' }}>
          {title}
        </h1>
      </div>
      <div className="flex w-40 align-center justify-end">
        <button
          onClick={handleExitClick}
          className="bg-white text-[#1a2a4a] rounded-xl px-4 py-2 text-xl! shadow hover:bg-gray-100 transition cursor-pointer"
          style={{ fontFamily: 'BMJUA' }}
          aria-label="나가기 버튼"
        >
          <div className="flex items-center justify-center gap-1">
            <span>나가기</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
