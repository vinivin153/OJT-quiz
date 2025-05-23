type CheckAnswerButtonProps = {
  handleCheckAnswerButtonClick: () => void;
};

function CheckAnswerButton({ handleCheckAnswerButtonClick }: CheckAnswerButtonProps) {
  return (
    <div className="fixed right-20 top-30">
      <button
        onClick={handleCheckAnswerButtonClick}
        className="rounded-2xl bg-yellow-300 back p-4 cursor-pointer text-2xl! transition-all duration-200 hover:scale-105 shadow-lg"
        style={{ fontFamily: 'BMJUA' }}
      >
        정답확인
      </button>
    </div>
  );
}

export default CheckAnswerButton;
