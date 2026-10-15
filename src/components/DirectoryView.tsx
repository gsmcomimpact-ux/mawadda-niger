import React, { useState } from 'react';
import { Profile, NigerRegion, Gender, MaritalStatus } from '../types';
import { Search, MapPin, ShieldCheck, HeartHandshake, Eye, EyeOff, UserCheck, BookOpen, Sparkles, Filter } from 'lucide-react';

interface DirectoryViewProps {
  profiles: Profile[];
  onSelectProfile: (profile: Profile) => void;
  onRequestKhitbah: (profile: Profile) => void;
  onOpenPricing?: () => void;
  myProfileIds?: string[];
  onRequestDelete?: (profile: Profile) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  profiles,
  onSelectProfile,
  onRequestKhitbah,
  onOpenPricing,
  myProfileIds = [],
  onRequestDelete,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<NigerRegion>('Toutes les régions');
  const [selectedGender, setSelectedGender] = useState<'tous' | Gender>('tous');
  const [selectedStatus, setSelectedStatus] = useState<MaritalStatus>('Tous les statuts');
  const [searchQuery, setSearchQuery] = useState('');
  const [unblurredPhotos, setUnblurredPhotos] = useState<Record<string, boolean>>({});

  const togglePhotoBlur = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUnblurredPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProfiles = profiles.filter((p) => {
    if (selectedRegion !== 'Toutes les régions' && p.region !== selectedRegion) {
      return false;
    }
    if (selectedGender !== 'tous' && p.gender !== selectedGender) {
      return false;
    }
    if (selectedStatus !== 'Tous les statuts' && p.maritalStatus !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchText = `${p.fullName} ${p.profession} ${p.city} ${p.ethnicGroup} ${p.bio} ${p.languages.join(' ')}`.toLowerCase();
      if (!matchText.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const regionsList: NigerRegion[] = [
    'Toutes les régions',
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Candidats au Mariage Halal au Niger
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Profils de frères et sœurs engagés dans une démarche sincère et digne, avec référencement du tuteur légal.
          </p>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          <span className="font-mono text-emerald-800 font-bold tabular-nums text-sm">
            {filteredProfiles.length}
          </span>{' '}
          {filteredProfiles.length > 1 ? 'profils disponibles' : 'profil disponible'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Keyword Search */}
          <div className="relative">
            <label className="mb-1 block text-xs font-semibold text-stone-700">
              Recherche libre
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Métier, ethnie, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-stone-300 py-2 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-stone-700">
              Région au Niger
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as NigerRegion)}
              className="w-full rounded-md border border-stone-300 bg-white py-2 px-3 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              {regionsList.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Sexe Filter (Segmented control) */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-stone-700">
              Rechercher
            </label>
            <div className="flex rounded-md border border-stone-200 bg-stone-100 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedGender('tous')}
                className={`flex-1 rounded py-1.5 font-medium transition whitespace-nowrap ${
                  selectedGender === 'tous'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('femme')}
                className={`flex-1 rounded py-1.5 font-medium transition whitespace-nowrap ${
                  selectedGender === 'femme'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sœurs
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('homme')}
                className={`flex-1 rounded py-1.5 font-medium transition whitespace-nowrap ${
                  selectedGender === 'homme'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Frères
              </button>
            </div>
          </div>

          {/* Situation matrimoniale */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-stone-700">
              Statut matrimonial
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as MaritalStatus)}
              className="w-full rounded-md border border-stone-300 bg-white py-2 px-3 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="Tous les statuts">Tous les statuts</option>
              <option value="Célibataire">Célibataire</option>
              <option value="Divorcé(e)">Divorcé(e)</option>
              <option value="Veuf/Veuve">Veuf/Veuve</option>
            </select>
          </div>
        </div>
      </div>

      {/* Monetization & Mobile Money notice banner like Farata.net */}
      {onOpenPricing && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-amber-200/80 bg-gradient-to-r from-amber-50 to-emerald-50/50 p-3.5 text-xs text-stone-800 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-amber-200 text-[10px] font-bold">
              ★
            </span>
            <div>
              <span className="font-semibold text-emerald-950">Formules d'accès & Abonnements en FCFA :</span>{' '}
              <span className="text-stone-600">
                Paiement instantané par Airtel Money (*400#) ou Moov Money (*155#). Contactez les tuteurs légaux (Wali) en priorité.
              </span>
            </div>
          </div>
          <button
            onClick={onOpenPricing}
            className="shrink-0 rounded-md bg-emerald-800 px-3.5 py-1.5 font-semibold text-white shadow-2xs hover:bg-emerald-700 transition"
          >
            Pass Premium à 2 000 FCFA
          </button>
        </div>
      )}

      {/* Profiles Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-stone-300 p-12 text-center">
          <p className="font-serif text-lg font-medium text-stone-800">
            Aucun profil ne correspond à vos critères actuels
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Essayez d'élargir la région géographique ou de réinitialiser vos filtres.
          </p>
          <button
            onClick={() => {
              setSelectedRegion('Toutes les régions');
              setSelectedGender('tous');
              setSelectedStatus('Tous les statuts');
              setSearchQuery('');
            }}
            className="mt-4 rounded-md border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-700 shadow-xs hover:bg-stone-50"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((p) => {
            const isBlurred = p.gender === 'femme' && !unblurredPhotos[p.id];
            const isMyProfile = myProfileIds.includes(p.id);

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs transition hover:border-emerald-700 hover:shadow-md"
              >
                <div>
                  {/* Top image & modesty header */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={p.avatarUrl}
                      alt={p.fullName}
                      referrerPolicy="no-referrer"
                      className={`h-full w-full object-cover transition duration-300 ${
                        isBlurred ? 'blur-md scale-105' : 'blur-0'
                      }`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* My profile banner */}
                    {isMyProfile && (
                      <div className="absolute top-2 left-2 rounded bg-amber-400 text-stone-950 font-bold px-2 py-0.5 text-[10px] shadow-sm z-10">
                        ★ Votre profil
                      </div>
                    )}

                    {/* Modesty blur overlay for female profiles */}
                    {p.gender === 'femme' && (
                      <div className="absolute top-2 right-2">
                        <button
                          type="button"
                          onClick={(e) => togglePhotoBlur(p.id, e)}
                          title={isBlurred ? 'Afficher la photo' : 'Masquer par pudeur'}
                          className="flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-xs hover:bg-black/80"
                        >
                          {isBlurred ? (
                            <>
                              <Eye className="h-3 w-3" />
                              <span>Voir</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" />
                              <span>Pudeur</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Verification & Location kicker */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded bg-stone-900/80 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      <span>{p.city}</span>
                    </div>
                  </div>

                  {/* Card Content: ZERO-PILL METADATA DISCIPLINE */}
                  <div className="p-5">
                    {/* Unboxed metadata kicker */}
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-emerald-800">
                        {p.gender === 'homme' ? 'Frère' : 'Sœur'} · {p.age} ans
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{p.maritalStatus}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.ethnicGroup}</span>
                    </div>

                    {/* Name */}
                    <h3 className="mt-1 font-serif text-lg font-bold text-stone-900">
                      {p.fullName}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-stone-700">
                      {p.profession}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-3">
                      {p.bio}
                    </p>

                    {/* Deen & Values info */}
                    <div className="mt-4 border-t border-stone-100 pt-3 text-xs space-y-1.5">
                      <div className="flex items-start gap-1.5 text-stone-700">
                        <span className="font-medium text-stone-900 shrink-0">Pratique :</span>
                        <span className="text-stone-600 truncate">{p.religiousPractice}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-stone-700">
                        <span className="font-medium text-stone-900 shrink-0">Dot (Mahr) :</span>
                        <span className="text-stone-600 truncate">{p.mahrExpectation}</span>
                      </div>
                      {p.waliName && (
                        <div className="flex items-start gap-1.5 text-emerald-900">
                          <span className="font-medium text-emerald-950 shrink-0">Wali référencé :</span>
                          <span className="text-emerald-800 truncate">
                            {p.waliRelation} ({p.waliCity})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions at card bottom */}
                <div className="border-t border-stone-100 bg-stone-50 p-4 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProfile(p)}
                    className="flex-1 rounded-md border border-stone-300 bg-white py-2 text-center text-xs font-semibold text-stone-700 shadow-xs hover:bg-stone-100 transition whitespace-nowrap"
                  >
                    Voir profil complet
                  </button>
                  {isMyProfile ? (
                    <button
                      onClick={() => {
                        if (onRequestDelete) onRequestDelete(p);
                      }}
                      className="rounded-md bg-red-600 px-3 py-2 text-center text-xs font-semibold text-white shadow-xs hover:bg-red-700 transition whitespace-nowrap"
                      title="Supprimer ce profil"
                    >
                      Supprimer
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestKhitbah(p)}
                      className="flex-1 rounded-md bg-emerald-800 py-2 text-center text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 transition whitespace-nowrap"
                    >
                      Démarche Khitbah
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
