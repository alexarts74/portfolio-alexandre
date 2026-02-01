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
        technologies: "Technologies",
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
    },
    // Project data
    projectData: {
      evera: {
        shortDescription: "SaaS platform for vehicle fleet management",
        context: "Evera is a SaaS solution for companies managing vehicle fleets. It centralizes all vehicle-related information: trips, costs, maintenance, infractions, and subscriptions, enabling proactive real-time management.",
        missions: [
          "Full development of the main dashboard, integrating all vehicle data, trips, costs, and alerts",
          "Implementation of real-time alert notifications via CRON jobs and server scripts for immediate incident prevention",
          "Integration of vehicle telemetry via MQTT for live data tracking",
          "Automation of client payments and subscriptions via Stripe",
          "Design of analytical reports to optimize fleet management",
        ],
        learnings: [
          "Full-stack experience with front-back-server integration in real-time",
          "Mastery of technical solutions for complex product needs",
          "Ability to think product, prioritize features, and propose relevant alerts and reports for end users",
          "Strengthened product-technical vision, combining backend, front-end, and server automation",
        ],
      },
      bibbatteries: {
        shortDescription: "Electric battery stock management platform",
        context: "Bib Batteries is a web platform to centralize electric battery stock management, allowing suppliers, partners, and internal teams to collaborate and access reliable information.",
        missions: [
          "Development of an interactive dashboard to visualize stocks, battery status, and warranties",
          "Setup of automatic synchronization scripts with Notion to update data without manual intervention",
          "Creation of dynamic reports for battery status tracking and rental management",
          "Multi-user access rights management to adapt views based on roles",
        ],
        learnings: [
          "User-centered product approach, designing dashboards adapted to different roles",
          "Server logic development and automation to simplify manual processes",
          "Ability to solve multi-user problems while ensuring data consistency and security",
          "Strengthened full-stack and product vision, combining interactive front-end and robust backend",
        ],
      },
      runmate: {
        shortDescription: "Social mobile app for runners",
        context: "RunMate is a mobile application for connecting runners, organizing outings, and building a community around running.",
        missions: [
          "Complete mobile interface development in React Native and NativeWind",
          "Backend creation in Ruby on Rails, including user management, profiles, groups, events, and internal messaging",
          "Implementation of push notifications and real-time messaging",
          "Design of a runner availability management system",
          "Integration of statistics and goal tracking to motivate users",
        ],
        learnings: [
          "Experience in user-centered product design, addressing motivation and socialization needs",
          "Development of real-time technical solutions, like messaging and notifications",
          "Mobile front-end and backend coordination for a smooth experience",
          "Reflection on functional value and feature prioritization",
        ],
      },
      workadventure: {
        shortDescription: "Immersive collaborative interactive platform",
        context: "WorkAdventure is an immersive platform for online events and collaborative experiences, where users navigate through interactive spaces.",
        missions: [
          "UI/UX redesign to improve navigation and user experience",
          "Development of interactive popups and camera management to enrich interaction",
          "Creation of a CLI tool to allow partners to easily publish their maps",
          "Automation of interactive map deployment via GitHub Actions",
        ],
        learnings: [
          "Highly technical experience, creating CLI tools and automated workflows for partners",
          "Mastery of complex frontend architecture, managing advanced interactions and modular maps",
          "Performance and scalability optimization for reusable interactive spaces",
          "Development of CI/CD and deployment automation skills",
        ],
      },
      thesurfcourse: {
        shortDescription: "Personalized surf equipment buying guide",
        context: "The Surf Course is a web application that guides beginner surfers in choosing their equipment based on level, size, and practice conditions.",
        missions: [
          "Development of an interactive journey with personalized recommendations",
          "Implementation of a product/user matching algorithm",
          "Interface optimization for smooth navigation on smartphones and tablets",
        ],
        learnings: [
          "Product thinking around personalization and recommendations",
          "Ability to translate user constraints into simple and effective algorithms",
          "Mobile UX improvement and smooth navigation",
          "Feature prioritization to maximize user value",
        ],
      },
      tudobemmaman: {
        shortDescription: "E-commerce for clothing brand",
        context: "Online store for a clothing brand, allowing customers to browse products, manage cart and purchases, with a back-office dashboard to manage collections and sales.",
        missions: [
          "Product catalog and cart development with smooth navigation",
          "Secure payment system integration via Stripe",
          "Back-office dashboard creation to manage products, stocks, and sales",
          "Responsive interface optimization for desktop and mobile",
        ],
        learnings: [
          "Mastery of complete e-commerce application design, from front to back",
          "Development of robust technical solutions for online management and payment",
          "Product thinking on user experience and purchase journey",
          "Ability to make product value-oriented technical decisions",
        ],
      },
      tripmate: {
        shortDescription: "Collaborative travel mobile app",
        context: "TripMate is a mobile application for creating and sharing trips with others. Each trip becomes a collaborative journal where participants can document destinations, track shared expenses, and keep a complete record of the journey.",
        missions: [
          "Complete mobile application development with account creation and authentication",
          "Collaborative trip creation with participant invitation system",
          "Shared travel journal development, allowing destinations, photos, descriptions, and prices to be added",
          "Tricount-style expense management module implementation with automatic reimbursement calculation",
          "Trip export feature creation to save or share the journal after the trip",
          "Real-time data management for smooth user synchronization",
        ],
        learnings: [
          "Solid cross-platform mobile development experience, with particular attention to real smartphone usage",
          "Understanding of mobile best practices, including Apple guidelines (UX, performance, navigation, iOS/iPadOS constraints)",
          "Ability to design a fluid collaborative application, even with multiple simultaneous active users",
          "Strengthened product thinking on ease of use, feature clarity, and value delivered to end users",
        ],
      },
      callixte: {
        shortDescription: "Portfolio website for professional dancer",
        context: "Portfolio Callixte is a showcase website for a professional dancer. The goal is to offer an elegant, immersive, and visually striking site that highlights her artistic universe and identity.",
        missions: [
          "Custom showcase site design, focused on imagery and content enhancement",
          "Smooth animation integration to reinforce immersion",
          "Work on visual hierarchy, transitions, and navigation rhythm",
          "Responsive site development, adapted for desktop and mobile",
        ],
        learnings: [
          "Deepening of web design skills and visual detail sense",
          "Ability to translate an artistic identity into a coherent digital experience",
          "Work on aesthetics, animations, and visual storytelling, without unnecessary over-engineering",
          "Understanding the importance of a clear, elegant, and impactful showcase site for a personal brand",
        ],
      },
      otherprojects: {
        shortDescription: "Collection of various web projects",
        context: "A collection of various web development projects showcasing different technologies and approaches.",
        missions: [
          "Various web development projects",
        ],
        learnings: [
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
        technologies: "Technologies",
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
    },
    // Project data
    projectData: {
      evera: {
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
      },
      bibbatteries: {
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
      },
      runmate: {
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
      },
      workadventure: {
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
      },
      thesurfcourse: {
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
      },
      tudobemmaman: {
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
      },
      tripmate: {
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
      },
      callixte: {
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
      },
      otherprojects: {
        shortDescription: "Collection de divers projets web",
        context: "Une collection de divers projets de développement web présentant différentes technologies et approches.",
        missions: [
          "Développement de divers projets web",
        ],
        learnings: [
          "Chaque projet démontre des compétences spécifiques et des capacités de résolution de problèmes",
        ],
      },
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = (typeof translations)[Locale];
