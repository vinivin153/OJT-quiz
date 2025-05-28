import { useEffect } from 'react';
import useModalStore from 'store/useModalStore';
import 'styles/AnswerFeedbackModal.css';
import { MODAL_IMAGE_URL } from 'constants/constant';
import useStepStore from 'store/useStepStore';
import useHeaderStore from 'store/useHeaderStore';
import { useNavigate } from 'react-router';

function AnswerFeedbackModal() {
  const { modalType, modalMessage, closeModal } = useModalStore();
  const initStep = useStepStore((state) => state.initStep);
  const resetLeftChance = useHeaderStore((state) => state.resetLeftChance);
  const navigate = useNavigate();

  // 2초 후 자동으로 모달 닫기
  useEffect(() => {
    // 모달 타입이 correct 또는 incorrect가 아닐 경우에만 타이머 설정
    if (modalType === 'correct' || modalType === 'incorrect') {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      // 컴포넌트가 언마운트되거나 모달이 바뀔 때 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [modalType, closeModal]);

  if (!modalType) return null;

  const handleReset = () => {
    initStep();
    resetLeftChance();
    closeModal();
  };

  const handleRetryClick = () => {
    handleReset();
  };

  const handleExitClick = () => {
    handleReset();
    navigate('/');
  };

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
          </div>

          {/* 본문 내용 */}
          <div className="p-8 text-center">
            <h2 className="text-gray-800 text-2xl font-bold mb-6" style={{ fontFamily: 'BMJUA' }}>
              {modalMessage}
            </h2>

            {/* 이미지 컨테이너 */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={MODAL_IMAGE_URL[modalType]}
                  alt={modalType}
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

            {/* 버튼 그룹 */}
            {modalType === 'gameOver' && (
              <div className="flex justify-around mt-8">
                <button
                  onClick={handleRetryClick}
                  className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                  style={{ fontFamily: 'BMJUA' }}
                >
                  다시하기
                </button>
                <button
                  onClick={handleExitClick}
                  className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                  style={{ fontFamily: 'BMJUA' }}
                >
                  나가기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerFeedbackModal;
