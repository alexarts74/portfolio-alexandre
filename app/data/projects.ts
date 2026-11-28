export interface Project {
  title: string;
  slug: string;
  image: string;
  images: string[];
  video?: string;
  shortDescription: string;
  context: string;
  technical: string[];
  features: string[];
  year: string;
  technologies: string[];
  type: "web" | "mobile";
  projectType: "professional" | "freelance" | "personal";
  /** Site vitrine (regroupé dans sa propre section sur l'accueil). */
  showcase?: boolean;
  /** Projet phare — affiché dans la section dédiée FeaturedProject. */
  featured?: boolean;
  /** Missions annexes hors produit — section dédiée sur la page projet. */
  missions?: string[];
  clientBenefit: string;
  /** Images de l'app mobile, affichées en mockups phones sur la page projet. */
  mobileImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: { fr: string; en: string };
  };
}

export const projects: Project[] = [
  {
    title: "Evera",
    slug: "evera",
    image: "/images/projects/covers/evera.webp",
    video: "/images/projects/evera/complet.mp4",
    images: [
      "/images/projects/evera/dashboard.png",
      "/images/projects/evera/gestion-flotte.png",
      "/images/projects/evera/trajet.png",
      "/images/projects/evera/aen.png",
      "/images/projects/evera/reservation.png",
    ],
    shortDescription: "Plateforme SaaS de gestion de flottes de véhicules",
    context: "Evera est une solution SaaS pour les entreprises qui gèrent des flottes de véhicules. Elle centralise toutes les informations liées aux véhicules : trajets, coûts, entretiens, infractions et abonnements, pour permettre une gestion proactive et en temps réel.",
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
    missions: [
      "Infrastructure MQTT de bout en bout : installation et configuration du broker sur un serveur, puis intégration des boîtiers télématiques (connexion, décodage des trames, remontée des données vers la plateforme)",
      "Location et configuration d'un serveur pour héberger n8n en auto-hébergé, puis mise en place des workflows d'automatisation pour les équipes",
      "Refonte et mise en place de la connexion HubSpot sur la landing page et les outils hors SaaS : formulaires reliés au CRM pour centraliser les leads",
    ],
    year: "2026",
    technologies: ["Next.js", "Nest.js", "PostgreSQL", "Python", "Stripe", "MQTT", "n8n", "HubSpot"],
    type: "web",
    projectType: "professional",
    featured: true,
    clientBenefit: "Réduction significative des coûts d'exploitation de la flotte grâce au suivi centralisé des trajets, entretiens et infractions. Les alertes en temps réel permettent une gestion proactive des incidents, évitant les pannes coûteuses et garantissant une disponibilité optimale des véhicules.",
    liveUrl: "https://evera.co/",
  },
  {
    title: "PayeTaVie",
    slug: "payetavie",
    image: "/images/projects/covers/payetavie.webp",
    images: [
      "/images/projects/payetavie/web-05-dashboard.png",
      "/images/projects/payetavie/web-08-topic-impots.png",
      "/images/projects/payetavie/web-09-topic-impots-docs.png",
      "/images/projects/payetavie/web-10-depenses.png",
      "/images/projects/payetavie/web-12-freelance-clients.png",
      "/images/projects/payetavie/web-13-freelance-facturation.png",
      "/images/projects/payetavie/web-14-factures-list.png",
      "/images/projects/payetavie/web-15-devis-list.png",
      "/images/projects/payetavie/web-17-annuaire.png",
    ],
    shortDescription: "SaaS d'assistant administratif personnel — web + mobile",
    context:
      "L'administration française est un labyrinthe : impôts, assurances, santé, logement, véhicules — chaque démarche dans sa propre case, sans vision d'ensemble. PayeTaVie est né de ce constat : centraliser toute la vie administrative en un seul endroit, avec des rappels, des checklists thématiques et les bons contacts à portée de main.\n\nL'application existe en version web (Next.js) et mobile (React Native + Expo), avec une parité fonctionnelle complète entre les deux. Le modèle est freemium sur 3 niveaux : un accès gratuit pour les fonctions de base, un abonnement Pro qui débloque l'ensemble des thématiques, et un module Freelance intégré avec facturation, devis et gestion de clients. J'ai conçu et développé l'intégralité du produit en solo — du design système à l'infrastructure cloud, en passant par les pipelines de paiement et les emails transactionnels.",
    technical: [
      "Monorepo Turborepo avec packages partagés (types, utils, config) entre l'app Next.js et l'app Expo",
      "Supabase (PostgreSQL + Auth + Storage) avec Row Level Security pour l'isolation stricte des données par utilisateur",
      "Stripe Billing avec webhooks pour la gestion complète du cycle de vie des abonnements : création, upgrade, downgrade, résiliation",
      "Server Actions Next.js pour toutes les mutations côté serveur — pas d'API REST dédiée, les accès DB restent serveur-only",
      "Génération de PDF serveur-side (factures et devis) via une Edge Function Supabase déclenchée à la demande",
      "Resend pour les emails transactionnels (confirmation, rappels, notifications de paiement) avec templates React Email",
    ],
    features: [
      "Dashboard central avec vue d'ensemble : prochaines échéances, documents récents, rappels à venir et progression par thématique",
      "10 thématiques administratives couvertes : impôts, assurances, santé, logement, banque, retraite, véhicules, famille, administration et travail",
      "Suivi des dépenses avec catégorisation automatique, historique mensuel et comparaison par rapport au mois précédent",
      "Budgets mensuels par catégorie avec alertes en temps réel quand le seuil est approché ou dépassé",
      "Annuaire de services publics intégré (données service-public.fr) : CPAM, CAF, Pôle Emploi, impôts — contacts et démarches directement dans l'app",
      "Module Freelance Pro : gestion des clients, création de devis et factures, envoi par email, suivi des paiements et génération de PDF",
      "Application mobile React Native + Expo avec la même expérience que le web, navigation par onglets et notifications push",
      "Système de rappels personnalisables : délai avant l'échéance, fréquence et canal de notification (email ou push)",
    ],
    mobileImages: [
      "/images/projects/payetavie/mob-02-login.png",
      "/images/projects/payetavie/mob-03-dashboard.png",
      "/images/projects/payetavie/mob-04-topics.png",
      "/images/projects/payetavie/mob-06-depenses.png",
      "/images/projects/payetavie/mob-07-facturation.png",
    ],
    year: "2026",
    technologies: ["Next.js", "React Native", "Expo", "Supabase", "Stripe", "TypeScript"],
    type: "web",
    projectType: "personal",
    featured: true,
    clientBenefit:
      "Fini les rappels manqués et les documents éparpillés. PayeTaVie donne une vue d'ensemble sur toute sa vie administrative — échéances, dépenses, documents — sans avoir à jongler entre dix onglets. Les freelances gagnent en plus un outil de facturation intégré qui génère devis et factures en PDF, suit les paiements et centralise la relation client, sans avoir à souscrire un logiciel séparé.",
  },
  {
    title: "Pasang Trekking",
    slug: "pasangtrekking",
    image: "/images/projects/covers/pasangtrekking.webp",
    images: [
      "/images/projects/pasang/home.jpg",
      "/images/projects/pasang/treks.jpg",
      "/images/projects/pasang/contact.jpg",
    ],
    shortDescription: "Site vitrine pour un guide de trek au Népal",
    context: "Pasang Trekking est un site vitrine pour un guide de trek au Népal, qui accompagne des voyageurs sur des itinéraires comme l'Everest Base Camp, l'Annapurna ou le Manaslu. Avant le site, les voyageurs le trouvaient surtout par le bouche-à-oreille et WhatsApp. L'objectif : leur offrir un seul endroit pour découvrir ses treks et trouver les informations dont ils ont besoin.",
    technical: [
      "Site vitrine construit sur Webflow et livré en 3 jours",
      "10 treks présentés avec durée et difficulté, des randonnées faciles de 4 jours aux itinéraires exigeants de 16 jours",
      "FAQ sur la forme physique, ce qui est inclus, la meilleure saison et les itinéraires sur mesure",
      "Page contact avec téléphone, email et formulaire de demande",
    ],
    features: [
      "Présentation claire des services : treks guidés, permis et logistique, itinéraires sur mesure",
      "Cartes de présentation des treks avec durée et difficulté en un coup d'œil",
      "FAQ qui répond aux questions les plus fréquentes des trekkeurs",
      "Contact direct : téléphone, email et formulaire de demande",
    ],
    year: "2026",
    technologies: ["Webflow"],
    type: "web",
    projectType: "freelance",
    clientBenefit: "Un seul endroit où les trekkeurs découvrent les services du guide, comparent les treks selon leur durée et leur difficulté, trouvent les réponses à leurs questions et le contactent directement, au lieu de dépendre uniquement du bouche-à-oreille et de WhatsApp.",
    liveUrl: "https://trek-with-pasang.webflow.io/",
    testimonial: {
      quote: "Before having the website, most trekkers contacted me through word of mouth or directly on WhatsApp. Now, it's much easier for people to discover my services and get all the information they need in one place. I'm really happy with the result and would definitely recommend Alexandre to other guides!",
      author: "Pasang",
      role: { fr: "guide de trek, Népal", en: "trekking guide, Nepal" },
    },
  },
  {
    title: "BillTag (concept)",
    slug: "billtag",
    image: "/images/projects/covers/billtag.webp",
    images: [
      "/images/projects/billtag/home.jpg",
    ],
    shortDescription: "Concept de refonte de site pour une entreprise de solutions RFID",
    context: "BillTag est un projet de démonstration : une refonte conceptuelle du site d'une entreprise de solutions RFID (bracelets, badges, paiement cashless) pour l'hôtellerie et l'événementiel. Ce n'est pas un site client en production. L'objectif : montrer comment présenter une gamme de produits techniques de façon claire et moderne.",
    technical: [
      "Site multi-pages construit sur Webflow à partir d'un template, entièrement personnalisé (palette, contenus, pages produit)",
      "Contenus rédigés en français : accueil, produits, cashless, à propos, contact",
      "Pages produit dédiées : bracelet Tyvek, bracelet tissu, badge et vinyle RFID",
      "Formulaire de contact, SEO de base (titres et descriptions) et textes alternatifs sur les images",
    ],
    features: [
      "Navigation simple vers les produits, le cashless et le contact",
      "Présentation des supports RFID : bracelet Tyvek, bracelet tissu, bracelet en bois et vinyle",
      "Page cashless dédiée au paiement sans contact en événement",
      "Site responsive avec animations au défilement",
    ],
    year: "2026",
    technologies: ["Webflow"],
    type: "web",
    projectType: "personal",
    showcase: true,
    clientBenefit: "Une démonstration de ma façon de transformer une offre technique en un site clair : la gamme présentée en un coup d'œil, un contact facile et un design cohérent. Projet de démonstration, sans client réel.",
    liveUrl: "https://billtag-f4552c.webflow.io/",
  },
  {
    title: "Orbite",
    slug: "orbite",
    image: "/images/projects/covers/orbite.webp",
    images: [
      "/images/projects/orbite/slogan.jpg",
      "/images/projects/orbite/hero.jpg",
      "/images/projects/orbite/constat.jpg",
      "/images/projects/orbite/parcours.jpg",
      "/images/projects/orbite/offres.jpg",
      "/images/projects/orbite/formulaire.jpg",
      "/images/projects/orbite/footer.jpg",
    ],
    shortDescription: "Site de mon agence web et publicité, avec tracking et CRM branchés de bout en bout",
    context:
      "Orbite est l'agence que je monte avec mon associé Guillaume : lui gère l'acquisition (Meta Ads, Google Ads) et HubSpot, moi le développement et le tracking. Notre promesse, « Du clic au client » : mesurer ce que chaque euro de pub rapporte en clients réels, et renvoyer les ventes du CRM aux plateformes publicitaires pour que les campagnes optimisent sur les bons signaux.\n\nJ'ai conçu et développé le site de A à Z, du design à la mise en ligne. Comme nous vendons de la mesure fiable, le site sert aussi de démonstration : consentement, tracking et formulaire relié au CRM sont configurés exactement comme nous le ferions chez un client.",
    technical: [
      "Next.js 15 (App Router) en export statique, TypeScript et Tailwind CSS 4, hébergé sur Netlify avec déploiement automatique depuis GitHub",
      "Animations sans librairie : CSS piloté par des variables écrites au défilement (un seul écouteur passif, limité par requestAnimationFrame), transitions de page maison et repli statique complet sans JavaScript ou avec « réduire les animations »",
      "Consent Mode v2 : tout refusé par défaut avant le chargement de Google Tag Manager, bannière conforme CNIL où « Tout refuser » est aussi visible que « Tout accepter »",
      "Google Tag Manager et GA4 : événements dataLayer cta_click et generate_lead pour suivre les clics sur les boutons d'action et les demandes envoyées",
      "Formulaire envoyé à HubSpot via l'API Forms v3 avec l'attribution de la session (UTM, gclid, fbclid, page d'arrivée, référent), y compris quand les cookies sont refusés",
      "Domaine chez OVH, emails professionnels Zoho avec SPF, DKIM et DMARC, sitemap.xml et robots.txt",
    ],
    features: [
      "Accueil animé : rideau d'ouverture, titre « Du clic au client » qui se dévoile, pile de cartes qui suit le pointeur puis s'ouvre en plein écran sur le slogan",
      "Présentation des trois offres : audit, site et mise en place, pilotage mensuel",
      "Pages dédiées à la méthode en quatre étapes et à l'équipe",
      "Formulaire de demande d'audit qui crée le contact dans HubSpot avec sa source, puis redirige vers une page de remerciement",
      "Mentions légales et politique de confidentialité détaillant les sous-traitants et les transferts de données",
      "Site responsive, en noir, papier et orange",
    ],
    year: "2026",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Tag Manager", "HubSpot", "Netlify"],
    type: "web",
    projectType: "freelance",
    showcase: true,
    clientBenefit:
      "Le site est à la fois notre vitrine et notre preuve : un prospect voit sur notre propre site ce que nous mettons en place chez lui. Chaque demande arrive dans HubSpot avec sa source (campagne, page d'arrivée, clic Google ou Meta), ce qui nous permet de mesurer, dès nos premières campagnes, ce que coûte un client et pas seulement un clic.",
    liveUrl: "https://www.agence-orbite.fr/",
  },
  {
    title: "Diving with Mewan",
    slug: "divingwithmewan",
    image: "/images/projects/covers/divingwithmewan.webp",
    images: [
      "/images/projects/mewan/hero.jpg",
      "/images/projects/mewan/home.jpg",
      "/images/projects/mewan/services.jpg",
      "/images/projects/mewan/gallery.jpg",
    ],
    shortDescription: "Site vitrine pour un guide de plongée et de snorkeling à Trincomalee, au Sri Lanka",
    context: "Diving with Mewan est le site d'un guide de plongée et de snorkeling de Trincomalee, au Sri Lanka, qui emmène les voyageurs nager avec les tortues, observer les dauphins et les baleines, plonger sur les récifs ou pêcher à la manière locale. Avant le site, il était contacté surtout par bouche-à-oreille et par messages. L'objectif : lui donner un seul endroit pour présenter ses sorties avec leurs prix et permettre de le contacter en un clic.",
    technical: [
      "Site vitrine codé à la main (HTML, CSS, JavaScript) avec animations au défilement GSAP et défilement fluide Lenis",
      "Vidéo plein écran en fond de la page d'accueil, lancée automatiquement et sans son, avec image d'attente",
      "Galerie en diaporama mêlant photos et vidéos, qui ne lit que la vidéo visible à l'écran",
      "5 sorties présentées avec photo, description et prix en dollars, pour une clientèle internationale",
      "Livré avec tout le code et publié sur Netlify, dans un compte à son nom",
    ],
    features: [
      "Accueil immersif avec vidéo sous-marine en fond",
      "Cartes des sorties : snorkeling, observation des dauphins et baleines, baptême de plongée, plongée loisir et pêche",
      "Boutons WhatsApp et email partout, y compris une barre de contact fixe sur mobile",
      "Site responsive, testé sur mobile",
    ],
    year: "2026",
    technologies: ["HTML/CSS", "JavaScript", "GSAP", "Netlify"],
    type: "web",
    projectType: "freelance",
    showcase: true,
    clientBenefit: "Un seul endroit où les voyageurs découvrent les sorties de Mewan, voient les photos et les vidéos de la mer de Trincomalee, comparent les prix en dollars et le contactent directement sur WhatsApp, au lieu de dépendre uniquement du bouche-à-oreille.",
  },
  {
    title: "NEREA",
    slug: "nerea",
    image: "/images/projects/covers/nerea.webp",
    video: "/images/projects/nerea/signature.mp4",
    // La galerie affiche images.slice(1) à l'envers : listées du checkout à l'accueil
    // pour se lire dans l'ordre du parcours.
    images: [
      "/images/projects/nerea/hero.jpg",
      "/images/projects/nerea/commande.jpg",
      "/images/projects/nerea/panier.jpg",
      "/images/projects/nerea/comment-nouer-etape.jpg",
      "/images/projects/nerea/comment-nouer.jpg",
      "/images/projects/nerea/produit-porte.jpg",
      "/images/projects/nerea/produit.jpg",
      "/images/projects/nerea/boutique.jpg",
      "/images/projects/nerea/signature.jpg",
      "/images/projects/nerea/collections.jpg",
      "/images/projects/nerea/nouer-apercu.jpg",
      "/images/projects/nerea/corde.jpg",
      "/images/projects/nerea/atelier.jpg",
      "/images/projects/nerea/collection.jpg",
    ],
    shortDescription: "Boutique en ligne de ma marque de paréos dessinés à la main, sur Medusa et Next.js",
    context:
      "NEREA est ma marque de paréos dessinés à la main. Je dessine les motifs (hibiscus, nautiles, feuillages) et j'ai développé la boutique en ligne qui les vend, pour la France, en euros et en français.\n\nLa boutique repose sur Medusa, une plateforme e-commerce open source et headless : catalogue, prix, livraison et design sont entièrement maîtrisés, sans dépendre d'une solution clé en main. Je suis parti du starter officiel de Medusa et j'ai repris toute la partie boutique : identité visuelle, page d'accueil, catalogue, panier, tunnel de commande et pages légales. La boutique fonctionne de bout en bout en local (une commande arrive dans l'administration et décrémente le stock). Le paiement Stripe, les e-mails de commande et la mise en ligne sont les prochaines étapes.",
    technical: [
      "Monorepo Turborepo : backend Medusa 2 (Node.js, TypeScript, PostgreSQL) et boutique Next.js 16 (App Router, React 19, Tailwind CSS)",
      "Configuration France par un script idempotent : région unique en euros, prix saisis TTC avec TVA à 20 %, Colissimo et point relais offerts dès 120 € grâce à une règle de prix sur le montant du panier, retours gratuits",
      "Catalogue chargé par un second script idempotent : catégorie, trois collections, cinq paréos en format unique 100 × 145 cm avec leur stock, synchronisation des photos, passage en brouillon des anciens produits, puis réindexation de la recherche",
      "Totaux du panier recalculés pour un affichage TTC : Medusa renvoie des sous-totaux hors taxes même quand les prix sont saisis TTC, le récapitulatif affiche donc les articles TTC et la TVA incluse",
      "Recherche, tri et filtres de la boutique branchés sur l'index produits de Medusa via InstantSearch",
      "Direction artistique homogène générée avec fal.ai à partir des packshots : dix photos par paréo (studio, plage, détails, cinq tenues portées par la même mannequin), visuels de l'accueil et vidéos en boucle, en attendant le shooting",
      "Catalogue mis en cache et revalidé toutes les 60 secondes : une modification de produit dans l'administration apparaît sur la boutique sans redéploiement",
      "Pages légales (mentions légales, CGV, confidentialité, livraison, retours) alimentées par un seul fichier de configuration, aligné sur les options de livraison du backend",
    ],
    features: [
      "Page d'accueil éditoriale en pleine largeur : photo hero, bandeau défilant, grille des cinq motifs, atelier, aperçu du guide, collections et pièce signature en vidéo",
      "Boutique avec tri, filtres et recherche par motif ou couleur",
      "Fiche produit avec galerie de dix photos, dont cinq portées, disponibilité, avantages livraison et façons de le nouer",
      "Guide « Comment nouer » : huit façons de porter le paréo, pas à pas, avec photos et vidéos en boucle",
      "Panier avec barre de progression vers la livraison offerte",
      "Commande en quatre étapes numérotées (adresse, livraison, paiement, vérification) avec récapitulatif TTC",
      "Transitions de page, barre de progression de navigation et écrans de chargement",
      "Compte client, historique des commandes et pages légales en français",
      "Charte sobre : blanc, noir et deux couleurs, pêche et menthe, typographies Cormorant Garamond et Jost",
    ],
    year: "2026",
    technologies: ["Medusa", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    type: "web",
    projectType: "personal",
    clientBenefit:
      "Une boutique à l'image de la marque et adaptée à la vente en France : prix TTC, livraison et retours annoncés dès la fiche produit, pages légales rédigées. La région et le catalogue se recréent par script en une commande, puis prix, stocks et visuels se gèrent depuis l'administration Medusa, sans toucher au code.",
  },
  {
    title: "Bib Batteries",
    slug: "bibbatteries",
    image: "/images/projects/covers/bibbatteries.webp",
    images: [
      "/images/projects/bib/bib-1.png",
      "/images/projects/bib/bib-2.png",
      "/images/projects/bib/bib-3.png",
    ],
    shortDescription: "Plateforme de gestion de stocks de batteries électriques",
    context: "Bib Batteries est une plateforme web pour centraliser la gestion des stocks de batteries électriques, permettant aux fournisseurs, partenaires et équipes internes de collaborer et d'accéder à des informations fiables.",
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
    year: "2024 - 2025",
    technologies: ["React", "Python", "PostgreSQL", "Notion API"],
    type: "web",
    projectType: "professional",
    clientBenefit: "Gain de temps considérable sur la gestion des stocks grâce à la synchronisation automatisée et un dashboard centralisé. Fournisseurs, partenaires et équipes internes accèdent à des données fiables et à jour sans intervention manuelle, réduisant les erreurs et améliorant la prise de décision.",
    liveUrl: "https://bib-batteries.com/",
  },
  {
    title: "RunMate",
    slug: "runmate",
    image: "/images/projects/covers/runmate.webp",
    images: [
      "/images/projects/runmate/runmate_1.png",
      "/images/projects/runmate/runmate_2.png",
      "/images/projects/runmate/runmate_3.png",
      "/images/projects/runmate/runmate_4.png",
      "/images/projects/runmate/runmate_5.png",
      "/images/projects/runmate/runmate_6.png",
      "/images/projects/runmate/runmate_7.png",
    ],
    shortDescription: "Application mobile de matching intelligent entre coureurs",
    context: "RunMate est une application mobile communautaire qui connecte les coureurs grâce à un système de matching intelligent. L'application analyse le profil de chaque utilisateur — allure, distance, objectifs, préférences sociales et localisation — pour proposer des matchs classés par score de compatibilité. Au-delà du matching, RunMate offre un écosystème complet : groupes de course, événements, messagerie temps réel et calendrier de courses officielles.",
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
    year: "2025",
    technologies: ["React Native", "Expo", "TypeScript", "NativeWind", "Ruby on Rails", "PostgreSQL", "Stripe"],
    type: "mobile",
    projectType: "personal",
    clientBenefit: "Une solution de mise en relation entre coureurs qui va au-delà du simple réseau social. Le système de double profil (Performance / Chill) garantit des matchs pertinents selon les objectifs de chacun, tandis que l'écosystème complet — groupes, événements, messagerie — fédère une communauté engagée autour de la course à pied.",
  },
  {
    title: "WorkAdventure",
    slug: "workadventure",
    image: "/images/projects/covers/workadventure.webp",
    images: [
      "/images/projects/wa/wa-1.png",
      "/images/projects/wa/wa-2.png",
      "/images/projects/wa/wa-3.png",
    ],
    shortDescription: "Plateforme interactive collaborative immersive",
    context: "WorkAdventure est une plateforme immersive pour événements et expériences collaboratives en ligne, où les utilisateurs naviguent dans des espaces interactifs.",
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
    year: "2023",
    technologies: ["Svelte", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    type: "web",
    projectType: "professional",
    clientBenefit: "Une expérience plus immersive et engageante pour les participants aux événements, générant des taux d'interaction plus élevés. Les partenaires peuvent également publier et déployer leurs propres cartes interactives en autonomie, accélérant la mise en ligne de contenus sans dépendance technique.",
    liveUrl: "https://workadventu.re/fr/",
  },
  {
    title: "The Surf Course",
    slug: "thesurfcourse",
    image: "/images/projects/covers/thesurfcourse.webp",
    images: [
      "/images/projects/surfcourse.png",
    ],
    shortDescription: "Guide d'achat de matériel de surf personnalisé",
    context: "The Surf Course est une application web qui guide les surfeurs débutants dans le choix de leur matériel selon niveau, taille et conditions de pratique.",
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
    year: "2023",
    technologies: ["Ruby on Rails", "JavaScript", "PostgreSQL", "Figma"],
    type: "web",
    projectType: "personal",
    clientBenefit: "Les surfeurs débutants peuvent choisir en toute confiance l'équipement adapté à leur niveau, leur taille et leurs conditions de pratique. Le système de recommandation personnalisé élimine les hésitations et réduit le risque d'erreurs d'achat coûteuses.",
  },
  {
    title: "Tudo Bem Maman",
    slug: "tudobemmaman",
    image: "/images/projects/covers/tudobemmaman.webp",
    images: [
      "/images/projects/tudobemmaman/homepage.png",
      "/images/projects/tudobemmaman/clothes.png",
      "/images/projects/tudobemmaman/unique.png",
      "/images/projects/tudobemmaman/cart.png",
      "/images/projects/tudobemmaman/dash-1.png",
      "/images/projects/tudobemmaman/dash-2.png",
    ],
    shortDescription: "E-commerce pour marque de vêtements",
    context: "Boutique en ligne pour une marque de vêtements, permettant de parcourir produits, gérer panier et achats, avec un dashboard back-office pour gérer collections et ventes.",
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
    year: "2023",
    technologies: ["Ruby on Rails", "JavaScript", "PostgreSQL", "Stripe"],
    type: "web",
    projectType: "personal",
    clientBenefit: "Un nouveau canal de vente en ligne avec un parcours d'achat fluide qui favorise les conversions et fait croître le chiffre d'affaires. Le dashboard back-office donne à la marque une autonomie totale pour gérer produits, stocks et collections sans aucune dépendance technique.",
  },
  {
    title: "TripMate",
    slug: "tripmate",
    image: "/images/projects/covers/tripmate.webp",
    images: [
      "/images/projects/tripmate/tripmate_1.png",
      "/images/projects/tripmate/tripmate_2.png",
      "/images/projects/tripmate/tripmate_3.png",
      "/images/projects/tripmate/tripmate_4.png",
      "/images/projects/tripmate/tripmate_5.png",
    ],
    shortDescription: "Application mobile de voyage collaborative",
    context: "TripMate est une application mobile permettant de créer et partager des voyages à plusieurs. Chaque voyage devient un journal collaboratif, où les participants peuvent documenter les destinations, suivre les dépenses communes et conserver une trace complète du séjour.",
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
    year: "2025",
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    type: "mobile",
    projectType: "personal",
    clientBenefit: "Simplifie toute l'expérience de voyage en groupe — de la planification des destinations ensemble au partage équitable des dépenses avec calcul automatique des remboursements. Les participants conservent un journal de voyage collaboratif qu'ils peuvent exporter et partager comme souvenir durable du séjour.",
  },
  {
    title: "Portfolio Callixte",
    slug: "callixte",
    image: "/images/projects/covers/callixte.webp",
    images: [
      "/images/projects/cal/cal-1.png",
      "/images/projects/cal/cal-2.png",
      "/images/projects/cal/cal-3.png",
      "/images/projects/cal/cal-4.png",
    ],
    shortDescription: "Site vitrine pour danseuse professionnelle",
    context: "Portfolio Callixte est un site vitrine destiné à une danseuse professionnelle. L'objectif est de proposer un site élégant, immersif et visuellement fort, mettant en avant son univers artistique et son identité.",
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
    year: "2026",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "web",
    projectType: "freelance",
    showcase: true,
    clientBenefit: "Une présence en ligne marquante qui reflète son identité artistique et la distingue des autres danseuses. Le site immersif et visuel renforce son image professionnelle et permet aux directeurs de casting et organisateurs d'événements de découvrir facilement son travail.",
    liveUrl: "https://callixte-portfolio.netlify.app/",
  },
  {
    title: "La Mascotte de l'Océan",
    slug: "mascotteocean",
    image: "/images/projects/covers/mascotteocean.webp",
    images: [
      "/images/projects/mascotte.png",
      "/images/projects/mascotte/mascotte-ocean.png",
    ],
    shortDescription: "Site vitrine pour restaurant à Carcans Plage",
    context: "La Mascotte de l'Océan est un site vitrine pour un restaurant convivial situé à Carcans Plage. Le site présente le menu complet (salé, sucré, glaces, boissons), l'ambiance du lieu et permet aux clients de découvrir l'établissement avant leur visite.",
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
    year: "2025",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "web",
    projectType: "freelance",
    showcase: true,
    clientBenefit: "Une meilleure visibilité en ligne qui permet aux futurs clients de découvrir le restaurant, parcourir la carte complète et ressentir l'ambiance du lieu avant de s'y rendre. Une vitrine digitale soignée qui inspire confiance et génère du trafic vers Carcans Plage.",
    liveUrl: "https://mascotte-ocean.netlify.app/fr",
  },
];

export type ProjectCategory = "webflow" | "showcase" | "webapp" | "mobile";

/** Webflow first, then mobile apps, showcase sites, and web apps for the rest. */
export function getProjectCategory(project: Project): ProjectCategory {
  if (project.technologies.includes("Webflow")) return "webflow";
  if (project.type === "mobile") return "mobile";
  if (project.showcase) return "showcase";
  return "webapp";
}

export const projectTypeLabels = {
  fr: { professional: "Pro", freelance: "Freelance", personal: "Perso" },
  en: { professional: "Pro", freelance: "Freelance", personal: "Personal" },
} as const;
