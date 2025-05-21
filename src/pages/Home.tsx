import SubjectButton from 'components/SubjectButton';

function Home() {
  const SUBJECTS = ['수학', '영어', '아이돌'] as const;

  return (
    <div className="w-screen h-screen flex flex-col items-centers bg-[url('assets/images/background.svg')] bg-cover bg-center">
      <header className="flex items-center justify-center m-14 mb-0">
        <span className="text-9xl text-gray-800 tracking-wide" style={{ fontFamily: 'BMJUA' }}>
          모의고사
        </span>
      </header>

      <div className="flex flex-col gap-12 m-auto">
        {SUBJECTS.map((subject, idx) => (
          <SubjectButton key={subject} text={`${idx + 1}교시 ${subject}`}></SubjectButton>
        ))}
      </div>
    </div>
  );
}

export default Home;
