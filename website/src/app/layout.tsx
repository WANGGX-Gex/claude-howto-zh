import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Claude Code 学习指南",
  description: "一个周末掌握 Claude Code — 交互式中文学习平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>基于 <a href="https://github.com/luongnv89/claude-howto" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">claude-howto</a> 中文翻译版</p>
              <p className="mt-1">MIT 许可证 | <a href="https://github.com/WANGGX-Gex/claude-howto-zh" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
