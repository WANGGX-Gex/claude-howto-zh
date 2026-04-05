import Link from 'next/link';
import { getModules } from '@/lib/modules';
import HomeClient from './HomeClient';

const LEVEL_COLORS = {
  1: { bg: 'from-green-500 to-emerald-600', label: '初学者', emoji: '🟢' },
  2: { bg: 'from-blue-500 to-indigo-600', label: '中级', emoji: '🔵' },
  3: { bg: 'from-red-500 to-rose-600', label: '高级', emoji: '🔴' },
};

export default function HomePage() {
  const modules = getModules();

  const modulesData = modules.map(m => ({
    slug: m.slug,
    title: m.title,
    description: m.description,
    order: m.order,
    level: m.level as 1 | 2 | 3,
    duration: m.duration,
    complexity: m.complexity,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              📚 一个周末掌握 Claude Code
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto mb-8">
              10 个学习模块 · 100+ 实战模板 · 交互式测验 · 结构化学习路径
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/modules"
                className="px-8 py-3 bg-white text-purple-800 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                开始学习 →
              </Link>
              <Link
                href="/roadmap"
                className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                查看学习路径
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: '学习模块', value: '10', icon: '📖' },
            { label: '实战模板', value: '100+', icon: '📋' },
            { label: '测验题目', value: '100', icon: '✅' },
            { label: '预计学时', value: '11-13h', icon: '⏱️' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Module grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          学习模块
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">
          按推荐顺序排列，从基础到高级逐步深入
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.map((mod) => {
            const level = LEVEL_COLORS[mod.level];
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${level.bg}`} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-gray-400">#{mod.order}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {level.emoji} {level.label}
                    </span>
                    <span className="text-xs text-gray-400">{mod.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {mod.description}
                  </p>
                  <div className="mt-4 text-sm text-gray-400">{mod.complexity}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <HomeClient totalModules={modules.length} />

      {/* CTA */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">准备好了吗？</h2>
          <p className="text-purple-200 mb-8">
            从第一个模块开始，或参加自我评估测验找到适合你的级别
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modules/01-slash-commands" className="px-8 py-3 bg-white text-purple-800 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              从模块 1 开始
            </Link>
            <Link href="/quiz/1" className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              参加测验
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
