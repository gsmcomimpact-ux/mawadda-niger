import React, { useState, useMemo } from 'react';
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  CreditCard,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { FAQItem, FAQCategory } from '../types';
import { FAQ_ITEMS } from '../data/mockData';

interface FAQSectionProps {
  onOpenPricing: () => void;
  onOpenAdvice: () => void;
}

const CATEGORIES: { id: FAQCategory; label: string }[] = [
  { id: 'tous', label: 'Toutes les questions' },
  { id: 'halal', label: 'Éthique & Charia' },
  { id: 'khitbah', label: 'Démarches & Tuteur (Wali)' },
  { id: 'pricing', label: 'Tarifs & Mobile Money' },
  { id: 'security', label: 'Sécurité & Pudeur' },
  { id: 'counseling', label: 'Conseil Al-Nasiha' },
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenPricing,
  onOpenAdvice,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('tous');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'tous' || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.hadithOrRef && item.hadithOrRef.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-stone-50 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Foire Aux Questions</span>
            <span aria-hidden="true">·</span>
            <span>Mawadda Niger</span>
            <span aria-hidden="true">·</span>
            <span>Réponses Claires & Fiqh</span>
          </div>

          <h1
            className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Toutes les Réponses à Vos Questions
          </h1>

          <p className="mt-3 text-sm text-stone-600 sm:text-base leading-relaxed">
            Consultez les réponses détaillées sur le fonctionnement de notre plateforme de mariage islamique, le rôle du tuteur légal (Wali), nos tarifs en FCFA et la sécurité de vos données au Niger.
          </p>

          {/* Search Box */}
          <div className="mt-6 relative max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question (ex: tuteur, sadaki, airtel, pudeur, prix)..."
              className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-xs shadow-xs focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions List */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <HelpCircle className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="mt-2 font-serif text-sm font-bold text-stone-800">
                Aucune question trouvée pour « {searchQuery} »
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Essayez d'autres mots-clés ou réinitialisez le filtre de recherche.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('tous');
                }}
                className="mt-4 rounded-md bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-200"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all ${
                    isOpen
                      ? 'border-emerald-800/40 bg-white shadow-sm ring-1 ring-emerald-800/10'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-stone-900 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <span className="shrink-0 rounded-full p-1 text-stone-400 hover:text-stone-600 bg-stone-100">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 border-t border-stone-100 pt-3 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                      <p>{faq.answer}</p>

                      {faq.hadithOrRef && (
                        <div className="rounded-lg bg-emerald-50/70 p-3 border-l-3 border-emerald-800 text-xs text-emerald-950 font-serif italic">
                          {faq.hadithOrRef}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support & Extra Help Card */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-amber-200">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                  Vous avez une autre question ou besoin d'assistance ?
                </h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed max-w-xl">
                  Notre équipe de médiation et d'assistance est joignable à Niamey du lundi au samedi. Nous pouvons également répondre aux questions directes de votre tuteur légal (Wali).
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-700">
                  <span>📞 +227 96 00 00 00 (Airtel)</span>
                  <span aria-hidden="true">·</span>
                  <span>📱 +227 88 00 00 00 (Moov / WhatsApp)</span>
                  <span aria-hidden="true">·</span>
                  <span>✉️ contact@mawadda-niger.ne</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenPricing}
                className="rounded-md bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                Voir les formules & tarifs
              </button>
              <button
                onClick={onOpenAdvice}
                className="rounded-md border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                Conseils conjugaux Fiqh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
