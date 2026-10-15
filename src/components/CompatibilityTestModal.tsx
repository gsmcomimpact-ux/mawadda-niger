import React, { useState } from 'react';
import { COMPATIBILITY_QUESTIONS } from '../data/mockData';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CompatibilityTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompatibilityTestModal: React.FC<CompatibilityTestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = COMPATIBILITY_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentStep < COMPATIBILITY_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate score
  const totalScore = Object.entries(answers).reduce((sum, [qId, optIdx]) => {
    const q = COMPATIBILITY_QUESTIONS.find((item) => item.id === Number(qId));
    if (q && q.options[optIdx]) {
      return sum + q.options[optIdx].scoreWeight;
    }
    return sum;
  }, 0);

  const maxScore = COMPATIBILITY_QUESTIONS.length * 3;
  const scorePercent = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>Évaluation Prénuptiale</span>
              <span aria-hidden="true">·</span>
              <span>Guide de la Mouqabala</span>
            </div>
            <h2 className="mt-1 font-serif text-xl font-bold text-stone-900 sm:text-2xl">
              Test d'Alignement Conjugal & Valeurs en Islam
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            ✕
          </button>
        </div>

        {!isCompleted ? (
          <div className="mt-6">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>Question {currentStep + 1} sur {COMPATIBILITY_QUESTIONS.length}</span>
              <span className="font-mono tabular-nums font-semibold text-emerald-800">
                {Math.round(((currentStep + 1) / COMPATIBILITY_QUESTIONS.length) * 100)} %
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-stone-100">
              <div
                className="h-1.5 rounded-full bg-emerald-800 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / COMPATIBILITY_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <div className="mt-6">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                {currentQ.theme}
              </span>
              <h3 className="mt-1 font-serif text-lg font-bold text-stone-900 sm:text-xl">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="mt-5 space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full text-left rounded-xl border p-4 transition ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/60 ring-1 ring-emerald-800'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {opt.label}
                        </span>
                        <div className="text-xs sm:text-sm text-stone-800 font-normal leading-relaxed">
                          {opt.text}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-5">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="rounded-md border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined}
                className="flex items-center gap-1.5 rounded-md bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>{currentStep === COMPATIBILITY_QUESTIONS.length - 1 ? 'Voir le Bilan' : 'Suivant'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Report */
          <div className="mt-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-stone-900">
                Bilan de Préparation Matrimoniale
              </h3>
              <p className="mt-1 text-xs text-stone-600">
                Vos réponses indiquent votre niveau d'alignement avec les fondements islamiques du mariage et les coutumes saines au Niger.
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="font-mono text-3xl font-extrabold text-emerald-900 tabular-nums">
                  {scorePercent} %
                </span>
                <span className="text-xs text-stone-600">
                  d'alignement avec la vision prophétique du couple
                </span>
              </div>
            </div>

            {/* Recommendations per theme */}
            <div className="mt-6 space-y-4">
              <h4 className="font-serif text-sm font-bold text-stone-900">
                Synthèse de vos orientations pour les échanges de Mouqabala :
              </h4>

              {COMPATIBILITY_QUESTIONS.map((q) => {
                const ansIdx = answers[q.id];
                const selectedOpt = q.options[ansIdx];
                return (
                  <div key={q.id} className="rounded-lg border border-stone-200 p-3.5 text-xs bg-stone-50">
                    <div className="font-semibold text-emerald-900">{q.theme}</div>
                    <div className="mt-1 text-stone-700 italic">« {selectedOpt.text} »</div>
                    <div className="mt-1.5 text-stone-600 font-medium">
                      💡 Repère islamique : {selectedOpt.insight}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-md border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Recommencer le test</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-md bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
              >
                Terminer & Retourner aux profils
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
