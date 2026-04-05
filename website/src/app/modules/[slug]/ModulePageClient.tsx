'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Sidebar from '@/components/Sidebar';
import ProgressTracker from '@/components/ProgressTracker';
import { getProgress, setLastVisited } from '@/lib/progress';

interface ModulePageClientProps {
  module: {
    slug: string;
    title: string;
    description: string;
    level: 1 | 2 | 3;
    duration: string;
    complexity: string;
    content: string;
    subPages: { slug: string; title: string; content: string }[];
  };
  sidebarModules: { slug: string; title: string; order: number; level: 1 | 2 | 3 }[];
  totalModules: number;
  prevModule: { slug: string; title: string } | null;
  nextModule: { slug: string; title: string } | null;
  quizLesson: number;
}

export default function ModulePageClient({
  module: mod,
  sidebarModules,
  totalModules,
  prevModule,
  nextModule,
  quizLesson,
}: ModulePageClientProps) {
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    setLastVisited(mod.slug);
    setCompletedModules(getProgress().completedModules);
  }, [mod.slug]);

  const content = activeSubPage
    ? mod.subPages.find(s => s.slug === activeSubPage)?.content || mod.content
    : mod.content;

  const sidebarData = sidebarModules.map(m => ({
    ...m,
    completed: completedModules.includes(m.slug),
  }));

  return (
    <div className="flex gap-8">
      <Sidebar modules={sidebarData} />

      <div className="flex-1 min-w-0">
        {/* Module header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              mod.level === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : mod.level === 2 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}>
              级别 {mod.level}
            </span>
            <span className="text-sm text-gray-400">{mod.duration}</span>
            <span className="text-sm text-gray-400">{mod.complexity}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mod.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">{mod.description}</p>
        </div>

        {/* Sub-page tabs */}
        {mod.subPages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveSubPage(null)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                !activeSubPage ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              概览
            </button>
            {mod.subPages.map(sub => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubPage(sub.slug)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeSubPage === sub.slug ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {sub.title}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="mb-8">
          <MarkdownRenderer content={content} />
        </div>

        {/* Progress tracker */}
        <div className="mb-8">
          <ProgressTracker moduleSlug={mod.slug} totalModules={totalModules} />
        </div>

        {/* Quiz link */}
        <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-purple-800 dark:text-purple-300">📝 测试你的理解</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">完成本模块的测验来巩固知识</p>
            </div>
            <Link
              href={`/quiz/${quizLesson}`}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              开始测验
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          {prevModule ? (
            <Link href={`/modules/${prevModule.slug}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <span>←</span>
              <div>
                <div className="text-xs text-gray-400">上一模块</div>
                <div className="text-sm font-medium">{prevModule.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextModule ? (
            <Link href={`/modules/${nextModule.slug}`} className="flex items-center gap-2 text-right text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <div>
                <div className="text-xs text-gray-400">下一模块</div>
                <div className="text-sm font-medium">{nextModule.title}</div>
              </div>
              <span>→</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
