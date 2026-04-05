'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUsername, logoutUser, changePassword } from '@/lib/auth';
import { getProgress } from '@/lib/progress';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import type { User, UserProgress } from '@/types';

const MODULE_TITLES: Record<string, string> = {
  '01-slash-commands': '斜杠命令',
  '02-memory': '记忆',
  '03-skills': '技能',
  '04-subagents': '子代理',
  '05-mcp': 'MCP',
  '06-hooks': '钩子',
  '07-plugins': '插件',
  '08-checkpoints': '检查点',
  '09-advanced-features': '高级功能',
  '10-cli': 'CLI 参考',
};

const LESSON_TITLES: Record<string, string> = {
  'lesson-1': '斜杠命令',
  'lesson-2': '记忆',
  'lesson-3': '技能',
  'lesson-4': '子代理',
  'lesson-5': 'MCP',
  'lesson-6': '钩子',
  'lesson-7': '插件',
  'lesson-8': '检查点',
  'lesson-9': '高级功能',
  'lesson-10': 'CLI 参考',
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // 编辑用户名
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  // 修改密码
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push('/auth/login');
      return;
    }
    setUser(u);
    setNewName(u.username);
    setProgress(getProgress());
  }, [router]);

  if (!user) return null;

  const handleSaveName = () => {
    if (newName.trim()) {
      const updated = updateUsername(newName.trim());
      if (updated) setUser(updated);
    }
    setEditingName(false);
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword.length < 6) {
      setPasswordError('新密码长度不能少于 6 位');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('两次输入的新密码不一致');
      return;
    }
    const result = await changePassword(oldPassword, newPassword);
    if (!result.success) {
      setPasswordError(result.error || '修改失败');
      return;
    }
    setPasswordSuccess('密码修改成功');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setShowPasswordForm(false);
      setPasswordSuccess('');
    }, 2000);
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/');
    router.refresh();
  };

  const quizCount = progress ? Object.keys(progress.quizScores).length : 0;
  const avgScore = progress && quizCount > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / quizCount)
    : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: '用户中心' }]} />

      {/* 用户信息卡片 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                />
                <button onClick={handleSaveName} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                  保存
                </button>
                <button onClick={() => { setEditingName(false); setNewName(user.username); }} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  取消
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                >
                  修改
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {user.contactType === 'email' ? '📧' : '📱'} {user.contact}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              注册于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* 修改密码 */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              修改密码
            </button>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">修改密码</h3>
              <input
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="当前密码"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="新密码（至少 6 位）"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="确认新密码"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={e => e.key === 'Enter' && handleChangePassword()}
              />
              {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-xs">{passwordSuccess}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleChangePassword}
                  disabled={!oldPassword || !newPassword || !confirmPassword}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  确认修改
                </button>
                <button
                  onClick={() => { setShowPasswordForm(false); setOldPassword(''); setNewPassword(''); setConfirmPassword(''); setPasswordError(''); }}
                  className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 学习统计 */}
      {progress && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{progress.completedModules.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已完成模块</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{quizCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已完成测验</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{avgScore}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">平均分数</div>
          </div>
        </div>
      )}

      {/* 已完成的模块 */}
      {progress && progress.completedModules.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">已完成模块</h3>
          <div className="flex flex-wrap gap-2">
            {progress.completedModules.map(slug => (
              <Link
                key={slug}
                href={`/modules/${slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                <span>✅</span>
                <span>{MODULE_TITLES[slug] || slug}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 测验成绩 */}
      {progress && quizCount > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">测验成绩</h3>
          <div className="space-y-3">
            {Object.entries(progress.quizScores).map(([key, score]) => (
              <Link key={key} href={`/quiz/${key.replace('lesson-', '')}`} className="block group">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300 w-24 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {LESSON_TITLES[key] || key}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-12 text-right">{score}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 继续学习 */}
      {progress && progress.lastVisited && (
        <Link
          href={`/modules/${progress.lastVisited}`}
          className="block mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">继续学习</p>
              <p className="font-medium text-purple-800 dark:text-purple-300">
                {MODULE_TITLES[progress.lastVisited] || progress.lastVisited}
              </p>
            </div>
            <span className="text-purple-500">&rarr;</span>
          </div>
        </Link>
      )}

      {/* 退出登录 */}
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
      >
        退出登录
      </button>
    </div>
  );
}
