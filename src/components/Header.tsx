import { useNavigate } from 'react-router';
import useHeaderStore from 'store/useHeaderStore';
import LeftChance from './LeftChance';

function Header() {
  const navigate = useNavigate();
  const title = useHeaderStore((state) => state.title);

  /** 사용자에게 나가기 확인을 받고, 확인 시 홈 페이지로 이동하는 함수 */
  const handleExitClick = () => {
    const isReallyExit = confirm('정말 나가시겠습니까?');

    if (isReallyExit) navigate('/');
  };

  return (
    <header className="flex items-center justify-between w-full h-20 bg-[#5773b5] px-14">
      <div className="flex grow-1 align-center justify-center">
        <LeftChance />
      </div>
      <div className="flex grow-8 items-centers justify-center">
        <h1 className="text-3xl text-white" style={{ fontFamily: 'BMJUA' }}>
          {title}
        </h1>
      </div>
      <div className="flex grow-1 w-40 align-center justify-center">
        <button onClick={handleExitClick}>나가기</button>
      </div>
    </header>
  );
}

export default Header;
