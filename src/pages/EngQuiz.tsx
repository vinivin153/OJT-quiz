import CheckAnswerButton from 'components/CheckAnswerButton';
import { ENG_QUIZ_LIST } from 'data/quiz';
import useEngCanvas from 'hooks/useEngCanvas';
import useStepStore from 'store/useStepStore';

const EngQuiz = () => {
  const { step, nextStep } = useStepStore((state) => state);
  const question = ENG_QUIZ_LIST[step - 1].parts;
  const answer = ENG_QUIZ_LIST[step - 1].answer;
  const { canvasRef, getCurrentAnswer, resetAnswer } = useEngCanvas(question);

  const handleCheckAnswerButtonClick = () => {
    const currentAnswer = getCurrentAnswer();
    const isCorrectAnswer = currentAnswer === answer;

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
};

export default EngQuiz;
