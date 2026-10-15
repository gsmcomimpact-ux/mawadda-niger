import React, { useState } from 'react';
import { Coins, HeartHandshake, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const MahrCalculatorSection: React.FC = () => {
  const [sadakiAmount, setSadakiAmount] = useState<number>(150000); // 150 000 FCFA
  const [ceremonyBudget, setCeremonyBudget] = useState<number>(300000); // 300 000 FCFA
  const [groomIncome, setGroomIncome] = useState<number>(180000); // 180 000 FCFA/mois

  // Calculations
  const totalCost = sadakiAmount + ceremonyBudget;
  const monthsOfIncome = totalCost / (groomIncome || 1);

  let recommendation = '';
  let statusColor = 'text-emerald-800';

  if (monthsOfIncome <= 2.5) {
    recommendation = 'Excellente modération conforme à la Sunnah prophétique. Ce budget préserve la paix financière du nouveau foyer sans endettement.';
    statusColor = 'text-emerald-800';
  } else if (monthsOfIncome <= 5) {
    recommendation = 'Budget modéré mais requérant une vigilance. Veillez à ce que les dépenses annexes (réceptions, tenues) ne pénalisent pas votre emménagement à deux.';
    statusColor = 'text-amber-800';
  } else {
    recommendation = 'Attention : Le coût global dépasse 5 mois complets de revenus. Les oulémas au Niger déconseillent vivement de s\'endetter pour les noces. Discutez avec le Wali pour simplifier les exigences.';
    statusColor = 'text-red-800';
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <span>Économie Conjugale & Sunnah</span>
          <span aria-hidden="true">·</span>
          <span>Monnaie : FCFA (Niger)</span>
        </div>
        <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Guide du Sadaki (Dot) & Simulateur de Dépenses Bénies
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-3xl">
          Le Prophète Muhammad ﷺ a dit : <em>« La meilleure des dots est la plus facile »</em> (Rapporté par Abou Daoud). Utilisez ce repère pour concilier tradition prophétique et dignité au Niger.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Estimator */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <Coins className="h-5 w-5 text-emerald-800" />
            <span>Simulateur d'Équilibre Financier de Mariage</span>
          </h3>

          <div className="mt-6 space-y-5">
            {/* Sadaki / Mahr */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Montant du Sadaki envisagé (dot légale pour l'épouse) :</span>
                <span className="font-mono text-emerald-900 tabular-nums">
                  {sadakiAmount.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={1000000}
                step={10000}
                value={sadakiAmount}
                onChange={(e) => setSadakiAmount(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-0.5">
                <span>20 000 FCFA (Symbolique)</span>
                <span>500 000 FCFA</span>
                <span>1 000 000 FCFA</span>
              </div>
            </div>

            {/* Walima & Fête */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Frais de réception, Walima & cadeaux d'usage :</span>
                <span className="font-mono text-emerald-900 tabular-nums">
                  {ceremonyBudget.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={2500000}
                step={25000}
                value={ceremonyBudget}
                onChange={(e) => setCeremonyBudget(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-0.5">
                <span>50 000 FCFA (Intime)</span>
                <span>1 000 000 FCFA</span>
                <span>2 500 000 FCFA (Grande fête)</span>
              </div>
            </div>

            {/* Groom's monthly income */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Revenu mensuel estimé de l'homme au Niger :</span>
                <span className="font-mono text-emerald-900 tabular-nums">
                  {groomIncome.toLocaleString('fr-FR')} FCFA / mois
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={1500000}
                step={10000}
                value={groomIncome}
                onChange={(e) => setGroomIncome(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-8 rounded-xl bg-stone-50 border border-stone-200 p-5">
            <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs text-stone-500">Coût total du mariage :</div>
                <div className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                  {totalCost.toLocaleString('fr-FR')} FCFA
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500">Charge sur le budget :</div>
                <div className="font-mono text-xl font-bold text-emerald-900 tabular-nums">
                  {monthsOfIncome.toFixed(1)} mois de travail
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-stone-700">
              <span className={`font-semibold block mb-1 ${statusColor}`}>
                Analyse éthique selon la Sunnah :
              </span>
              {recommendation}
            </div>
          </div>
        </div>

        {/* Spiritual Guidance & Hadiths */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <h3 className="font-serif text-base font-bold text-stone-900">
              3 Enseignements Prophétiques sur la Dot
            </h3>
            <div className="mt-4 space-y-4 text-xs text-stone-700 leading-relaxed">
              <div className="border-l-2 border-emerald-800 pl-3">
                <p className="italic">
                  « Donnez, ne serait-ce qu'une bague en fer. »
                </p>
                <div className="mt-1 text-stone-500 font-medium">
                  — Hadith authentique Al-Bukhari & Muslim
                </div>
              </div>

              <div className="border-l-2 border-emerald-800 pl-3">
                <p className="italic">
                  « Le mariage le plus grand en bénédiction est celui qui occasionne le moins de charges financières. »
                </p>
                <div className="mt-1 text-stone-500 font-medium">
                  — Rapporté par l'Imam Ahmad
                </div>
              </div>

              <div className="border-l-2 border-emerald-800 pl-3">
                <p className="italic">
                  « Le Mahr est la propriété exclusive de l'épouse. Ni son père, ni ses oncles, ni son époux ne peuvent y puiser sans son plein gré. »
                </p>
                <div className="mt-1 text-stone-500 font-medium">
                  — Droit musulman (Fiqh malikite)
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-xs text-stone-700">
            <h4 className="font-serif text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-800" />
              <span>Plaidoyer pour la jeunesse au Niger</span>
            </h4>
            <p className="mt-2 leading-relaxed">
              Les dignitaires religieux de Niamey, Zinder et Maradi rappellent régulièrement que la surenchère des dépenses coutumières (valises garnies de tissus de luxe, cérémonies de plusieurs jours) n'a aucun fondement dans l'Islam. Elle retarde les mariages et appauvrit les jeunes époux dès le premier jour.
            </p>
            <p className="mt-2 font-semibold text-emerald-900">
              Mawadda encourage les tuteurs légaux à valoriser l'instruction religieuse, la moralité (Akhlaq) et la droiture de l'homme plutôt que les apparats éphémères.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
