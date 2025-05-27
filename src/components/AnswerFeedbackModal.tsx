import { useEffect } from 'react';
import useModalStore from 'store/useModalStore';
import correctImage from 'assets/images/correct.png';
import inCorrectImage from 'assets/images/incorrect.png';
import 'styles/AnswerFeedbackModal.css';

function AnswerFeedbackModal() {
  const { modalType, closeModal } = useModalStore();

  // 2초 후 자동으로 모달 닫기
  useEffect(() => {
    if (modalType) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      // 컴포넌트가 언마운트되거나 모달이 바뀔 때 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [modalType, closeModal]);

  if (!modalType) return null;

  return (
    <div className="modal">
      <div
        className="modal-overlay fixed inset-0 flex items-center justify-center z-50"
        style={{
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        {/* 모달 컨텐츠 */}
        <div
          className="modal-content bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          style={{
            width: '384px',
            maxWidth: '90vw',
            animation: 'modalAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* 상단 컬러 헤더 */}
          <div
            className={`h-20 relative overflow-hidden ${
              modalType === 'correct'
                ? 'bg-gradient-to-r from-green-400 to-green-500'
                : 'bg-gradient-to-r from-red-400 to-red-500'
            }`}
          >
            {/* 장식적 원형 요소들 */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>

            {/* 아이콘 */}
            <div className="flex items-center justify-center h-full">
              {modalType === 'correct' ? (
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    animation: 'shake 0.5s ease-in-out',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>

            {/* 자동 닫힘 표시 - 우상단 타이머 표시 */}
            <div className="absolute top-2 right-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-white border-opacity-60 flex items-center justify-center"
                style={{
                  animation: 'countdown 2s linear',
                }}
              >
                <div
                  className="w-1 h-1 bg-white rounded-full"
                  style={{
                    animation: 'pulse 0.5s ease-in-out infinite',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* 본문 내용 */}
          <div className="p-8 text-center">
            <h2 className="text-gray-800 text-2xl font-bold mb-6" style={{ fontFamily: 'BMJUA' }}>
              {modalType === 'correct' ? '정답입니다!' : '오답입니다!'}
            </h2>

            {/* 이미지 컨테이너 */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={modalType === 'correct' ? correctImage : inCorrectImage}
                  alt={modalType === 'correct' ? 'Correct' : 'Incorrect'}
                  className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
                  style={{
                    animation: 'pulseGentle 2s ease-in-out infinite',
                  }}
                />
                {/* 이미지 주변 글로우 효과 */}
                <div
                  className={`absolute inset-0 rounded-full shadow-2xl ${
                    modalType === 'correct' ? 'shadow-green-200' : 'shadow-red-200'
                  }`}
                  style={{ zIndex: -1 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerFeedbackModal;
