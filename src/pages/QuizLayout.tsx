import Header from 'components/Header';
import ProgressBar from 'components/ProgressBar';
import { Outlet } from 'react-router';

function QuizLayout() {
  return (
    <div className="quiz-layout">
      {/* TODO: 어떤 과목인지에 따라 Header의 title을 다르게 설정해야 함 */}
      <Header title="1교시 수학" />
      <ProgressBar />
      <div className="quiz-content">
        <Outlet />
      </div>
    </div>
  );
}

export default QuizLayout;
