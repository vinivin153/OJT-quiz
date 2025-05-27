import CheckAnswerButton from 'components/CheckAnswerButton';
import { ENG_QUIZ_LIST } from 'data/quiz';
import useEngCanvas from 'hooks/useEngCanvas';
import { useEffect } from 'react';
import useModalStore from 'store/useModalStore';
import useStepStore from 'store/useStepStore';

const EngQuiz = () => {
  const { step, nextStep, setTitle } = useStepStore((state) => state);
  const question = ENG_QUIZ_LIST[step - 1].parts;
  const answer = ENG_QUIZ_LIST[step - 1].answer;
  const { canvasRef, getCurrentAnswer, resetAnswer } = useEngCanvas(question);
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    setTitle('2교시 - 영어');
  }, []);

  const handleCheckAnswerButtonClick = () => {
    const currentAnswer = getCurrentAnswer();
    const isCorrectAnswer = currentAnswer === answer;

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
};

export default EngQuiz;
