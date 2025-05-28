import CheckAnswerButton from 'components/CheckAnswerButton';
import { IDOL_QUIZ_LIST } from 'data/quiz';
import useIdolCanvas from 'hooks/useIdolCanvas';
import useQuizHandler from 'hooks/useQuizHandler';
import { useEffect } from 'react';
import useHeaderStore from 'store/useHeaderStore';
import useStepStore from 'store/useStepStore';

function IdolQuiz() {
  const { step } = useStepStore((state) => state);
  const setTitle = useHeaderStore((state) => state.setTitle);
  const { handleCheckAnswer } = useQuizHandler();

  const question = IDOL_QUIZ_LIST[step - 1];
  const answers = IDOL_QUIZ_LIST[step - 1].answer;

  const { canvasRef, getCurrentAnswers, resetAnswer } = useIdolCanvas(question.front, question.back);

  useEffect(() => {
    setTitle('3교시 - 아이돌');
  }, [setTitle]);

  const handleCheckAnswerButtonClick = () => {
    const isAnswerCorrect = (currentAnswers: Record<string, string>, answers: Record<string, string>) => {
      return Object.entries(answers).every(([key, value]) => currentAnswers[key] === value);
    };

    handleCheckAnswer(getCurrentAnswers, answers, resetAnswer, isAnswerCorrect);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0 box-border">
      <canvas className="rounded-2xl" ref={canvasRef} />
      <CheckAnswerButton handleCheckAnswerButtonClick={handleCheckAnswerButtonClick} />
    </div>
  );
}

export default IdolQuiz;
