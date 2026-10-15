import React from 'react';
import { ShieldCheck, HeartHandshake, BookOpenCheck, MapPin, Play } from 'lucide-react';

interface HeroSectionProps {
  onExploreProfiles: () => void;
  onExploreAdvice: () => void;
  onWatchVideo: () => void;
  totalProfilesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProfiles,
  onExploreAdvice,
  onWatchVideo,
  totalProfilesCount,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Clean inline text kicker (no pill badge) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>Zawaj Halal au Niger</span>
              <span aria-hidden="true">·</span>
              <span>Conforme Sharia & Fiqh</span>
              <span aria-hidden="true">·</span>
              <span>Accompagnement du Couple</span>
            </div>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl" style={{ textWrap: 'balance' }}>
              Trouver l'âme sœur dans la piété et bâtir un foyer béni au Niger
            </h1>

            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              Plateforme matrimoniale islamique dédiée aux musulmans et musulmanes du Niger (Niamey, Zinder, Maradi, Tahoua, Agadez et toutes les régions). Nous facilitons les démarches de fiançailles (Khitbah) avec implication du tuteur légal (Wali), et offrons des conseils conjugaux fondés sur le Coran, la Sunnah et nos réalités sahéliennes.
            </p>

            {/* Quranic reminder block */}
            <div className="mt-5 rounded-lg border-l-4 border-emerald-700 bg-emerald-900/5 p-4 text-sm text-stone-700">
              <p className="italic font-serif text-stone-800">
                « Et parmi Ses signes Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles et Il a mis entre vous de l'affection et de la miséricorde. »
              </p>
              <div className="mt-1 text-xs text-stone-500 font-medium">
                Sourate Ar-Rum (Les Romains), Verset 21
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProfiles}
                className="rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 whitespace-nowrap"
              >
                Parcourir les profils vérifiés ({totalProfilesCount})
              </button>
              <button
                onClick={onWatchVideo}
                className="flex items-center gap-2 rounded-md border border-emerald-700 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 whitespace-nowrap"
              >
                <Play className="h-4 w-4 fill-emerald-800 text-emerald-800" />
                <span>Vidéo de présentation (2 min)</span>
              </button>
              <button
                onClick={onExploreAdvice}
                className="rounded-md border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-400 whitespace-nowrap"
              >
                Conseils de couple
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Concrete metrics with units */}
            <div className="mt-8 border-t border-stone-200 pt-6">
              <div className="grid grid-cols-3 gap-4 text-stone-800">
                <div>
                  <div className="font-mono text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl tabular-nums">
                    8 / 8
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Régions du Niger
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl tabular-nums">
                    100 %
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Avec Tuteur (Wali)
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl tabular-nums">
                    24 h/7
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Conseils Al-Nasiha
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-md">
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <img
                  src="/assets/images/hero_niger_marriage_1791126321080.jpg"
                  alt="Couple musulman sahélien au Niger célébrant leur mariage béni selon la Sunnah"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    // Fallback container per zero-broken-image policy
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-800">Tradition & Valeurs Sahéliennes</span>
                  <span>Niamey & Régions</span>
                </div>
                <p className="mt-1 text-xs text-stone-600">
                  Des unions fondées sur la pudeur (Haya), le consentement libre et le soutien sincère des familles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
