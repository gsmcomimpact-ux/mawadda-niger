import React, { useState } from 'react';
import { X, Lock, Smartphone, ShieldCheck, HeartHandshake, User, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string; role: 'candidat' | 'wali' }) => void;
  onOpenCreateProfile: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenCreateProfile,
}) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('96 12 34 56');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<'candidat' | 'wali'>('candidat');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: role === 'wali' ? 'Elhadj Oumarou (Wali)' : 'Moustapha Adamou',
        phone: `+227 ${phoneNumber}`,
        role,
      });
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800 text-amber-200">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                Connexion à Mawadda Niger
              </h3>
              <p className="text-[11px] text-stone-500">
                Espace personnel sécurisé
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Vous vous connectez en tant que :
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('candidat')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition text-center ${
                  role === 'candidat'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-800'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Candidat(e) au Mariage
              </button>
              <button
                type="button"
                onClick={() => setRole('wali')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition text-center ${
                  role === 'wali'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-800'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Tuteur Légal (Wali)
              </button>
            </div>
          </div>

          {/* Phone or Email Switch */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Numéro de téléphone Niger (Airtel / Moov) :
            </label>
            <div className="flex rounded-md border border-stone-300 overflow-hidden focus-within:border-emerald-800">
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
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700">
                Mot de passe ou Code PIN :
              </label>
              <a href="#reset" onClick={(e) => { e.preventDefault(); }} className="text-[11px] text-emerald-800 hover:underline">
                Code oublié ?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Privacy badge */}
          <div className="rounded-lg bg-emerald-50/70 p-2.5 text-[11px] text-emerald-900 border border-emerald-200 flex items-start gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
            <span>
              Accès strictement confidentiel. Vos coordonnées ne sont jamais communiquées sans l'accord du tuteur.
            </span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-emerald-800 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" />
                <span>Se connecter</span>
              </>
            )}
          </button>

          {/* Register Prompt */}
          <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100">
            <span>Vous n'avez pas encore de compte ? </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreateProfile();
              }}
              className="font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Créer un compte & choisir une formule</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
