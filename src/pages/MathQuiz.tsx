import { MATH_QUIZ_LIST } from 'data/quiz';
import { FabricText, Group, Point, Rect, Canvas } from 'fabric';
import { useEffect, useRef } from 'react';

const INIT_ANSWER = '___';

function MathQuiz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const answerRef = useRef<string>(INIT_ANSWER);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    // 정적 canvas 생성
    const canvas = new Canvas(currentCanvas, {
      width: window.innerWidth - 120,
      height: window.innerHeight - 260,
    });
    canvas.backgroundColor = '#f3f3f3';

    // 질문 텍스트 생성
    const questionText = new FabricText(MATH_QUIZ_LIST[0].question, {
      fontSize: 62,
      textAlign: 'center',
      fill: '#000',
      fontFamily: 'BMJUA',
    });
    const questionPos = new Point(canvas.getWidth() / 2 - 30, canvas.getHeight() / 5);
    questionText.setPositionByOrigin(questionPos, 'center', 'center');
    canvas.add(questionText);

    // 정답 텍스트 생성
    const answerText = new FabricText(INIT_ANSWER, {
      fontSize: 62,
      textAlign: 'center',
      fill: '#00a',
      fontFamily: 'BMJUA',
      fontWeight: 'bold',
    });
    const answerPos = new Point(canvas.getWidth() / 2 + 100, canvas.getHeight() / 5);
    answerText.setPositionByOrigin(answerPos, 'left', 'center');
    answerRef.current = answerText.text;
    canvas.add(answerText);

    /** 숫자 버튼 생성함수 */
    function createNumberButton(number: number, options: { left: number; top: number }) {
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

      // 텍스트 생성
      const text = new FabricText(number.toString(), {
        fontSize: 40,
        textAlign: 'center',
        fill: '#000',
        fontFamily: 'BMJUA',
      });
      const textPos = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2);
      text.setPositionByOrigin(textPos, 'center', 'center');

      // 박스와 텍스트를 그룹화
      const group = new Group([rect, text], {
        ...options,
        evented: true,
      });

      // 그룹에 클릭 이벤트 추가
      group.on('mousedown', () => {
        console.log('Clicked number:', number);

        // 클릭 시 정답 텍스트에 숫자 추가
        if (answerRef.current === INIT_ANSWER) {
          answerRef.current = '';
        }

        answerRef.current += number.toString();
        canvas.requestRenderAll();
      });

      return group;
    }

    // 숫자 버튼 생성 후 캔버스에 추가
    for (let i = -5; i < 5; i++) {
      const box = createNumberButton(i + 5, {
        left: canvas.getWidth() / 2 + i * 110,
        top: (canvas.getHeight() / 10) * 7,
      });
      canvas.add(box);
    }

    // 렌더링 하기
    canvas.renderAll();
    fabricCanvasRef.current = canvas;

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0 box-border">
      <canvas className="rounded-2xl" ref={canvasRef}>
        progress
      </canvas>
    </div>
  );
}

export default MathQuiz;
