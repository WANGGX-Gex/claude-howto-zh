import Link from 'next/link';
import { getModules } from '@/lib/modules';
import Breadcrumb from '@/components/Breadcrumb';

export default function ModulesPage() {
  const modules = getModules();

  const levels = [
    { level: 1, title: '🟢 级别 1：初学者 — 入门', desc: '约 3 小时 · 即时生产力、理解基础概念' },
    { level: 2, title: '🔵 级别 2：中级 — 构建工作流', desc: '约 5 小时 · 自动化、集成、任务委派' },
    { level: 3, title: '🔴 级别 3：高级 — 高级用户', desc: '约 5 小时 · 规划模式、团队方案、CLI 精通' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: '学习模块' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">学习模块</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">按学习路径推荐顺序排列</p>

      {levels.map(({ level, title, desc }) => {
        const levelModules = modules.filter(m => m.level === level);
        return (
          <div key={level} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{desc}</p>
            <div className="space-y-3">
              {levelModules.map(mod => (
                <Link
                  key={mod.slug}
                  href={`/modules/${mod.slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">#{mod.order}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{mod.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-sm text-gray-400">{mod.duration}</div>
                      <div className="text-sm text-gray-400">{mod.complexity}</div>
                    </div>
                  </div>
                  {mod.subPages.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mod.subPages.map(sub => (
                        <span key={sub.slug} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          {sub.title}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
