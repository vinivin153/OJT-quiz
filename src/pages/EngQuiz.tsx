import CheckAnswerButton from 'components/CheckAnswerButton';
import { ENG_QUIZ_LIST } from 'data/quiz';
import useEngCanvas from 'hooks/useEngCanvas';
import useQuizHandler from 'hooks/useQuizHandler';
import { useEffect } from 'react';
import useHeaderStore from 'store/useHeaderStore';
import useStepStore from 'store/useStepStore';

const EngQuiz = () => {
  const { step } = useStepStore((state) => state);
  const setTitle = useHeaderStore((state) => state.setTitle);
  const { handleCheckAnswer } = useQuizHandler();

  const question = ENG_QUIZ_LIST[step - 1].parts;
  const answer = ENG_QUIZ_LIST[step - 1].answer;
  const { canvasRef, getCurrentAnswer, resetAnswer } = useEngCanvas(question);

  useEffect(() => {
    setTitle('2교시 - 영어');
  }, [setTitle]);

  const handleCheckAnswerButtonClick = () => {
    handleCheckAnswer(getCurrentAnswer, answer, resetAnswer);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0 box-border">
      <canvas className="rounded-2xl" ref={canvasRef} />
      <CheckAnswerButton handleCheckAnswerButtonClick={handleCheckAnswerButtonClick} />
    </div>
  );
};

export default EngQuiz;
