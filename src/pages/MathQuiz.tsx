import CheckAnswerButton from 'components/CheckAnswerButton';
import { INIT_ANSWER } from 'constants/constant';
import { MATH_QUIZ_LIST } from 'data/quiz';
import { FabricText, Group, Point, Rect, Canvas } from 'fabric';
import { useEffect, useRef } from 'react';
import useStepStore from 'store/useStepStore';

function MathQuiz() {
  // canvas 관련 ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const questionRef = useRef<FabricText>(null);
  const answerRef = useRef<FabricText>(null);

  // 문제 정보 관련 로직
  const { step, nextStep } = useStepStore((state) => state);
  const question = MATH_QUIZ_LIST[step - 1].question;
  const answer = MATH_QUIZ_LIST[step - 1].answer;

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    // canvas 생성
    const canvas = new Canvas(currentCanvas, {
      width: window.innerWidth - 120,
      height: window.innerHeight - 260,
    });
    canvas.backgroundColor = '#f3f3f3';

    // 질문 텍스트 생성
    const questionText = new FabricText(question, {
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
    canvas.add(questionText);

    // 정답 텍스트 생성
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
    canvas.requestRenderAll();
    fabricCanvasRef.current = canvas;

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvasRef.current || !questionRef.current || !answerRef.current) return;

    // 문제 텍스트 업데이트
    questionRef.current.set({ text: question });
    const questionPos = new Point(fabricCanvasRef.current.getWidth() / 2 + 50, fabricCanvasRef.current.getHeight() / 5);
    questionRef.current.setPositionByOrigin(questionPos, 'right', 'center');
    answerRef.current.set({ text: INIT_ANSWER });

    // 캔버스 렌더링
    fabricCanvasRef.current.requestRenderAll();
  }, [step]);

  /** 정답확인 버튼을 클릭했을 때 정답인 경우 다음 단계로 넘어가고, 오답인 경우 다시 시도하라는 알림을 띄움 */
  const handleCheckAnswerButtonClick = () => {
    if (!answerRef.current) return;

    const currentText = answerRef.current.text;
    const isCorrectAnswer = currentText === answer.toString();

    if (isCorrectAnswer) {
      alert('정답입니다!');
      nextStep();
      return;
    }

    alert('오답입니다! 다시 시도해보세요.');
    answerRef.current.set({ text: INIT_ANSWER });
    fabricCanvasRef.current?.requestRenderAll();
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0 box-border">
      <canvas className="rounded-2xl" ref={canvasRef}>
        progress
      </canvas>
      <CheckAnswerButton handleCheckAnswerButtonClick={handleCheckAnswerButtonClick} />
    </div>
  );
}

export default MathQuiz;
