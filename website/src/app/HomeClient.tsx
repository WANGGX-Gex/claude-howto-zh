'use client';

import { useEffect, useState } from 'react';
import { getProgress } from '@/lib/progress';
import Link from 'next/link';

export default function HomeClient({ totalModules }: { totalModules: number }) {
  const [completed, setCompleted] = useState(0);
  const [lastVisited, setLastVisited] = useState('');

  useEffect(() => {
    const p = getProgress();
    setCompleted(p.completedModules.length);
    setLastVisited(p.lastVisited);
  }, []);

  if (completed === 0 && !lastVisited) return null;

  const pct = Math.round((completed / totalModules) * 100);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📊 你的学习进度</h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400 whitespace-nowrap">
            {completed}/{totalModules} ({pct}%)
          </span>
        </div>
        {lastVisited && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            上次学习: <Link href={`/modules/${lastVisited}`} className="text-purple-600 dark:text-purple-400 hover:underline">{lastVisited}</Link>
          </p>
        )}
      </div>
    </section>
  );
}
