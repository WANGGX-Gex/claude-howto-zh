'use client';

import type { UserProgress } from '@/types';

const STORAGE_KEY = 'claude-howto-progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  quizScores: {},
  lastVisited: '',
  level: 1,
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_PROGRESS, ...JSON.parse(stored) } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function toggleModuleComplete(slug: string): UserProgress {
  const progress = getProgress();
  const idx = progress.completedModules.indexOf(slug);
  if (idx >= 0) {
    progress.completedModules.splice(idx, 1);
  } else {
    progress.completedModules.push(slug);
  }
  saveProgress(progress);
  return progress;
}

export function saveQuizScore(lesson: string, score: number): UserProgress {
  const progress = getProgress();
  progress.quizScores[lesson] = score;
  saveProgress(progress);
  return progress;
}

export function setLastVisited(slug: string): void {
  const progress = getProgress();
  progress.lastVisited = slug;
  saveProgress(progress);
}
