import { INIT_ANSWER } from 'constants/constant';
import { Canvas, FabricText, Group, Point, Rect } from 'fabric';
import { useEffect, useRef } from 'react';

const useCanvas = (question: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const questionRef = useRef<FabricText>(null);
  const answerRef = useRef<FabricText>(null);

  // canvas 초기화
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    createCanvas();
    initializeCanvasElements();

    return () => {
      const canvas = fabricCanvasRef.current;
      if (canvas) {
        canvas.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  // 문제가 변경될 때 업데이트
  useEffect(() => {
    updateQuestion(question);
    resetAnswer();
  }, [question]);

  /** canvas 생성 함수 */
  const createCanvas = () => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const canvas = new Canvas(currentCanvas, {
      width: window.innerWidth - 120,
      height: window.innerHeight - 260,
    });
    canvas.backgroundColor = '#f3f3f3';

    fabricCanvasRef.current = canvas;
  };

  /** canvas 생성 후 질문과 정답 텍스트, 숫자버튼을 초기화하는 함수 */
  const initializeCanvasElements = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // 질문 텍스트 생성
    const questionText = createQuestionText(canvas);
    canvas.add(questionText);

    // 정답 텍스트 생성
    const answerText = createAnswerText(canvas);
    canvas.add(answerText);

    // 숫자 버튼들 생성
    for (let i = -5; i < 5; i++) {
      const buttonPos = {
        left: canvas.getWidth() / 2 + i * 110,
        top: (canvas.getHeight() / 10) * 7,
      };

      const box = createNumberButton(i + 5, buttonPos, canvas);
      canvas.add(box);
    }

    canvas.requestRenderAll();
  };

  /** 질문 텍스트 생성 함수 */
  const createQuestionText = (canvas: Canvas) => {
    const questionText = new FabricText('', {
      fontSize: 62,
      textAlign: 'center',
      fill: '#000',
      fontFamily: 'BMJUA',
      selectable: false,
      hoverCursor: 'null',
    });
    const questionPos = new Point(canvas.getWidth() / 2 + 50, canvas.getHeight() / 5);
    questionText.setPositionByOrigin(questionPos, 'right', 'center');
    questionRef.current = questionText;

    return questionText;
  };

  /** 정답 텍스트 생성 함수 */
  const createAnswerText = (canvas: Canvas) => {
    const answerText = new FabricText('', {
      fontSize: 62,
      textAlign: 'center',
      fill: '#00a',
      fontFamily: 'BMJUA',
      fontWeight: 600,
      selectable: false,
      hoverCursor: 'null',
    });
    const answerPos = new Point(canvas.getWidth() / 2 + 50, canvas.getHeight() / 5);
    answerText.setPositionByOrigin(answerPos, 'left', 'center');
    answerRef.current = answerText;

    return answerText;
  };

  /** 숫자 버튼 생성 함수 */
  const createNumberButton = (number: number, options: { left: number; top: number }, canvas: Canvas) => {
    const width = 100;
    const height = 100;

    // 박스 생성
    const rect = new Rect({
      width,
      height,
      fill: '#e0e0e0',
      stroke: '#000',
      strokeWidth: 2,
      rx: 10,
      ry: 10,
    });

    // 숫자 텍스트 생성
    const text = new FabricText(number.toString(), {
      fontSize: 40,
      textAlign: 'center',
      fill: '#000',
      fontFamily: 'BMJUA',
    });
    const textPos = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2);
    text.setPositionByOrigin(textPos, 'center', 'center');

    // 박스와 숫자 텍스트를 그룹화
    const group = new Group([rect, text], {
      ...options,
      evented: true,
      selectable: false,
      hoverCursor: 'pointer',
    });

    // 그룹에 클릭 이벤트 추가
    group.on('mousedown', () => {
      // 클릭한 숫자에 따라 정답 텍스트 업데이트
      if (answerRef.current) {
        const currentText = answerRef.current.text;
        const isInitial = currentText === INIT_ANSWER;
        const newText = isInitial ? number.toString() : currentText + number.toString();

        answerRef.current.set({ text: newText });
        canvas.requestRenderAll();
      }
    });

    return group;
  };

  /** 질문 텍스트 업데이트 함수 */
  const updateQuestion = (newQuestion: string) => {
    const canvas = fabricCanvasRef.current;
    const question = questionRef.current;

    if (!canvas || !question) return;

    question.set({ text: newQuestion });
    const questionPos = new Point(canvas.getWidth() / 2 + 50, canvas.getHeight() / 5);
    question.setPositionByOrigin(questionPos, 'right', 'center');
    canvas.requestRenderAll();
  };

  /** 정답 텍스트 초기화 함수 */
  const resetAnswer = () => {
    const canvas = fabricCanvasRef.current;
    const answer = answerRef.current;
    if (!canvas || !answer) return;

    answer.set({ text: INIT_ANSWER });
    canvas.requestRenderAll();
  };

  /** 현재 정답 텍스트 가져오기 */
  const getCurrentAnswer = (): string => {
    return answerRef.current?.text || INIT_ANSWER;
  };

  return {
    canvasRef,
    resetAnswer,
    getCurrentAnswer,
  };
};

export default useCanvas;
