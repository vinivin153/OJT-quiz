import { useNavigate } from 'react-router';

type SubjectButtonProps = {
  text: string;
};

// TODO: 접근성 고려해서 aria-label 추가하기
function SubjectButton({ text }: SubjectButtonProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    let path = null;

    if (text.match('수학')) path = '/quiz/math';
    else if (text.match('영어')) path = '/quiz/english';
    else if (text.match('아이돌')) path = '/quiz/idol';

    if (!path) {
      alert('해당 과목은 아직 준비 중입니다.');
      return;
    }

    navigate(path);
  };

  return (
    <button
      className="flex justify-center w-md fit border-6 border-gray-800 rounded-full p-4 bg-[#fccf8d] shadow-lg cursor-pointer transition-all duration-150 ease-in-out hover:-translate-y-1 hover:shadow-xl active:shadow-inner active:scale-95"
      onClick={handleButtonClick}
    >
      <span className="text-5xl text-gray-800" style={{ fontFamily: 'BMJUA' }}>
        {text}
      </span>
    </button>
  );
}

export default SubjectButton;
