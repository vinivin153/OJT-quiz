import { Canvas, FabricText, Group, Line, Point, Rect, Shadow } from 'fabric';
import { useEffect, useRef } from 'react';

const useIdolCanvas = (frontWords: string[], backWords: string[], step: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas>(null);
  const selectedFrontBox = useRef<Group | null>(null);
  const currentLine = useRef<Line | null>(null);
  const connectionsRef = useRef<Map<string, { line: Line; frontBox: Group; backBox: Group; text: string }>>(new Map());

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    createCanvas();
    initializeCanvasElements();
    setupCanvasEvents();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    resetQuiz();
    resetAnswer();
  }, [step]);

  /** canvas 생성 함수 */
  const createCanvas = () => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const canvas = new Canvas(currentCanvas, {
      width: window.innerWidth - 120,
      height: window.innerHeight - 260,
      selection: false,
    });
    canvas.backgroundColor = '#f3f3f3';

    fabricCanvasRef.current = canvas;
  };

  /** 캔버스 이벤트 설정 */
  const setupCanvasEvents = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.on('mouse:move', (e) => {
      if (!currentLine.current || !selectedFrontBox.current) return;

      const pointer = canvas.getScenePoint(e.e);
      currentLine.current.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      canvas.requestRenderAll();
    });

    canvas.on('mouse:up', (e) => {
      if (!currentLine.current) return;

      const target = e.target;
      if (!target || !target.get('role') || target.get('role') !== 'back') {
        canvas.remove(currentLine.current);
        canvas.requestRenderAll();
        resetDragState();
      }
    });
  };

  const initializeCanvasElements = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const questionText = createQuestionText(canvas);
    const frontWordBoxes = createWordBoxes(canvas, frontWords, true);
    const backWordBoxes = createWordBoxes(canvas, backWords, false);

    canvas.add(questionText);
    frontWordBoxes.forEach((box) => canvas.add(box));
    backWordBoxes.forEach((box) => canvas.add(box));

    canvas.requestRenderAll();
  };

  /** 문제 설명을 생성하는 함수 */
  const createQuestionText = (canvas: Canvas) => {
    const questionText = new FabricText('멤버와 소속그룹을 알맞게 연결하세요', {
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

  /** 기존 연결 제거 함수 */
  const removeExistingConnection = (frontWord: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const connections = connectionsRef.current;
    const connection = connections.get(frontWord);

    if (connection) {
      // 라인 제거
      canvas.remove(connection.line);

      // 박스 색상 초기화
      connection.frontBox.item(0).set('fill', '#ffffff');
      connection.backBox.item(0).set('fill', '#ffffff');

      // 연결 정보 제거
      connections.delete(frontWord);
    }

    canvas.requestRenderAll();
  };

  /** 단어 박스 생성 함수 */
  const createWordBox = (canvas: Canvas, word: string, pos: { left: number; top: number }, isFront: boolean) => {
    const wordRect = new Rect({
      width: 200,
      height: 60,
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

    const wordText = new FabricText(word, {
      fontSize: 24,
      fill: '#374151',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'BMJUA',
    });
    const wordTextPos = new Point(wordRect.left + wordRect.width / 2, wordRect.top + wordRect.height / 2);
    wordText.setPositionByOrigin(wordTextPos, 'center', 'center');

    const wordBox = new Group([wordRect, wordText], {
      ...pos,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hoverCursor: 'pointer',
    });
    wordBox.set({
      text: word,
      role: isFront ? 'front' : 'back',
    });

    if (isFront) {
      wordBox.on('mousedown', (e) => {
        selectedFrontBox.current = wordBox;

        // 기존 연결이 있다면 제거
        if (connectionsRef.current.has(word)) {
          removeExistingConnection(word);
        }

        // 새로운 라인 생성
        const startPoint = getBoxStartPoint(wordBox);
        const pointer = canvas.getScenePoint(e.e);

        const line = new Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
          stroke: '#3b82f6',
          strokeWidth: 3,
          selectable: false,
          evented: false,
        });

        currentLine.current = line;
        canvas.add(line);
        canvas.requestRenderAll();
      });
    } else {
      wordBox.on('mouseup', (e) => {
        if (!selectedFrontBox.current || !currentLine.current) return;

        e.e.stopPropagation();

        // 연결 완성
        const endPoint = getBoxEndPoint(wordBox);
        currentLine.current.set({
          x2: endPoint.x,
          y2: endPoint.y,
        });

        const connectionKey = selectedFrontBox.current.get('text');
        const connections = connectionsRef.current;

        // 이미 이 back box와 연결된 다른 front box가 있다면 제거
        for (const [key, value] of connections) {
          if (value.text === word) {
            removeExistingConnection(key);
            break;
          }
        }

        // 새로운 연결 추가
        connections.set(connectionKey, {
          line: currentLine.current,
          frontBox: selectedFrontBox.current,
          backBox: wordBox,
          text: word,
        });

        // 박스 색상 변경
        selectedFrontBox.current.item(0).set('fill', '#ffdcfb');
        wordBox.item(0).set('fill', '#e0f2fe');

        canvas.requestRenderAll();
        resetDragState();
      });
    }

    return wordBox;
  };

  /** 단어 박스들을 생성하는 함수 */
  const createWordBoxes = (canvas: Canvas, words: string[], isFront: boolean) => {
    const posX = isFront ? canvas.getWidth() / 3 - 200 : (canvas.getWidth() * 2) / 3;

    return words.map((word, index) => {
      const pos = {
        left: posX,
        top: canvas.getHeight() * 0.2 + index * 110,
      };

      return createWordBox(canvas, word, pos, isFront);
    });
  };

  /** 박스의 시작점을 구하는 함수 */
  const getBoxStartPoint = (box: Group): Point => {
    const bounds = box.getBoundingRect();
    return new Point(bounds.left + bounds.width, bounds.top + bounds.height / 2);
  };

  /** 박스의 끝점을 구하는 함수 */
  const getBoxEndPoint = (box: Group): Point => {
    const bounds = box.getBoundingRect();
    return new Point(bounds.left, bounds.top + bounds.height / 2);
  };

  /** 드래그 상태 초기화 */
  const resetDragState = () => {
    selectedFrontBox.current = null;
    currentLine.current = null;
  };

  /** 현재 연결된 답안들을 반환하는 함수 */
  const getCurrentAnswers = () => {
    const answers: Record<string, string> = {};
    for (const [key, value] of connectionsRef.current) {
      answers[key] = value.text;
    }
    return answers;
  };

  /** 문제 초기화 */
  const resetQuiz = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (obj instanceof Group) {
        canvas.remove(obj);
      }
    });

    const frontWordBoxes = createWordBoxes(canvas, frontWords, true);
    const backWordBoxes = createWordBoxes(canvas, backWords, false);
    canvas.add(...frontWordBoxes, ...backWordBoxes);
  };

  /** 정답 초기화 */
  const resetAnswer = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // 모든 라인 제거
    const objects = canvas.getObjects();
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (obj instanceof Line) {
        canvas.remove(obj);
      }
    }

    // 모든 박스 색상 초기화
    objects.forEach((obj) => {
      if (obj instanceof Group && obj.get('role')) {
        obj.item(0).set('fill', '#ffffff');
      }
    });

    // 연결 정보 초기화
    connectionsRef.current.clear();
    resetDragState();
    canvas.requestRenderAll();
  };

  return {
    canvasRef,
    getCurrentAnswers,
    resetAnswer,
  };
};

export default useIdolCanvas;
