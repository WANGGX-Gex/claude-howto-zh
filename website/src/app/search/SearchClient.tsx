'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { searchModules } from '@/lib/search';
import type { Module } from '@/types';

interface SearchModule {
  slug: string;
  title: string;
  description: string;
  content: string;
  subPages: { slug: string; title: string; content: string }[];
}

export default function SearchClient({ modules }: { modules: SearchModule[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const fullModules = modules.map(m => ({
      ...m,
      order: 0,
      level: 1 as const,
      duration: '',
      complexity: '',
      subPages: m.subPages,
    })) as Module[];
    return searchModules(fullModules, query);
  }, [query, modules]);

  return (
    <div>
      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索模块、概念、命令..."
          className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          找到 {results.length} 个结果
        </p>
      )}

      <div className="space-y-4">
        {results.map((result, i) => (
          <Link
            key={i}
            href={result.slug}
            className="block bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                {result.module}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{result.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{result.excerpt}</p>
          </Link>
        ))}
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400">没有找到匹配的结果，试试其他关键词</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">💡</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">试试搜索以下关键词:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['斜杠命令', 'MCP', '钩子', '子代理', '技能', 'CLAUDE.md', '检查点', '插件'].map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
