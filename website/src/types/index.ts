export interface Module {
  slug: string;
  title: string;
  description: string;
  order: number;
  level: 1 | 2 | 3;
  duration: string;
  complexity: string;
  content: string;
  subPages: SubPage[];
}

export interface SubPage {
  slug: string;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  category: 'conceptual' | 'practical';
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
  review: string;
}

export interface QuizLesson {
  lesson: number;
  title: string;
  questions: QuizQuestion[];
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  lastVisited: string;
  level: number;
}

export interface User {
  id: string;
  username: string;
  contact: string;
  contactType: 'phone' | 'email';
  passwordHash: string;
  createdAt: string;
}

export interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  module: string;
}
