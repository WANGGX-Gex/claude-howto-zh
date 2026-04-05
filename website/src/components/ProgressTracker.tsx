'use client';

import { useEffect, useState } from 'react';
import { getProgress, toggleModuleComplete } from '@/lib/progress';
import type { UserProgress } from '@/types';

interface ProgressTrackerProps {
  moduleSlug: string;
  totalModules: number;
}

export default function ProgressTracker({ moduleSlug, totalModules }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  const isCompleted = progress.completedModules.includes(moduleSlug);
  const pct = Math.round((progress.completedModules.length / totalModules) * 100);

  const handleToggle = () => {
    const updated = toggleModuleComplete(moduleSlug);
    setProgress({ ...updated });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          学习进度: {progress.completedModules.length}/{totalModules} 模块
        </span>
        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <button
        onClick={handleToggle}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
          isCompleted
            ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/60'
            : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60'
        }`}
      >
        {isCompleted ? '✅ 已完成 (点击取消)' : '标记为已完成'}
      </button>
    </div>
  );
}
