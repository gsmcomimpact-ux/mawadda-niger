import React, { useState } from 'react';
import { AdviceArticle } from '../types';
import { BookOpen, Sparkles, Send, CheckCircle2, HeartHandshake, ShieldAlert, HelpCircle } from 'lucide-react';

interface AdviceHubProps {
  articles: AdviceArticle[];
  onOpenArticle: (article: AdviceArticle) => void;
}

export const AdviceHub: React.FC<AdviceHubProps> = ({ articles, onOpenArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiTopic, setAiTopic] = useState<string>('Vie de couple');
  const [coupleStatus, setCoupleStatus] = useState<string>('Fiancé(e) / En recherche');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const categories = ['Tous', 'Fiançailles & Mahr', 'Droits & Devoirs', 'Conflits & Famille'];

  const filteredArticles = selectedCategory === 'Tous'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const handleAskAi = async (customPrompt?: string) => {
    const questionToAsk = customPrompt || aiQuestion;
    if (!questionToAsk.trim()) return;

    setIsLoadingAi(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          topic: aiTopic,
          coupleStatus: coupleStatus,
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la consultation.');
      }

      const data = await res.json();
      setAiResponse(data.advice);
    } catch (err: any) {
      setAiError(err.message || 'Impossible de joindre le conseiller conjugal.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const presetQuestions = [
    'Comment aborder la question du montant de la dot (Sadaki) avec la belle-famille sans friction au Niger ?',
    'Quels sont les devoirs stricts de l\'époux concernant la prise en charge financière (Nafaqah) ?',
    'Comment désamorcer un conflit récurrent dans le couple selon la Sourate An-Nisa (4:35) ?',
    'Quelles sont les conditions de justice absolue et de transparence pour la polygamie en Islam ?',
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner / Ambience */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-6 sm:p-10 lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <span>Al-Nasiha Fil-Zawaj</span>
              <span aria-hidden="true">·</span>
              <span>Fiqh & Sagesse Sahélienne</span>
            </div>
            <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" style={{ textWrap: 'balance' }}>
              Espace de Conseil Conjugal & Éthique du Mariage en Islam
            </h1>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              Le mariage en Islam requiert préparation, maturité et compréhension mutuelle. Retrouvez des repères authentiques issus du Coran et de la tradition prophétique, enrichis des enseignements des oulémas pour la sérénité des foyers au Niger.
            </p>
          </div>

          <div className="lg:col-span-5 h-48 lg:h-full relative overflow-hidden">
            <img
              src="/assets/images/islamic_counseling_niger_1791126370570.jpg"
              alt="Espace de sagesse et de conseil islamique au Niger"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Islamic Marital Advisor Interactive Section */}
      <div className="mt-10 rounded-xl border border-emerald-800/30 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800 text-amber-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Conseiller Conjugal Virtuel Al-Nasiha
            </h2>
            <p className="text-xs text-stone-600">
              Posez en toute discrétion vos questions sur la vie de couple, les fiançailles ou la belle-famille selon la jurisprudence islamique et le contexte du Niger.
            </p>
          </div>
        </div>

        {/* Preset prompts */}
        <div className="mt-5">
          <div className="text-xs font-semibold text-stone-700 mb-2">
            Questions fréquentes au Niger (cliquez pour poser) :
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAiQuestion(q);
                  handleAskAi(q);
                }}
                className="text-left rounded-md border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-700 hover:bg-emerald-50 hover:border-emerald-300 transition"
              >
                « {q} »
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Ex : Comment gérer le désaccord avec ma belle-mère avec douceur ?"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskAi();
            }}
            className="flex-1 rounded-md border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          <button
            onClick={() => handleAskAi()}
            disabled={isLoadingAi || !aiQuestion.trim()}
            className="flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 disabled:opacity-50 transition whitespace-nowrap"
          >
            {isLoadingAi ? (
              <span>Consultation en cours...</span>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Consulter Al-Nasiha</span>
              </>
            )}
          </button>
        </div>

        {/* AI Answer Display */}
        {aiResponse && (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>Avis et Conseils d'Al-Nasiha :</span>
            </div>
            <div className="mt-3 text-xs leading-relaxed text-stone-800 whitespace-pre-line font-sans space-y-2">
              {aiResponse}
            </div>
          </div>
        )}

        {aiError && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {aiError}
          </div>
        )}
      </div>

      {/* Structured Articles Grid */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Guides Pratiques & Enseignements Islamiques
            </h2>
            <p className="mt-1 text-xs text-stone-600">
              Articles rédigés à la lumière du Fiqh malikite usuel au Sahel et de la Sunnah prophétique.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-100 rounded-lg">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-6 shadow-xs transition hover:border-emerald-700 hover:shadow-md"
            >
              <div>
                {/* Zero-pill metadata text */}
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-emerald-800">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readingTime}</span>
                </div>

                <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">
                  {art.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {art.summary}
                </p>

                <div className="mt-3 rounded bg-stone-50 p-2.5 text-xs italic text-stone-700 border-l-2 border-emerald-700">
                  Référence : {art.quranRef}
                </div>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-4 flex items-center justify-between">
                <button
                  onClick={() => onOpenArticle(art)}
                  className="rounded-md border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition whitespace-nowrap"
                >
                  Lire l'article complet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
