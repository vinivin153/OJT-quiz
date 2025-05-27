import CheckAnswerButton from 'components/CheckAnswerButton';
import { IDOL_QUIZ_LIST } from 'data/quiz';
import useIdolCanvas from 'hooks/useIdolCanvas';
import useStepStore from 'store/useStepStore';

function IdolQuiz() {
  const { step, nextStep } = useStepStore((state) => state);
  const question = IDOL_QUIZ_LIST[step - 1];
  const answers = IDOL_QUIZ_LIST[step - 1].answer;

  const { canvasRef, getCurrentAnswers, resetAnswer } = useIdolCanvas(question.front, question.back);

  const handleCheckAnswerButtonClick = () => {
    const currentAnswers = getCurrentAnswers();
    const isCorrectAnswer = Object.entries(currentAnswers).every(([key, value]) => answers[key] === value);

    if (isCorrectAnswer) {
      alert('정답입니다!');
      nextStep();
      return;
    }

    alert('오답입니다! 다시 시도해보세요.');
    resetAnswer();
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0 box-border">
      <canvas className="rounded-2xl" ref={canvasRef} />
      <CheckAnswerButton handleCheckAnswerButtonClick={handleCheckAnswerButtonClick} />
    </div>
  );
}

export default IdolQuiz;
