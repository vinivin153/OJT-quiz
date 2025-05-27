import CheckAnswerButton from 'components/CheckAnswerButton';
import { MATH_QUIZ_LIST } from 'data/quiz';
import useMathCanvas from 'hooks/useMathCanvas';
import { useEffect } from 'react';
import useModalStore from 'store/useModalStore';
import useStepStore from 'store/useStepStore';

function MathQuiz() {
  const { step, nextStep, setTitle } = useStepStore((state) => state);
  const question = MATH_QUIZ_LIST[step - 1].question;
  const answer = MATH_QUIZ_LIST[step - 1].answer;
  const { canvasRef, resetAnswer, getCurrentAnswer } = useMathCanvas(question);
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    setTitle('1교시 - 수학');
  }, []);

  /** 정답확인 버튼을 클릭했을 때 정답인 경우 다음 단계로 넘어가고, 오답인 경우 다시 시도하라는 알림을 띄움 */
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
}

export default MathQuiz;
