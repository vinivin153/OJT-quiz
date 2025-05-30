import correctImage from 'assets/Images/correct.webp';
import inCorrectImage from 'assets/Images/incorrect.webp';
import gameOverImage from 'assets/Images/gameover.webp';
import gameClearImage from 'assets/Images/gameclear.webp';

export const TOTAL_STEPS = 3;
export const FINAL_STEP = TOTAL_STEPS;
export const TOTAL_CHANCES = 3;
export const FINAL_CHANCE = 1;

export const MATH = '수학';
export const ENG = '영어';
export const IDOL = '국어';

export const MATH_TITLE = '1교시 - 수학';
export const ENG_TITLE = '2교시 - 영어';
export const IDOL_TITLE = '3교시 - 국어';

export const SUBJECTS = Object.freeze([MATH, ENG, IDOL] as const);

export const INIT_ANSWER = '';
export const MODAL_IMAGE_URL = Object.freeze({
  correct: correctImage,
  incorrect: inCorrectImage,
  gameOver: gameOverImage,
  gameClear: gameClearImage,
} as const);
export const QUESTION_TEXT = Object.freeze({
  MATH: '다음 문제를 풀어보세요',
  ENG: '다음 단어를 올바른 순서로 배열하세요',
  // IDOL: '멤버와 소속그룹을 알맞게 연결하세요',
  IDOL: '연관된 단어를 올바르게 연결하세요',
} as const);

export const MODAL_TYPES = Object.freeze({
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  GAME_OVER: 'gameOver',
  GAME_CLEAR: 'gameClear',
} as const);

export const MODAL_MESSAGES = Object.freeze({
  CORRECT: '정답입니다!',
  INCORRECT: '오답입니다!',
  GAME_OVER: '게임 오버!',
  GAME_CLEAR: '게임 클리어!',
} as const);

export const MODAL_CLOSE_DELAY = 2000;

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
