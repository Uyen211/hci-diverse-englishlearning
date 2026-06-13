import { mockGrammarData } from '../mockdata/grammarData';

const resolveGrammarAssetUrl = (url) => {
  if (!url?.startsWith('/src/assets/grammar/')) return url;
  const relativePath = url.replace('/src/assets/grammar/', '');
  return `/assets/grammar/${relativePath}`;
};

const withResolvedAssets = (lesson) => ({
  ...lesson,
  contexts: (lesson.contexts || []).map((ctx) => ({
    ...ctx,
    url: resolveGrammarAssetUrl(ctx.url),
  })),
});

export const grammarService = {
  getGrammarLessons: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockGrammarData.map(withResolvedAssets)), 300);
    });
  },

  getGrammarLessonById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockGrammarData.find((g) => g.id === parseInt(id, 10));
        resolve(item ? withResolvedAssets(item) : null);
      }, 300);
    });
  },
};
