import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  Smartphone,
  CreditCard,
  Building2,
  ShieldCheck,
  ArrowRight,
  RotateCw,
  Copy,
  Check,
} from 'lucide-react';
import { PricingPlan, PaymentMethodOption, UserSubscription, PaymentMethodId } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';

interface PaymentModalProps {
  plan: PricingPlan;
  onClose: () => void;
  onSuccessfulPayment: (subscription: UserSubscription) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  plan,
  onClose,
  onSuccessfulPayment,
}) => {
  const [selectedMethodId, setSelectedMethodId] = useState<PaymentMethodId>('airtel_niger');
  const [phoneNumber, setPhoneNumber] = useState<string>('96123456');
  const [payerName, setPayerName] = useState<string>('Moustapha Adamou');
  const [cardNumber, setCardNumber] = useState<string>('4111 2222 3333 4444');
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [generatedRef, setGeneratedRef] = useState<string>('');

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethodId) || PAYMENT_METHODS[0];

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const ref = `MAW-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRef(ref);

    // Simulate instant Mobile Money network confirmation in Niger
    setTimeout(() => {
      setStep('success');

      // Calculate expiration date
      const now = new Date();
      const expirationDate = new Date(now.setMonth(now.getMonth() + (plan.durationMonths || 1)));
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = expirationDate.toLocaleDateString('fr-FR', options);

      const sub: UserSubscription = {
        planId: plan.id,
        planName: plan.name,
        isActive: true,
        paymentMethod: selectedMethod.name,
        activatedAt: new Date().toLocaleDateString('fr-FR'),
        expiresAt: formattedDate,
        referenceId: ref,
      };

      onSuccessfulPayment(sub);
    }, 2200);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(generatedRef);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {step === 'success' ? 'Souscription Confirmée' : 'Paiement Sécurisé'}
            </h3>
            <p className="text-xs text-stone-500">
              Formule : <span className="font-semibold text-emerald-800">{plan.name}</span> ({plan.priceCfa.toLocaleString('fr-FR')} FCFA)
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleStartPayment} className="space-y-5">
              {/* Select Payment Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Choisissez votre moyen de paiement au Niger :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setSelectedMethodId(pm.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                        selectedMethodId === pm.id
                          ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800 text-stone-900 font-semibold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      <span className={`inline-block w-fit rounded px-1.5 py-0.5 text-[9px] font-bold ${pm.logoColor}`}>
                        {pm.shortName}
                      </span>
                      <span className="mt-1.5 text-[11px] leading-tight font-medium text-stone-800">
                        {pm.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions banner */}
              <div className="rounded-lg bg-stone-100 p-3 text-xs text-stone-600 border border-stone-200">
                <span className="font-semibold text-stone-900">Procédure {selectedMethod.name} : </span>
                {selectedMethod.ussdInstructions}
              </div>

              {/* Inputs based on method */}
              {selectedMethodId !== 'card' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Nom complet du souscripteur :
                    </label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Numéro de téléphone Niger (Airtel / Moov) :
                    </label>
                    <div className="flex rounded-md border border-stone-300 overflow-hidden focus-within:border-emerald-700">
                      <span className="inline-flex items-center px-3 bg-stone-100 text-xs font-semibold text-stone-600 border-r border-stone-200">
                        +227
                      </span>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex: 96 12 34 56"
                        className="w-full px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500">
                      Une notification de validation de débit USSD sera envoyée sur ce numéro.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Nom sur la carte bancaire :
                    </label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Numéro de carte (Visa / Mastercard) :
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-700 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Price Recap */}
              <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-xs">
                <span className="text-stone-600">Montant total à payer :</span>
                <span className="font-mono text-base font-bold text-emerald-900">
                  {plan.priceCfa.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full rounded-md bg-emerald-800 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Confirmer et Payer {plan.priceCfa.toLocaleString('fr-FR')} FCFA</span>
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 animate-spin">
                <RotateCw className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Validation du paiement en cours...
                </h4>
                <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
                  Connexion à la passerelle {selectedMethod.name} (+227 {phoneNumber}). Veuillez consulter l'écran de votre téléphone pour confirmer votre code PIN.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Alhamdulillah ! Abonnement Activé
                </h4>
                <p className="mt-1 text-xs text-stone-600">
                  Votre formule <strong>{plan.name}</strong> est désormais active sur votre compte.
                </p>
              </div>

              {/* Receipt Reference */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-500 text-[11px]">
                  <span>Référence de reçu officiel :</span>
                  <button
                    onClick={copyRef}
                    className="flex items-center gap-1 text-emerald-800 font-semibold hover:underline"
                  >
                    {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{isCopied ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
                <div className="font-mono font-bold text-stone-900">{generatedRef}</div>
                <div className="text-[11px] text-stone-500">
                  Moyen : {selectedMethod.name} · Montant : {plan.priceCfa.toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              <div className="text-left text-xs text-stone-600 space-y-1 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                <div className="font-bold text-emerald-900">Vos avantages débloqués dès maintenant :</div>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-stone-700">
                  <li>Transmission prioritaire de vos demandes au Tuteur (Wali)</li>
                  <li>Badge "Profil Vérifié & Sérieux" actif sur votre profil</li>
                  <li>Support dédié Al-Nasiha pour vous accompagner</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-md bg-emerald-800 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                Fermer et explorer les profils
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
