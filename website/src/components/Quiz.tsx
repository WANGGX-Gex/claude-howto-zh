'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/types';
import { saveQuizScore } from '@/lib/progress';

interface QuizProps {
  lesson: number;
  title: string;
  questions: QuizQuestion[];
}

export default function Quiz({ lesson, title, questions }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selected: string; correct: boolean }>>({});

  const question = questions[currentQ];
  if (!question) return <p>暂无题目</p>;

  const handleSelect = (label: string) => {
    if (showResult) return;
    setSelected(label);
  };

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === question.correct;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setShowResult(true);
    setAnswers(prev => ({ ...prev, [currentQ]: { selected, correct } }));
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      const finalScore = Math.round((score / questions.length) * 100);
      saveQuizScore(`lesson-${lesson}`, finalScore);
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers({});
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            测验完成！
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {title}
          </p>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            {score}/{questions.length} ({pct}%)
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
            <div
              className={`h-3 rounded-full transition-all ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {pct >= 80 ? '太棒了！你对这个主题掌握得很好。' : pct >= 60 ? '还不错！建议回顾一下错误的题目。' : '建议重新学习这个模块后再试。'}
          </p>

          {/* 答题回顾 */}
          <div className="text-left mb-6 space-y-3">
            {questions.map((q, i) => {
              const ans = answers[i];
              return (
                <div key={i} className={`p-3 rounded-lg text-sm ${ans?.correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <div className="flex items-start gap-2">
                    <span>{ans?.correct ? '✅' : '❌'}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Q{i + 1}: {q.question}</p>
                      {!ans?.correct && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          正确答案: {q.correct}) {q.options.find(o => o.label === q.correct)?.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            重新测验
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 进度指示 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          第 {currentQ + 1}/{questions.length} 题
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          question.category === 'conceptual'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        }`}>
          {question.category === 'conceptual' ? '概念题' : '实践题'}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-purple-500 transition-all"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      {/* 题目 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map(opt => {
            let style = 'border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500';
            if (showResult) {
              if (opt.label === question.correct) {
                style = 'border-green-500 bg-green-50 dark:bg-green-900/30';
              } else if (opt.label === selected && !answers[currentQ]?.correct) {
                style = 'border-red-500 bg-red-50 dark:bg-red-900/30';
              }
            } else if (selected === opt.label) {
              style = 'border-purple-500 bg-purple-50 dark:bg-purple-900/30';
            }

            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}
              >
                <span className="font-medium text-gray-500 dark:text-gray-400 mr-3">{opt.label})</span>
                <span className="text-gray-800 dark:text-gray-200">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* 解释 */}
        {showResult && (
          <div className={`p-4 rounded-xl mb-4 ${
            answers[currentQ]?.correct
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
          }`}>
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
              {answers[currentQ]?.correct ? '✅ 正确！' : '❌ 不正确'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{question.explanation}</p>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {currentQ + 1 >= questions.length ? '查看结果' : '下一题 →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
