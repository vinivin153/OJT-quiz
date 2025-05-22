import { useNavigate } from 'react-router';

type SubjectButtonProps = {
  text: string;
};

// TODO: 접근성 고려해서 aria-label 추가하기
function SubjectButton({ text }: SubjectButtonProps) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // TODO: 과목별 이동할 페이지 구현 후 연결
    if (text.match('수학')) navigate('/quiz/math');
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
