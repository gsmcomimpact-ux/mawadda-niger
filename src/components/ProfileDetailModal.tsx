import React, { useState } from 'react';
import { Profile } from '../types';
import { ShieldCheck, MapPin, Eye, EyeOff, BookOpen, HeartHandshake, CheckCircle, Trash2, Sparkles } from 'lucide-react';

interface ProfileDetailModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestKhitbah: (profile: Profile) => void;
  isMyProfile?: boolean;
  onRequestDelete?: (profile: Profile) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  isOpen,
  onClose,
  onRequestKhitbah,
  isMyProfile,
  onRequestDelete,
}) => {
  const [photoVisible, setPhotoVisible] = useState(false);

  if (!isOpen || !profile) return null;

  const isBlurred = profile.gender === 'femme' && !photoVisible;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Top Banner with Image */}
        <div className="relative h-64 w-full bg-stone-900">
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover transition-all duration-300 ${
              isBlurred ? 'blur-lg scale-105 opacity-60' : 'blur-0 opacity-90'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition"
          >
            ✕
          </button>

          {profile.gender === 'femme' && (
            <div className="absolute top-4 left-4">
              <button
                type="button"
                onClick={() => setPhotoVisible(!photoVisible)}
                className="flex items-center gap-1.5 rounded-md bg-stone-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xs hover:bg-stone-900"
              >
                {isBlurred ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Afficher la photo</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Masquer par pudeur</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className="absolute bottom-4 left-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>Profil vérifié Mawadda Niger</span>
              {isMyProfile && (
                <span className="rounded bg-amber-400 text-stone-950 font-bold px-2 py-0.5 text-[10px]">
                  ★ Votre profil
                </span>
              )}
              <span aria-hidden="true">·</span>
              <span>Inscrit {profile.registrationDate}</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold sm:text-3xl text-white">
              {profile.fullName}
            </h1>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 border-b border-stone-200 pb-4">
            <span className="font-semibold text-emerald-900">
              {profile.gender === 'homme' ? 'Frère' : 'Sœur'} · {profile.age} ans
            </span>
            <span aria-hidden="true">·</span>
            <span>Région : {profile.region} ({profile.city})</span>
            <span aria-hidden="true">·</span>
            <span>Statut : {profile.maritalStatus} ({profile.childrenCount} enfant{profile.childrenCount > 1 ? 's' : ''})</span>
            <span aria-hidden="true">·</span>
            <span>Ethnie : {profile.ethnicGroup}</span>
          </div>

          {/* Bio & Vision */}
          <div>
            <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wide text-emerald-950">
              Présentation & Parcours
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Aspirations */}
          <div>
            <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wide text-emerald-950">
              Vision du Foyer & Aspirations
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
              {profile.aspirations}
            </p>
          </div>

          {/* Structured Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-stone-50 p-5 border border-stone-200 text-xs">
            <div>
              <span className="font-semibold text-stone-900 block">Profession :</span>
              <span className="text-stone-600">{profile.profession}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Formation / Éducation :</span>
              <span className="text-stone-600">{profile.education}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Langues parlées :</span>
              <span className="text-stone-600">{profile.languages.join(', ')}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Position sur la polygamie :</span>
              <span className="text-stone-600">{profile.polygamyStatus}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-stone-900 block">Pratique religieuse & deen :</span>
              <span className="text-stone-600">{profile.religiousPractice}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-stone-900 block">Attentes quant à la dot (Mahr/Sadaki) :</span>
              <span className="text-stone-600">{profile.mahrExpectation}</span>
            </div>
          </div>

          {/* Wali information block */}
          {profile.waliName && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-4 text-xs">
              <div className="flex items-center gap-2 font-semibold text-emerald-950">
                <ShieldCheck className="h-4 w-4 text-emerald-800" />
                <span>Informations du Tuteur Légal (Wali)</span>
              </div>
              <p className="mt-1 text-stone-700">
                Le tuteur légal de la sœur est <strong>{profile.waliName}</strong> ({profile.waliRelation}), résidant à {profile.waliCity}. En conformité avec la Sharia, toute prise de contact sérieuse sera examinée avec lui.
              </p>
              <p className="mt-1.5 text-[11px] text-emerald-800 font-medium">
                ✦ Les souscripteurs d'un Pass Premium (Airtel/Moov Money) bénéficient d'un suivi prioritaire par SMS/WhatsApp auprès du tuteur.
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between border-t border-stone-200 pt-5">
            <button
              onClick={onClose}
              className="rounded-md border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Fermer
            </button>
            {isMyProfile ? (
              <button
                onClick={() => {
                  if (onRequestDelete) onRequestDelete(profile);
                }}
                className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition"
              >
                <Trash2 className="h-4 w-4" />
                <span>Supprimer mon profil</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onRequestKhitbah(profile);
                }}
                className="flex items-center gap-2 rounded-md bg-emerald-800 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
              >
                <HeartHandshake className="h-4 w-4" />
                <span>Initier la démarche de Khitbah</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
