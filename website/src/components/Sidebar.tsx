'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarModule {
  slug: string;
  title: string;
  order: number;
  level: 1 | 2 | 3;
  completed: boolean;
}

const LEVEL_COLORS = {
  1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  3: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Sidebar({ modules }: { modules: SidebarModule[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-20 space-y-1 pr-4">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          学习模块
        </h3>
        {modules.map((mod) => {
          const isActive = pathname === `/modules/${mod.slug}`;
          return (
            <Link
              key={mod.slug}
              href={`/modules/${mod.slug}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xs w-5 text-center">
                {mod.completed ? '✅' : `${mod.order}`}
              </span>
              <span className="flex-1 truncate">{mod.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${LEVEL_COLORS[mod.level]}`}>
                L{mod.level}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
