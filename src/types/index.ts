export type NigerRegion =
  | 'Toutes les régions'
  | 'Niamey'
  | 'Zinder'
  | 'Maradi'
  | 'Tahoua'
  | 'Agadez'
  | 'Dosso'
  | 'Tillabéri'
  | 'Diffa';

export type Gender = 'homme' | 'femme';

export type MaritalStatus =
  | 'Tous les statuts'
  | 'Célibataire'
  | 'Divorcé(e)'
  | 'Veuf/Veuve';

export interface Profile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  region: NigerRegion;
  city: string;
  profession: string;
  education: string;
  ethnicGroup: string;
  languages: string[];
  maritalStatus: 'Célibataire' | 'Divorcé(e)' | 'Veuf/Veuve';
  childrenCount: number;
  religiousPractice: string;
  polygamyStatus: 'Monogamie stricte' | 'Ouvert(e) à la polygamie légale' | 'Non concerné(e)';
  mahrExpectation: string;
  waliName?: string;
  waliRelation?: string;
  waliCity?: string;
  waliPhone?: string;
  bio: string;
  aspirations: string;
  avatarUrl: string;
  isVerified: boolean;
  registrationDate: string;
}

export interface AdviceArticle {
  id: string;
  title: string;
  category: 'Fiançailles & Mahr' | 'Droits & Devoirs' | 'Conflits & Famille' | 'Spiritualité & Couple' | 'Éducation & Foyer';
  readingTime: string;
  quranRef: string;
  summary: string;
  content: string[];
  practicalTips: string[];
}

export interface CompatibilityQuestion {
  id: number;
  question: string;
  theme: string;
  options: {
    label: string;
    text: string;
    scoreWeight: number;
    insight: string;
  }[];
}

export interface KhitbahRequest {
  id: string;
  senderName: string;
  senderPhone: string;
  targetProfileId: string;
  targetProfileName: string;
  message: string;
  waliContactNote: string;
  status: 'En attente de validation' | 'Transmis au tuteur (Wali)' | 'Accepté pour Mouqabala' | 'Refusé avec politesse';
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  durationLabel: string;
  durationMonths: number;
  priceCfa: number;
  priceEuroApprox: number;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  features: string[];
  exclusiveBonus?: string;
  buttonText: string;
}

export type PaymentMethodId = 'airtel_niger' | 'moov_niger' | 'card' | 'wave' | 'al_izza';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  name: string;
  shortName: string;
  logoColor: string;
  ussdInstructions: string;
  availability: string;
}

export type FAQCategory = 'tous' | 'halal' | 'khitbah' | 'pricing' | 'security' | 'counseling';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'halal' | 'khitbah' | 'pricing' | 'security' | 'counseling';
  hadithOrRef?: string;
}

export interface UserSubscription {
  planId: string;
  planName: string;
  isActive: boolean;
  paymentMethod?: string;
  activatedAt?: string;
  expiresAt?: string;
  referenceId?: string;
}

