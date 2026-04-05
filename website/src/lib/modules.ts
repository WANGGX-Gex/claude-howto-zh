import fs from 'fs';
import path from 'path';
import type { Module, SubPage } from '@/types';

const CONTENT_ROOT = path.join(process.cwd(), '..');

const MODULE_META: Record<string, { title: string; level: 1 | 2 | 3; duration: string; complexity: string; description: string }> = {
  '01-slash-commands': { title: '斜杠命令', level: 1, duration: '30 分钟', complexity: '⭐', description: '快速提升生产力——55+ 内置命令 + 5 个捆绑技能' },
  '02-memory': { title: '记忆', level: 1, duration: '45 分钟', complexity: '⭐⭐', description: '所有功能的基础——持久化上下文与个人偏好' },
  '03-skills': { title: '技能', level: 2, duration: '1 小时', complexity: '⭐⭐', description: '自动化专业能力——可复用能力与一致性' },
  '04-subagents': { title: '子代理', level: 2, duration: '1.5 小时', complexity: '⭐⭐⭐', description: '复杂任务处理——6 个内置代理，任务委派与专业化' },
  '05-mcp': { title: 'MCP', level: 2, duration: '1 小时', complexity: '⭐⭐⭐', description: '模型上下文协议——实时数据访问与 API 集成' },
  '06-hooks': { title: '钩子', level: 2, duration: '1 小时', complexity: '⭐⭐', description: '工作流自动化——25 个事件、4 种类型' },
  '07-plugins': { title: '插件', level: 3, duration: '2 小时', complexity: '⭐⭐⭐⭐', description: '完整解决方案——团队入门与分发' },
  '08-checkpoints': { title: '检查点', level: 1, duration: '45 分钟', complexity: '⭐⭐', description: '安全探索——实验与恢复' },
  '09-advanced-features': { title: '高级功能', level: 3, duration: '2-3 小时', complexity: '⭐⭐⭐⭐⭐', description: '规划模式、自动模式、权限控制等高级工具' },
  '10-cli': { title: 'CLI 参考', level: 1, duration: '30 分钟', complexity: '⭐⭐', description: '命令行界面——交互与打印模式、脚本和 CI/CD' },
};

const LEARNING_ORDER = [
  '01-slash-commands', '02-memory', '08-checkpoints', '10-cli',
  '03-skills', '06-hooks', '05-mcp', '04-subagents',
  '09-advanced-features', '07-plugins',
];

export function getModules(): Module[] {
  return LEARNING_ORDER.map((slug, index) => {
    const meta = MODULE_META[slug];
    const dirPath = path.join(CONTENT_ROOT, slug);
    const readmePath = path.join(dirPath, 'README.md');
    const content = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';

    const subPages: SubPage[] = [];
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'README.md');
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const titleMatch = fileContent.match(/^#\s+(.+)$/m);
        subPages.push({
          slug: file.replace('.md', ''),
          title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
          content: fileContent,
        });
      }
    }

    return {
      slug,
      title: meta.title,
      description: meta.description,
      order: index + 1,
      level: meta.level,
      duration: meta.duration,
      complexity: meta.complexity,
      content,
      subPages,
    };
  });
}

export function getModule(slug: string): Module | undefined {
  return getModules().find(m => m.slug === slug);
}

export function getModuleSlugs(): string[] {
  return LEARNING_ORDER;
}

export function getExtraPages(): { slug: string; title: string; content: string }[] {
  const extras = ['LEARNING-ROADMAP.md', 'QUICK_REFERENCE.md', 'claude_concepts_guide.md', 'CATALOG.md'];
  return extras.map(file => {
    const filePath = path.join(CONTENT_ROOT, file);
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return {
      slug: file.replace('.md', '').toLowerCase(),
      title: titleMatch ? titleMatch[1].replace(/[📚🗺️📊]/g, '').trim() : file,
      content,
    };
  });
}
