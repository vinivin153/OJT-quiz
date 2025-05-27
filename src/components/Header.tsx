import { useNavigate } from 'react-router';
import useStepStore from 'store/useStepStore';

function Header() {
  const navigate = useNavigate();
  const title = useStepStore((state) => state.title);

  /** 사용자에게 나가기 확인을 받고, 확인 시 홈 페이지로 이동하는 함수 */
  const handleExitClick = () => {
    const isReallyExit = confirm('정말 나가시겠습니까?');

    if (isReallyExit) navigate('/');
  };

  return (
    <header className="flex items-center justify-between w-full h-20 bg-[#5773b5]">
      <div className="flex align-center justify-center w-40">남은시간(TODO)</div>
      <div className="flex grow-1 items-centers justify-center">
        <h1 className="text-3xl text-white" style={{ fontFamily: 'BMJUA' }}>
          {title}
        </h1>
      </div>
      <div className="flex w-40 align-center justify-center">
        <button onClick={handleExitClick}>나가기</button>
      </div>
    </header>
  );
}

export default Header;
