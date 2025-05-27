import CheckAnswerButton from 'components/CheckAnswerButton';
import { IDOL_QUIZ_LIST } from 'data/quiz';
import useIdolCanvas from 'hooks/useIdolCanvas';
import useModalStore from 'store/useModalStore';
import useStepStore from 'store/useStepStore';

function IdolQuiz() {
  const { step, nextStep } = useStepStore((state) => state);
  const question = IDOL_QUIZ_LIST[step - 1];
  const answers = IDOL_QUIZ_LIST[step - 1].answer;

  const { canvasRef, getCurrentAnswers, resetAnswer } = useIdolCanvas(question.front, question.back);
  const openModal = useModalStore((state) => state.openModal);

  const handleCheckAnswerButtonClick = () => {
    const currentAnswers = getCurrentAnswers();
    const isCorrectAnswer = Object.entries(answers).every(([key, value]) => currentAnswers[key] === value);

    if (isCorrectAnswer) {
      openModal('correct');
      setTimeout(() => {
        nextStep();
      }, 2000);
      return;
    }

    openModal('incorrect');
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
