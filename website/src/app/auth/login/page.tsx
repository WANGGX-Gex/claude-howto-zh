'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  sendVerificationCode,
  verifyCode,
  registerUser,
  loginUser,
  resetPassword,
  getCurrentUser,
  isContactRegistered,
} from '@/lib/auth';
import Breadcrumb from '@/components/Breadcrumb';

type Mode = 'login' | 'register' | 'forgot';
type RegisterStep = 'form' | 'verify';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [contactType, setContactType] = useState<'phone' | 'email'>('email');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [registerStep, setRegisterStep] = useState<RegisterStep>('form');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (getCurrentUser()) {
      setRedirecting(true);
      router.push('/auth/profile');
    }
  }, [router]);

  if (redirecting) return null;

  const validateContact = (): boolean => {
    if (contactType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setError('请输入有效的邮箱地址');
      return false;
    }
    if (contactType === 'phone' && !/^1\d{10}$/.test(contact)) {
      setError('请输入有效的手机号（11位）');
      return false;
    }
    return true;
  };

  const validatePassword = (): boolean => {
    if (password.length < 6) {
      setError('密码长度不能少于 6 位');
      return false;
    }
    if ((mode === 'register' || mode === 'forgot') && password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    return true;
  };

  // --- 登录 ---
  const handleLogin = async () => {
    setError('');
    if (!validateContact() || !validatePassword()) return;
    setLoading(true);
    const result = await loginUser(contact, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || '登录失败');
      return;
    }
    router.push('/');
    router.refresh();
  };

  // --- 注册：发送验证码 ---
  const handleRegisterSendCode = () => {
    setError('');
    if (!validateContact()) return;
    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }
    if (!validatePassword()) return;
    if (isContactRegistered(contact)) {
      setError('该账号已注册，请直接登录');
      return;
    }
    const generatedCode = sendVerificationCode(contact, contactType);
    setDemoCode(generatedCode);
    setRegisterStep('verify');
  };

  // --- 注册：验证并完成 ---
  const handleRegisterVerify = async () => {
    setError('');
    if (!verifyCode(code, contact)) {
      setError('验证码不正确');
      return;
    }
    setLoading(true);
    const result = await registerUser(contact, contactType, username.trim(), password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || '注册失败');
      return;
    }
    router.push('/');
    router.refresh();
  };

  // --- 找回密码：发送验证码 ---
  const handleForgotSendCode = () => {
    setError('');
    if (!validateContact()) return;
    if (!validatePassword()) return;
    if (!isContactRegistered(contact)) {
      setError('该账号未注册');
      return;
    }
    const generatedCode = sendVerificationCode(contact, contactType);
    setDemoCode(generatedCode);
    setRegisterStep('verify');
  };

  // --- 找回密码：验证并重置 ---
  const handleForgotVerify = async () => {
    setError('');
    if (!verifyCode(code, contact)) {
      setError('验证码不正确');
      return;
    }
    setLoading(true);
    const result = await resetPassword(contact, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || '重置失败');
      return;
    }
    setMode('login');
    setRegisterStep('form');
    setCode('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setRegisterStep('form');
    setError('');
    setCode('');
    setDemoCode('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  };

  const modeTitle = { login: '登录', register: '注册', forgot: '找回密码' };
  const modeDesc = {
    login: '登录后可同步学习进度',
    register: '创建账号开始学习之旅',
    forgot: '通过验证码重置密码',
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <Breadcrumb items={[{ label: modeTitle[mode] }]} />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {modeTitle[mode]}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          {modeDesc[mode]}
        </p>

        {/* 验证码步骤（注册/找回密码的第二步） */}
        {(mode === 'register' || mode === 'forgot') && registerStep === 'verify' ? (
          <div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                演示模式：验证码为 <span className="font-mono font-bold text-lg">{demoCode}</span>
              </p>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                （生产环境会发送到你的{contactType === 'email' ? '邮箱' : '手机'}）
              </p>
            </div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              验证码
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="输入 6 位验证码"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              onKeyDown={e => e.key === 'Enter' && (mode === 'register' ? handleRegisterVerify() : handleForgotVerify())}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={mode === 'register' ? handleRegisterVerify : handleForgotVerify}
              disabled={code.length !== 6 || loading}
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-3"
            >
              {loading ? '处理中...' : mode === 'register' ? '完成注册' : '重置密码'}
            </button>
            <button
              onClick={() => { setRegisterStep('form'); setCode(''); setError(''); }}
              className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              &larr; 返回修改
            </button>
          </div>
        ) : (
          <div>
            {/* 联系方式切换（注册和找回密码时显示） */}
            {mode !== 'login' && (
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
                <button
                  onClick={() => { setContactType('email'); setError(''); }}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    contactType === 'email' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  邮箱
                </button>
                <button
                  onClick={() => { setContactType('phone'); setError(''); }}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    contactType === 'phone' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  手机号
                </button>
              </div>
            )}

            {/* 用户名（仅注册） */}
            {mode === 'register' && (
              <>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="你的昵称"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
              </>
            )}

            {/* 账号（邮箱/手机号） */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'login' ? '邮箱或手机号' : contactType === 'email' ? '邮箱地址' : '手机号码'}
            </label>
            <input
              type={contactType === 'email' || mode === 'login' ? 'email' : 'tel'}
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder={mode === 'login' ? 'your@email.com 或 13800138000' : contactType === 'email' ? 'your@email.com' : '13800138000'}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />

            {/* 密码 */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'forgot' ? '新密码' : '密码'}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'forgot' ? '输入新密码（至少 6 位）' : '输入密码（至少 6 位）'}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />

            {/* 确认密码（注册和找回密码） */}
            {(mode === 'register' || mode === 'forgot') && (
              <>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  确认密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                  onKeyDown={e => e.key === 'Enter' && (mode === 'register' ? handleRegisterSendCode() : handleForgotSendCode())}
                />
              </>
            )}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* 主按钮 */}
            <button
              onClick={
                mode === 'login' ? handleLogin
                : mode === 'register' ? handleRegisterSendCode
                : handleForgotSendCode
              }
              disabled={!contact || !password || loading}
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {loading ? '处理中...' :
                mode === 'login' ? '登录' :
                mode === 'register' ? '获取验证码' :
                '获取验证码'}
            </button>

            {/* 切换模式链接 */}
            <div className="text-center space-y-2">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => switchMode('register')}
                    className="block w-full text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    没有账号？立即注册
                  </button>
                  <button
                    onClick={() => switchMode('forgot')}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    忘记密码？
                  </button>
                </>
              )}
              {mode === 'register' && (
                <button
                  onClick={() => switchMode('login')}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  已有账号？直接登录
                </button>
              )}
              {mode === 'forgot' && (
                <button
                  onClick={() => switchMode('login')}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  返回登录
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
