import correctImage from 'assets/Images/correct.png';
import inCorrectImage from 'assets/Images/incorrect.png';
import gameOverImage from 'assets/Images/gameover.png';

export const TOTAL_STEPS = 3;
export const TOTAL_CHANCES = 3;

export const SUBJECTS = ['수학', '영어', '아이돌'] as const;
export const MATH_TITLE = '1교시 - 수학';
export const ENGLISH_TITLE = '2교시 - 영어';
export const IDOL_TITLE = '3교시 - 아이돌';

export const INIT_ANSWER = '';
export const MODAL_IMAGE_URL = {
  correct: correctImage,
  incorrect: inCorrectImage,
  gameOver: gameOverImage,
} as const;
