import fs from 'fs';
import path from 'path';
import type { QuizLesson, QuizQuestion } from '@/types';

const LESSON_TITLES: Record<number, string> = {
  1: '斜杠命令',
  2: '记忆',
  3: '技能',
  4: '子代理',
  5: 'MCP',
  6: '钩子',
  7: '插件',
  8: '检查点',
  9: '高级功能',
  10: 'CLI 参考',
};

export function parseQuestionBank(): QuizLesson[] {
  const bankPath = path.join(process.cwd(), '..', '.claude', 'skills', 'lesson-quiz', 'references', 'question-bank.md');
  if (!fs.existsSync(bankPath)) return [];

  const content = fs.readFileSync(bankPath, 'utf-8');
  const lessons: QuizLesson[] = [];
  const lessonBlocks = content.split(/^## (?:Lesson|课程) \d+[：:]/m).slice(1);

  for (let i = 0; i < lessonBlocks.length; i++) {
    const lessonNum = i + 1;
    const block = lessonBlocks[i];
    const questions: QuizQuestion[] = [];

    const questionBlocks = block.split(/^### Q\d+/m).slice(1);
    for (let q = 0; q < questionBlocks.length; q++) {
      const qBlock = questionBlocks[q];
      const category = qBlock.match(/\*\*Category\*\*:\s*(\w+)/)?.[1] as 'conceptual' | 'practical' || 'conceptual';
      const question = qBlock.match(/\*\*Question\*\*:\s*(.+)/)?.[1] || '';
      const optionsRaw = qBlock.match(/\*\*Options\*\*:\s*(.+)/)?.[1] || '';
      const correct = qBlock.match(/\*\*Correct\*\*:\s*(\w)/)?.[1] || 'A';
      const explanation = qBlock.match(/\*\*Explanation\*\*:\s*(.+)/)?.[1] || '';
      const review = qBlock.match(/\*\*Review\*\*:\s*(.+)/)?.[1] || '';

      const options = optionsRaw.split(/\s*\|\s*/).map(opt => {
        const match = opt.match(/^([A-D])\)\s*(.+)/);
        return match ? { label: match[1], text: match[2] } : { label: '?', text: opt };
      });

      questions.push({
        id: `L${lessonNum}Q${q + 1}`,
        category,
        question,
        options,
        correct,
        explanation,
        review,
      });
    }

    lessons.push({
      lesson: lessonNum,
      title: LESSON_TITLES[lessonNum] || `Lesson ${lessonNum}`,
      questions,
    });
  }

  return lessons;
}

export function getQuizForLesson(lessonNum: number): QuizLesson | undefined {
  return parseQuestionBank().find(l => l.lesson === lessonNum);
}
