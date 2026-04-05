'use client';

import type { User } from '@/types';

const USER_KEY = 'claude-howto-user';
const USERS_KEY = 'claude-howto-users';

// --- 密码哈希（Web Crypto API, SHA-256） ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'claude-howto-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- 验证码 ---

export function sendVerificationCode(contact: string, _type: 'phone' | 'email'): string {
  // 演示模式：生成随机 6 位验证码并存储
  // 生产环境应替换为火山引擎短信 API 或邮件服务
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('verification-code', code);
    sessionStorage.setItem('verification-contact', contact);
  }
  return code;
}

export function verifyCode(inputCode: string, contact: string): boolean {
  if (typeof window === 'undefined') return false;
  const storedCode = sessionStorage.getItem('verification-code');
  const storedContact = sessionStorage.getItem('verification-contact');
  return inputCode === storedCode && contact === storedContact;
}

function clearVerificationCode(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('verification-code');
  sessionStorage.removeItem('verification-contact');
}

// --- 用户存储 ---

function getAllUsers(): User[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveAllUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByContact(contact: string): User | undefined {
  return getAllUsers().find(u => u.contact === contact);
}

// --- 当前用户 ---

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// --- 注册 ---

export async function registerUser(
  contact: string,
  contactType: 'phone' | 'email',
  username: string,
  password: string,
): Promise<{ success: boolean; error?: string; user?: User }> {
  const existing = findUserByContact(contact);
  if (existing) {
    return { success: false, error: '该账号已注册，请直接登录' };
  }

  const passwordHash = await hashPassword(password);
  const user: User = {
    id: crypto.randomUUID(),
    username,
    contact,
    contactType,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  const users = getAllUsers();
  users.push(user);
  saveAllUsers(users);
  setCurrentUser(user);
  clearVerificationCode();
  return { success: true, user };
}

// --- 登录 ---

export async function loginUser(
  contact: string,
  password: string,
): Promise<{ success: boolean; error?: string; user?: User }> {
  const user = findUserByContact(contact);
  if (!user) {
    return { success: false, error: '账号不存在，请先注册' };
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    return { success: false, error: '密码错误' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

// --- 找回密码（重置） ---

export async function resetPassword(
  contact: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.contact === contact);
  if (idx < 0) {
    return { success: false, error: '账号不存在' };
  }

  users[idx].passwordHash = await hashPassword(newPassword);
  saveAllUsers(users);

  // 如果当前登录的是这个用户，更新当前用户
  const current = getCurrentUser();
  if (current && current.id === users[idx].id) {
    setCurrentUser(users[idx]);
  }

  clearVerificationCode();
  return { success: true };
}

// --- 修改密码（需要旧密码） ---

export async function changePassword(
  oldPassword: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  const user = getCurrentUser();
  if (!user) return { success: false, error: '未登录' };

  const oldHash = await hashPassword(oldPassword);
  if (user.passwordHash !== oldHash) {
    return { success: false, error: '原密码错误' };
  }

  const newHash = await hashPassword(newPassword);
  user.passwordHash = newHash;
  setCurrentUser(user);

  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
    saveAllUsers(users);
  }

  return { success: true };
}

// --- 更新用户名 ---

export function updateUsername(newName: string): User | null {
  const user = getCurrentUser();
  if (!user) return null;
  user.username = newName;
  setCurrentUser(user);

  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
    saveAllUsers(users);
  }
  return user;
}

// --- 退出登录 ---

export function logoutUser(): void {
  localStorage.removeItem(USER_KEY);
}

// --- 检查账号是否存在 ---

export function isContactRegistered(contact: string): boolean {
  return !!findUserByContact(contact);
}
