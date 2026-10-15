import React from 'react';
import { HeartHandshake, User, LogOut, Sparkles } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onOpenLogin: () => void;
  currentUser: { name: string; phone: string; role: 'candidat' | 'wali' } | null;
  onLogout: () => void;
  isSubscribed?: boolean;
  hasMyProfile?: boolean;
  onOpenMyProfile?: () => void;
  onOpenCreateProfile?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
  currentUser,
  onLogout,
  isSubscribed,
  hasMyProfile,
  onOpenMyProfile,
  onOpenCreateProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Logo & Brand */}
        <button
          onClick={() => setActiveTab('directory')}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-amber-200 transition-transform group-hover:scale-105">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-emerald-950 sm:text-xl">
              Mawadda Niger
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Rencontres Halal - Tarifs - FAQ) */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('directory')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'directory'
                ? 'font-bold text-emerald-800 border-b-2 border-emerald-800 pb-0.5'
                : 'hover:text-stone-900'
            }`}
          >
            Rencontres Halal
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'font-bold text-emerald-800 border-b-2 border-emerald-800 pb-0.5'
                : 'hover:text-stone-900'
            }`}
          >
            Tarifs et Premium
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'font-bold text-emerald-800 border-b-2 border-emerald-800 pb-0.5'
                : 'hover:text-stone-900'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: Bouton Se connecter & Mon Profil */}
        <div className="flex items-center gap-2.5">
          {hasMyProfile ? (
            <button
              onClick={onOpenMyProfile}
              className="flex items-center gap-1.5 rounded-md border border-emerald-700 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 shadow-2xs hover:bg-emerald-100 transition"
              title="Consulter et gérer mon profil"
            >
              <span className="text-amber-600">★</span>
              <span>Mon Profil</span>
            </button>
          ) : (
            onOpenCreateProfile && (
              <button
                onClick={onOpenCreateProfile}
                className="hidden sm:flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                <span>Créer mon profil</span>
              </button>
            )
          )}

          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-stone-900 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-stone-500">
                  {currentUser.role === 'wali' ? 'Tuteur Légal' : 'Candidat'}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 rounded-md border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition"
                title="Se déconnecter"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 rounded-md bg-emerald-800 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-800 whitespace-nowrap"
            >
              <User className="h-3.5 w-3.5" />
              <span>Se connecter</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
