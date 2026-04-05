'use client';

import { useState, type ReactNode } from 'react';

export default function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  const getTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (typeof node === 'object' && 'props' in node) {
      return getTextContent((node as { props: { children?: ReactNode } }).props.children);
    }
    return '';
  };

  const handleCopy = async () => {
    const text = getTextContent(children);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace('language-', '') || '';

  return (
    <div className="relative group my-4">
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-800 dark:bg-gray-950 rounded-tl-lg rounded-br-lg">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
        title="复制代码"
      >
        {copied ? '✓ 已复制' : '复制'}
      </button>
      <pre className={`${className || ''} bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 pt-8 overflow-x-auto text-sm leading-relaxed`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
