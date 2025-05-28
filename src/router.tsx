import EngQuiz from 'pages/EngQuiz';
import Home from 'pages/Home';
import IdolQuiz from 'pages/IdolQuiz';
import MathQuiz from 'pages/MathQuiz';
import QuizLayout from 'pages/QuizLayout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz',
    element: <QuizLayout />,
    children: [
      {
        path: 'math',
        element: <MathQuiz />,
      },
      {
        path: 'english',
        element: <EngQuiz />,
      },
      {
        path: 'idol',
        element: <IdolQuiz />,
      },
    ],
  },
]);
