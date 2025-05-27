export const MATH_QUIZ_LIST = [
  {
    id: 1,
    question: '2 + 2 = ',
    answer: '4',
  },
  {
    id: 2,
    question: '43 - 19 = ',
    answer: '24',
  },
  {
    id: 3,
    question: '13 * 3 = ',
    answer: '39',
  },
];

export const ENG_QUIZ_LIST = [
  {
    id: 1,
    parts: ['have', 'i', 'a pen'],
    answer: 'i have a pen',
  },
  {
    id: 2,
    parts: ['friend', 'she', 'my', 'is'],
    answer: 'she is my friend',
  },
  {
    id: 3,
    parts: ['eat', 'i', 'chicken', 'want to'],
    answer: 'i want to eat chicken',
  },
];

type IdolQuiz = {
  id: number;
  front: string[];
  back: string[];
  answer: Record<string, string>;
};

export const IDOL_QUIZ_LIST: IdolQuiz[] = [
  {
    id: 1,
    front: ['장원영', '제니', '김나경', '나띠'],
    back: ['아이브', '키스오브라이프', '블랙핑크', '트리플에스'],
    answer: {
      장원영: '아이브',
      나띠: '키스오브라이프',
      제니: '블랙핑크',
      김나경: '트리플에스',
    },
  },
  {
    id: 2,
    front: ['설윤', '김채원', '이채영', '채령'],
    back: ['르세라핌', '엔믹스', '있지', '프로미스나인'],
    answer: {
      김채원: '르세라핌',
      설윤: '엔믹스',
      채령: '있지',
      이채영: '프로미스나인',
    },
  },
  {
    id: 3,
    front: ['츠키', '민주', '진', '카리나'],
    back: ['에스파', '빌리', '아일릿', 'BTS'],
    answer: {
      카리나: '에스파',
      츠키: '빌리',
      민주: '아일릿',
      진: 'BTS',
    },
  },
];
