import Journey from '../pages/student/Journey';
import Review from '../pages/student/Review';
import PracticeTest from '../pages/student/PracticeTest';

const studentRoutes = [
  {
    path: 'journey',
    element: <Journey />,
  },
  {
    path: 'review',
    element: <Review />,
  },
  {
    path: 'practice-test',
    element: <PracticeTest />,
  },
];

export default studentRoutes;
