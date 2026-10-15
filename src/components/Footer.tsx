import React from 'react';
import { HeartHandshake, ShieldCheck, MapPin, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenTest: () => void;
  onOpenMahr: () => void;
  onOpenAdvice: () => void;
  onOpenVideo?: () => void;
  onOpenPricing?: () => void;
  onOpenFAQ?: () => void;
  onOpenRequests?: () => void;
  onOpenCreateProfile?: () => void;
  requestsCount?: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTest,
  onOpenMahr,
  onOpenAdvice,
  onOpenVideo,
  onOpenPricing,
  onOpenFAQ,
  onOpenRequests,
  onOpenCreateProfile,
  requestsCount = 0,
}) => {
  return (
    <footer className="border-t border-stone-200 bg-white py-12 text-stone-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission Niger */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800 text-amber-200">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-emerald-950">
                Mawadda Niger
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              Plateforme matrimoniale islamique en République du Niger. Bâtie sur le Coran et la noble Sunnah pour faciliter les mariages bénis et accompagner les couples vers la quiétude (Sakinah).
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-stone-500">
              <MapPin className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
              <span>Niamey, Niger · Couverture nationale (8 régions)</span>
            </div>
          </div>

          {/* Outils & Fiqh Conjugal */}
          <div>
            <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-wider">
              Outils & Fiqh Conjugal
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAdvice}
                  className="hover:text-emerald-800 transition text-left flex items-center gap-1.5"
                >
                  <BookOpen className="h-3 w-3 text-emerald-700" />
                  <span>Conseils & Fiqh de couple</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTest}
                  className="hover:text-emerald-800 transition text-left"
                >
                  Test d'alignement prénuptial
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMahr}
                  className="hover:text-emerald-800 transition text-left"
                >
                  Simulateur du Sadaki (Dot Sunnah)
                </button>
              </li>
              {onOpenVideo && (
                <li>
                  <button
                    onClick={onOpenVideo}
                    className="hover:text-emerald-800 transition text-left text-amber-900 font-medium"
                  >
                    Vidéo de présentation (2 min)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Démarches & Espace Compte */}
          <div>
            <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-wider">
              Démarches & Espaces
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {onOpenRequests && (
                <li>
                  <button
                    onClick={onOpenRequests}
                    className="hover:text-emerald-800 transition text-left flex items-center gap-1.5 font-medium text-stone-800"
                  >
                    <span>Mes Démarches (Khitbah)</span>
                    {requestsCount > 0 && (
                      <span className="rounded-full bg-emerald-850 px-1.5 py-0.2 text-[10px] font-bold text-white bg-emerald-800">
                        {requestsCount}
                      </span>
                    )}
                  </button>
                </li>
              )}
              {onOpenCreateProfile && (
                <li>
                  <button
                    onClick={onOpenCreateProfile}
                    className="hover:text-emerald-800 transition text-left text-emerald-800 font-medium"
                  >
                    Créer mon profil de Zawaj
                  </button>
                </li>
              )}
              {onOpenPricing && (
                <li>
                  <button
                    onClick={onOpenPricing}
                    className="hover:text-emerald-800 transition text-left font-semibold text-stone-900"
                  >
                    Formules : Gratuit & Premium à 2 000 F
                  </button>
                </li>
              )}
              {onOpenFAQ && (
                <li>
                  <button
                    onClick={onOpenFAQ}
                    className="hover:text-emerald-800 transition text-left"
                  >
                    Foire Aux Questions (FAQ)
                  </button>
                </li>
              )}
              <li>
                <span className="text-stone-400">
                  Médiation familiale Al-Nasiha
                </span>
              </li>
            </ul>
          </div>

          {/* Charte & Éthique Sharia */}
          <div>
            <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-wider">
              Charte & Éthique Islamique
            </h4>
            <div className="mt-3 space-y-2.5 text-xs text-stone-500 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span>Implication systématique du Tuteur Légal (Wali) pour la pudeur et l'honneur.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span>Règlement Mobile Money sécurisé par Airtel Money (*400#) & Moov Money (*155#).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span>Protection stricte des données personnelles et modération active.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Mawadda Niger. Tous droits réservés.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-stone-500">
            « Wa baynahum Mawaddatan wa Rahmah » — Sourate Ar-Rum (30:21)
          </p>
        </div>
      </div>
    </footer>
  );
};
