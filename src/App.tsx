/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { PresentationVideoSection } from './components/PresentationVideoSection';
import { DirectoryView } from './components/DirectoryView';
import { AdviceHub } from './components/AdviceHub';
import { CompatibilityTestModal } from './components/CompatibilityTestModal';
import { MahrCalculatorSection } from './components/MahrCalculatorSection';
import { MyRequestsView } from './components/MyRequestsView';
import { KhitbahModal } from './components/KhitbahModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { ArticleModal } from './components/ArticleModal';
import { ProfileCreationModal } from './components/ProfileCreationModal';
import { PricingSection } from './components/PricingSection';
import { PaymentModal } from './components/PaymentModal';
import { FAQSection } from './components/FAQSection';
import { LoginModal } from './components/LoginModal';
import { DeleteProfileModal } from './components/DeleteProfileModal';
import { Footer } from './components/Footer';

import { INITIAL_PROFILES, ADVICE_ARTICLES } from './data/mockData';
import { Profile, AdviceArticle, KhitbahRequest, PricingPlan, UserSubscription } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'advice' | 'test' | 'mahr' | 'pricing' | 'faq' | 'requests'>('directory');
  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [requests, setRequests] = useState<KhitbahRequest[]>([]);
  const [myProfileIds, setMyProfileIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mawadda_my_profile_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null);

  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(() => {
    return {
      planId: 'plan_gratuit',
      planName: 'Pass Gratuit',
      isActive: true,
      activatedAt: 'Depuis l\'inscription',
    };
  });
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string; role: 'candidat' | 'wali' } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Modals state
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [targetProfileForKhitbah, setTargetProfileForKhitbah] = useState<Profile | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<AdviceArticle | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);

  // Handlers
  const handleAddProfile = (
    newProfile: Profile,
    plan: 'plan_gratuit' | 'plan_premium',
    user: { name: string; phone: string; role: 'candidat' | 'wali' }
  ) => {
    setProfiles((prev) => [newProfile, ...prev]);
    setMyProfileIds((prev) => {
      const updated = [newProfile.id, ...prev];
      try {
        localStorage.setItem('mawadda_my_profile_ids', JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });

    // Save authenticated user
    setCurrentUser(user);

    // Save chosen subscription plan
    setCurrentSubscription({
      planId: plan,
      planName: plan === 'plan_premium' ? 'Formule Premium (2 000 FCFA)' : 'Formule Gratuite (0 FCFA)',
      isActive: true,
      activatedAt: "Aujourd'hui",
      expiresAt: plan === 'plan_premium' ? 'Dans 30 jours (Renouvelable)' : undefined,
    });

    setSelectedProfile(newProfile);
    setActiveTab('directory');
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    setMyProfileIds((prev) => {
      const updated = prev.filter((id) => id !== profileId);
      try {
        localStorage.setItem('mawadda_my_profile_ids', JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
    if (selectedProfile?.id === profileId) {
      setSelectedProfile(null);
    }
    setProfileToDelete(null);
  };

  const handleAddRequest = (newRequest: KhitbahRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleCancelRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-800 selection:text-emerald-50">
      {/* Top Navigation (Rencontres Halal, Tarifs, FAQ, Se connecter) */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        isSubscribed={currentSubscription ? currentSubscription.planId !== 'plan_gratuit' : false}
        hasMyProfile={myProfileIds.length > 0}
        onOpenMyProfile={() => {
          const myP = profiles.find((p) => myProfileIds.includes(p.id));
          if (myP) {
            setSelectedProfile(myP);
          } else {
            setIsCreateProfileOpen(true);
          }
        }}
        onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'directory' && (
          <>
            <HeroSection
              onExploreProfiles={() => {
                const el = document.getElementById('profiles-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onWatchVideo={() => {
                const el = document.getElementById('presentation-video');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreAdvice={() => setActiveTab('advice')}
              totalProfilesCount={profiles.length}
            />

            <PresentationVideoSection
              onStartMatching={() => setIsCreateProfileOpen(true)}
              onExploreAdvice={() => setActiveTab('advice')}
            />

            <div id="profiles-directory">
              <DirectoryView
                profiles={profiles}
                onSelectProfile={(p) => setSelectedProfile(p)}
                onRequestKhitbah={(p) => setTargetProfileForKhitbah(p)}
                onOpenPricing={() => setActiveTab('pricing')}
                myProfileIds={myProfileIds}
                onRequestDelete={(p) => setProfileToDelete(p)}
              />
            </div>
          </>
        )}

        {activeTab === 'advice' && (
          <AdviceHub
            articles={ADVICE_ARTICLES}
            onOpenArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {activeTab === 'test' && (
          <div className="py-8">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  <span>Préparation au Mariage en Islam</span>
                  <span aria-hidden="true">·</span>
                  <span>Guide de la Mouqabala</span>
                </div>
                <h1 className="mt-3 font-serif text-3xl font-bold text-stone-900 sm:text-4xl" style={{ textWrap: 'balance' }}>
                  Test d'Alignement & Compatibilité Prénuptiale
                </h1>
                <p className="mt-3 text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
                  Avant de franchir le pas de la Fatiha, évaluez avec clarté vos convictions sur les finances du foyer, les relations avec la belle-famille au Niger, la pratique du deen et les projets de vie.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => setIsTestModalOpen(true)}
                    className="rounded-md bg-emerald-800 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-900 transition"
                  >
                    Démarrer le questionnaire d'alignement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mahr' && (
          <MahrCalculatorSection />
        )}

        {activeTab === 'pricing' && (
          <PricingSection
            onSelectPlan={(plan) => {
              if (plan.priceCfa === 0) {
                setCurrentSubscription({
                  planId: 'plan_gratuit',
                  planName: 'Pass Découverte (Gratuit)',
                  isActive: true,
                  activatedAt: 'Aujourd\'hui',
                });
                return;
              }
              setSelectedPlanForPayment(plan);
            }}
            currentSubscription={currentSubscription}
            onOpenFAQ={() => setActiveTab('faq')}
          />
        )}

        {activeTab === 'faq' && (
          <FAQSection
            onOpenPricing={() => setActiveTab('pricing')}
            onOpenAdvice={() => setActiveTab('advice')}
          />
        )}

        {activeTab === 'requests' && (
          <MyRequestsView
            requests={requests}
            onExploreProfiles={() => setActiveTab('directory')}
            onCancelRequest={handleCancelRequest}
          />
        )}
      </main>

      {/* Footer (Tous le reste en bas : Fiqh, Test, Sadaki, Démarches, Vidéo, Charte) */}
      <Footer
        onOpenTest={() => setActiveTab('test')}
        onOpenMahr={() => setActiveTab('mahr')}
        onOpenAdvice={() => setActiveTab('advice')}
        onOpenVideo={() => {
          setActiveTab('directory');
          setTimeout(() => {
            const el = document.getElementById('presentation-video');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenPricing={() => setActiveTab('pricing')}
        onOpenFAQ={() => setActiveTab('faq')}
        onOpenRequests={() => setActiveTab('requests')}
        onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
        requestsCount={requests.length}
      />

      {/* Modals & Overlays */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
      />

      <ProfileDetailModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onRequestKhitbah={(p) => {
          setSelectedProfile(null);
          setTargetProfileForKhitbah(p);
        }}
        isMyProfile={selectedProfile ? myProfileIds.includes(selectedProfile.id) : false}
        onRequestDelete={(p) => setProfileToDelete(p)}
      />

      {profileToDelete && (
        <DeleteProfileModal
          profile={profileToDelete}
          isOpen={!!profileToDelete}
          onClose={() => setProfileToDelete(null)}
          onConfirmDelete={handleDeleteProfile}
        />
      )}

      <KhitbahModal
        profile={targetProfileForKhitbah}
        isOpen={!!targetProfileForKhitbah}
        onClose={() => setTargetProfileForKhitbah(null)}
        onSubmitRequest={handleAddRequest}
      />

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <CompatibilityTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />

      <ProfileCreationModal
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
        onAddProfile={handleAddProfile}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {selectedPlanForPayment && (
        <PaymentModal
          plan={selectedPlanForPayment}
          onClose={() => setSelectedPlanForPayment(null)}
          onSuccessfulPayment={(sub) => {
            setCurrentSubscription(sub);
          }}
        />
      )}
    </div>
  );
}
