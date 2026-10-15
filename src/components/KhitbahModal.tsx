import React, { useState } from 'react';
import { Profile, KhitbahRequest } from '../types';
import { ShieldCheck, HeartHandshake, CheckCircle2, UserCheck, MessageSquare } from 'lucide-react';

interface KhitbahModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (req: KhitbahRequest) => void;
}

export const KhitbahModal: React.FC<KhitbahModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSubmitRequest,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderCity, setSenderCity] = useState('Niamey');
  const [message, setMessage] = useState('');
  const [waliNote, setWaliNote] = useState('');
  const [agreedToAdab, setAgreedToAdab] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !message || !agreedToAdab) return;

    const newRequest: KhitbahRequest = {
      id: `khit-${Date.now()}`,
      senderName,
      senderPhone,
      targetProfileId: profile.id,
      targetProfileName: profile.fullName,
      message,
      waliContactNote: waliNote || `Demande transmise avec respect pour ${profile.waliName || 'le tuteur légal'}.`,
      status: 'Transmis au tuteur (Wali)',
      createdAt: 'À l\'instant',
    };

    onSubmitRequest(newRequest);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSenderName('');
    setSenderPhone('');
    setMessage('');
    setWaliNote('');
    setAgreedToAdab(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>Protocole Islamique Halal</span>
              <span aria-hidden="true">·</span>
              <span>Demande de Khitbah</span>
            </div>
            <h2 className="mt-1 font-serif text-xl font-bold text-stone-900">
              Demande de mise en relation officielle
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            ✕
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">
              Demande transmise avec succès !
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 max-w-md mx-auto">
              Votre demande pour <strong>{profile.fullName}</strong> a été enregistrée selon les règles de la Sharia.
              {profile.waliName && (
                <span className="block mt-1 font-medium text-emerald-900">
                  Notification envoyée à son tuteur légal : {profile.waliName} ({profile.waliRelation}).
                </span>
              )}
            </p>
            <p className="mt-3 text-xs text-stone-500">
              Vous pouvez suivre l'avancement dans l'onglet « Mes Démarches ».
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-md bg-emerald-800 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Target profile overview */}
            <div className="rounded-lg bg-stone-50 p-3.5 border border-stone-200 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-stone-500">Destinataire :</span>{' '}
                  <strong className="text-stone-900">{profile.fullName}</strong> ({profile.age} ans, {profile.city})
                </div>
                <span className="text-emerald-800 font-semibold">{profile.profession}</span>
              </div>
              {profile.waliName && (
                <div className="mt-2 text-stone-600 border-t border-stone-200 pt-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-800" />
                  <span>
                    Tuteur référencé : <strong>{profile.waliName}</strong> ({profile.waliRelation} - {profile.waliCity})
                  </span>
                </div>
              )}
            </div>

            {/* Sender Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Votre nom complet (ou prénom & nom de famille) *
              </label>
              <input
                type="text"
                required
                placeholder="Ex : Oumarou Amadou"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Phone & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Téléphone / WhatsApp au Niger *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+227 90 00 00 00"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Votre Ville / Région *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Niamey, Zinder..."
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                  className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Message / Presentation letter */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Lettre de présentation respectueuse & intentions *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Présentez brièvement votre parcours, votre attachement à la foi, vos projets de foyer et pourquoi le profil a retenu votre attention dans le respect de la piété..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Optional note for Wali */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mot d'honneur à l'attention du tuteur (Wali)
              </label>
              <input
                type="text"
                placeholder="Ex : Je me tiens à la disposition de votre famille pour toute prise de contact préliminaire."
                value={waliNote}
                onChange={(e) => setWaliNote(e.target.value)}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Islamic charter adherence */}
            <div className="rounded-lg bg-emerald-50/60 p-3 border border-emerald-200">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  required
                  checked={agreedToAdab}
                  onChange={(e) => setAgreedToAdab(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>
                  J'atteste sur l'honneur que ma démarche est sincère en vue d'un mariage légitime (Zawaj) selon le Coran et la Sunnah, sans légèreté ni fréquentation clandestine, et j'accepte la participation du tuteur légal.
                </span>
              </label>
            </div>

            {/* Submit buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!agreedToAdab}
                className="rounded-md bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 disabled:opacity-50"
              >
                Transmettre la demande de Khitbah
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
