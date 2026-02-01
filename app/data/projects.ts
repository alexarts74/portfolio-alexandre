export interface Project {
  title: string;
  slug: string;
  image: string;
  images: string[];
  shortDescription: string;
  context: string;
  missions: string[];
  learnings: string[];
  year: string;
  technologies: string[];
  type: "web" | "mobile";
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Evera",
    slug: "evera",
    image: "/images/projects/evera.jpg",
    images: [
      "/images/projects/evera.jpg",
      "/images/projects/evera-2.jpg",
    ],
    shortDescription: "Plateforme SaaS de gestion de flottes de véhicules",
    context: "Evera est une solution SaaS pour les entreprises qui gèrent des flottes de véhicules. Elle centralise toutes les informations liées aux véhicules : trajets, coûts, entretiens, infractions et abonnements, pour permettre une gestion proactive et en temps réel.",
    missions: [
      "Développement complet du tableau de bord principal, intégrant toutes les données véhicules, trajets, coûts et alertes",
      "Mise en place de remontées d'alertes en temps réel via CRON jobs et scripts serveur pour prévenir immédiatement des incidents",
      "Intégration de la télémétrie des véhicules via MQTT pour le suivi live des données",
      "Automatisation des paiements et abonnements clients via Stripe",
      "Conception de reportings analytiques pour optimiser la gestion de la flotte",
    ],
    learnings: [
      "Expérience full-stack avec intégration front-back-serveur en temps réel",
      "Maîtrise de solutions techniques pour des besoins produits complexes",
      "Capacité à penser produit, prioriser les fonctionnalités et proposer des alertes et reportings pertinents pour l'utilisateur final",
      "Renforcement de ma vision produit-technique, combinant backend, front-end et automatisation serveur",
    ],
    year: "2024",
    technologies: ["Next.js", "Nest.js", "PostgreSQL", "Python", "Stripe", "MQTT"],
    type: "web",
  },
  {
    title: "Bib Batteries",
    slug: "bibbatteries",
    image: "/images/projects/bibbatteries.jpg",
    images: [
      "/images/projects/bibbatteries.jpg",
      "/images/projects/bibbatteries-2.jpg",
    ],
    shortDescription: "Plateforme de gestion de stocks de batteries électriques",
    context: "Bib Batteries est une plateforme web pour centraliser la gestion des stocks de batteries électriques, permettant aux fournisseurs, partenaires et équipes internes de collaborer et d'accéder à des informations fiables.",
    missions: [
      "Développement d'un dashboard interactif pour visualiser stocks, état des batteries et garanties",
      "Mise en place de scripts de synchronisation automatiques avec Notion pour actualiser les données sans intervention manuelle",
      "Création de rapports dynamiques pour le suivi de l'état des batteries et la gestion des locations",
      "Gestion des droits d'accès multi-utilisateurs pour adapter les vues selon les rôles",
    ],
    learnings: [
      "Approche produit centrée utilisateur, en concevant des dashboards adaptés à différents rôles",
      "Développement de logiques serveur et automatisation, pour simplifier des processus manuels",
      "Capacité à résoudre des problèmes multi-utilisateurs, en garantissant cohérence et sécurité des données",
      "Renforcement de ma vision full-stack et produit, en combinant front interactif et backend robuste",
    ],
    year: "2024",
    technologies: ["React", "Python", "PostgreSQL", "Notion API"],
    type: "web",
  },
  {
    title: "RunMate",
    slug: "runmate",
    image: "/images/projects/runmate.jpg",
    images: [
      "/images/projects/runmate.jpg",
      "/images/projects/runmate-2.jpg",
    ],
    shortDescription: "Application mobile sociale pour coureurs",
    context: "RunMate est une application mobile permettant de connecter les coureurs, organiser des sorties et créer une communauté autour de la course à pied.",
    missions: [
      "Développement complet de l'interface mobile en React Native et NativeWind",
      "Création du backend en Ruby on Rails, incluant gestion utilisateurs, profils, groupes, événements et messagerie interne",
      "Mise en place de notifications push et messagerie en temps réel",
      "Conception d'un système de gestion des disponibilités des coureurs",
      "Intégration de statistiques et suivi d'objectifs pour motiver les utilisateurs",
    ],
    learnings: [
      "Expérience dans la conception produit centrée utilisateur, pour répondre aux besoins de motivation et socialisation",
      "Développement de solutions techniques temps réel, comme messagerie et notifications",
      "Coordination front-end et backend mobile pour une expérience fluide",
      "Réflexion sur la valeur fonctionnelle et la priorisation des fonctionnalités",
    ],
    year: "2024",
    technologies: ["React Native", "Expo", "NativeWind", "Ruby on Rails", "PostgreSQL"],
    type: "mobile",
  },
  {
    title: "WorkAdventure",
    slug: "workadventure",
    image: "/images/projects/workadventure.jpg",
    images: [
      "/images/projects/workadventure.jpg",
      "/images/projects/workadventure-2.jpg",
    ],
    shortDescription: "Plateforme interactive collaborative immersive",
    context: "WorkAdventure est une plateforme immersive pour événements et expériences collaboratives en ligne, où les utilisateurs naviguent dans des espaces interactifs.",
    missions: [
      "Refonte UI/UX pour améliorer la navigation et l'expérience utilisateur",
      "Développement de popups interactifs et gestion caméra pour enrichir l'interaction",
      "Création d'un outil CLI pour permettre aux partenaires de publier facilement leurs cartes",
      "Automatisation du déploiement des cartes interactives via GitHub Actions",
    ],
    learnings: [
      "Expérience très technique, avec création d'outils CLI et workflows automatisés pour partenaires",
      "Maîtrise de l'architecture frontend complexe, pour gérer des interactions avancées et cartes modulaires",
      "Optimisation de la performance et la scalabilité pour des espaces interactifs réutilisables",
      "Développement de compétences en CI/CD et automatisation de déploiement",
    ],
    year: "2023",
    technologies: ["Svelte", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    type: "web",
  },
  {
    title: "The Surf Course",
    slug: "thesurfcourse",
    image: "/images/projects/thesurfcourse.jpg",
    images: [
      "/images/projects/thesurfcourse.jpg",
      "/images/projects/thesurfcourse-2.jpg",
    ],
    shortDescription: "Guide d'achat de matériel de surf personnalisé",
    context: "The Surf Course est une application web qui guide les surfeurs débutants dans le choix de leur matériel selon niveau, taille et conditions de pratique.",
    missions: [
      "Développement d'un parcours interactif avec recommandations personnalisées",
      "Implémentation d'un algorithme de matching produit/utilisateur",
      "Optimisation de l'interface pour une navigation fluide sur smartphones et tablettes",
    ],
    learnings: [
      "Réflexion produit autour de la personnalisation et recommandations",
      "Capacité à traduire des contraintes utilisateurs en algorithmes simples et efficaces",
      "Amélioration de l'UX mobile et navigation fluide",
      "Priorisation des fonctionnalités pour maximiser la valeur utilisateur",
    ],
    year: "2023",
    technologies: ["Ruby on Rails", "JavaScript", "PostgreSQL", "Figma"],
    type: "web",
  },
  {
    title: "Tudo Bem Maman",
    slug: "tudobemmaman",
    image: "/images/projects/tudobemmaman.jpg",
    images: [
      "/images/projects/tudobemmaman.jpg",
      "/images/projects/tudobemmaman-2.jpg",
    ],
    shortDescription: "E-commerce pour marque de vêtements",
    context: "Boutique en ligne pour une marque de vêtements, permettant de parcourir produits, gérer panier et achats, avec un dashboard back-office pour gérer collections et ventes.",
    missions: [
      "Développement du catalogue produits et panier, avec navigation fluide",
      "Intégration d'un système de paiement sécurisé via Stripe",
      "Création du dashboard back-office pour gérer produits, stocks et ventes",
      "Optimisation de l'interface responsive pour desktop et mobile",
    ],
    learnings: [
      "Maîtrise de la conception d'une application e-commerce complète, du front au back",
      "Développement de solutions techniques robustes pour la gestion et paiement en ligne",
      "Réflexion produit sur l'expérience utilisateur et parcours d'achat",
      "Capacité à prendre des décisions techniques orientées valeur produit",
    ],
    year: "2023",
    technologies: ["Ruby on Rails", "JavaScript", "PostgreSQL", "Stripe"],
    type: "web",
  },
  {
    title: "TripMate",
    slug: "tripmate",
    image: "/images/projects/tripmate.jpg",
    images: [
      "/images/projects/tripmate.jpg",
      "/images/projects/tripmate-2.jpg",
      "/images/projects/tripmate-3.jpg",
    ],
    shortDescription: "Application mobile de voyage collaborative",
    context: "TripMate est une application mobile permettant de créer et partager des voyages à plusieurs. Chaque voyage devient un journal collaboratif, où les participants peuvent documenter les destinations, suivre les dépenses communes et conserver une trace complète du séjour.",
    missions: [
      "Développement d'une application mobile complète, avec création de compte et authentification",
      "Mise en place de la création de voyages collaboratifs, avec système d'invitation des participants",
      "Développement d'un journal de voyage partagé, permettant d'ajouter destinations, photos, descriptions et prix",
      "Implémentation d'un module de gestion des dépenses de type Tricount, avec calcul automatique des remboursements",
      "Création d'une fonctionnalité d'export du voyage, pour conserver ou partager le journal après le séjour",
      "Gestion des données temps réel pour assurer une synchronisation fluide entre les utilisateurs",
    ],
    learnings: [
      "Solide expérience en développement mobile cross-platform, avec une attention particulière aux usages réels sur smartphone",
      "Compréhension des bonnes pratiques mobiles, notamment les guidelines Apple (UX, performances, navigation, contraintes iOS/iPadOS)",
      "Capacité à concevoir une application collaborative fluide, même avec plusieurs utilisateurs actifs en simultané",
      "Renforcement de ma réflexion produit sur la simplicité d'usage, la clarté des fonctionnalités et la valeur apportée à l'utilisateur final",
    ],
    year: "2024",
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    type: "mobile",
  },
  {
    title: "Portfolio Callixte",
    slug: "callixte",
    image: "/images/projects/callixte.jpg",
    images: [
      "/images/projects/callixte.jpg",
      "/images/projects/callixte-2.jpg",
      "/images/projects/callixte-3.jpg",
    ],
    shortDescription: "Site vitrine pour danseuse professionnelle",
    context: "Portfolio Callixte est un site vitrine destiné à une danseuse professionnelle. L'objectif est de proposer un site élégant, immersif et visuellement fort, mettant en avant son univers artistique et son identité.",
    missions: [
      "Conception d'un site vitrine sur-mesure, centré sur l'image et la mise en valeur du contenu",
      "Intégration d'animations fluides pour renforcer l'immersion",
      "Travail sur la hiérarchie visuelle, les transitions et le rythme de navigation",
      "Développement d'un site responsive, adapté desktop et mobile",
    ],
    learnings: [
      "Approfondissement de mes compétences en design web et sens du détail visuel",
      "Capacité à traduire une identité artistique en expérience digitale cohérente",
      "Travail sur l'esthétique, les animations et la narration visuelle, sans sur-technicité inutile",
      "Compréhension de l'importance d'un site vitrine clair, élégant et impactant pour une marque personnelle",
    ],
    year: "2025",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "web",
    liveUrl: "https://callixte.com",
  },
];
