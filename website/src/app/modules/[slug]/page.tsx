import { getModules, getModule, getModuleSlugs } from '@/lib/modules';
import Breadcrumb from '@/components/Breadcrumb';
import ModulePageClient from './ModulePageClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getModuleSlugs().map(slug => ({ slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const allModules = getModules();
  const currentIndex = allModules.findIndex(m => m.slug === slug);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const sidebarModules = allModules.map(m => ({
    slug: m.slug,
    title: m.title,
    order: m.order,
    level: m.level,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: '学习模块', href: '/modules' },
        { label: mod.title },
      ]} />

      <ModulePageClient
        module={{
          slug: mod.slug,
          title: mod.title,
          description: mod.description,
          level: mod.level,
          duration: mod.duration,
          complexity: mod.complexity,
          content: mod.content,
          subPages: mod.subPages.map(s => ({
            slug: s.slug,
            title: s.title,
            content: s.content,
          })),
        }}
        sidebarModules={sidebarModules}
        totalModules={allModules.length}
        prevModule={prevModule ? { slug: prevModule.slug, title: prevModule.title } : null}
        nextModule={nextModule ? { slug: nextModule.slug, title: nextModule.title } : null}
        quizLesson={mod.order}
      />
    </div>
  );
}
