import correctImage from 'assets/Images/correct.webp';
import inCorrectImage from 'assets/Images/incorrect.webp';
import gameOverImage from 'assets/Images/gameover.webp';
import gameClearImage from 'assets/Images/gameclear.webp';

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
  gameClear: gameClearImage,
} as const;

export const COLORS = {
  background: '#f9f9fb',
  border: '#94a3b8', // slate-400
  frontFill: '#fef9ff', // subtle pastel pink
  backFill: '#f0f9ff', // subtle pastel blue
  selectedFrontFill: '#fbcfe8', // rose-200
  selectedBackFill: '#bae6fd', // sky-200
  text: '#1e293b', // slate-800
  line: '#3b82f6', // blue-500
  shadow: {
    color: 'rgba(0, 0, 0, 0.15)',
    offsetX: 3,
    offsetY: 3,
    blur: 5,
  },
};
