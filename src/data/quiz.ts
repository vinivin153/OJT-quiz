export const MATH_QUIZ_LIST = [
  {
    id: 1,
    question: '2 + 2 = ',
    answer: '4',
  },
  {
    id: 2,
    question: '23 - 11 = ',
    answer: '12',
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

// export const IDOL_QUIZ_LIST: IdolQuiz[] = [
//   {
//     id: 1,
//     front: ['장원영', '제니', '김나경', '나띠'],
//     back: ['아이브', '키스오브라이프', '블랙핑크', '트리플에스'],
//     answer: {
//       장원영: '아이브',
//       나띠: '키스오브라이프',
//       제니: '블랙핑크',
//       김나경: '트리플에스',
//     },
//   },
//   {
//     id: 2,
//     front: ['설윤', '김채원', '이채영', '채령'],
//     back: ['르세라핌', '엔믹스', '있지', '프로미스나인'],
//     answer: {
//       김채원: '르세라핌',
//       설윤: '엔믹스',
//       채령: '있지',
//       이채영: '프로미스나인',
//     },
//   },
//   {
//     id: 3,
//     front: ['츠키', '민주', '진', '카리나'],
//     back: ['에스파', '빌리', '아일릿', 'BTS'],
//     answer: {
//       카리나: '에스파',
//       츠키: '빌리',
//       민주: '아일릿',
//       진: 'BTS',
//     },
//   },
// ];

export const IDOL_QUIZ_LIST: IdolQuiz[] = [
  {
    id: 1,
    front: ['가는 날이', '식은 죽', '우물 안', '발 벗고'],
    back: ['개구리', '나선다', '장날이다', '먹기'],
    answer: {
      '가는 날이': '장날이다',
      '식은 죽': '먹기',
      '우물 안': '개구리',
      '발 벗고': '나선다',
    },
  },
  {
    id: 2,
    front: ['가볍다', '높다', '넓다', '빠르다'],
    back: ['좁다', '무겁다', '느리다', '낮다'],
    answer: {
      가볍다: '무겁다',
      높다: '낮다',
      넓다: '좁다',
      빠르다: '느리다',
    },
  },
  {
    id: 3,
    front: ['바라보다', '고치다', '달리다', '묻다'],
    back: ['쳐다보다', '달아나다', '수정하다', '질문하다'],
    answer: {
      바라보다: '쳐다보다',
      고치다: '수정하다',
      달리다: '달아나다',
      묻다: '질문하다',
    },
  },
];
