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

// Vocabulary
import VocabSelect from '../pages/student/Journey/skills/vocabulary/VocabSelect';
import VocabSession from '../pages/student/Journey/skills/vocabulary/VocabSession';

// Grammar
import GrammarSelect from '../pages/student/Journey/skills/grammar/GrammarSelect';
import GrammarSession from '../pages/student/Journey/skills/grammar/GrammarSession';

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
    path: 'vocabulary-select',
    element: <VocabSelect />,
  },
  {
    path: 'vocabulary/session',
    element: <VocabSession />,
  },
  {
    path: 'grammar-select',
    element: <GrammarSelect />,
  },
  {
    path: 'grammar/session',
    element: <GrammarSession />,
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
    path: 'review',
    element: <Review />,
  },
  {
    path: 'practice-test',
    element: <PracticeTest />,
  },
];

export default studentRoutes;
