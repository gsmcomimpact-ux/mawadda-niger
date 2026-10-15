import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Smartphone,
  CreditCard,
  Building2,
  Lock,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';
import { PricingPlan, PaymentMethodOption, UserSubscription } from '../types';
import { PRICING_PLANS, PAYMENT_METHODS } from '../data/mockData';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  currentSubscription: UserSubscription | null;
  onOpenFAQ: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  currentSubscription,
  onOpenFAQ,
}) => {
  const [currency, setCurrency] = useState<'XOF' | 'EUR'>('XOF');

  return (
    <section className="bg-stone-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Tarifs Éthiques & Transparents</span>
            <span aria-hidden="true">·</span>
            <span>République du Niger</span>
            <span aria-hidden="true">·</span>
            <span>Mobile Money & Carte</span>
          </div>

          <h2
            className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Des Formules Accessibles au Marché Nigérien
          </h2>

          <p className="mt-4 text-base text-stone-600 sm:text-lg leading-relaxed">
            L'inscription et la consultation sont <strong>100% gratuites</strong>. Nos abonnements optionnels financent la vérification humaine auprès des tuteurs (Wali) et le maintien d'un cadre sérieux et sans faux profils.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center rounded-lg border border-stone-300 bg-white p-1 text-xs shadow-xs">
            <button
              onClick={() => setCurrency('XOF')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                currency === 'XOF' ? 'bg-emerald-800 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Franc CFA (XOF / FCFA) · Niger
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                currency === 'EUR' ? 'bg-emerald-800 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Euros (€) · Diaspora
            </button>
          </div>
        </div>

        {/* Current Subscription Notice */}
        {currentSubscription?.isActive && (
          <div className="mt-8 mx-auto max-w-2xl rounded-xl border border-emerald-300 bg-emerald-50/80 p-4 text-center">
            <p className="text-xs sm:text-sm font-semibold text-emerald-900">
              ✦ Votre compte bénéficie actuellement du{' '}
              <span className="font-bold underline">{currentSubscription.planName}</span> (Actif jusqu'au{' '}
              {currentSubscription.expiresAt}).
            </p>
          </div>
        )}

        {/* Pricing Cards Grid (2 plans: Gratuit & Premium à 2 000 FCFA) */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const isCurrent = currentSubscription?.planId === plan.id;
            const priceDisplay =
              currency === 'XOF'
                ? plan.priceCfa === 0
                  ? '0 FCFA'
                  : `${plan.priceCfa.toLocaleString('fr-FR')} FCFA`
                : plan.priceEuroApprox === 0
                ? '0 €'
                : `${plan.priceEuroApprox} €`;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                  plan.isPopular
                    ? 'border-2 border-emerald-800 ring-2 ring-emerald-800/20'
                    : 'border border-stone-200'
                }`}
              >
                {/* Popular / Promo Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-xs ${
                        plan.isPopular
                          ? 'bg-emerald-800 text-amber-200'
                          : 'bg-stone-800 text-stone-100'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-stone-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        Actuel
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-stone-500 min-h-[34px]">{plan.tagline}</p>

                  <div className="mt-4 border-t border-b border-stone-100 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-3xl font-bold tracking-tight text-emerald-950">
                        {priceDisplay}
                      </span>
                      {plan.durationMonths > 0 && (
                        <span className="text-xs text-stone-500">/ {plan.durationLabel}</span>
                      )}
                    </div>
                    {currency === 'XOF' && plan.priceEuroApprox > 0 && (
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Soit environ {plan.priceEuroApprox} €
                      </div>
                    )}
                  </div>

                  {/* Exclusive Bonus highlight */}
                  {plan.exclusiveBonus && (
                    <div className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200/60 font-medium flex items-start gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{plan.exclusiveBonus}</span>
                    </div>
                  )}

                  {/* Features List */}
                  <ul className="mt-4 space-y-2.5 text-xs text-stone-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <div className="mt-8 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    disabled={isCurrent}
                    className={`w-full rounded-md px-4 py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-stone-200 text-stone-500 cursor-default'
                        : plan.isPopular
                        ? 'bg-emerald-800 text-white shadow-xs hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-800'
                        : 'border border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <span>{isCurrent ? 'Formule active' : plan.buttonText}</span>
                    {!isCurrent && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods Supported in Niger */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center justify-center gap-2">
              <Smartphone className="h-5 w-5 text-emerald-800" />
              <span>Modes de Paiement Reconnus au Niger & Diaspora</span>
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Payez instantanément par Mobile Money sans carte bancaire, ou par carte sécurisée depuis l'international.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.id}
                className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 transition hover:bg-stone-50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${pm.logoColor}`}>
                      {pm.shortName}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-stone-900">{pm.name}</h4>
                  <p className="mt-1 text-[11px] text-stone-500 leading-snug">{pm.ussdInstructions}</p>
                </div>
                <div className="mt-3 text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                  <Lock className="h-2.5 w-2.5" />
                  <span>{pm.availability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Commitment Guarantee */}
        <div className="mt-8 rounded-xl border border-emerald-800/20 bg-emerald-950 p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900 text-amber-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">
                Garantie d'Éthique & Respect de la Dot (Sadaki)
              </h4>
              <p className="mt-1 text-xs text-emerald-200/90 leading-relaxed max-w-2xl">
                Mawadda Niger ne perçoit <strong>aucune commission</strong> sur la dot ou les cadeaux de mariage. Nos tarifs forfaitaires couvrent uniquement les frais techniques et la vérification des tuteurs.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFAQ}
            className="rounded-md border border-emerald-700 bg-emerald-900/60 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition whitespace-nowrap"
          >
            Consulter les questions fréquentes (FAQ)
          </button>
        </div>
      </div>
    </section>
  );
};
