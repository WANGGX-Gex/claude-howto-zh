'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import MermaidDiagram from './MermaidDiagram';
import CodeBlock from './CodeBlock';
import type { Components } from 'react-markdown';

export default function MarkdownRenderer({ content }: { content: string }) {
  // 处理 <picture> 标签和相对图片路径
  const processed = content
    .replace(/<picture>[\s\S]*?<\/picture>/g, '')
    .replace(/^\s*\[.*?\]\(resources\/logos\/.*?\)\s*$/gm, '')
    .replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/)([\w./-]+\.(?:png|jpg|jpeg|gif|svg|webp))\)/gi,
      (_match, alt, src) => `![${alt}](/images/${src.split('/').pop()})`);

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match && !className;

      if (match && match[1] === 'mermaid') {
        return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
      }

      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }

      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    h1({ children }) {
      return <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">{children}</h4>;
    },
    p({ children }) {
      return <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">{children}</p>;
    },
    em({ children }) {
      return <em className="italic text-gray-700 dark:text-gray-200">{children}</em>;
    },
    a({ href, children }) {
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          className="text-purple-600 dark:text-purple-400 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {isExternal && <span className="text-xs ml-0.5">↗</span>}
        </a>
      );
    },
    ul({ children }) {
      return <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-200">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-200">{children}</ol>;
    },
    li({ children }) {
      return <li className="leading-relaxed text-gray-700 dark:text-gray-200">{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-50 dark:bg-purple-900/20 text-gray-700 dark:text-gray-200 rounded-r-lg">
          {children}
        </blockquote>
      );
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>;
    },
    th({ children }) {
      return <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">{children}</th>;
    },
    td({ children }) {
      return <td className="px-4 py-3 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">{children}</td>;
    },
    hr() {
      return <hr className="my-8 border-gray-200 dark:border-gray-700" />;
    },
    img({ src, alt }) {
      if (!src) return null;
      return (
        <span className="block my-4">
          <img src={src} alt={alt || ''} className="max-w-full rounded-lg shadow-md" />
        </span>
      );
    },
    strong({ children }) {
      return <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>;
    },
  };

  return (
    <div className="prose-wrapper max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
