import { vocabLessons } from "./lesson/vocabLessons";
import { speakingLessons } from "./lesson/speakingLessons";
import { listeningLessons } from "./lesson/listeningLessons";
import { grammarLessons } from "./lesson/grammarLessons";
import { readingLessons } from "./lesson/readingLessons";
import { writingLessons } from "./lesson/writingLessons";

export const initialLessons = [
  ...vocabLessons,
  ...speakingLessons,
  ...listeningLessons,
  ...grammarLessons,
  ...readingLessons,
  ...writingLessons
];
