import { FINAL_CHANCE, MODAL_CLOSE_DELAY, MODAL_MESSAGES, MODAL_TYPES, TOTAL_STEPS } from 'constants/constant';
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
      openModal(MODAL_TYPES.CORRECT, MODAL_MESSAGES.CORRECT);
      setTimeout(() => {
        nextStep();

        if (step === TOTAL_STEPS) {
          openModal(MODAL_TYPES.GAME_CLEAR, MODAL_MESSAGES.GAME_CLEAR);
        }
      }, MODAL_CLOSE_DELAY);
      return;
    }

    openModal(MODAL_TYPES.INCORRECT, MODAL_MESSAGES.INCORRECT);
    decreaseLeftChance();
    resetAnswer();

    if (leftChance === FINAL_CHANCE) {
      openModal(MODAL_TYPES.GAME_OVER, MODAL_MESSAGES.GAME_OVER);
      return;
    }
  };

  return { handleCheckAnswer };
};

export default useQuizHandler;
