'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { getCurrentUser, logoutUser } from '@/lib/auth';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
            <span className="text-2xl">📚</span>
            <span className="hidden sm:inline">Claude Code 学习指南</span>
            <span className="sm:hidden">CC 指南</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/modules" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              学习模块
            </Link>
            <Link href="/roadmap" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              学习路径
            </Link>
            <Link href="/quiz/1" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              测验
            </Link>
            <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              🔍 搜索
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="切换主题"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/auth/profile" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  {user.username}
                </Link>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500">
                  退出
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm">
                登录
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/modules" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(false)}>学习模块</Link>
            <Link href="/roadmap" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(false)}>学习路径</Link>
            <Link href="/quiz/1" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(false)}>测验</Link>
            <Link href="/search" className="block py-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(false)}>🔍 搜索</Link>
            {user ? (
              <div className="flex items-center gap-4 py-2">
                <Link href="/auth/profile" className="text-purple-600 dark:text-purple-400" onClick={() => setMenuOpen(false)}>{user.username}</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500 text-sm">退出</button>
              </div>
            ) : (
              <Link href="/auth/login" className="block py-2 text-purple-600 dark:text-purple-400" onClick={() => setMenuOpen(false)}>登录</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
