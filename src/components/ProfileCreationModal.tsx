import React, { useState, useEffect } from 'react';
import { Profile, NigerRegion, Gender } from '../types';
import {
  UserCheck,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Check,
  CreditCard,
  User,
  Heart,
} from 'lucide-react';

interface ProfileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProfile: (
    profile: Profile,
    plan: 'plan_gratuit' | 'plan_premium',
    user: { name: string; phone: string; role: 'candidat' | 'wali' }
  ) => void;
  currentUser: { name: string; phone: string; role: 'candidat' | 'wali' } | null;
  onOpenLogin: () => void;
}

export const ProfileCreationModal: React.FC<ProfileCreationModalProps> = ({
  isOpen,
  onClose,
  onAddProfile,
  currentUser,
  onOpenLogin,
}) => {
  // Step 1: Account, Step 2: Plan Choice (Gratuit vs Premium 2000), Step 3: Profile Form
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(currentUser ? 2 : 1);

  // Account State (Step 1)
  const [accountName, setAccountName] = useState(currentUser?.name || '');
  const [accountPhone, setAccountPhone] = useState(currentUser?.phone ? currentUser.phone.replace('+227 ', '') : '96 12 34 56');
  const [accountPassword, setAccountPassword] = useState('••••••••');
  const [accountRole, setAccountRole] = useState<'candidat' | 'wali'>(currentUser?.role || 'candidat');

  // Plan State (Step 2)
  const [selectedPlan, setSelectedPlan] = useState<'plan_gratuit' | 'plan_premium'>('plan_premium');
  const [paymentMethod, setPaymentMethod] = useState<'airtel' | 'moov' | 'alizza'>('airtel');
  const [paymentPhone, setPaymentPhone] = useState('96 12 34 56');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Profile State (Step 3)
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [age, setAge] = useState<number>(27);
  const [gender, setGender] = useState<Gender>('homme');
  const [region, setRegion] = useState<NigerRegion>('Niamey');
  const [city, setCity] = useState('Plateau / Recasement');
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('Licence / Master');
  const [ethnicGroup, setEthnicGroup] = useState('Hausa');
  const [languages, setLanguages] = useState('Français, Hausa');
  const [maritalStatus, setMaritalStatus] = useState<'Célibataire' | 'Divorcé(e)' | 'Veuf/Veuve'>('Célibataire');
  const [religiousPractice, setReligiousPractice] = useState('Prières quotidiennes à la mosquée, lecture du Coran, jeûnes surérogatoires');
  const [polygamyStatus, setPolygamyStatus] = useState<'Monogamie stricte' | 'Ouvert(e) à la polygamie légale'>('Monogamie stricte');
  const [mahrExpectation, setMahrExpectation] = useState('Modéré et conforme à la noble Sunnah (selon les moyens réels)');
  const [waliName, setWaliName] = useState('');
  const [waliRelation, setWaliRelation] = useState('Père');
  const [waliCity, setWaliCity] = useState('Niamey');
  const [waliPhone, setWaliPhone] = useState('');
  const [bio, setBio] = useState('');
  const [aspirations, setAspirations] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync with currentUser
  useEffect(() => {
    if (currentUser) {
      setAccountName(currentUser.name);
      setFullName(currentUser.name);
      setAccountRole(currentUser.role);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // Step 1 Validation -> Go to Step 2
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim() || !accountPhone.trim()) return;
    setFullName(accountName);
    setCurrentStep(2);
  };

  // Step 2 Validation -> Go to Step 3
  const handlePlanSubmit = () => {
    if (selectedPlan === 'plan_premium' && !paymentDone) {
      setIsProcessingPayment(true);
      setTimeout(() => {
        setIsProcessingPayment(false);
        setPaymentDone(true);
        setCurrentStep(3);
      }, 700);
    } else {
      setCurrentStep(3);
    }
  };

  // Step 3 Validation -> Save Profile
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !city || !profession || !bio) return;

    const avatarUrl =
      gender === 'homme'
        ? '/assets/images/avatar_man_niamey_1791126334383.jpg'
        : '/assets/images/avatar_woman_zinder_1791126346663.jpg';

    const newProfile: Profile = {
      id: `prof-${Date.now()}`,
      fullName,
      age: Number(age),
      gender,
      region,
      city: `${region} (${city})`,
      profession,
      education: education || 'Études secondaires / supérieures',
      ethnicGroup,
      languages: languages.split(',').map((l) => l.trim()),
      maritalStatus,
      childrenCount: 0,
      religiousPractice,
      polygamyStatus: polygamyStatus as any,
      mahrExpectation,
      waliName: waliName ? waliName : undefined,
      waliRelation: waliName ? waliRelation : undefined,
      waliCity: waliName ? waliCity : undefined,
      waliPhone: waliPhone ? waliPhone : undefined,
      bio,
      aspirations: aspirations || 'Bâtir un foyer pieux empreint de Mawadda et de Rahmah.',
      avatarUrl,
      isVerified: true,
      registrationDate: "Aujourd'hui",
    };

    const userAccount = {
      name: fullName,
      phone: `+227 ${accountPhone}`,
      role: accountRole,
    };

    onAddProfile(newProfile, selectedPlan, userAccount);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const regionsList: NigerRegion[] = [
    'Niamey',
    'Zinder',
    'Maradi',
    'Tahoua',
    'Agadez',
    'Dosso',
    'Tillabéri',
    'Diffa',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8 max-h-[92vh] overflow-y-auto">
        {/* Header with Step Progress */}
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span>Zawaj fi Sabilillah</span>
                <span aria-hidden="true">·</span>
                <span>Adhésion Mawadda Niger</span>
              </div>
              <h2 className="mt-1 font-serif text-xl font-bold text-stone-900 sm:text-2xl">
                Créer mon compte et mon profil de mariage
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            >
              ✕
            </button>
          </div>

          {/* Stepper Wizard Bar */}
          {!isSuccess && (
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div
                className={`py-2 px-1 rounded-lg border font-semibold transition ${
                  currentStep === 1
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-800'
                    : currentStep > 1
                    ? 'border-emerald-300 bg-emerald-100/50 text-emerald-800'
                    : 'border-stone-200 text-stone-400'
                }`}
              >
                1. Mon Compte
              </div>
              <div
                className={`py-2 px-1 rounded-lg border font-semibold transition ${
                  currentStep === 2
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-800'
                    : currentStep > 2
                    ? 'border-emerald-300 bg-emerald-100/50 text-emerald-800'
                    : 'border-stone-200 text-stone-400'
                }`}
              >
                2. Formule (Gratuit / Premium)
              </div>
              <div
                className={`py-2 px-1 rounded-lg border font-semibold transition ${
                  currentStep === 3
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-400'
                }`}
              >
                3. Fiche Profil
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Profil enregistré avec succès !
            </h3>
            <p className="text-xs leading-relaxed text-stone-600 max-w-md mx-auto">
              Votre compte a été activé sous la formule{' '}
              <strong className="text-emerald-900 font-bold">
                {selectedPlan === 'plan_premium' ? 'Formule Premium (2 000 FCFA)' : 'Formule Gratuite (0 FCFA)'}
              </strong>
              . Votre fiche est désormais en ligne dans l'annuaire de Mawadda Niger.
            </p>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 max-w-md mx-auto text-xs text-emerald-900">
              ✦ Vous pouvez à tout moment voir votre fiche ou la <strong>supprimer définitivement</strong> depuis le bouton « ★ Mon Profil ».
            </div>
            <button
              onClick={handleClose}
              className="mt-4 rounded-md bg-emerald-800 px-8 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition"
            >
              Voir mon profil dans l'annuaire
            </button>
          </div>
        ) : (
          <div className="mt-5">
            {/* STEP 1: CREATE ACCOUNT */}
            {currentStep === 1 && (
              <form onSubmit={handleAccountSubmit} className="space-y-4 text-xs">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                  <span>
                    La création de compte est obligatoire avant de publier votre profil. Elle garantit l'authenticité des candidatures et vous permet de gérer ou supprimer votre profil à tout moment.
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Votre statut :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountRole('candidat')}
                      className={`py-2 px-3 rounded-lg border font-medium transition text-center ${
                        accountRole === 'candidat'
                          ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-800'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Candidat(e) au Mariage
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountRole('wali')}
                      className={`py-2 px-3 rounded-lg border font-medium transition text-center ${
                        accountRole === 'wali'
                          ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-800'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Tuteur Légal (Wali)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nom et Prénom complets * :
                  </label>
                  <input
                    type="text"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Ex: Moustapha Adamou ou Hadiza Ibrahim"
                    className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Numéro de téléphone au Niger (Airtel ou Moov) * :
                  </label>
                  <div className="flex rounded-md border border-stone-300 overflow-hidden focus-within:border-emerald-800">
                    <span className="inline-flex items-center px-3 bg-stone-100 font-semibold text-stone-600 border-r border-stone-200">
                      +227
                    </span>
                    <input
                      type="tel"
                      required
                      value={accountPhone}
                      onChange={(e) => setAccountPhone(e.target.value)}
                      placeholder="Ex: 96 12 34 56"
                      className="w-full px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Mot de passe pour sécuriser votre compte * :
                  </label>
                  <input
                    type="password"
                    required
                    value={accountPassword}
                    onChange={(e) => setAccountPassword(e.target.value)}
                    placeholder="Créer un mot de passe (min 6 caractères)"
                    className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLogin();
                    }}
                    className="text-stone-500 hover:text-emerald-800 font-medium"
                  >
                    Déjà un compte ? Se connecter
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-emerald-800 px-6 py-2.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
                  >
                    <span>Continuer vers le choix de la formule</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: CHOOSE FORMULE (GRATUIT OU PREMIUM 2 000 FCFA) */}
            {currentStep === 2 && (
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Choisissez votre formule d'adhésion
                  </h3>
                  <p className="text-stone-500 mt-0.5">
                    Sélectionnez la formule qui correspond à votre démarche avant de remplir votre profil.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Gratuit */}
                  <div
                    onClick={() => setSelectedPlan('plan_gratuit')}
                    className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                      selectedPlan === 'plan_gratuit'
                        ? 'border-2 border-emerald-800 bg-emerald-50/60 ring-2 ring-emerald-800/20 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-stone-900">
                          Formule Gratuite
                        </span>
                        {selectedPlan === 'plan_gratuit' && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-2xl font-bold font-mono text-stone-900">
                        0 FCFA
                      </div>
                      <p className="text-stone-500 mt-1">
                        Pour créer votre profil et découvrir l'annuaire au Niger.
                      </p>

                      <ul className="mt-3 space-y-1.5 text-stone-600 text-[11px]">
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800" />
                          <span>Profil publié dans l'annuaire</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800" />
                          <span>1 demande de Khitbah / mois</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800" />
                          <span>Enregistrement du tuteur (Wali)</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('plan_gratuit')}
                      className={`mt-4 w-full py-2 rounded-md font-semibold text-center transition ${
                        selectedPlan === 'plan_gratuit'
                          ? 'bg-emerald-800 text-white'
                          : 'border border-stone-300 text-stone-700 bg-white hover:bg-stone-50'
                      }`}
                    >
                      Sélectionner Gratuit
                    </button>
                  </div>

                  {/* Option 2: Premium 2000 FCFA */}
                  <div
                    onClick={() => setSelectedPlan('plan_premium')}
                    className={`cursor-pointer rounded-xl p-4 border relative transition-all flex flex-col justify-between ${
                      selectedPlan === 'plan_premium'
                        ? 'border-2 border-emerald-800 bg-emerald-50/70 ring-2 ring-emerald-800/20 shadow-md'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-4 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-stone-950 shadow-xs">
                      ⭐ Recommandé (2 000 F)
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-stone-900">
                          Formule Premium
                        </span>
                        {selectedPlan === 'plan_premium' && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-2xl font-bold font-mono text-emerald-950">
                        2 000 FCFA
                      </div>
                      <p className="text-stone-500 mt-1">
                        Pour maximiser vos chances et contacter les Walis en priorité.
                      </p>

                      <ul className="mt-3 space-y-1.5 text-stone-700 text-[11px]">
                        <li className="flex items-center gap-1.5 font-medium text-emerald-900">
                          <Check className="h-3 w-3 text-emerald-800 shrink-0" />
                          <span>Demandes de Khitbah illimitées</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800 shrink-0" />
                          <span>Transmission directe au Wali par SMS</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800 shrink-0" />
                          <span>Badge "Membre Premium Vérifié"</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-800 shrink-0" />
                          <span>Floutage pudique avec déblocage accordé</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('plan_premium')}
                      className={`mt-4 w-full py-2 rounded-md font-bold text-center transition ${
                        selectedPlan === 'plan_premium'
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'border border-emerald-800 text-emerald-900 bg-white hover:bg-emerald-50'
                      }`}
                    >
                      Sélectionner Premium (2 000 F)
                    </button>
                  </div>
                </div>

                {/* Mobile Money Notice for Premium */}
                {selectedPlan === 'plan_premium' && (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950">
                        Paiement Mobile Money Niger (2 000 FCFA) :
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Sécurisé
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('airtel')}
                        className={`p-2 rounded-lg border text-left transition ${
                          paymentMethod === 'airtel'
                            ? 'border-red-600 bg-white shadow-2xs font-bold text-red-700'
                            : 'border-stone-200 bg-stone-50 text-stone-600'
                        }`}
                      >
                        <div>Airtel Money Niger</div>
                        <div className="text-[10px] text-stone-500 font-normal">Composez *400#</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('moov')}
                        className={`p-2 rounded-lg border text-left transition ${
                          paymentMethod === 'moov'
                            ? 'border-blue-600 bg-white shadow-2xs font-bold text-blue-700'
                            : 'border-stone-200 bg-stone-50 text-stone-600'
                        }`}
                      >
                        <div>Moov Money (Flooz)</div>
                        <div className="text-[10px] text-stone-500 font-normal">Composez *155#</div>
                      </button>
                    </div>

                    <div className="flex rounded-md border border-stone-300 bg-white overflow-hidden text-xs">
                      <span className="px-2.5 py-1.5 bg-stone-100 text-stone-500 border-r border-stone-200">
                        +227
                      </span>
                      <input
                        type="tel"
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder="Numéro de paiement"
                        className="w-full px-2 py-1.5 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Back and Next */}
                <div className="pt-3 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Modifier mon compte</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlanSubmit}
                    disabled={isProcessingPayment}
                    className="rounded-md bg-emerald-800 px-6 py-2.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
                  >
                    {isProcessingPayment ? (
                      <span>Validation du paiement...</span>
                    ) : (
                      <>
                        <span>Valider et remplir ma fiche profil</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: FILL MARRIAGE PROFILE FORM */}
            {currentStep === 3 && (
              <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-stone-100 p-2.5">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-800" />
                    <span className="font-semibold text-stone-800">
                      Compte : {fullName}
                    </span>
                  </div>
                  <span className="rounded bg-emerald-800 text-amber-200 font-bold px-2 py-0.5 text-[10px]">
                    {selectedPlan === 'plan_premium' ? 'Formule Premium (2 000 F)' : 'Formule Gratuite (0 F)'}
                  </span>
                </div>

                {/* Sexe & Âge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Je suis un(e) *
                    </label>
                    <div className="flex rounded-md border border-stone-300 p-0.5 bg-stone-50">
                      <button
                        type="button"
                        onClick={() => setGender('homme')}
                        className={`flex-1 rounded py-1.5 font-medium transition ${
                          gender === 'homme' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600'
                        }`}
                      >
                        Frère
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('femme')}
                        className={`flex-1 rounded py-1.5 font-medium transition ${
                          gender === 'femme' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600'
                        }`}
                      >
                        Sœur
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Âge (en années) *
                    </label>
                    <input
                      type="number"
                      min={18}
                      max={75}
                      required
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Région du Niger & Ville */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Région de résidence (Niger) *
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as NigerRegion)}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none bg-white"
                    >
                      {regionsList.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Commune / Ville / Quartier *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Niamey 2, Plateau, Zinder Sabon Gari"
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Profession & Statut */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Profession / Activité *
                    </label>
                    <input
                      type="text"
                      required
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="Ex: Enseignant, Commerçant, Ingénieur, Infirmière"
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Statut matrimonial *
                    </label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value as any)}
                      className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none bg-white"
                    >
                      <option value="Célibataire">Célibataire (Jamais marié/e)</option>
                      <option value="Divorcé(e)">Divorcé(e)</option>
                      <option value="Veuf/Veuve">Veuf / Veuve</option>
                    </select>
                  </div>
                </div>

                {/* Pratique religieuse */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Pratique religieuse & Attachement à la Sunnah *
                  </label>
                  <input
                    type="text"
                    required
                    value={religiousPractice}
                    onChange={(e) => setReligiousPractice(e.target.value)}
                    placeholder="Ex: Prières quotidiennes à la mosquée, apprentissage du Coran"
                    className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                {/* Tuteur Légal (Wali) */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3 space-y-3">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                    <ShieldCheck className="h-4 w-4 text-emerald-800" />
                    <span>Tuteur Légal (Wali) {gender === 'femme' ? '(Requis pour la sœur)' : '(Optionnel)'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1">Nom du tuteur :</label>
                      <input
                        type="text"
                        value={waliName}
                        onChange={(e) => setWaliName(e.target.value)}
                        placeholder="Ex: Elhadj Oumarou"
                        className="w-full rounded-md border border-stone-300 px-2.5 py-1.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">Lien de parenté :</label>
                      <input
                        type="text"
                        value={waliRelation}
                        onChange={(e) => setWaliRelation(e.target.value)}
                        placeholder="Ex: Père, Oncle paternel, Frère aîné"
                        className="w-full rounded-md border border-stone-300 px-2.5 py-1.5 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio & Présentation */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Présentation personnelle (Bio) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Parlez avec sincérité de vos valeurs, de votre tempérament et de votre projet de foyer..."
                    className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                {/* Form Actions */}
                <div className="pt-3 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Retour au choix de la formule</span>
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-emerald-800 px-6 py-2.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    <span>Enregistrer et publier mon profil</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
