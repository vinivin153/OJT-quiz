import useHeaderStore from 'store/useHeaderStore';
import useModalStore from 'store/useModalStore';
import useStepStore from 'store/useStepStore';

const useQuizHandler = () => {
  const { nextStep, step } = useStepStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);
  const { leftChance, decreaseLeftChance } = useHeaderStore((state) => state);

  const handleCheckAnswer = (
    getCurrentAnswer: () => any,
    answer: any,
    resetAnswer: () => void,
    isAnswerCorrect?: (currentAnswer: any, answer: any) => boolean
  ): void => {
    const currentAnswer = getCurrentAnswer();
    const isCorrectAnswer = isAnswerCorrect ? isAnswerCorrect(currentAnswer, answer) : currentAnswer === answer;

    if (isCorrectAnswer) {
      openModal('correct', '정답입니다!');
      setTimeout(() => {
        nextStep();

        if (step === 3) {
          openModal('gameClear', '게임 클리어!');
        }
      }, 2000);
      return;
    }

    openModal('incorrect', '오답입니다!');
    decreaseLeftChance();
    resetAnswer();

    if (leftChance === 1) {
      openModal('gameOver', '게임 오버!');
      return;
    }
  };

  return { handleCheckAnswer };
};

export default useQuizHandler;
