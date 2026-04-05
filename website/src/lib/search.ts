import type { Module, SearchResult } from '@/types';

export function searchModules(modules: Module[], query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const mod of modules) {
    // 搜索模块主内容
    const contentText = stripMarkdown(mod.content);
    if (mod.title.toLowerCase().includes(q) || mod.description.toLowerCase().includes(q) || contentText.toLowerCase().includes(q)) {
      const excerpt = extractExcerpt(contentText, q);
      results.push({
        title: mod.title,
        slug: `/modules/${mod.slug}`,
        excerpt,
        module: mod.title,
      });
    }

    // 搜索子页面
    for (const sub of mod.subPages) {
      const subText = stripMarkdown(sub.content);
      if (sub.title.toLowerCase().includes(q) || subText.toLowerCase().includes(q)) {
        const excerpt = extractExcerpt(subText, q);
        results.push({
          title: sub.title,
          slug: `/modules/${mod.slug}?sub=${sub.slug}`,
          excerpt,
          module: mod.title,
        });
      }
    }
  }

  return results.slice(0, 20);
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')     // 代码块
    .replace(/`[^`]+`/g, '')             // 行内代码
    .replace(/!\[.*?\]\(.*?\)/g, '')     // 图片
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // 链接 → 显示文本
    .replace(/#{1,6}\s+/g, '')           // 标题标记
    .replace(/[*_~]+/g, '')              // 强调
    .replace(/\|/g, ' ')                 // 表格分隔
    .replace(/-{3,}/g, '')               // 水平线
    .replace(/\n{2,}/g, '\n');
}

function extractExcerpt(text: string, query: string): string {
  const idx = text.toLowerCase().indexOf(query);
  if (idx < 0) return text.slice(0, 150) + '...';
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, idx + query.length + 90);
  let excerpt = text.slice(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt += '...';
  return excerpt;
}
