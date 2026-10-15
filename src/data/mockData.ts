import { Profile, AdviceArticle, CompatibilityQuestion, PricingPlan, PaymentMethodOption, FAQItem } from '../types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'prof-1',
    fullName: 'Ibrahim Dan Baba',
    age: 31,
    gender: 'homme',
    region: 'Niamey',
    city: 'Niamey (Yantala)',
    profession: 'Ingénieur Télécoms & Réseaux',
    education: 'Master en Informatique & Réseaux (ESTM)',
    ethnicGroup: 'Hausa',
    languages: ['Français', 'Hausa', 'Anglais (professionnel)', 'Arabe (lecture du Coran)'],
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Prière à la mosquée assidue, mémorisation de 15 Hizbs, cours réguliers de Fiqh',
    polygamyStatus: 'Monogamie stricte',
    mahrExpectation: 'Selon la Sunnah et les recommandations du tuteur, dans la modération bénie',
    bio: 'Natif de Niamey, je recherche une épouse pieuse, humble et instruite pour bâtir un foyer fondé sur la piété mutuelle, l\'entraide quotidienne et la sérénité (sakinah). Très attaché à mes parents tout en comprenant la nécessaire intimité du couple.',
    aspirations: 'Accomplir la Omra ensemble dans les deux premières années de mariage, instaurer des moments quotidiens d\'apprentissage spirituel à la maison, et offrir une éducation équilibrée à nos futurs enfants.',
    avatarUrl: '/assets/images/avatar_man_niamey_1791126334383.jpg',
    isVerified: true,
    registrationDate: 'Il y a 3 jours',
  },
  {
    id: 'prof-2',
    fullName: 'Amina Mansour',
    age: 27,
    gender: 'femme',
    region: 'Zinder',
    city: 'Zinder (Birni)',
    profession: 'Enseignante de Français & Arabe en lycée',
    education: 'Licence en Lettres & Langues Arabes (Université de Zinder)',
    ethnicGroup: 'Hausa',
    languages: ['Hausa', 'Français', 'Arabe'],
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Port du jilbab complet, prières à l\'heure, cours d\'exégèse coranique le week-end',
    polygamyStatus: 'Monogamie stricte',
    mahrExpectation: 'Sadaki modéré selon la Sunnah prophétique, axé sur la piété de l\'homme',
    waliName: 'Elhadj Mansour Kaka',
    waliRelation: 'Père',
    waliCity: 'Zinder',
    waliPhone: '+227 96 ** ** 12',
    bio: 'Résidente dans la cité historique de Zinder. Je suis une femme calme, dévouée au savoir et à l\'éducation. Je recherche un frère pratiquant, respectueux des droits que l\'Islam a conférés à la femme, doté d\'une bonne moralité et d\'une autonomie financière halal.',
    aspirations: 'Fonder un foyer où le rappel d\'Allah et la douceur régnent. Poursuivre mon activité d\'enseignement tout en consacrant le meilleur de mon temps à l\'harmonie familiale.',
    avatarUrl: '/assets/images/avatar_woman_zinder_1791126346663.jpg',
    isVerified: true,
    registrationDate: 'Il y a 5 jours',
  },
  {
    id: 'prof-3',
    fullName: 'Abdoulaye Soumana',
    age: 35,
    gender: 'homme',
    region: 'Maradi',
    city: 'Maradi (Dan Goulbi)',
    profession: 'Entrepreneur Agro-Alimentaire & Éleveur',
    education: 'BTS en Gestion Commerciale & formations agricoles',
    ethnicGroup: 'Zarma-Songhai',
    languages: ['Zarma', 'Hausa', 'Français'],
    maritalStatus: 'Divorcé(e)',
    childrenCount: 1,
    religiousPractice: 'Pratiquant rigoureux, aumône (zakat) régulière, respect strict des principes éthiques dans le commerce',
    polygamyStatus: 'Ouvert(e) à la polygamie légale',
    mahrExpectation: 'Prendre en charge dignement tous les frais prévus par la charia avec générosité raisonnée',
    bio: 'Homme d\'action installé à Maradi, divorcé depuis trois ans avec un enfant sous la garde partagée bienveillante. Je recherche une sœur mûre, compréhensive, prête à s\'engager dans une relation de respect, de dialogue et d\'affection sincère.',
    aspirations: 'Construire une famille soudée, stabiliser nos projets économiques et préparer ensemble notre vie ici-bas et dans l\'au-delà avec la grâce d\'Allah.',
    avatarUrl: '/assets/images/avatar_man_maradi_1791126358871.jpg',
    isVerified: true,
    registrationDate: 'Il y a 1 semaine',
  },
  {
    id: 'prof-4',
    fullName: 'Fatima Al-Hassane',
    age: 29,
    gender: 'femme',
    region: 'Niamey',
    city: 'Niamey (Plateau)',
    profession: 'Docteur en Médecine Générale',
    education: 'Doctorat d\'État en Médecine (FSS Niamey)',
    ethnicGroup: 'Fulani (Peul)',
    languages: ['Fulfulde', 'Français', 'Hausa', 'Zarma'],
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Prière à l\'heure, jeûnes surérogatoires réguliers, éthique médicale musulmane',
    polygamyStatus: 'Monogamie stricte',
    mahrExpectation: 'Simple et symbolique selon la tradition du Prophète ﷺ',
    waliName: 'Dr. Oumarou Al-Hassane',
    waliRelation: 'Oncle paternel & tuteur',
    waliCity: 'Niamey',
    waliPhone: '+227 90 ** ** 44',
    bio: 'Médecin dévouée au bien-être des patients, je concilie rigueur professionnelle et amour de ma religion. Je cherche un compagnon de route pieux, bienveillant, intellectuellement stimulant et capable d\'apprécier ma vocation soignante.',
    aspirations: 'Un mariage équilibré basé sur la confiance mutuelle, le respect du travail de chacun et des projets caritatifs conjoints au Niger.',
    avatarUrl: '/assets/images/avatar_woman_zinder_1791126346663.jpg',
    isVerified: true,
    registrationDate: 'Il y a 2 jours',
  },
  {
    id: 'prof-5',
    fullName: 'Moussa Ag Intikwa',
    age: 33,
    gender: 'homme',
    region: 'Agadez',
    city: 'Agadez (Centre)',
    profession: 'Gestionnaire de Projets de Développement Solaire',
    education: 'Diplôme d\'Ingénieur Énergies Renouvelables',
    ethnicGroup: 'Tamasheq',
    languages: ['Tamasheq', 'Français', 'Hausa', 'Arabe'],
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Prière assidue, lecture assidue du Coran, valeurs de droiture et d\'hospitalité nomade',
    polygamyStatus: 'Monogamie stricte',
    mahrExpectation: 'Sadaki fixé en accord avec le Wali, conformité absolue avec les préceptes islamiques',
    bio: 'Installé à Agadez avec de fréquents déplacements professionnels. Calme, attaché aux traditions de pudeur et d\'honneur du Sahara tout en étant tourné vers la modernité responsable. Je désire rencontrer une sœur avec qui voyager dans la droiture.',
    aspirations: 'Construire une maison sereine, faire découvrir la beauté de nos régions à ma future moitié et perpétuer les valeurs de solidarité familiale.',
    avatarUrl: '/assets/images/avatar_man_niamey_1791126334383.jpg',
    isVerified: true,
    registrationDate: 'Il y a 4 jours',
  },
  {
    id: 'prof-6',
    fullName: 'Mariama Boubacar',
    age: 26,
    gender: 'femme',
    region: 'Tahoua',
    city: 'Tahoua (Quartier Sabon Gari)',
    profession: 'Comptable dans une Coopérative Agricole',
    education: 'Licence en Sciences de Gestion',
    ethnicGroup: 'Hausa',
    languages: ['Hausa', 'Français'],
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Pratique quotidienne sincère, modestie vestimentaire (hijab), cercles de femmes de la mosquée',
    polygamyStatus: 'Monogamie stricte',
    mahrExpectation: 'Un mahr raisonnable qui facilite le mariage, selon le Hadith « Le meilleur des mahrs est le plus aisé »',
    waliName: 'Mallam Boubacar Issoufou',
    waliRelation: 'Père',
    waliCity: 'Tahoua',
    waliPhone: '+227 94 ** ** 88',
    bio: 'Jeune femme de Tahoua, joviale, organisée et pieuse. J\'aime la cuisine traditionnelle sahélienne, la lecture et les rassemblements de famille. Mon souhait est de trouver un homme responsable qui craint Allah en secret comme en public.',
    aspirations: 'Un foyer chaleureux où le mari et la femme se soutiennent dans les épreuves et célèbrent ensemble les bienfaits d\'Allah.',
    avatarUrl: '/assets/images/avatar_woman_zinder_1791126346663.jpg',
    isVerified: true,
    registrationDate: 'Il y a 6 jours',
  }
];

export const ADVICE_ARTICLES: AdviceArticle[] = [
  {
    id: 'art-1',
    title: 'Les 5 Piliers du Mariage Halal au Niger : Entre Sunnah et Coutumes',
    category: 'Fiançailles & Mahr',
    readingTime: '5 min de lecture',
    quranRef: 'Sourate An-Nisa (4:4) & Sourate Ar-Rum (30:21)',
    summary: 'Rappels essentiels sur les conditions de validité du Zawaj en Islam et comment éviter les dérives financières qui retardent l\'union des jeunes au Niger.',
    content: [
      "En Islam, le mariage n'est pas seulement un contrat civil ou social, c'est un acte d'adoration (Ibada) et un pacte solennel (Mithaqan Ghalidha). Pour être valide aux yeux de la Sharia, il repose sur des conditions claires :",
      '1. Le consentement mutuel libre et éclairé des deux futurs époux, sans contrainte familiale.',
      '2. La présence et l\'accord du tuteur légal de la femme (le Wali), garant de sa protection et de son honneur.',
      '3. Deux témoins musulmans honorables et dignes de confiance lors du contrat (la Fatiha / Nikah).',
      '4. Le Sadaki (Mahr) : Le droit exclusif de l\'épouse, devant être fixé avec sagesse et modération.',
      '5. L\'annonce publique (I\'lan) et la Walima : un repas de réjouissance sans ostentation ni gaspillage.'
    ],
    practicalTips: [
      'Évitez l\'endettement pour les cérémonies de mariage à Niamey ou dans les régions.',
      'Rappelez aux aînés que le Prophète ﷺ a marié des compagnons avec un anneau de fer ou l\'enseignement de versets coraniques.',
      'Le Sadaki appartient à la femme seule : la belle-famille ne doit pas s\'en approprier.'
    ]
  },
  {
    id: 'art-2',
    title: 'Droits et Devoirs Réciproques : Le secret de la Sakinah dans le Foyer',
    category: 'Droits & Devoirs',
    readingTime: '6 min de lecture',
    quranRef: 'Sourate Al-Baqarah (2:228) & Sourate An-Nisa (4:34)',
    summary: 'Comprendre l\'équilibre voulu par Allah entre la prise en charge (Qiwamah & Nafaqah) de l\'homme et la coopération bienveillante de la femme.',
    content: [
      'La stabilité du couple repose sur une claire conscience des obligations de chacun. L\'Islam a instauré une complémentarité harmonieuse et non une lutte de pouvoir.',
      'Devoirs de l\'époux : Assurer la nourriture, le logement décent et les soins de l\'épouse (Nafaqah) selon ses moyens, la traiter avec douceur (Mu\'ashara bil-Ma\'rouf), ne jamais lui faire subir de violence verbale ou physique, et respecter sa dignité.',
      'Devoirs de l\'épouse : Préserver les secrets et l\'intimité du foyer, faire preuve de gratitude envers les efforts de son époux, garder ses biens et ses enfants avec probité, et faciliter un climat d\'amour et de paix.',
      'L\'attitude recommandée : Ne pas attendre que l\'autre accomplisse ses devoirs pour faire les siens. Agir d\'abord par amour pour Allah.'
    ],
    practicalTips: [
      'Un mot de remerciement au quotidien fait fleurir l\'affection (Mawadda).',
      'L\'homme doit être à l\'écoute de la fatigue de son épouse et l\'aider dans les tâches ménagères, comme le faisait le Prophète ﷺ chez lui.',
      'Ne laissez jamais le coucher du soleil arriver sur une rancœur non dissipée.'
    ]
  },
  {
    id: 'art-3',
    title: 'Gérer la Belle-Famille et les Conflits au Niger selon le Modèle Prophétique',
    category: 'Conflits & Famille',
    readingTime: '7 min de lecture',
    quranRef: 'Sourate An-Nisa (4:35) & Sourate Al-Hujurat (49:10)',
    summary: 'Comment honorer les parents et beaux-parents tout en préservant l\'intimité et la paix du jeune couple sahélien.',
    content: [
      'Au Niger, les liens familiaux sont puissants et constituent une richesse inestimable. Cependant, l\'ingérence excessive peut parfois menacer l\'équilibre conjugal.',
      'Le principe islamique d\'équilibre : L\'obéissance aux parents est une obligation majeure, mais elle ne doit pas aboutir à léser les droits légitimes du conjoint.',
      'La méthode de conciliation coranique : Si un différend sérieux éclate, le Coran prescrit de désigner un arbitre sage de la famille de l\'époux et un arbitre de la famille de l\'épouse (Sourate An-Nisa, v. 35) animés d\'un désir sincère de réconciliation.',
      'La discrétion : Interdiction stricte de divulguer les secrets d\'alcôve et les petites disputes quotidiennes aux amis ou sur les réseaux sociaux.'
    ],
    practicalTips: [
      'Visitez régulièrement la belle-famille avec de petites attentions (Hadith : « Faites-vous des cadeaux, vous vous aimerez »).',
      'Réglez les désaccords à huis clos, loin du regard des enfants et des parents.',
      'En cas d\'injustice, faites preuve de patience (Sabr) et cherchez le conseil d\'un imam ou d\'un médiateur pieux avant toute décision irrévocable.'
    ]
  },
  {
    id: 'art-4',
    title: 'La Question du Sadaki (Dot) : Comment freiner la surenchère au Niger',
    category: 'Fiançailles & Mahr',
    readingTime: '4 min de lecture',
    quranRef: 'Hadith : « Le mariage le plus béni est le plus facile »',
    summary: 'Plaidoyer pour un retour à la Sunnah : comment les familles nigériennes peuvent faciliter le mariage des jeunes face à la cherté de la vie.',
    content: [
      'Dans plusieurs villes nigériennes, les exigences de dot et les frais annexes (valises, cadeaux aux tantes et cousines, réceptions somptueuses) atteignent des sommes décourageantes qui poussent les jeunes au célibat forcé.',
      'Ce que dit l\'Islam : Le Sadaki n\'est pas le remboursement de l\'éducation de la jeune fille, ni une démonstration de richesse pour épater le voisinage. C\'est un cadeau légal, d\'un montant convenu sans minimum imposé par le Coran.',
      'L\'appel des oulémas : Plusieurs associations islamiques au Niger militent pour le plafonnement volontaire des dots et la simplification des cérémonies afin de protéger la jeunesse de la tentation et de la précarité.'
    ],
    practicalTips: [
      'Échangez avec le Wali en amont pour exprimer vos réelles capacités financières avec sincérité et politesse.',
      'Privilégiez la stabilité financière post-mariage (logement, épargne, projets) plutôt que le faste éphémère d\'un jour.',
      'Soyez fier(e) d\'adopter la simplicité prophétique.'
    ]
  }
];

export const COMPATIBILITY_QUESTIONS: CompatibilityQuestion[] = [
  {
    id: 1,
    theme: 'Pratique religieuse & Spiritualité',
    question: 'Quelle place accordez-vous à la pratique religieuse quotidienne dans votre futur foyer ?',
    options: [
      {
        label: 'A',
        text: 'Les 5 prières quotidiennes strictement à l\'heure, cours réguliers de religion et rappels spirituels en famille.',
        scoreWeight: 3,
        insight: 'Très forte orientation vers un foyer fondé sur l\'assiduité spirituelle collective.'
      },
      {
        label: 'B',
        text: 'Pratique sincère des piliers indispensables, avec un désir constant de progresser à notre rythme.',
        scoreWeight: 2,
        insight: 'Approche équilibrée et réaliste axée sur la constance et l\'encouragement mutuel.'
      },
      {
        label: 'C',
        text: 'Chacun gère sa foi de façon personnelle sans imposer de rythme à l\'autre.',
        scoreWeight: 1,
        insight: 'Approche individualiste qui nécessite de s\'assurer d\'un socle de valeurs communes pour les enfants.'
      }
    ]
  },
  {
    id: 2,
    theme: 'Finances & Prise en charge du Foyer',
    question: 'Comment envisagez-vous la gestion financière et les dépenses du couple au Niger ?',
    options: [
      {
        label: 'A',
        text: 'L\'homme assume 100% des besoins essentiels (logement, nourriture, santé) selon la charia (Nafaqah). Les revenus de la femme lui restent propres sauf don volontaire.',
        scoreWeight: 3,
        insight: 'Respect rigoureux de la règle jurisprudentielle islamique standard.'
      },
      {
        label: 'B',
        text: 'L\'homme est le responsable principal, mais les époux s\'entraident volontairement pour les projets d\'avenir et l\'épargne commune.',
        scoreWeight: 3,
        insight: 'Entraide moderne sahélienne très appréciée pour affronter le coût de la vie.'
      },
      {
        label: 'C',
        text: 'Partage systématique 50/50 de toutes les dépenses sans distinction.',
        scoreWeight: 1,
        insight: 'Peut créer des tensions si cela contredit les attentes culturelles et islamiques sur la Nafaqah.'
      }
    ]
  },
  {
    id: 3,
    theme: 'Relations avec les Familles & Beaux-parents',
    question: 'Comment percevez-vous les rapports avec vos beaux-parents et la belle-famille ?',
    options: [
      {
        label: 'A',
        text: 'Visites régulières, respect filial profond, assistance financière aux parents si besoin, tout en gardant l\'intimité du couple.',
        scoreWeight: 3,
        insight: 'Équilibre parfait entre bienfaisance envers les aînés (Birr al-Walidayn) et sanctuaire du couple.'
      },
      {
        label: 'B',
        text: 'Vivre sous le même toit que la grande famille élargie est pour moi une priorité culturelle indispensable.',
        scoreWeight: 2,
        insight: 'Nécessite impérativement le consentement plein et préalable de la future épouse pour éviter les frictions.'
      },
      {
        label: 'C',
        text: 'Distance maximale avec les deux familles pour n\'avoir aucune interférence.',
        scoreWeight: 1,
        insight: 'Difficilement conciliable avec les exigences de la piété filiale en Islam et le tissu social nigérien.'
      }
    ]
  },
  {
    id: 4,
    theme: 'Cérémonie & Dépenses de Mariage',
    question: 'Quelle est votre vision de l\'organisation et du coût des festivités de votre mariage ?',
    options: [
      {
        label: 'A',
        text: 'Une Fatiha digne à la mosquée, un Sadaki modéré et une Walima simple et conviviale entre proches sans dettes.',
        scoreWeight: 3,
        insight: 'Pleine adéquation avec la Sunnah : privilégie la barakah à l\'ostentation.'
      },
      {
        label: 'B',
        text: 'Une fête respectant les coutumes traditionnelles avec de la musique religieuse et des invités, dans les limites de notre budget.',
        scoreWeight: 2,
        insight: 'Harmonie culturelle acceptable à condition d\'éviter tout endettement bancaire ou familial.'
      },
      {
        label: 'C',
        text: 'Une très grande réception prestigieuse avec distribution somptueuse de cadeaux pour marquer les esprits.',
        scoreWeight: 1,
        insight: 'Attention au risque de gaspillage (Isrâf) réprouvé dans le Saint Coran.'
      }
    ]
  },
  {
    id: 5,
    theme: 'Résolution des Désaccords & Conflits',
    question: 'En cas de dispute importante au sein du foyer, quelle démarche privilégiez-vous ?',
    options: [
      {
        label: 'A',
        text: 'Dialogue calme à deux après apaisement de la colère, prière de consultation, et pardon mutuel sans rancune.',
        scoreWeight: 3,
        insight: 'Maturité émotionnelle et spirituelle élevée conforme à l\'Adab islamique.'
      },
      {
        label: 'B',
        text: 'Si le blocage dure, faire appel à un tuteur ou à un sage de confiance selon le verset 35 de la Sourate An-Nisa.',
        scoreWeight: 3,
        insight: 'Respect de la procédure divine de médiation familiale.'
      },
      {
        label: 'C',
        text: 'Bouderie prolongée ou menace de rupture jusqu\'à ce que l\'autre cède complètement.',
        scoreWeight: 1,
        insight: 'Comportement toxique à déconstruire impérativement avant le mariage.'
      }
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_gratuit',
    name: 'Formule Gratuite',
    durationLabel: 'Gratuit pour toujours',
    durationMonths: 0,
    priceCfa: 0,
    priceEuroApprox: 0,
    tagline: 'L\'accès de base pour créer son dossier et découvrir des profils de mariage au Niger.',
    buttonText: 'Commencer gratuitement',
    features: [
      'Inscription et création de profil 100% gratuites',
      'Consultation des profils avec filtres par région et tribu',
      '1 demande de Khitbah officielle par mois',
      'Enregistrement officiel du tuteur légal (Wali)',
      'Accès libre aux articles et guides Al-Nasiha',
      'Test d\'alignement prénuptial & Calculateur de Sadaki',
    ],
  },
  {
    id: 'plan_premium',
    name: 'Formule Premium',
    durationLabel: 'Accès complet',
    durationMonths: 1,
    priceCfa: 2000,
    priceEuroApprox: 3,
    badge: '⭐ Formule Unique & Complète (2 000 F)',
    isPopular: true,
    tagline: 'Toutes les fonctionnalités débloquées pour concrétiser votre mariage béni.',
    buttonText: 'Activer le Pass Premium à 2 000 FCFA',
    exclusiveBonus: 'Paiement direct Airtel Money (*400#) ou Moov Money (*155#)',
    features: [
      'Demandes de Khitbah illimitées auprès des profils sérieux',
      'Transmission directe et prioritaire au Tuteur Légal (Wali)',
      'Badge officiel "Membre Premium Vérifié" sur votre profil',
      'Floutage pudique des photos avec déblocage sur accord mutuel',
      'Visibilité prioritaire dans les 8 régions du Niger',
      'Notification instantanée par SMS / WhatsApp au tuteur',
      'Accès prioritaire à l\'espace d\'accompagnement Al-Nasiha',
    ],
  },
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'airtel_niger',
    name: 'Airtel Money Niger',
    shortName: 'Airtel Money',
    logoColor: 'bg-red-600 text-white',
    ussdInstructions: 'Composez *400# puis option 4 (Paiement Marchand) > Code Mawadda : 22709',
    availability: 'Disponible 24h/24 dans tout le Niger (Réseau Airtel)',
  },
  {
    id: 'moov_niger',
    name: 'Moov Money Niger (Flooz)',
    shortName: 'Moov Money',
    logoColor: 'bg-blue-600 text-white',
    ussdInstructions: 'Composez *155# puis option Paiement de service > Code Marchand : 8820',
    availability: 'Disponible 24h/24 dans tout le Niger (Réseau Moov Africa)',
  },
  {
    id: 'al_izza',
    name: 'Transfert Express Niger (Al-Izza / Nita / Amana)',
    shortName: 'Al-Izza / Nita',
    logoColor: 'bg-amber-600 text-white',
    ussdInstructions: 'Dépôt direct en agence ou transfert mobile au numéro officiel Mawadda',
    availability: 'Plus de 500 agences au Niger (Niamey, Zinder, Maradi, Tahoua, etc.)',
  },
  {
    id: 'card',
    name: 'Carte Bancaire (Visa / Mastercard)',
    shortName: 'Carte Bancaire',
    logoColor: 'bg-emerald-700 text-white',
    ussdInstructions: 'Paiement sécurisé en ligne avec cryptage SSL et 3D-Secure',
    availability: 'Recommandé pour la diaspora nigérienne (France, USA, Canada, Golfe, etc.)',
  },
  {
    id: 'wave',
    name: 'Wave / Orange Money (Sous-région UEMOA)',
    shortName: 'Wave / Orange Money',
    logoColor: 'bg-cyan-600 text-white',
    ussdInstructions: 'Scanner le QR Code ou envoyer au compte marchand Mawadda Sahel',
    availability: 'Sénégal, Côte d\'Ivoire, Mali, Burkina Faso, Bénin, Togo',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'halal',
    question: 'En quoi Mawadda Niger est-elle 100% conforme à l\'éthique islamique (Zawaj Halal) ?',
    answer: 'Contrairement aux applications de rencontres frivoles où règnent le bavardage inutile (kalam fadi) et l\'isolement illicite (khalwa), Mawadda Niger a été conçue sous la supervision de référents religieux. Chaque candidate féminine enregistre son tuteur légal (Wali al-Amr). Aucun échange privé clandestin n\'est toléré : chaque démarche de contact (Khitbah) transite avec l\'information et l\'accord préalable du tuteur, garantissant ainsi la conformité avec la Charia.',
    hadithOrRef: '« Pas de mariage sans tuteur légal (Wali). » (Rapporté par At-Tirmidhi, Abu Dawud)',
  },
  {
    id: 'faq-2',
    category: 'khitbah',
    question: 'Quel est le rôle du Tuteur Légal (Wali) et pourquoi est-il obligatoire pour les sœurs ?',
    answer: 'En droit musulman, la femme musulmane est honorée et protégée par son représentant légal (généralement son père, ou à défaut son grand-père, son frère ou son oncle agnatique). Sur Mawadda Niger, le tuteur reçoit les coordonnées vérifiées et la lettre d\'intention du prétendant. C\'est le tuteur qui valide la Mouqabala (première entrevue licite) en sa présence ou sous sa responsabilité.',
    hadithOrRef: 'Sourate An-Nisa (4:25) : « Épousez-les avec l\'autorisation de leurs proches... »',
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: 'L\'inscription sur Mawadda Niger est-elle payante ?',
    answer: 'Non, l\'inscription et la création de profil sont 100% GRATUITES. Vous pouvez librement remplir votre profil, renseigner votre tuteur, consulter les candidats de toutes les régions du Niger et accéder à nos articles de fiqh. Des abonnements Premium optionnels (à partir de 4 500 FCFA) existent uniquement pour financer la vérification manuelle des profils, le service d\'assistance aux familles et bénéficier de demandes de Khitbah prioritaires.',
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'Pourquoi certains services sont-ils payants ?',
    answer: 'La vérification d\'identité de chaque candidat(e), la prise de contact téléphonique avec les tuteurs légaux (Wali), la modération stricte pour éliminer les faux profils et l\'entretien de notre infrastructure numérique exigent une équipe humaine permanente basée à Niamey. Ces forfaits modestes et adaptés au pouvoir d\'achat nigérien assurent le sérieux des prétendants et filtrent les personnes non engagées.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'Quels sont les moyens de paiement acceptés au Niger et pour la diaspora ?',
    answer: 'Nous acceptons les méthodes de paiement les plus accessibles au Niger : Airtel Money Niger (*400#), Moov Money / Flooz (*155#), et les transferts d\'agence nationaux (Al-Izza, Nita, Amana). Pour la diaspora nigérienne résidant à l\'étranger (France, États-Unis, Canada, Golfe, etc.), le paiement par Carte Bancaire (Visa/Mastercard) et Wave/Orange Money est disponible en toute sécurité.',
  },
  {
    id: 'faq-6',
    category: 'security',
    question: 'Mes photographies et mes données personnelles sont-elles protégées ?',
    answer: 'Absolument. Sur Mawadda Niger, la pudeur (Haya) est une priorité absolue. Les sœurs qui le souhaitent peuvent activer l\'option de floutage de leur photo. La photo n\'est alors dévoilée qu\'après autorisation expresse et vérification de la demande de Khitbah par le Wali. De plus, les numéros de téléphone personnels ne sont jamais affichés publiquement.',
  },
  {
    id: 'faq-7',
    category: 'security',
    question: 'Comment évitez-vous les faux profils et les personnes mal intentionnées ?',
    answer: 'Chaque inscription fait l\'objet d\'une double vérification : validation du numéro de téléphone par SMS et appel de courtoisie si nécessaire auprès du tuteur déclaré. Tout profil comportant des propos irrespectueux, des demandes contraires aux bonnes mœurs ou des informations frauduleuses est immédiatement banni de façon irréversible.',
  },
  {
    id: 'faq-8',
    category: 'khitbah',
    question: 'Comment se déroule la Mouqabala (rencontre prénuptiale) licite ?',
    answer: 'Une fois la demande de Khitbah acceptée par la sœur et son tuteur légal, une date est convenue pour la Mouqabala. Cette rencontre a lieu au domicile familial ou dans un lieu public décent, en présence du tuteur ou d\'un Mahram. L\'homme et la femme peuvent alors échanger sincèrement sur leurs attentes, leurs visions religieuses, la dot (Sadaki) et leur futur foyer.',
    hadithOrRef: 'Le Prophète ﷺ a dit à Al-Moughira : « Regarde-la, car cela est plus à même de créer l\'affection durable entre vous. » (At-Tirmidhi)',
  },
  {
    id: 'faq-9',
    category: 'counseling',
    question: 'Qu\'est-ce que l\'Espace Al-Nasiha et qui sont les conseillers ?',
    answer: 'Al-Nasiha est notre cellule d\'accompagnement conjugal. Elle regroupe des érudits locaux formés au droit de la famille musulman selon le rite malékite (majoritaire au Niger) et des spécialistes des dynamiques familiales sahéliennes. Ils vous aident à désamorcer les incompréhensions, à négocier un Sadaki modéré et à instaurer la quiétude (Sakinah) dans votre couple.',
  },
  {
    id: 'faq-10',
    category: 'halal',
    question: 'La polygamie légale est-elle autorisée sur la plateforme ?',
    answer: 'Oui, conformément à la législation islamique et aux réalités coutumières du Niger. Chaque profil précise clairement son statut et ses aspirations : monogamie stricte ou ouverture à la polygamie légale. La transparence totale est exigée dès le départ afin qu\'aucune des parties ne soit induite en erreur.',
  },
  {
    id: 'faq-11',
    category: 'pricing',
    question: 'Comment activer mon abonnement après un paiement Mobile Money ?',
    answer: 'L\'activation est instantanée ! Après avoir validé le transfert sur votre téléphone avec votre code secret Airtel Money ou Moov Money, entrez le code de transaction ou le numéro de téléphone utilisé dans notre formulaire sécurisé. Votre compte bascule immédiatement en statut Premium avec tous ses avantages débloqués.',
  },
  {
    id: 'faq-12',
    category: 'security',
    question: 'Que se passe-t-il lorsque je trouve mon conjoint sur Mawadda ?',
    answer: 'Dès que votre mariage est scellé par la grâce d\'Allah, vous pouvez archiver ou supprimer votre profil en un seul clic dans vos paramètres. Nous serons également honorés de recueillir votre témoignage anonyme pour encourager d\'autres frères et sœurs du Niger à concrétiser leur union dans la bénédiction.',
  },
];

