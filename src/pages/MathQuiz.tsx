import CheckAnswerButton from 'components/CheckAnswerButton';
import { MATH_TITLE } from 'constants/constant';
import { MATH_QUIZ_LIST } from 'data/quiz';
import useMathCanvas from 'hooks/useMathCanvas';
import useQuizHandler from 'hooks/useQuizHandler';
import { useEffect } from 'react';
import useHeaderStore from 'store/useHeaderStore';
import useStepStore from 'store/useStepStore';

function MathQuiz() {
  const { step } = useStepStore((state) => state);
  const setTitle = useHeaderStore((state) => state.setTitle);
  const { handleCheckAnswer } = useQuizHandler();

  const question = MATH_QUIZ_LIST[step - 1].question;
  const answer = MATH_QUIZ_LIST[step - 1].answer;
  const { canvasRef, resetAnswer, getCurrentAnswer } = useMathCanvas(question);

  useEffect(() => {
    setTitle(MATH_TITLE);
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
}

export default MathQuiz;
