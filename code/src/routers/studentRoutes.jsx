import Journey from '../pages/student/Journey';
import Review from '../pages/student/Review';
import PracticeTest from '../pages/student/PracticeTest';
import UnitDetail from '../pages/student/UnitDetail';

const studentRoutes = [
  {
    path: 'journey',
    element: <Journey />,
  },
  {
    path: 'unit/:unitId',
    element: <UnitDetail />,
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
