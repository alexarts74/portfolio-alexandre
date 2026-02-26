export const translations = {
  en: {
    // Navigation
    nav: {
      projects: "Projects",
      skills: "Skills",
      about: "About",
      contact: "Contact",
    },
    // Hero
    hero: {
      subtitle: "Full Stack Developer",
      description: "Building digital experiences with code & creativity",
      scroll: "Scroll",
      cta: {
        projects: "See Projects",
        contact: "Contact",
      },
      location: {
        label: "Based in",
        place: "Paris, France",
      },
    },
    // Presentation
    presentation: {
      section: "About",
      number: "01",
      title: "From idea",
      titleItalic: "to execution",
      paragraph1:
        "Full stack web developer. I followed my passion for web development and have since worked on numerous personal and professional projects, from design to integration and development. Feel free to explore!",
      paragraph2:
        "Beyond writing code, I enjoy transforming ideas into interactive and intuitive web experiences. Whether it's building performant APIs, crafting smooth interfaces, or solving logic problems, I always aim for solutions that are robust, elegant, and tailored to user needs.",
      paragraph3:
        "I begin by thoroughly understanding the project, then follow an iterative process that combines thoughtful design with clean, efficient development to deliver a smooth user experience and a polished final product.",
      stats: {
        experience: "Years of exp.",
        projects: "Projects",
        satisfaction: "Client satisfaction",
      },
    },
    // Projects
    projects: {
      section: "Projects",
      number: "02",
      title: "Project",
      titleItalic: "realised",
      viewProject: "View project",
      more: "More Projects",
    },
    // Skills
    skills: {
      section: "Skills",
      number: "03",
      title: "All my",
      titleItalic: "stack",
      paragraph1:
        "I work with a modern tech stack that allows me to build full-featured applications from the ground up.",
      paragraph2:
        "From frontend frameworks to backend services, cloud deployment to design tools, I'm always expanding my toolkit to deliver the best solutions.",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        devops: "DevOps & Cloud",
        tools: "Design & Tools",
      },
    },
    // Work Process
    workProcess: {
      section: "Process",
      number: "04",
      title: "The work",
      titleItalic: "process",
      description: "I begin by thoroughly understanding the project, then follow an iterative process that combines thoughtful design with clean, efficient development to deliver a smooth user experience and a polished final product.",
      steps: {
        pre: {
          title: "PRE",
          subtitle: "Content Design, Concept Creation",
        },
        dev: {
          title: "DEVELOPMENT",
          subtitle: "Front-end, Back-end",
        },
        post: {
          title: "POST",
          subtitle: "Deployment, Auto Enhancing",
        },
      },
    },
    // Contact
    contact: {
      section: "Contact",
      title: "Get in",
      titleItalic: "touch",
      description:
        "Interested in working together? Feel free to reach out for collaborations, opportunities, or just to say hello.",
      social: "Social",
      location: "Location",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
      },
    },
    // Footer
    footer: {
      thanks: "Thanks for visiting",
      rights: "All rights reserved.",
      nav: {
        projects: "Projects",
        about: "About",
        contact: "Contact",
      },
    },
    // Project details
    projectDetails: {
      backToProjects: "Back to projects",
      year: "Year",
      type: "Type",
      description: "Description",
      technologies: "Technologies",
      links: "Links",
      viewLive: "View live",
      viewCode: "View code",
      clientBenefit: "Client benefit",
    },
    // Project data
    projectData: {
      evera: {
        shortDescription: "SaaS platform for vehicle fleet management",
        context: "Evera is a SaaS solution for companies managing vehicle fleets. It centralizes all vehicle-related information: trips, costs, maintenance, infractions, and subscriptions, enabling proactive real-time management.",
        clientBenefit: "Significant reduction in fleet operating costs through centralized tracking of trips, maintenance and infractions. Real-time alerts enable proactive incident management, preventing costly breakdowns and ensuring optimal vehicle availability.",
        technical: [
          "Full-stack architecture with Next.js (front) + Nest.js (API) and PostgreSQL, deployed as a multi-tenant SaaS",
          "Real-time data pipeline via MQTT for vehicle telemetry, with ingestion and database storage",
          "Python CRON jobs and server scripts for anomaly detection and automated alert notifications",
          "Stripe integration for subscription management, recurring payments and automated billing",
          "Analytical reports with backend data aggregation and frontend visualization",
        ],
        features: [
          "Centralized dashboard with real-time fleet overview: trips, costs, maintenance, infractions",
          "Proactive alert system notifying incidents before they become critical",
          "Live vehicle tracking via MQTT telemetry with trip history",
          "Automated client subscription and payment management",
          "Reports and KPIs to optimize fleet operating costs",
        ],
      },
      bibbatteries: {
        shortDescription: "Electric battery stock management platform",
        context: "Bib Batteries is a web platform to centralize electric battery stock management, allowing suppliers, partners, and internal teams to collaborate and access reliable information.",
        clientBenefit: "Drastic time savings on stock management thanks to automated synchronization and a centralized dashboard. Suppliers, partners and internal teams access reliable, up-to-date data without manual intervention, reducing errors and improving decision-making.",
        technical: [
          "React frontend with Python backend and PostgreSQL database for battery data management",
          "Automated bidirectional synchronization with Notion API to keep data up-to-date without intervention",
          "Multi-user roles and permissions system (suppliers, partners, internal teams)",
          "Python server scripts for import/export automation and report generation",
        ],
        features: [
          "Interactive dashboard with stock visualization, battery status and warranty tracking",
          "Automatic data synchronization with Notion in real-time",
          "Dynamic reports for battery monitoring and rental management",
          "Customized views based on user role (supplier, partner, admin)",
        ],
      },
      runmate: {
        shortDescription: "Intelligent runner matching mobile app",
        context: "RunMate is a community-driven mobile application that connects runners through an intelligent matching system. The app analyzes each user's profile — pace, distance, goals, social preferences and location — to suggest matches ranked by compatibility score. Beyond matching, RunMate provides a complete ecosystem: running groups, events, real-time messaging and an official race calendar.",
        clientBenefit: "A runner matchmaking solution that goes beyond traditional social networking. The dual profile system (Performance / Chill) ensures relevant matches based on each runner's goals, while the full ecosystem — groups, events, messaging — fosters an engaged community around running.",
        technical: [
          "React Native + Expo SDK 54 mobile app with TypeScript and NativeWind, Reanimated animations (spring, glow, scale)",
          "Ruby on Rails 7.1 REST API with 14 controllers, 14 ActiveRecord models and Devise + Bearer token authentication",
          "Multi-criteria matching algorithm with weighted scoring: Performance profile (proximity 35%, goals 35%, pace 20%) and Chill profile (proximity 60%, social 30%)",
          "Smart push notification system with batching and deferred delivery, deep linking to relevant screens",
          "Stripe React Native integration for Premium subscriptions with payment and subscription management",
          "Geolocation via Expo Location and Geocoder (Haversine) for nearby runner, group and event discovery",
        ],
        features: [
          "Intelligent swipe-based matching with multi-criteria compatibility scoring and advanced filters (distance, age, pace, frequency)",
          "Dual runner profile: Performance (target pace, weekly mileage, marathon/trail goals) or Chill (distance, preferred time slot, post-run activities)",
          "Running groups with 2-step membership system (request then admin approval), group chat and role management",
          "Events with registration, maximum capacity, difficulty levels and geolocation-based discovery",
          "Private and group messaging with real-time unread message indicators",
          "Official race calendar aggregated from Finishers.com with search and filtering",
        ],
      },
      workadventure: {
        shortDescription: "Immersive collaborative interactive platform",
        context: "WorkAdventure is an immersive platform for online events and collaborative experiences, where users navigate through interactive spaces.",
        clientBenefit: "A more immersive and engaging experience for event participants, driving higher interaction rates. Partners can also autonomously publish and deploy their own interactive maps, accelerating content delivery without technical bottlenecks.",
        technical: [
          "Svelte frontend with TypeScript for a reactive and performant UI in interactive spaces",
          "Custom TypeScript CLI tool enabling partners to publish their maps autonomously",
          "CI/CD pipeline via GitHub Actions for automated interactive map deployment",
          "Modular reusable map architecture with advanced camera and popup management",
        ],
        features: [
          "Immersive interactive spaces where users navigate in real-time",
          "Interactive popups and camera controls enriching the collaborative experience",
          "Publishing CLI for partners to deploy their maps without technical dependency",
          "Automated map deployment via GitHub Actions",
        ],
      },
      thesurfcourse: {
        shortDescription: "Personalized surf equipment buying guide",
        context: "The Surf Course is a web application that guides beginner surfers in choosing their equipment based on level, size, and practice conditions.",
        clientBenefit: "Beginner surfers can confidently choose the right equipment tailored to their level, size and practice conditions. The personalized recommendation system eliminates guesswork and reduces the risk of costly purchasing mistakes.",
        technical: [
          "Full-stack Ruby on Rails application with PostgreSQL and client-side JavaScript",
          "Multi-criteria matching algorithm (level, size, conditions) for product recommendations",
          "Mobile-first responsive interface optimized for smartphones and tablets",
        ],
        features: [
          "Guided interactive journey adapting recommendations to the surfer's profile",
          "Personalized recommendation system based on level, body type and practice conditions",
          "Detailed product pages with comparison and decision-making assistance",
        ],
      },
      tudobemmaman: {
        shortDescription: "E-commerce for clothing brand",
        context: "Online store for a clothing brand, allowing customers to browse products, manage cart and purchases, with a back-office dashboard to manage collections and sales.",
        clientBenefit: "A new online sales channel with a smooth purchase journey that drives conversions and grows revenue. The back-office dashboard gives the brand full autonomy to manage products, stocks and collections without any technical dependency.",
        technical: [
          "Monolithic Ruby on Rails application with PostgreSQL and Stripe payment integration",
          "MVC architecture with separated storefront and back-office administration",
          "Secure Stripe integration for payment processing and order management",
          "Responsive interface with mobile-first design and performance optimization",
        ],
        features: [
          "Product catalog with collection browsing, filters and search",
          "Full shopping cart with quantity management and secure Stripe checkout",
          "Back-office dashboard to manage products, stocks, collections and track sales",
          "Responsive interface for desktop and mobile with smooth purchase journey",
        ],
      },
      tripmate: {
        shortDescription: "Collaborative travel mobile app",
        context: "TripMate is a mobile application for creating and sharing trips with others. Each trip becomes a collaborative journal where participants can document destinations, track shared expenses, and keep a complete record of the journey.",
        clientBenefit: "Simplifies the entire group trip experience — from planning destinations together to splitting expenses fairly with automatic reimbursement calculations. Participants keep a collaborative travel journal they can export and share as a lasting memory of the trip.",
        technical: [
          "React Native + Expo mobile app with TypeScript, targeting iOS and Android",
          "Firebase backend (Auth, Firestore, Storage) for authentication, real-time data and media storage",
          "Real-time synchronization via Firestore for simultaneous multi-user collaboration",
          "Modular architecture: travel journal, expense management, export — all as reusable components",
        ],
        features: [
          "Collaborative trip creation with participant invitation system",
          "Shared travel journal: destinations, photos, descriptions and prices",
          "Tricount-style expense management module with automatic reimbursement calculation",
          "Full trip export to save or share the journal after the trip",
          "Real-time synchronization between all trip participants",
        ],
      },
      callixte: {
        shortDescription: "Portfolio website for professional dancer",
        context: "Portfolio Callixte is a showcase website for a professional dancer. The goal is to offer an elegant, immersive, and visually striking site that highlights her artistic universe and identity.",
        clientBenefit: "A striking online presence that reflects her artistic identity and sets her apart from other dancers. The immersive, visually-driven site strengthens her professional image and makes it easy for casting directors and event organizers to discover her work.",
        technical: [
          "Next.js site with TypeScript and Tailwind CSS, optimized for performance and SEO",
          "CSS animations and smooth transitions for an immersive browsing experience",
          "Static architecture (SSG) for instant loading and simple hosting",
          "Mobile-first responsive design with careful attention to visual hierarchy",
        ],
        features: [
          "Immersive showcase site centered on the dancer's imagery and artistic universe",
          "Smooth animations and polished transitions enhancing the visual experience",
          "Rhythmic navigation with crafted visual hierarchy guiding the visitor",
          "Responsive interface adapted for desktop and mobile",
        ],
      },
      mascotteocean: {
        shortDescription: "Showcase website for restaurant in Carcans Plage",
        context: "La Mascotte de l'Océan is a showcase website for a friendly restaurant located in Carcans Plage. The site presents the complete menu (savory, sweet, ice cream, drinks), the atmosphere of the place, and allows customers to discover the establishment before their visit.",
        clientBenefit: "Greater online visibility that lets future customers discover the restaurant, browse the full menu and get a feel for the atmosphere before visiting. A polished digital presence that builds trust and drives foot traffic to Carcans Plage.",
        technical: [
          "Next.js site with TypeScript and Tailwind CSS, static architecture for optimal performance",
          "Mobile-first approach with image optimization and lazy loading",
          "Subtle CSS animations and transitions for smooth navigation",
          "Deployed on Netlify with automated CI/CD",
        ],
        features: [
          "Restaurant presentation showcasing the atmosphere and venue",
          "Interactive menu organized by sections: savory, sweet, ice cream and drinks",
          "Clean and elegant interface highlighting products and the menu",
          "Smooth navigation with subtle animations and polished transitions",
          "Responsive site optimized for all devices",
        ],
      },
      otherprojects: {
        shortDescription: "Collection of various web projects",
        context: "A collection of various web development projects showcasing different technologies and approaches.",
        clientBenefit: "",
        technical: [
          "Various web development projects",
        ],
        features: [
          "Each project demonstrates specific skills and problem-solving capabilities",
        ],
      },
    },
  },
  fr: {
    // Navigation
    nav: {
      projects: "Projets",
      skills: "Compétences",
      about: "À propos",
      contact: "Contact",
    },
    // Hero
    hero: {
      subtitle: "Développeur Full Stack",
      description: "Création d'expériences digitales avec code & créativité",
      scroll: "Scroll",
      cta: {
        projects: "Voir Projets",
        contact: "Contact",
      },
      location: {
        label: "Basé à",
        place: "Paris, France",
      },
    },
    // Presentation
    presentation: {
      section: "À propos",
      number: "01",
      title: "De l'idée",
      titleItalic: "à l'exécution",
      paragraph1:
        "Développeur web full stack. J'ai suivi ma passion pour le développement web et j'ai depuis travaillé sur de nombreux projets personnels et professionnels, de la conception à l'intégration et au développement. N'hésitez pas à explorer !",
      paragraph2:
        "Au-delà de l'écriture de code, j'aime transformer des idées en expériences web interactives et intuitives. Que ce soit pour construire des APIs performantes, créer des interfaces fluides ou résoudre des problèmes de logique, je vise toujours des solutions robustes, élégantes et adaptées aux besoins des utilisateurs.",
      paragraph3:
        "Je commence par bien comprendre le projet, puis je suis un processus itératif qui combine une conception réfléchie avec un développement propre et efficace pour offrir une expérience utilisateur fluide et un produit final soigné.",
      stats: {
        experience: "Années d'exp.",
        projects: "Projets",
        satisfaction: "Satisfaction client",
      },
    },
    // Projects
    projects: {
      section: "Projets",
      number: "02",
      title: "Projets",
      titleItalic: "réalisés",
      viewProject: "Voir le projet",
      more: "Autres Projets",
    },
    // Skills
    skills: {
      section: "Compétences",
      number: "03",
      title: "Toute ma",
      titleItalic: "stack",
      paragraph1:
        "Je travaille avec une stack technologique moderne qui me permet de construire des applications complètes de A à Z.",
      paragraph2:
        "Des frameworks frontend aux services backend, du déploiement cloud aux outils de design, j'élargis constamment ma boîte à outils pour offrir les meilleures solutions.",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        devops: "DevOps & Cloud",
        tools: "Design & Outils",
      },
    },
    // Work Process
    workProcess: {
      section: "Processus",
      number: "04",
      title: "Le processus",
      titleItalic: "de travail",
      description: "Je commence par bien comprendre le projet, puis je suis un processus itératif qui combine une conception réfléchie avec un développement propre et efficace pour offrir une expérience utilisateur fluide et un produit final soigné.",
      steps: {
        pre: {
          title: "PRÉ",
          subtitle: "Design du contenu, Création du concept",
        },
        dev: {
          title: "DÉVELOPPEMENT",
          subtitle: "Front-end, Back-end",
        },
        post: {
          title: "POST",
          subtitle: "Déploiement, Amélioration continue",
        },
      },
    },
    // Contact
    contact: {
      section: "Contact",
      title: "Entrons en",
      titleItalic: "contact",
      description:
        "Intéressé par une collaboration ? N'hésitez pas à me contacter pour des opportunités, des projets ou simplement pour dire bonjour.",
      social: "Réseaux sociaux",
      location: "Localisation",
      form: {
        name: "Nom",
        email: "Email",
        subject: "Sujet",
        message: "Message",
        send: "Envoyer",
        sending: "Envoi en cours...",
      },
    },
    // Footer
    footer: {
      thanks: "Merci de votre visite",
      rights: "Tous droits réservés.",
      nav: {
        projects: "Projets",
        about: "À propos",
        contact: "Contact",
      },
    },
    // Project details
    projectDetails: {
      backToProjects: "Retour aux projets",
      year: "Année",
      type: "Type",
      description: "Description",
      technologies: "Technologies",
      links: "Liens",
      viewLive: "Voir en ligne",
      viewCode: "Voir le code",
      clientBenefit: "Bénéfice client",
    },
    // Project data
    projectData: {
      evera: {
        shortDescription: "Plateforme SaaS de gestion de flottes de véhicules",
        context: "Evera est une solution SaaS pour les entreprises qui gèrent des flottes de véhicules. Elle centralise toutes les informations liées aux véhicules : trajets, coûts, entretiens, infractions et abonnements, pour permettre une gestion proactive et en temps réel.",
        clientBenefit: "Réduction significative des coûts d'exploitation de la flotte grâce au suivi centralisé des trajets, entretiens et infractions. Les alertes en temps réel permettent une gestion proactive des incidents, évitant les pannes coûteuses et garantissant une disponibilité optimale des véhicules.",
        technical: [
          "Architecture full-stack Next.js (front) + Nest.js (API) avec PostgreSQL, déployée en SaaS multi-tenant",
          "Pipeline de données temps réel via MQTT pour la télémétrie véhicules, avec ingestion et stockage en base",
          "CRON jobs et scripts Python côté serveur pour la détection d'anomalies et la remontée d'alertes automatiques",
          "Intégration Stripe pour la gestion des abonnements, paiements récurrents et facturation automatisée",
          "Reportings analytiques avec agrégation de données côté backend et visualisation côté front",
        ],
        features: [
          "Dashboard centralisé avec vue temps réel sur la flotte : trajets, coûts, entretiens, infractions",
          "Système d'alertes proactif notifiant les incidents avant qu'ils ne deviennent critiques",
          "Suivi live des véhicules via télémétrie MQTT avec historique des trajets",
          "Gestion automatisée des abonnements et paiements clients",
          "Reportings et KPIs pour optimiser les coûts d'exploitation de la flotte",
        ],
      },
      bibbatteries: {
        shortDescription: "Plateforme de gestion de stocks de batteries électriques",
        context: "Bib Batteries est une plateforme web pour centraliser la gestion des stocks de batteries électriques, permettant aux fournisseurs, partenaires et équipes internes de collaborer et d'accéder à des informations fiables.",
        clientBenefit: "Gain de temps considérable sur la gestion des stocks grâce à la synchronisation automatisée et un dashboard centralisé. Fournisseurs, partenaires et équipes internes accèdent à des données fiables et à jour sans intervention manuelle, réduisant les erreurs et améliorant la prise de décision.",
        technical: [
          "Frontend React avec backend Python et base PostgreSQL pour la gestion des données batteries",
          "Synchronisation automatisée bidirectionnelle avec l'API Notion pour maintenir les données à jour sans intervention",
          "Système de rôles et permissions multi-utilisateurs (fournisseurs, partenaires, équipes internes)",
          "Scripts serveur Python pour l'automatisation des imports/exports et la génération de rapports",
        ],
        features: [
          "Dashboard interactif avec visualisation des stocks, état des batteries et suivi des garanties",
          "Synchronisation automatique des données avec Notion en temps réel",
          "Rapports dynamiques pour le suivi des batteries et la gestion des locations",
          "Vues personnalisées selon le rôle de l'utilisateur (fournisseur, partenaire, admin)",
        ],
      },
      runmate: {
        shortDescription: "Application mobile de matching intelligent entre coureurs",
        context: "RunMate est une application mobile communautaire qui connecte les coureurs grâce à un système de matching intelligent. L'application analyse le profil de chaque utilisateur — allure, distance, objectifs, préférences sociales et localisation — pour proposer des matchs classés par score de compatibilité. Au-delà du matching, RunMate offre un écosystème complet : groupes de course, événements, messagerie temps réel et calendrier de courses officielles.",
        clientBenefit: "Une solution de mise en relation entre coureurs qui va au-delà du simple réseau social. Le système de double profil (Performance / Chill) garantit des matchs pertinents selon les objectifs de chacun, tandis que l'écosystème complet — groupes, événements, messagerie — fédère une communauté engagée autour de la course à pied.",
        technical: [
          "Application mobile React Native + Expo SDK 54 avec TypeScript et NativeWind, animations Reanimated (spring, glow, scale)",
          "API REST Ruby on Rails 7.1 avec 14 controllers, 14 modèles ActiveRecord et authentification Devise + Bearer token",
          "Algorithme de matching multi-critères avec scoring pondéré : profil Performance (proximité 35%, objectifs 35%, allure 20%) et profil Chill (proximité 60%, social 30%)",
          "Système de notifications push intelligentes avec regroupement et envoi différé, deep linking vers l'écran concerné",
          "Intégration Stripe React Native pour l'abonnement Premium avec gestion des souscriptions et paiements",
          "Géolocalisation via Expo Location et Geocoder (Haversine) pour la découverte de coureurs, groupes et événements à proximité",
        ],
        features: [
          "Matching intelligent par swipe avec scoring de compatibilité multi-critères et filtres avancés (distance, âge, allure, fréquence)",
          "Double profil coureur : Performance (allure cible, km hebdomadaire, objectifs marathon/trail) ou Chill (distance, créneau préféré, activités post-run)",
          "Groupes de course avec système d'adhésion en 2 étapes (demande puis validation admin), chat de groupe et gestion des rôles",
          "Événements avec inscription, capacité maximale, niveaux de difficulté et découverte par géolocalisation",
          "Messagerie privée et de groupe avec indicateurs de messages non lus en temps réel",
          "Calendrier de courses officielles agrégées depuis Finishers.com avec recherche et filtrage",
        ],
      },
      workadventure: {
        shortDescription: "Plateforme interactive collaborative immersive",
        context: "WorkAdventure est une plateforme immersive pour événements et expériences collaboratives en ligne, où les utilisateurs naviguent dans des espaces interactifs.",
        clientBenefit: "Une expérience plus immersive et engageante pour les participants aux événements, générant des taux d'interaction plus élevés. Les partenaires peuvent également publier et déployer leurs propres cartes interactives en autonomie, accélérant la mise en ligne de contenus sans dépendance technique.",
        technical: [
          "Frontend Svelte avec TypeScript pour une UI réactive et performante dans des espaces interactifs",
          "Outil CLI custom en TypeScript permettant aux partenaires de publier leurs cartes en autonomie",
          "Pipeline CI/CD via GitHub Actions pour le déploiement automatisé des cartes interactives",
          "Architecture modulaire de cartes réutilisables avec gestion avancée de la caméra et des popups",
        ],
        features: [
          "Espaces interactifs immersifs où les utilisateurs naviguent en temps réel",
          "Popups interactifs et contrôle caméra pour enrichir l'expérience collaborative",
          "CLI de publication pour que les partenaires déploient leurs cartes sans dépendance technique",
          "Déploiement automatisé des cartes via GitHub Actions",
        ],
      },
      thesurfcourse: {
        shortDescription: "Guide d'achat de matériel de surf personnalisé",
        context: "The Surf Course est une application web qui guide les surfeurs débutants dans le choix de leur matériel selon niveau, taille et conditions de pratique.",
        clientBenefit: "Les surfeurs débutants peuvent choisir en toute confiance l'équipement adapté à leur niveau, leur taille et leurs conditions de pratique. Le système de recommandation personnalisé élimine les hésitations et réduit le risque d'erreurs d'achat coûteuses.",
        technical: [
          "Application Ruby on Rails full-stack avec PostgreSQL et JavaScript côté client",
          "Algorithme de matching multicritères (niveau, taille, conditions) pour les recommandations produit",
          "Interface responsive mobile-first optimisée pour smartphones et tablettes",
        ],
        features: [
          "Parcours interactif guidé qui adapte les recommandations au profil du surfeur",
          "Système de recommandation personnalisé basé sur le niveau, la morphologie et les conditions de pratique",
          "Fiches produit détaillées avec comparaison et aide à la décision",
        ],
      },
      tudobemmaman: {
        shortDescription: "E-commerce pour marque de vêtements",
        context: "Boutique en ligne pour une marque de vêtements, permettant de parcourir produits, gérer panier et achats, avec un dashboard back-office pour gérer collections et ventes.",
        clientBenefit: "Un nouveau canal de vente en ligne avec un parcours d'achat fluide qui favorise les conversions et fait croître le chiffre d'affaires. Le dashboard back-office donne à la marque une autonomie totale pour gérer produits, stocks et collections sans aucune dépendance technique.",
        technical: [
          "Application Ruby on Rails monolithique avec PostgreSQL et intégration Stripe pour les paiements",
          "Architecture MVC avec séparation front boutique / back-office administration",
          "Intégration Stripe sécurisée pour le traitement des paiements et la gestion des commandes",
          "Interface responsive avec design mobile-first et optimisation des performances",
        ],
        features: [
          "Catalogue produits avec navigation par collections, filtres et recherche",
          "Panier d'achat complet avec gestion des quantités et paiement sécurisé via Stripe",
          "Dashboard back-office pour gérer produits, stocks, collections et suivi des ventes",
          "Interface responsive adaptée desktop et mobile avec parcours d'achat fluide",
        ],
      },
      tripmate: {
        shortDescription: "Application mobile de voyage collaborative",
        context: "TripMate est une application mobile permettant de créer et partager des voyages à plusieurs. Chaque voyage devient un journal collaboratif, où les participants peuvent documenter les destinations, suivre les dépenses communes et conserver une trace complète du séjour.",
        clientBenefit: "Simplifie toute l'expérience de voyage en groupe — de la planification des destinations ensemble au partage équitable des dépenses avec calcul automatique des remboursements. Les participants conservent un journal de voyage collaboratif qu'ils peuvent exporter et partager comme souvenir durable du séjour.",
        technical: [
          "Application mobile React Native + Expo avec TypeScript, ciblant iOS et Android",
          "Backend Firebase (Auth, Firestore, Storage) pour l'authentification, les données temps réel et le stockage de médias",
          "Synchronisation temps réel via Firestore pour la collaboration multi-utilisateurs simultanée",
          "Architecture modulaire : journal de voyage, gestion des dépenses, export, le tout en composants réutilisables",
        ],
        features: [
          "Création de voyages collaboratifs avec système d'invitation des participants",
          "Journal de voyage partagé : destinations, photos, descriptions et prix",
          "Module de gestion des dépenses type Tricount avec calcul automatique des remboursements",
          "Export du voyage complet pour conserver ou partager le journal après le séjour",
          "Synchronisation temps réel entre tous les participants du voyage",
        ],
      },
      callixte: {
        shortDescription: "Site vitrine pour danseuse professionnelle",
        context: "Portfolio Callixte est un site vitrine destiné à une danseuse professionnelle. L'objectif est de proposer un site élégant, immersif et visuellement fort, mettant en avant son univers artistique et son identité.",
        clientBenefit: "Une présence en ligne marquante qui reflète son identité artistique et la distingue des autres danseuses. Le site immersif et visuel renforce son image professionnelle et permet aux directeurs de casting et organisateurs d'événements de découvrir facilement son travail.",
        technical: [
          "Site Next.js avec TypeScript et Tailwind CSS, optimisé pour les performances et le SEO",
          "Animations CSS et transitions fluides pour une navigation immersive",
          "Architecture statique (SSG) pour un chargement instantané et un hébergement simple",
          "Design responsive mobile-first avec attention particulière à la hiérarchie visuelle",
        ],
        features: [
          "Site vitrine immersif centré sur l'image et l'univers artistique de la danseuse",
          "Animations fluides et transitions soignées renforçant l'expérience visuelle",
          "Navigation rythmée avec hiérarchie visuelle travaillée pour guider le visiteur",
          "Interface responsive adaptée desktop et mobile",
        ],
      },
      mascotteocean: {
        shortDescription: "Site vitrine pour restaurant à Carcans Plage",
        context: "La Mascotte de l'Océan est un site vitrine pour un restaurant convivial situé à Carcans Plage. Le site présente le menu complet (salé, sucré, glaces, boissons), l'ambiance du lieu et permet aux clients de découvrir l'établissement avant leur visite.",
        clientBenefit: "Une meilleure visibilité en ligne qui permet aux futurs clients de découvrir le restaurant, parcourir la carte complète et ressentir l'ambiance du lieu avant de s'y rendre. Une vitrine digitale soignée qui inspire confiance et génère du trafic vers Carcans Plage.",
        technical: [
          "Site Next.js avec TypeScript et Tailwind CSS, architecture statique pour des performances optimales",
          "Approche mobile-first avec optimisation des images et lazy loading",
          "Animations CSS subtiles et transitions pour une navigation fluide",
          "Déploiement sur Netlify avec CI/CD automatisé",
        ],
        features: [
          "Présentation du restaurant avec mise en valeur de l'ambiance et du lieu",
          "Carte interactive organisée par sections : salé, sucré, glaces et boissons",
          "Interface épurée et élégante mettant en avant les produits et le menu",
          "Navigation fluide avec animations subtiles et transitions soignées",
          "Site responsive optimisé pour tous les appareils",
        ],
      },
      otherprojects: {
        shortDescription: "Collection de divers projets web",
        context: "Une collection de divers projets de développement web présentant différentes technologies et approches.",
        clientBenefit: "",
        technical: [
          "Développement de divers projets web",
        ],
        features: [
          "Chaque projet démontre des compétences spécifiques et des capacités de résolution de problèmes",
        ],
      },
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = (typeof translations)[Locale];
