import AnswerFeedbackModal from 'components/AnswerFeedbackModal';
import Header from 'components/Header';
import ProgressBar from 'components/ProgressBar';
import { Outlet } from 'react-router';

function QuizLayout() {
  return (
    <div className="quiz-layout">
      <Header />
      <ProgressBar />
      <div className="quiz-content">
        <Outlet />
      </div>
      <AnswerFeedbackModal />
    </div>
  );
}

export default QuizLayout;
