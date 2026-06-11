import Journey from '../pages/student/Journey/Journey';
import Review from '../pages/student/Review';
import PracticeTest from '../pages/student/PracticeTest';
import UnitDetail from '../pages/student/Journey/UnitDetail';

// Listening
import ListeningSelect from '../pages/student/Journey/skills/listening/ListeningSelect';
import ListeningQuiz from '../pages/student/Journey/skills/listening/ListeningQuiz';
import InteractiveStories from '../pages/student/Journey/skills/listening/InteractiveStories';
import Shadowing from '../pages/student/Journey/skills/listening/Shadowing';
import ListeningResult from '../pages/student/Journey/skills/listening/ListeningResult';

// Speaking
import SpeakingSelect from '../pages/student/Journey/skills/speaking/SpeakingSelect';
import RolePlay from '../pages/student/Journey/skills/speaking/RolePlay';
import Pronunciation from '../pages/student/Journey/skills/speaking/Pronunciation';
import SpeakingResult from '../pages/student/Journey/skills/speaking/SpeakingResult';

// Reading
import ReadingSelect from '../pages/student/Journey/skills/reading/ReadingSelect';
import SplitReading from '../pages/student/Journey/skills/reading/SplitReading';
import NewsReading from '../pages/student/Journey/skills/reading/NewsReading';
import ReadingResult from '../pages/student/Journey/skills/reading/ReadingResult';

// Writing
import WritingTask from '../pages/student/Journey/skills/writing/WritingTask';
import WritingResult from '../pages/student/Journey/skills/writing/WritingResult';

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
    path: 'listening-select',
    element: <ListeningSelect />,
  },
  {
    path: 'listening/quiz',
    element: <ListeningQuiz />,
  },
  {
    path: 'listening/result',
    element: <ListeningResult />,
  },
  {
    path: 'listening/interactive',
    element: <InteractiveStories />,
  },
  {
    path: 'listening/shadowing',
    element: <Shadowing />,
  },
  {
    path: 'speaking-select',
    element: <SpeakingSelect />,
  },
  {
    path: 'speaking/roleplay',
    element: <RolePlay />,
  },
  {
    path: 'speaking/pronunciation',
    element: <Pronunciation />,
  },
  {
    path: 'speaking/result',
    element: <SpeakingResult />,
  },
  {
    path: 'reading-select',
    element: <ReadingSelect />,
  },
  {
    path: 'reading/split',
    element: <SplitReading />,
  },
  {
    path: 'reading/news',
    element: <NewsReading />,
  },
  {
    path: 'reading/result',
    element: <ReadingResult />,
  },
  {
    path: 'writing/task',
    element: <WritingTask />,
  },
  {
    path: 'writing/result',
    element: <WritingResult />,
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
