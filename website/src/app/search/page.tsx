import { getModules } from '@/lib/modules';
import Breadcrumb from '@/components/Breadcrumb';
import SearchClient from './SearchClient';

export default function SearchPage() {
  const modules = getModules();
  const searchData = modules.map(m => ({
    slug: m.slug,
    title: m.title,
    description: m.description,
    content: m.content,
    subPages: m.subPages.map(s => ({
      slug: s.slug,
      title: s.title,
      content: s.content,
    })),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: '搜索' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🔍 搜索</h1>
      <SearchClient modules={searchData} />
    </div>
  );
}
