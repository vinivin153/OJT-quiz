import { INIT_ANSWER } from 'constants/constant';
import { Canvas, Circle, FabricImage, FabricText, Group, Point, Rect, Shadow } from 'fabric';
import { useEffect, useRef } from 'react';
import questionMark from 'assets/images/question_mark.json';
import Lottie, { type AnimationItem } from 'lottie-web';
import { COLORS } from 'constants/constant';

const useCanvas = (question: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const questionRef = useRef<FabricText>(null);
  const answerRef = useRef<FabricText>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<FabricImage>(null);
  const lottieAnimationRef = useRef<AnimationItem>(null);
  const intervalRef = useRef<number>(null);

  // canvas 초기화
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    createCanvas();
    initializeCanvasElements();

    return () => {
      // 정리 작업
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (lottieAnimationRef.current) {
        lottieAnimationRef.current.destroy();
      }

      const canvas = fabricCanvasRef.current;
      if (canvas) {
        canvas.dispose();
        fabricCanvasRef.current = null;
      }

      if (lottieContainerRef.current) {
        document.body.removeChild(lottieContainerRef.current);
        lottieContainerRef.current = null;
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
    canvas.backgroundColor = COLORS.background;

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

    createLottieAnimationImage(canvas);

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
      fill: '#1e1e1e',
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

  /** 숫자 시각적 객체 렌더링 함수 */
  const renderNumberVisuals = (question: string, canvas: Canvas) => {
    const match = question.match(/(\d+)\s*[\+\-\×\*\/]\s*(\d+)/);
    if (!match) return;

    const [, num1Str, num2Str] = match;
    const num1 = parseInt(num1Str, 10);
    const num2 = parseInt(num2Str, 10);

    const baseX = canvas.getWidth() / 2;
    const baseY = canvas.getHeight() / 3 + 50;

    const radius = 10;
    const spacing = 8;
    const maxPerRow = 10;
    const rowHeight = radius * 2 + spacing;
    const padding = 10;

    // 기존 시각적 객체 제거
    const existing = canvas.getObjects('group').filter((obj) => (obj as any).data === 'number-visual');
    existing.forEach((obj) => canvas.remove(obj));

    const createBubbleGroup = (count: number, fill: string, bgFill: string, left: number, top: number): Group => {
      const circles: Circle[] = [];

      let maxCol = Math.min(count, maxPerRow);
      let rowCount = Math.ceil(count / maxPerRow);

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / maxPerRow);
        const col = i % maxPerRow;

        const circle = new Circle({
          radius,
          fill,
          left: col * (radius * 2 + spacing),
          top: row * rowHeight,
          originX: 'left',
          originY: 'top',
        });

        circles.push(circle);
      }

      const groupWidth = maxCol * (radius * 2 + spacing) - spacing;
      const groupHeight = rowCount * rowHeight;

      const background = new Rect({
        width: groupWidth + padding * 2,
        height: groupHeight + padding * 2,
        rx: 16,
        ry: 16,
        fill: bgFill,
        stroke: '#d1d5db',
        strokeWidth: 1,
        originX: 'left',
        originY: 'top',
        left: -padding,
        top: -padding - 4,
      });

      const group = new Group([background, ...circles], {
        left,
        top,
        selectable: false,
        evented: false,
      }) as Group & { data?: string };

      group.data = 'number-visual';
      return group;
    };

    const group1 = createBubbleGroup(num1, '#f87171', '#fef2f2', baseX - 200, baseY);
    group1.setPositionByOrigin(new Point(baseX - 200, baseY), 'center', 'center');
    const group2 = createBubbleGroup(num2, '#60a5fa', '#eff6ff', baseX + 50, baseY);
    group2.setPositionByOrigin(new Point(baseX + 200, baseY), 'center', 'center');

    canvas.add(group1, group2);
    canvas.requestRenderAll();
  };

  /** 기존 Lottie 애니메이션 정리 함수 */
  const cleanupLottieAnimation = () => {
    // interval 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Lottie 애니메이션 정리
    if (lottieAnimationRef.current) {
      lottieAnimationRef.current.destroy();
      lottieAnimationRef.current = null;
    }

    // Canvas에서 이미지 제거
    const canvas = fabricCanvasRef.current;
    if (canvas && lottieRef.current && canvas.contains(lottieRef.current)) {
      canvas.remove(lottieRef.current);
    }

    lottieRef.current = null;
  };

  /** 정답 애니메이션 (Lottie) 이미지 생성 함수 */
  const createLottieAnimationImage = (canvas: Canvas) => {
    // 기존 애니메이션 정리
    cleanupLottieAnimation();

    // DOM 컨테이너 생성 또는 재사용
    if (!lottieContainerRef.current) {
      const container = document.createElement('div');
      container.style.width = '60px';
      container.style.height = '60px';
      container.style.position = 'fixed';
      container.style.visibility = 'hidden';
      document.body.appendChild(container);
      lottieContainerRef.current = container;
    }

    const container = lottieContainerRef.current;
    // 컨테이너 내용 초기화
    container.innerHTML = '';

    const anim = Lottie.loadAnimation({
      container,
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: questionMark,
    });

    lottieAnimationRef.current = anim;

    anim.addEventListener('DOMLoaded', () => {
      const lottieCanvas = container.querySelector('canvas') as HTMLCanvasElement;
      if (!lottieCanvas) return;

      const image = new FabricImage(lottieCanvas, {
        width: lottieCanvas.width,
        height: lottieCanvas.height,
        selectable: false,
        hasControls: false,
        evented: false,
      });
      lottieRef.current = image;

      // 정답 텍스트 위치와 동일하게 설정
      const pos = new Point(canvas.getWidth() / 2 + 50, canvas.getHeight() / 5);
      image.setPositionByOrigin(pos, 'left', 'center');

      canvas.add(image);

      // Lottie 애니메이션이 fabric에서 계속 업데이트되도록 설정
      intervalRef.current = setInterval(() => {
        if (canvas.contains(image)) {
          canvas.requestRenderAll();
        }
      }, 30);
    });
  };

  /** 숫자 버튼 생성 함수 */
  const createNumberButton = (number: number, options: { left: number; top: number }, canvas: Canvas) => {
    const width = 100;
    const height = 100;

    // 박스 생성
    const shadow = new Shadow({
      color: '#ccc',
      blur: 10,
      offsetX: 2,
      offsetY: 2,
    });

    const rect = new Rect({
      width,
      height,
      fill: '#fff',
      stroke: '#ccc',
      strokeWidth: 1,
      rx: 20,
      ry: 20,
      shadow,
    });

    // 숫자 텍스트 생성
    const text = new FabricText(number.toString(), {
      fontSize: 36,
      textAlign: 'center',
      fill: '#333',
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
      const answer = answerRef.current;
      if (!answer) return;

      const isInitial = answer.text === INIT_ANSWER;
      const newText = isInitial ? number.toString() : (answer.text || '') + number.toString();

      answer.set({ text: newText });

      // 첫 번째 숫자 입력 시 Lottie 애니메이션 완전히 제거
      if (isInitial) {
        cleanupLottieAnimation();
      }

      canvas.requestRenderAll();
    });

    // hover 효과 추가
    group.on('mouseover', () => {
      rect.set('fill', '#f0f0f0');
      canvas.requestRenderAll();
    });
    group.on('mouseout', () => {
      rect.set('fill', '#ffffff');
      canvas.requestRenderAll();
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
    renderNumberVisuals(newQuestion, canvas);
    canvas.requestRenderAll();
  };

  /** 정답 텍스트 초기화 함수 */
  const resetAnswer = () => {
    const canvas = fabricCanvasRef.current;
    const answer = answerRef.current;
    if (!canvas || !answer) return;

    answer.set({ text: INIT_ANSWER });

    // 항상 새로운 Lottie 애니메이션 생성
    createLottieAnimationImage(canvas);
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
