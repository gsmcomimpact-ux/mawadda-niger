import React from 'react';
import { AdviceArticle } from '../types';
import { BookOpen, CheckCircle, Share2 } from 'lucide-react';

interface ArticleModalProps {
  article: AdviceArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <h2 className="mt-1 font-serif text-xl font-bold text-stone-900 sm:text-2xl">
              {article.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {/* Reference Banner */}
          <div className="rounded-lg border-l-4 border-emerald-700 bg-emerald-50/60 p-4 text-xs italic text-stone-800">
            <strong>Sources scripturaires :</strong> {article.quranRef}
          </div>

          {/* Body paragraphs */}
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Practical Tips */}
          <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-800" />
              <span>Conseils pratiques pour les foyers au Niger :</span>
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-stone-700">
              {article.practicalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-800 shrink-0">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-stone-200 pt-4">
          <button
            onClick={onClose}
            className="rounded-md bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
          >
            Fermer le guide
          </button>
        </div>
      </div>
    </div>
  );
};
