/* eslint-disable react-refresh/only-export-components */
import Levels from '../pages/admin/Levels';
import Curriculum from '../pages/admin/Curriculum';
import Lessons from '../pages/admin/lesson/Lessons';
import LessonConfig from '../pages/admin/lesson/LessonConfig';
import Exams from '../pages/admin/exams/Exams';
import ExamConfig from '../pages/admin/exams/ExamConfig';

const adminRoutes = [
  {
    path: 'levels',
    element: <Levels />,
  },
  {
    path: 'curriculum',
    element: <Curriculum />,
  },
  {
    path: 'curriculum/:levelId',
    element: <Curriculum />,
  },
  {
    path: 'curriculum/:unitId/lessons',
    element: <Lessons />,
  },
  {
    path: 'curriculum/:unitId/lessons/new',
    element: <LessonConfig />,
  },
  {
    path: 'curriculum/:unitId/lessons/:lessonId/config',
    element: <LessonConfig />,
  },
  {
    path: 'exams',
    element: <Exams />,
  },
  {
    path: 'exams/new',
    element: <ExamConfig />,
  },
  {
    path: 'exams/:examId/config',
    element: <ExamConfig />,
  },
];

export default adminRoutes;

