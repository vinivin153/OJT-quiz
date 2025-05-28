import { Canvas, FabricText, Group, Line, Point, Rect, Shadow } from 'fabric';
import { useEffect, useRef } from 'react';

const useEngCanvas = (parts: string[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas>(null);
  const answerRef = useRef<Group[]>(null);

  // canvas 초기화
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    createCanvas();
    initializeCanvasElements();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    resetAnswer();
  }, [parts]);

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

  /** 문제와 보기 박스, 단어들을 초기화하는 함수 */
  const initializeCanvasElements = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // 문제 설명 텍스트 생성
    const questionTest = createQuestionText(canvas);

    // 정답 라인 생성
    const answerLine = createAnswerLine(canvas);

    // 보기 박스 생성
    const partsBox = createPartsBox(canvas);

    // 단어 박스와 텍스트 그룹 생성
    const WordParts = createWordParts(canvas);

    // 캔버스에 추가
    canvas.add(questionTest, answerLine, partsBox);
    WordParts.forEach((part) => {
      canvas.add(part);
    });

    // 캔버스에 추가된 요소 렌더링
    canvas.requestRenderAll();
  };

  /** 문제 설명을 생성하는 함수 */
  const createQuestionText = (canvas: Canvas) => {
    const questionText = new FabricText('다음 단어를 올바른 순서로 배열하세요', {
      fontSize: 28,
      fill: '#374151',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'BMJUA',
      selectable: false,
      top: canvas.getHeight() * 0.1,
      left: canvas.getWidth() / 2,
    });
    questionText.setPositionByOrigin(new Point(canvas.getWidth() / 2, canvas.getHeight() * 0.1), 'center', 'center');

    return questionText;
  };

  /** 정답 라인 생성하는 함수 */
  const createAnswerLine = (canvas: Canvas) => {
    const x1 = canvas.getWidth() * 0.1;
    const x2 = canvas.getWidth() * 0.9;
    const y = canvas.getHeight() * 0.4;

    const answerLine = new Line([x1, y, x2, y], {
      stroke: '#60a5fa',
      strokeWidth: 3,
      selectable: false,
      evented: false,
    });

    return answerLine;
  };

  /** 보기 박스 생성하는 함수 */
  const createPartsBox = (canvas: Canvas) => {
    const partsBox = new Rect({
      width: canvas.getWidth() * 0.8,
      height: canvas.getHeight() * 0.2,
      fill: '#fff7ed',
      stroke: '#fb923c',
      strokeWidth: 2,
      strokeDashArray: [8, 4],
      rx: 20,
      ry: 20,
      selectable: false,
      evented: false,
    });
    const partsBoxPos = new Point(canvas.getWidth() / 2, (canvas.getHeight() / 10) * 7);
    partsBox.setPositionByOrigin(partsBoxPos, 'center', 'center');

    return partsBox;
  };

  /** 단어 박스와 텍스트를 그룹으로 묶어 생성하는 함수 */
  const createWordPart = (part: string, pos: { left: number; top: number }) => {
    // 단어 박스 생성
    const wordRect = new Rect({
      width: part.length * 30 + 20,
      height: 40,
      fill: '#ffffff',
      stroke: '#374151',
      strokeWidth: 2,
      rx: 10,
      ry: 10,
      shadow: new Shadow({
        color: 'rgba(0,0,0,0.3)',
        offsetX: 3,
        offsetY: 3,
        blur: 5,
      }),
    });

    // 단어 텍스트 생성
    const wordText = new FabricText(part, {
      fontSize: 24,
      fill: '#374151',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'BMJUA',
    });
    const wordTextPos = new Point(wordRect.left + wordRect.width / 2, wordRect.top + wordRect.height / 2);
    wordText.setPositionByOrigin(wordTextPos, 'center', 'center');

    // 단어 박스와 텍스트를 그룹으로 묶기
    const wordBox = new Group([wordRect, wordText], {
      ...pos,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      hoverCursor: 'pointer',
      moveCursor: '',
      borderColor: '#3b82f6',
      cornerColor: '#3b82f6',
    });
    wordBox.set({
      text: part,
    });

    wordBox.on('modified', () => handleDropAndAlign(wordBox));

    return wordBox;
  };

  /** 단어 박스와 텍스트를 묶은 그룹들을 생성하는 함수 */
  const createWordParts = (canvas: Canvas) => {
    const totalWidth = parts.reduce((acc, part) => acc + part.length * 30 + 40, 0);
    let posX = canvas.getWidth() / 2 - totalWidth / 2;
    const posY = (canvas.getHeight() / 10) * 7 - 20;

    const WordParts = parts.map((part) => {
      const partWidth = part.length * 30 + 20;
      const wordPart = createWordPart(part, {
        left: posX,
        top: posY,
      });
      posX += partWidth + 40;

      return wordPart;
    });

    return WordParts;
  };

  /** 단어 박스 드래그 앤 드롭 후 정렬 함수 */
  const handleDropAndAlign = (droppedGroup: Group) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const lineY = canvas.getHeight() * 0.4;
    const threshold = 100;

    // 드래그한 그룹이 정답 라인 근처인지 확인
    const isNearLine = Math.abs(droppedGroup.top - lineY + 60) < threshold;

    if (!isNearLine) return;

    // 정답 라인 근처에 있는 모든 그룹 필터링
    const wordGroups = canvas
      .getObjects()
      .filter((obj) => obj instanceof Group && Math.abs((obj.top ?? 0) - lineY) < threshold) as Group[];

    // X좌표 기준 정렬
    wordGroups.sort((a, b) => (a.left ?? 0) - (b.left ?? 0));

    // 정답 라인 시작점
    let currentX = canvas.getWidth() * 0.1 + 10;

    // 정렬된 그룹의 위치 업데이트
    wordGroups.forEach((group) => {
      group.set({
        left: currentX,
        top: lineY - 50,
      });
      currentX += group.width + 20;
    });
    answerRef.current = wordGroups;

    canvas.requestRenderAll();
  };

  /** 단어들 위치 초기화 하는 함수 */
  const resetAnswer = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // 기존 단어 박스 제거
    canvas.getObjects().forEach((obj) => {
      if (obj instanceof Group) {
        canvas.remove(obj);
      }
    });

    // 새로운 단어 박스 생성
    const wordParts = createWordParts(canvas);
    wordParts.forEach((part) => canvas.add(part));

    canvas.requestRenderAll();
  };

  /** 현재 정답을 반환하는 함수 */
  const getCurrentAnswer = () => {
    const answer = answerRef.current?.reduce((answerString, group) => {
      const wordText = group.get('text');
      answerString += wordText ? `${wordText} ` : '';
      return answerString;
    }, '');

    return answer?.trim() || '';
  };

  return { canvasRef, getCurrentAnswer, resetAnswer };
};

export default useEngCanvas;
