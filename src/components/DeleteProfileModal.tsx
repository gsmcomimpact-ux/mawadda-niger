import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, Heart, CheckCircle2 } from 'lucide-react';
import { Profile } from '../types';

interface DeleteProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (profileId: string) => void;
}

export const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  const [reason, setReason] = useState<string>('found_spouse');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleted(true);
      setTimeout(() => {
        onConfirmDelete(profile.id);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-red-50/60">
          <div className="flex items-center gap-2.5 text-red-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
              <Trash2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                Supprimer mon profil
              </h3>
              <p className="text-[11px] text-stone-500">
                {profile.fullName} ({profile.city})
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

        {/* Content */}
        <div className="p-6">
          {isDeleted ? (
            <div className="py-6 text-center space-y-3">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Profil supprimé avec succès
              </h4>
              <p className="text-xs text-stone-600">
                Vos informations et coordonnées ont été entièrement effacées de la plateforme. Qu'Allah bénisse vos démarches futures.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  Cette action est <strong>irréversible</strong>. Votre profil ne sera plus visible par les prétendants et vos demandes en cours seront clôturées.
                </div>
              </div>

              {/* Reasons */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Indiquez le motif de votre départ :
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <input
                      type="radio"
                      name="delete_reason"
                      value="found_spouse"
                      checked={reason === 'found_spouse'}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-emerald-800 focus:ring-emerald-800"
                    />
                    <span className="font-medium text-stone-800 flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-600 fill-rose-600" />
                      <span>Alhamdulillah, j'ai trouvé mon conjoint !</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <input
                      type="radio"
                      name="delete_reason"
                      value="pause"
                      checked={reason === 'pause'}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-emerald-800 focus:ring-emerald-800"
                    />
                    <span className="text-stone-700">Je mets mes démarches matrimoniales en pause</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <input
                      type="radio"
                      name="delete_reason"
                      value="other"
                      checked={reason === 'other'}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-emerald-800 focus:ring-emerald-800"
                    />
                    <span className="text-stone-700">Autre motif personnel</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isDeleting}
                  className="rounded-md border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                >
                  Annuler et conserver mon profil
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-md bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{isDeleting ? 'Suppression...' : 'Confirmer la suppression'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
