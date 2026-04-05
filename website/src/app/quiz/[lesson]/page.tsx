import { parseQuestionBank } from '@/lib/quiz';
import Breadcrumb from '@/components/Breadcrumb';
import Quiz from '@/components/Quiz';
import Link from 'next/link';

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ lesson: String(i + 1) }));
}

export default async function QuizPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  const lessonNum = parseInt(lesson, 10);
  const allLessons = parseQuestionBank();
  const quizData = allLessons.find(l => l.lesson === lessonNum);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: '测验', href: '/quiz/1' },
        { label: quizData ? `Lesson ${lessonNum}: ${quizData.title}` : `Lesson ${lessonNum}` },
      ]} />

      {/* Lesson selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allLessons.map(l => (
          <Link
            key={l.lesson}
            href={`/quiz/${l.lesson}`}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              l.lesson === lessonNum
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {l.lesson}. {l.title}
          </Link>
        ))}
      </div>

      {quizData && quizData.questions.length > 0 ? (
        <Quiz lesson={lessonNum} title={quizData.title} questions={quizData.questions} />
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">暂无测验题目</h2>
          <p className="text-gray-500 dark:text-gray-400">该课程的测验题目尚未添加</p>
        </div>
      )}
    </div>
  );
}
