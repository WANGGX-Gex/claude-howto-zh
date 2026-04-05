import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/Breadcrumb';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function RoadmapPage() {
  const content = fs.readFileSync(path.join(process.cwd(), '..', 'LEARNING-ROADMAP.md'), 'utf-8');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: '学习路径' }]} />
      <MarkdownRenderer content={content} />
    </div>
  );
}
