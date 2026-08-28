// GooseGames Comprehensive Localization System (i18n)
// Supports: English (en), French (fr), Spanish (es), German (de)

const STORAGE_LANG = 'goosegames_lang_v1';

export const DICTIONARY = {
  en: {
    // Header & Navigation
    headerWelcome: 'Hello, sign in',
    headerAccount: 'Account & Lists',
    headerReturns: 'Returns',
    headerOrders: '& Orders',
    siteName: 'Goose<span class="logo-accent">Games</span>',
    siteTitle: 'GooseGames - Honk if you love games',
    recommendedGames: 'Recommended Games',
    communityGames: 'Community Games',
    communityTeaserTitle: 'Community Arcade',
    communityTeaserCopy: 'Scratch games, animations, and an album-style series all get their own dedicated page now.',
    openCommunityPage: 'Open community page',
    communityHeroTitle: 'Scratch projects, remixed into a living arcade.',
    communityHeroCopy: 'These projects were made by PotterNotFound404, the same creator behind this site. Explore the full playthrough-like arcade, open any project, and let the album spill open like a cabinet from another era.',
    communityFeaturedTitle: 'Featured Projects',
    communityFeaturedSub: 'Cinematic cards, creator credit, and stats that feel like a gallery wall instead of a list.',
    communityAlbumTitle: 'The Completely Normal Platformer album',
    communityAlbumSub: 'Hover or click the album to make the chapters burst out in order, like a tiny arcade shrine for the series.',
    openScratch: 'Open on Scratch',
    openScratchShort: 'Scratch Page',
    playProject: 'Launch Project',
    topbar: "🪿 Free honk-speed shipping on every order, because geese don't believe in patience.",
    searchPlaceholder: 'Search thousands of games...',
    searchAll: 'All Games',
    newRelease: 'New Release',
    averageRating: 'Average rating from',
    editionOptions: 'Edition options available.',
    returnHome: 'Return to home',
    gameNotFoundMessage: "That game isn't available in the database yet.",
    popularRightNow: 'Popular right now',
    gamesLabel: 'games',
    shopDeals: 'Shop all deals →',
    gooseDaysSale: '🎉 GOOSE DAYS SALE — up to 70% off thousands of games.',
    cart: 'Cart',
    checkout: 'Checkout',
    checkoutTitle: 'Secure checkout',
    checkoutSub: 'Enter your payment details to complete the fake order.',
    checkoutEmptyText: 'Your cart is empty.',
    continueShopping: 'Continue shopping',
    fullName: 'Full name',
    cardNumber: 'Card number',
    expiry: 'Expiry',
    cvv: 'CVV',
    shippingAddress: 'Shipping address',
    orderTotal: 'Order total',
    payNow: 'Pay now',
    paymentSuccessful: 'Payment successful!',
    checkoutSuccessSub: 'Your fake games are on their way. Thanks for shopping with GooseGames.',
    backToHome: 'Back to home',
    
    // Categories
    catAction: 'Action',
    catAdventure: 'Adventure',
    catRPG: 'RPG',
    catSimulation: 'Simulation',
    catStrategy: 'Strategy',
    catIndie: 'Indie',
    catMultiplayer: 'Multiplayer',
    catFamily: 'Family',
    
    // Subcategories
    subBestSellers: 'Best Sellers',
    subNewReleases: 'New Releases',
    subTopRated: 'Top Rated',
    subUnder20: 'Under $20',
    subEditorsPicks: "Editor's Picks",

    // UI Buttons & Labels
    addToCart: 'Add to cart',
    added: 'Added ✓',
    buyNow: 'Buy now',
    viewDetails: 'View details',
    startExploring: 'Ready to honk →',
    seeDeals: "See today's deals",
    todaysDeals: "🔥 Today's Goose Deals",
    viewAllDeals: 'View all deals →',
    heroTitle: 'Games worth <span class="pop">honking</span> about.',
    heroCopy: 'One flock, every genre. Thousands of games, friendly prices, and zero geese harmed in the making of this storefront.',
    readyToShop: 'Ready to shop the flock?',
    readyToShopSub: 'Thousands of titles across every genre — your next favourite is already here.',
    flockBanner: 'Thousands of games.',
    flockBannerSub: '(landing right at one spot, for you)',
    flockBannerSubFinal: '(landing right at one spot!)',
    
    // Interactive Features
    randomGameBtn: '🎲 Random',
    randomJokeBtn: 'Quote',
    spinWheelBtn: '🎰 Wheel',
    settingsBtn: '⚙️ Settings',
    chatBtn: '💬 Goose Assistant',
    
    // Random Game Modal
    randomTitle: '🎲 Goose Game Generator',
    randomSub: 'Let the flock choose your next gaming adventure!',
    spinToPick: 'Picking a game...',
    viewGameDetails: 'View Game Details',
    rollAgain: 'Roll Again 🎲',
    
    // Spin the Wheel Modal
    wheelTitle: '🎰 Goose Fortune Wheel',
    wheelSub: 'Spin to win exclusive discounts on your next game!',
    spinButton: 'SPIN WHEEL!',
    spinning: 'Spinning...',
    congrats: 'Congratulations!',
    wheelResult: 'You won:',
    useDiscountCode: 'Use code at checkout to claim your reward.',
    spinAgainTomorrow: 'Come back anytime for another spin!',
    close: 'Close',
    
    // Rewards
    reward5Off: '5% OFF Your Order',
    reward10Off: '10% OFF Your Order',
    reward15Off: '15% OFF Your Order',
    rewardFreeShip: 'Free Goose Express Shipping',
    rewardMystery: '🎁 Mystery Goose Discount',
    rewardNoWin: '🪿 Better luck next time!',

    // Settings Modal
    settingsTitle: '⚙️ GooseGames Settings',
    langSelect: 'Language',
    highContrast: 'High Contrast Mode',
    magneticCursor: 'Magnetic Cursor',
    cursorTrail: 'Cursor Trail Effect',
    reducedMotion: 'Reduced Visual Effects',
    enabled: 'Enabled',
    disabled: 'Disabled',

    // Chatbot UI
    chatHeaderTitle: 'GooseGames Assistant 🤖',
    chatHeaderSub: 'Online • Honking AI Power',
    chatPlaceholder: 'Ask about games, deals, or recommendations...',
    chatSend: 'Send',
    chatWelcome: "Honk! I'm your GooseGames Assistant. Looking for game recommendations, daily deals, or gaming info? Ask away!",
    chatError: "Sorry, I had trouble connecting to the goose flock. Please try asking again!",
    chatThinking: 'Goose Assistant is thinkingâ€¦',
    quickDeals: "Today's Deals",
    quickRpg: 'Recommend RPG',
    quickJoke: 'Goose Joke',
    // Product Detail Page
    chooseEdition: 'Choose edition',
    reviewsCount: 'customer reviews',
    reviewBy: 'Review by',
    reviewScore: 'Score',
    reviewSummary: 'Average rating from',
    editionText: 'Edition',
    standardEdition: 'Standard Edition',
    endsIn: 'Ends in',
    endingSoon: 'Ending soon',
    searchCategory: 'Category:',
    popularRightNow: 'Popular right now',
    securePurchase: 'Secure purchase • Instant delivery • Easy returns',
    relatedGames: 'Related games',
    searchResultsFor: 'Results for',
    noResults: 'No matching titles found. Try another search or browse categories.',
    gameNotFound: 'Game not found',

    // Cart Drawer
    nestEmpty: 'Your nest is empty. Go add some games!',
    subtotal: 'Subtotal:',
    clearCart: 'Clear Nest',
    checkoutNow: 'Proceed to Checkout →',
    remove: 'Remove',
    each: 'ea',
    cartTitle: 'Your Cart',
    cartEmpty: 'Your nest is empty. Go add some games!',

    // Footer
    getKnowUs: 'Get to Know Us',
    aboutGoose: 'About GooseGames',
    careers: 'Careers (just kidding)',
    press: 'Press releases',
    honkResponsibly: 'Honk responsibly',
    makeMoney: 'Make Money With Us',
    sellGames: 'Sell games with us',
    affiliate: 'Become a Goose Affiliate',
    advertise: 'Advertise your games',
    paymentProducts: 'Goose Payment Products',
    gooseCard: 'GooseGames Card',
    shopPoints: 'Shop with points',
    reloadBalance: 'Reload your balance',
    helpYou: 'Let Us Help You',
    yourAccount: 'Your account',
    yourOrders: 'Your orders',
    shippingRates: 'Shipping rates',
    helpCenter: 'Help center',
    footerDisclaimer: 'This is a fictional storefront built for an assessment task. No games, geese, or payments are real. © GooseGames.'
  },
  fr: {
    headerWelcome: 'Bonjour, identifiez-vous',
    headerAccount: 'Compte et Listes',
    headerReturns: 'Retours',
    headerOrders: '& Commandes',
    siteName: 'Goose<span class="logo-accent">Games</span>',
    siteTitle: 'GooseGames - Coin-coin si vous aimez les jeux',
    recommendedGames: 'Jeux recommandés',
    communityGames: 'Jeux de la communauté',
    communityTeaserTitle: 'Arcade communautaire',
    communityTeaserCopy: 'Les jeux Scratch, animations et séries façon album ont maintenant leur propre page.',
    openCommunityPage: 'Ouvrir la page communauté',
    communityHeroTitle: 'Des projets Scratch remixés en une arcade vivante.',
    communityHeroCopy: 'Ces projets ont été réalisés par PotterNotFound404, le même créateur que ce site. Explorez l’arcade façon playthrough, ouvrez n’importe quel projet et laissez l’album se déplier comme une vieille borne.',
    communityFeaturedTitle: 'Projets mis en avant',
    communityFeaturedSub: 'Des cartes cinématiques, les crédits créateurs et des stats qui ressemblent à un mur de galerie plutôt qu’à une liste.',
    communityAlbumTitle: 'Album The Completely Normal Platformer',
    communityAlbumSub: 'Survolez ou cliquez l’album pour faire jaillir les chapitres dans l’ordre, comme un petit sanctuaire d’arcade.',
    openScratch: 'Ouvrir sur Scratch',
    openScratchShort: 'Page Scratch',
    playProject: 'Lancer le projet',
    topbar: "🪿 Livraison express gratuite sur chaque commande, parce que les oies n'aiment pas attendre.",
    searchPlaceholder: 'Rechercher parmi des milliers de jeux...',
    searchAll: 'Tous les jeux',
    newRelease: 'Nouvelle sortie',
    averageRating: 'Note moyenne de',
    editionOptions: "Options d'édition disponibles.",
    returnHome: "Retour à l'accueil",
    gameNotFoundMessage: "Ce jeu n'est pas encore disponible dans la base de données.",
    popularRightNow: 'Populaire en ce moment',
    gamesLabel: 'jeux',
    shopDeals: 'Toutes les offres →',
    gooseDaysSale: '🎉 JOURNÉES DE L’OIE — Jusqu’à -70% sur des milliers de jeux.',
    cart: 'Panier',
    checkout: 'Payer',
    checkoutTitle: 'Paiement sécurisé',
    checkoutSub: 'Entrez vos informations de paiement pour terminer la commande fictive.',
    checkoutEmptyText: 'Votre panier est vide.',
    continueShopping: 'Continuer les achats',
    fullName: 'Nom complet',
    cardNumber: 'Numéro de carte',
    expiry: 'Expiration',
    cvv: 'CVV',
    shippingAddress: 'Adresse de livraison',
    orderTotal: 'Total de la commande',
    payNow: 'Payer maintenant',
    paymentSuccessful: 'Paiement réussi !',
    checkoutSuccessSub: 'Vos faux jeux sont en route. Merci d’avoir acheté chez GooseGames.',
    backToHome: "Retour à l'accueil",

    catAction: 'Action',
    catAdventure: 'Aventure',
    catRPG: 'Jeu de Rôle (RPG)',
    catSimulation: 'Simulation',
    catStrategy: 'Stratégie',
    catIndie: 'Indépendant',
    catMultiplayer: 'Multijoueur',
    catFamily: 'Famille',

    subBestSellers: 'Meilleures Ventes',
    subNewReleases: 'Nouveautés',
    subTopRated: 'Mieux Notés',
    subUnder20: 'Moins de 20 €',
    subEditorsPicks: 'Coup de Cœur',

    addToCart: 'Ajouter au panier',
    added: 'Ajouté ✓',
    buyNow: 'Acheter maintenant',
    viewDetails: 'Voir les détails',
    startExploring: 'Prêt à caqueter →',
    seeDeals: "Voir les offres du jour",
    todaysDeals: "🔥 Offres du Jour",
    viewAllDeals: 'Toutes les offres →',
    heroTitle: 'Des jeux qui valent le coup de <span class="pop">caqueter</span>.',
    heroCopy: 'Une seule volée, tous les genres. Des milliers de jeux à prix doux, sans nuire à aucune oie.',
    readyToShop: 'Prêt à explorer la volée ?',
    readyToShopSub: 'Des milliers de titres dans tous les genres — votre prochain jeu préféré est ici.',
    flockBanner: 'Des milliers de jeux.',
    flockBannerSub: '(qui se posent juste ici pour vous)',
    flockBannerSubFinal: '(qui se posent juste ici !)',

    randomGameBtn: '🎲 Aléatoire',
    randomJokeBtn: 'Citation',
    spinWheelBtn: '🎰 Roue',
    settingsBtn: '⚙️ Paramètres',
    chatBtn: '💬 Assistant Oie',

    randomTitle: '🎲 Générateur de Jeu',
    randomSub: 'Laissez la volée choisir votre prochaine aventure !',
    spinToPick: 'Sélection d’un jeu...',
    viewGameDetails: 'Fiche du jeu',
    rollAgain: 'Relancer 🎲',

    wheelTitle: '🎰 Roue de la Fortune Oie',
    wheelSub: 'Tournez la roue pour gagner une réduction exclusive !',
    spinButton: 'TOURNER !',
    spinning: 'Ça tourne...',
    congrats: 'Félicitations !',
    wheelResult: 'Vous avez gagné :',
    useDiscountCode: 'Utilisez le code au paiement pour profiter de votre offre.',
    spinAgainTomorrow: 'Revenez quand vous voulez pour rejouer !',
    close: 'Fermer',

    reward5Off: '-5% sur votre commande',
    reward10Off: '-10% sur votre commande',
    reward15Off: '-15% sur votre commande',
    rewardFreeShip: 'Livraison Express Oie Gratuite',
    rewardMystery: '🎁 Réduction Mystère',
    rewardNoWin: '🪿 Plus de chance la prochaine fois !',

    settingsTitle: '⚙️ Paramètres GooseGames',
    langSelect: 'Langue',
    highContrast: 'Mode Haut Contraste',
    magneticCursor: 'Curseur Magnétique',
    cursorTrail: 'Traînée du Curseur',
    reducedMotion: 'Effets Visuels Réduits',
    enabled: 'Activé',
    disabled: 'Désactivé',

    chatHeaderTitle: 'Assistant GooseGames 🤖',
    chatHeaderSub: 'En ligne • Propulsé par l’IA',
    chatPlaceholder: 'Posez une question sur les jeux ou les offres...',
    chatSend: 'Envoyer',
    chatWelcome: "Coin-coin ! Je suis votre Assistant GooseGames. Besoin d'une recommandation ou d'infos ? Demandez-moi !",
    chatError: "Désolé, problème de connexion avec la volée. Veuillez réessayer !",
    chatThinking: 'L’Assistant réfléchit…',
    quickDeals: 'Offres du jour',
    quickRpg: 'Recommander un RPG',
    quickJoke: "Blague d'oie",

    chooseEdition: 'Choisir l’édition',
    reviewsCount: 'avis clients',
    reviewBy: 'Avis de',
    reviewScore: 'Note',
    reviewSummary: 'Note moyenne de',
    editionText: 'Édition',
    standardEdition: 'Édition Standard',
    endsIn: 'Se termine dans',
    endingSoon: 'Bientôt terminé',
    searchCategory: 'Catégorie :',
    popularRightNow: 'Populaire en ce moment',
    securePurchase: 'Achat sécurisé • Livraison instantanée • Retours faciles',
    relatedGames: 'Jeux similaires',
    searchResultsFor: 'Résultats pour',
    noResults: 'Aucun titre trouvé. Essayez une autre recherche.',
    gameNotFound: 'Jeu non trouvé',

    nestEmpty: 'Votre nid est vide. Ajoutez des jeux !',
    subtotal: 'Sous-total :',
    clearCart: 'Vider le nid',
    checkoutNow: 'Passer la commande →',
    remove: 'Supprimer',
    each: 'l’unité',
    cartTitle: 'Votre panier',
    cartEmpty: 'Votre nid est vide. Ajoutez des jeux !',

    getKnowUs: 'À Propos',
    aboutGoose: 'À propos de GooseGames',
    careers: 'Carrières (pour rire)',
    press: 'Communiqués de presse',
    honkResponsibly: 'Caquetez avec modération',
    makeMoney: 'Vendre avec nous',
    sellGames: 'Vendez vos jeux',
    affiliate: 'Devenez affilié Oie',
    advertise: 'Faites de la publicité',
    paymentProducts: 'Produits de Paiement',
    gooseCard: 'Carte GooseGames',
    shopPoints: 'Achetez avec des points',
    reloadBalance: 'Recharger votre solde',
    helpYou: 'Besoin d’Aide',
    yourAccount: 'Votre compte',
    yourOrders: 'Vos commandes',
    shippingRates: 'Frais de livraison',
    helpCenter: 'Centre d’aide',
    footerDisclaimer: 'Boutique fictive créée dans un cadre éducatif. Aucun jeu ni paiement n’est réel. © GooseGames.'
  },
  es: {
    headerWelcome: 'Hola, inicia sesión',
    headerAccount: 'Cuenta y Listas',
    headerReturns: 'Devoluciones',
    headerOrders: '& Pedidos',
    siteName: 'Goose<span class="logo-accent">Games</span>',
    siteTitle: 'GooseGames - Grazna si te encantan los juegos',
    recommendedGames: 'Juegos recomendados',
    communityGames: 'Juegos de la comunidad',
    communityTeaserTitle: 'Arcade comunitaria',
    communityTeaserCopy: 'Los juegos Scratch, animaciones y una serie tipo álbum tienen ahora su propia página.',
    openCommunityPage: 'Abrir página comunitaria',
    communityHeroTitle: 'Proyectos de Scratch, remezclados en una arcade viva.',
    communityHeroCopy: 'Estos proyectos fueron hechos por PotterNotFound404, el mismo creador detrás de este sitio. Explora la arcade como si fuera un playthrough y deja que el álbum se abra como una máquina antigua.',
    communityFeaturedTitle: 'Proyectos destacados',
    communityFeaturedSub: 'Tarjetas cinematográficas, crédito del creador y estadísticas que parecen una pared de galería en vez de una lista.',
    communityAlbumTitle: 'Álbum The Completely Normal Platformer',
    communityAlbumSub: 'Pasa el cursor o haz clic en el álbum para que los capítulos salten en orden, como un pequeño santuario arcade.',
    openScratch: 'Abrir en Scratch',
    openScratchShort: 'Página Scratch',
    playProject: 'Lanzar proyecto',
    topbar: '🪿 Envío a velocidad de graznido gratis en cada pedido, porque los gansos no creen en la paciencia.',
    searchPlaceholder: 'Busca miles de juegos...',
    searchAll: 'Todos los juegos',
    newRelease: 'Nuevo lanzamiento',
    averageRating: 'Valoración media de',
    editionOptions: 'Opciones de edición disponibles.',
    returnHome: 'Volver al inicio',
    gameNotFoundMessage: 'Ese juego aún no está disponible en la base de datos.',
    popularRightNow: 'Popular ahora',
    gamesLabel: 'juegos',
    shopDeals: 'Ver ofertas →',
    gooseDaysSale: '🎉 DÍAS DEL GANSO — Hasta un 70% de descuento en miles de juegos.',
    cart: 'Carrito',
    checkout: 'Pagar',
    checkoutTitle: 'Pago seguro',
    checkoutSub: 'Introduce tus datos de pago para completar el pedido ficticio.',
    checkoutEmptyText: 'Tu carrito está vacío.',
    continueShopping: 'Seguir comprando',
    fullName: 'Nombre completo',
    cardNumber: 'Número de tarjeta',
    expiry: 'Caducidad',
    cvv: 'CVV',
    shippingAddress: 'Dirección de envío',
    orderTotal: 'Total del pedido',
    payNow: 'Pagar ahora',
    paymentSuccessful: '¡Pago realizado!',
    checkoutSuccessSub: 'Tus juegos ficticios están en camino. Gracias por comprar en GooseGames.',
    backToHome: 'Volver al inicio',

    catAction: 'Acción',
    catAdventure: 'Aventura',
    catRPG: 'Rol (RPG)',
    catSimulation: 'Simulación',
    catStrategy: 'Estrategia',
    catIndie: 'Independiente',
    catMultiplayer: 'Multijugador',
    catFamily: 'Familia',

    subBestSellers: 'Más Vendidos',
    subNewReleases: 'Novedades',
    subTopRated: 'Mejor Valorados',
    subUnder20: 'Por menos de $20',
    subEditorsPicks: 'Recomendados',

    addToCart: 'Añadir al carrito',
    added: 'Añadido ✓',
    buyNow: 'Comprar ahora',
    viewDetails: 'Ver detalles',
    startExploring: 'Listo para graznar →',
    seeDeals: 'Ver ofertas de hoy',
    todaysDeals: '🔥 Ofertas de Hoy',
    viewAllDeals: 'Ver todas las ofertas →',
    heroTitle: 'Juegos por los que vale la pena <span class="pop">graznar</span>.',
    heroCopy: 'Una sola bandada, todos los géneros. Miles de juegos, precios geniales y ningún ganso dañado.',
    readyToShop: '¿Listo para explorar la bandada?',
    readyToShopSub: 'Miles de títulos de todos los géneros — tu próximo juego favorito ya está aquí.',
    flockBanner: 'Miles de juegos.',
    flockBannerSub: '(aterrizando justo aquí para ti)',

    randomGameBtn: '🎲 Aleatorio',
    randomJokeBtn: 'Cita',
    spinWheelBtn: '🎰 Ruleta',
    settingsBtn: '⚙️ Ajustes',
    chatBtn: '💬 Asistente Ganso',

    randomTitle: '🎲 Generador de Juegos',
    randomSub: '¡Deja que la bandada elija tu próxima aventura!',
    spinToPick: 'Eligiendo un juego...',
    viewGameDetails: 'Ver Detalles del Juego',
    rollAgain: 'Lanzar de nuevo 🎲',

    wheelTitle: '🎰 Ruleta de la Fortuna Ganso',
    wheelSub: '¡Gira para ganar un descuento exclusivo!',
    spinButton: '¡GIRAR RULETA!',
    spinning: 'Girando...',
    congrats: '¡Felicidades!',
    wheelResult: 'Has ganado:',
    useDiscountCode: 'Usa el código en el pago para reclamar tu premio.',
    spinAgainTomorrow: '¡Vuelve cuando quieras para otro giro!',
    close: 'Cerrar',

    reward5Off: '5% de Descuento',
    reward10Off: '10% de Descuento',
    reward15Off: '15% de Descuento',
    rewardFreeShip: 'Envío Express Ganso Gratis',
    rewardMystery: '🎁 Descuento Misterioso',
    rewardNoWin: '🪿 ¡Más suerte la próxima vez!',

    settingsTitle: '⚙️ Ajustes de GooseGames',
    langSelect: 'Idioma',
    highContrast: 'Modo Alto Contraste',
    magneticCursor: 'Cursor Magnético',
    cursorTrail: 'Rastro del Cursor',
    reducedMotion: 'Efectos Visuales Reducidos',
    enabled: 'Activado',
    disabled: 'Desactivado',

    chatHeaderTitle: 'Asistente GooseGames 🤖',
    chatHeaderSub: 'En línea • Impulsado por IA',
    chatPlaceholder: 'Pregunta sobre juegos, ofertas o recomendaciones...',
    chatSend: 'Enviar',
    chatWelcome: "¡Cuac! Soy tu Asistente GooseGames. ¿Buscas recomendaciones u ofertas? ¡Pregúntame!",
    chatError: "Lo siento, tuve un problema al conectar con la bandada. ¡Inténtalo de nuevo!",
    chatThinking: 'El Asistente está pensando…',
    quickDeals: 'Ofertas de hoy',
    quickRpg: 'Recomienda un RPG',
    quickJoke: 'Broma de ganso',

    chooseEdition: 'Elegir edición',
    reviewsCount: 'opiniones de clientes',
    reviewBy: 'Reseña de',
    reviewScore: 'Puntuación',
    reviewSummary: 'Valoración media de',
    editionText: 'Edición',
    standardEdition: 'Edición estándar',
    endsIn: 'Termina en',
    endingSoon: 'Termina pronto',
    searchCategory: 'Categoría:',
    popularRightNow: 'Popular ahora',
    securePurchase: 'Compra segura • Entrega instantánea • Devoluciones fáciles',
    relatedGames: 'Juegos relacionados',
    searchResultsFor: 'Resultados para',
    noResults: 'No se encontraron juegos. Intenta otra búsqueda.',
    gameNotFound: 'Juego no encontrado',

    nestEmpty: 'Tu nido está vacío. ¡Añade algunos juegos!',
    subtotal: 'Subtotal:',
    clearCart: 'Vaciar nido',
    checkoutNow: 'Tramitar Pedido →',
    remove: 'Eliminar',
    each: 'c/u',
    cartTitle: 'Tu carrito',
    cartEmpty: 'Tu nido está vacío. ¡Añade algunos juegos!',

    getKnowUs: 'Conócenos',
    aboutGoose: 'Sobre GooseGames',
    careers: 'Empleo (es broma)',
    press: 'Prensa',
    honkResponsibly: 'Grazna con responsabilidad',
    makeMoney: 'Gana Dinero con Nosotros',
    sellGames: 'Vende tus juegos',
    affiliate: 'Conviértete en Afiliado',
    advertise: 'Anuncia tus juegos',
    paymentProducts: 'Productos de Pago',
    gooseCard: 'Tarjeta GooseGames',
    shopPoints: 'Compra con puntos',
    reloadBalance: 'Recarga tu saldo',
    helpYou: 'Te Ayudamos',
    yourAccount: 'Tu cuenta',
    yourOrders: 'Tus pedidos',
    shippingRates: 'Tarifas de envío',
    helpCenter: 'Centro de ayuda',
    footerDisclaimer: 'Tienda ficticia creada con fines educativos. Ningún juego o pago es real. © GooseGames.'
  },
  de: {
    headerWelcome: 'Hallo, anmelden',
    headerAccount: 'Konto und Listen',
    headerReturns: 'Rücksendungen',
    headerOrders: '& Bestellungen',
    siteName: 'Goose<span class="logo-accent">Games</span>',
    siteTitle: 'GooseGames - Schnatter, wenn du Spiele liebst',
    recommendedGames: 'Empfohlene Spiele',
    communityGames: 'Community-Spiele',
    communityTeaserTitle: 'Community-Arcade',
    communityTeaserCopy: 'Scratch-Spiele, Animationen und eine albumartige Reihe haben jetzt ihre eigene Seite.',
    openCommunityPage: 'Community-Seite öffnen',
    communityHeroTitle: 'Scratch-Projekte, neu gemixt zu einer lebendigen Arcade.',
    communityHeroCopy: 'Diese Projekte wurden von PotterNotFound404 gemacht, demselben Creator hinter dieser Seite. Erkunde die Arcade wie einen Playthrough und lass das Album wie einen alten Automaten aufklappen.',
    communityFeaturedTitle: 'Ausgewählte Projekte',
    communityFeaturedSub: 'Kinoreife Karten, Creator-Credits und Stats, die eher wie eine Galerie als wie eine Liste wirken.',
    communityAlbumTitle: 'The Completely Normal Platformer Album',
    communityAlbumSub: 'Mit Hover oder Klick springt das Album auf und wirft die Kapitel in Reihenfolge heraus, wie ein kleines Arcade-Heiligtum.',
    openScratch: 'Auf Scratch öffnen',
    openScratchShort: 'Scratch-Seite',
    playProject: 'Projekt starten',
    topbar: '🪿 Kostenloser Schnatter-Schnellversand für jede Bestellung, denn Gänse kennen keine Geduld.',
    searchPlaceholder: 'Tausende Spiele durchsuchen...',
    searchAll: 'Alle Spiele',
    newRelease: 'Neue Veröffentlichung',
    averageRating: 'Durchschnittliche Bewertung von',
    editionOptions: 'Verfügbare Editionsoptionen.',
    returnHome: 'Zur Startseite',
    gameNotFoundMessage: 'Dieses Spiel ist noch nicht in der Datenbank verfügbar.',
    popularRightNow: 'Gerade beliebt',
    gamesLabel: 'Spiele',
    shopDeals: 'Alle Angebote →',
    gooseDaysSale: '🎉 GÄNSE-TAGE — Bis zu 70% Rabatt auf tausende Spiele.',
    cart: 'Warenkorb',
    checkout: 'Kasse',
    checkoutTitle: 'Sicherer Checkout',
    checkoutSub: 'Gib deine Zahlungsdaten ein, um die Scheinbestellung abzuschließen.',
    checkoutEmptyText: 'Dein Warenkorb ist leer.',
    continueShopping: 'Weiter einkaufen',
    fullName: 'Vollständiger Name',
    cardNumber: 'Kartennummer',
    expiry: 'Ablauf',
    cvv: 'CVV',
    shippingAddress: 'Lieferadresse',
    orderTotal: 'Bestellsumme',
    payNow: 'Jetzt bezahlen',
    paymentSuccessful: 'Zahlung erfolgreich!',
    checkoutSuccessSub: 'Deine Fake-Spiele sind unterwegs. Danke fürs Einkaufen bei GooseGames.',
    backToHome: 'Zur Startseite',

    catAction: 'Action',
    catAdventure: 'Abenteuer',
    catRPG: 'Rollenspiel (RPG)',
    catSimulation: 'Simulation',
    catStrategy: 'Strategie',
    catIndie: 'Indie',
    catMultiplayer: 'Mehrspieler',
    catFamily: 'Familie',

    subBestSellers: 'Bestseller',
    subNewReleases: 'Neuerscheinungen',
    subTopRated: 'Bestbewertet',
    subUnder20: 'Unter 20 €',
    subEditorsPicks: 'Empfehlungen',

    addToCart: 'In den Warenkorb',
    added: 'Hinzugefügt ✓',
    buyNow: 'Jetzt kaufen',
    viewDetails: 'Details anzeigen',
    startExploring: 'Bereit zum Schnattern →',
    seeDeals: 'Heutige Angebote',
    todaysDeals: '🔥 Heutige Angebote',
    viewAllDeals: 'Alle Angebote →',
    heroTitle: 'Spiele, für die sich das <span class="pop">Schnattern</span> lohnt.',
    heroCopy: 'Ein Schwarm, jedes Genre. Tausende Spiele, faire Preise und keinem Gans wird ein Haar gekrümmt.',
    readyToShop: 'Bereit für den Schwarm?',
    readyToShopSub: 'Tausende Titel aus jedem Genre — dein nächstes Lieblingsspiel wartet schon.',
    flockBanner: 'Tausende Spiele.',
    flockBannerSub: '(landen genau hier für dich)',

    randomGameBtn: '🎲 Zufall',
    randomJokeBtn: 'Zitat',
    spinWheelBtn: '🎰 Rad',
    settingsBtn: '⚙️ Einstellungen',
    chatBtn: '💬 Gänse-Assistent',

    randomTitle: '🎲 Gänse-Spielgenerator',
    randomSub: 'Lass den Schwarm dein nächstes Spielabenteuer wählen!',
    spinToPick: 'Spiel wird ausgewählt...',
    viewGameDetails: 'Spieldetails anzeigen',
    rollAgain: 'Nochmal würfeln 🎲',

    wheelTitle: '🎰 Gänse-Glücksrad',
    wheelSub: 'Drehe das Rad und gewinne exklusive Rabatte!',
    spinButton: 'RAD DREHEN!',
    spinning: 'Dreht sich...',
    congrats: 'Herzlichen Glückwunsch!',
    wheelResult: 'Du hast gewonnen:',
    useDiscountCode: 'Nutze den Code an der Kasse für deinen Rabatt.',
    spinAgainTomorrow: 'Komm jederzeit wieder für einen weiteren Dreh!',
    close: 'Schließen',

    reward5Off: '5% Rabatt auf deine Bestellung',
    reward10Off: '10% Rabatt auf deine Bestellung',
    reward15Off: '15% Rabatt auf deine Bestellung',
    rewardFreeShip: 'Kostenloser Gänse-Expressversand',
    rewardMystery: '🎁 Geheimnisvoller Rabatt',
    rewardNoWin: '🪿 Viel Glück beim nächsten Mal!',

    settingsTitle: '⚙️ GooseGames Einstellungen',
    langSelect: 'Sprache',
    highContrast: 'Hoher Kontrast',
    magneticCursor: 'Magnetischer Zeiger',
    cursorTrail: 'Zeiger-Spur-Effekt',
    reducedMotion: 'Reduzierte visuelle Effekte',
    enabled: 'Aktiviert',
    disabled: 'Deaktiviert',

    chatHeaderTitle: 'GooseGames Assistent 🤖',
    chatHeaderSub: 'Online • KI-Unterstützt',
    chatPlaceholder: 'Frage nach Spielen, Angeboten oder Tipps...',
    chatSend: 'Senden',
    chatWelcome: "Tröt! Ich bin dein GooseGames-Assistent. Suchst du Spieltipps oder Angebote? Frag mich einfach!",
    chatError: "Entschuldigung, Verbindung zum Schwarm fehlgeschlagen. Bitte versuche es erneut!",
    chatThinking: 'Der Assistent denkt nach…',
    quickDeals: 'Heutige Angebote',
    quickRpg: 'RPG empfehlen',
    quickJoke: 'Gänse-Witz',

    chooseEdition: 'Edition wählen',
    reviewsCount: 'Kundenbewertungen',
    reviewBy: 'Bewertung von',
    reviewScore: 'Wertung',
    reviewSummary: 'Durchschnittliche Bewertung von',
    editionText: 'Edition',
    standardEdition: 'Standard Edition',
    endsIn: 'Endet in',
    endingSoon: 'Endet bald',
    searchCategory: 'Kategorie:',
    popularRightNow: 'Gerade beliebt',
    securePurchase: 'Sicherer Kauf • Sofortige Lieferung • Einfache Rückgabe',
    relatedGames: 'Ähnliche Spiele',
    searchResultsFor: 'Ergebnisse für',
    noResults: 'Keine passenden Titel gefunden.',
    gameNotFound: 'Spiel nicht gefunden',

    nestEmpty: 'Dein Nest ist leer. Füge Spiele hinzu!',
    subtotal: 'Zwischensumme:',
    clearCart: 'Nest leeren',
    checkoutNow: 'Zur Kasse →',
    remove: 'Entfernen',
    each: 'Stk',
    cartTitle: 'Dein Warenkorb',
    cartEmpty: 'Dein Nest ist leer. Füge Spiele hinzu!',

    getKnowUs: 'Über uns',
    aboutGoose: 'Über GooseGames',
    careers: 'Karriere (nur Spaß)',
    press: 'Pressemitteilungen',
    honkResponsibly: 'Verantwortungsvoll schnattern',
    makeMoney: 'Geld verdienen',
    sellGames: 'Spiele verkaufen',
    affiliate: 'Partner werden',
    advertise: 'Werbung schalten',
    paymentProducts: 'Zahlungsmittel',
    gooseCard: 'GooseGames Karte',
    shopPoints: 'Mit Punkten shoppen',
    reloadBalance: 'Guthaben aufladen',
    helpYou: 'Hilfe',
    yourAccount: 'Dein Konto',
    yourOrders: 'Deine Bestellungen',
    shippingRates: 'Versandkosten',
    helpCenter: 'Hilfecenter',
    footerDisclaimer: 'Fiktiver Shop für ein Lernprojekt. Keine echten Spiele oder Zahlungen. © GooseGames.'
  }
};

// Game Title Translations Mapping
export const GAME_TITLE_TRANSLATIONS = {
  fr: {
    "The Legend of Zelda: Breath of the Wild": "The Legend of Zelda: Breath of the Wild",
    "Untitled Goose Game": "Jeu de l'Oie Sans Titre",
    "Resident Evil 4": "Resident Evil 4",
    "The Witcher 3: Wild Hunt": "The Witcher 3 : Chasse Sauvage",
    "Animal Crossing: New Horizons": "Animal Crossing: New Horizons",
    "A Plague Tale: Innocence": "A Plague Tale: Innocence",
    "Life is Strange": "Life is Strange"
  },
  es: {
    "The Legend of Zelda: Breath of the Wild": "The Legend of Zelda: Breath of the Wild",
    "Untitled Goose Game": "Juego del Ganso Sin Nombre",
    "Resident Evil 4": "Resident Evil 4",
    "The Witcher 3: Wild Hunt": "The Witcher 3: Cacería Salvaje",
    "Animal Crossing: New Horizons": "Animal Crossing: New Horizons"
  },
  de: {
    "The Legend of Zelda: Breath of the Wild": "The Legend of Zelda: Breath of the Wild",
    "Untitled Goose Game": "Unbenanntes Gänsespiel",
    "Resident Evil 4": "Resident Evil 4",
    "The Witcher 3: Wild Hunt": "The Witcher 3: Wilde Jagd",
    "Animal Crossing: New Horizons": "Animal Crossing: New Horizons"
  }
};

export function getLanguage() {
  return localStorage.getItem(STORAGE_LANG) || 'en';
}

export function setLanguage(lang) {
  const selected = DICTIONARY[lang] ? lang : 'en';
  localStorage.setItem(STORAGE_LANG, selected);
  document.documentElement.lang = selected;
  applyLocalization();
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: selected } }));
}

export function getTranslation(key, lang = getLanguage()) {
  const dict = DICTIONARY[lang] || DICTIONARY.en;
  return dict[key] || DICTIONARY.en[key] || key;
}

export function localizeGameTitle(title, lang = getLanguage()) {
  if (!title) return '';
  if (lang === 'en') return title;
  const mapped = GAME_TITLE_TRANSLATIONS[lang]?.[title];
  if (mapped) return mapped;
  return title;
}

export function localizeCategory(cat, lang = getLanguage()) {
  const catKey = 'cat' + cat.replace(/\s+/g, '');
  return getTranslation(catKey, lang) || cat;
}

export function localizeGameDescription(name, category, lang = getLanguage()) {
  const locTitle = localizeGameTitle(name, lang);
  const locCat = localizeCategory(category, lang).toLowerCase();

  switch(lang) {
    case 'fr':
      return `Plongez dans l'univers de ${locTitle} avec une page produit riche et détaillée. Ce titre de ${locCat} vous offre un gameplay captivant, des graphismes somptueux et des éditions soignées. Idéal pour les joueurs en quête d'une expérience de jeu complète.`;
    case 'es':
      return `Adéntrate en el mundo de ${locTitle} con una página de producto completa y detallada. Este juego de ${locCat} ofrece una jugabilidad envolvente, entornos hermosos y múltiples ediciones. Ideal para los jugadores que buscan una experiencia de primer nivel.`;
    case 'de':
      return `Tauche ein in die Welt von ${locTitle} mit einer detailreichen Produktseite. Dieser ${locCat}-Titel bietet mitreißendes Gameplay, wunderschöne Umgebungen und verschiedene Editionen. Perfekt für Spieler, die ein erstklassiges Erlebnis suchen.`;
    default:
      return `Step into the world of ${name} with a detailed, feature-rich product page. This ${category.toLowerCase()} title offers layered gameplay, beautiful environments, and curated editions. Ideal for players who want a polished experience.`;
  }
}

export function applyLocalization() {
  const currentLang = getLanguage();
  const dict = DICTIONARY[currentLang] || DICTIONARY.en;

  if (dict.siteTitle) document.title = dict.siteTitle;

  // Text content elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    if (dict[key]) {
      el.title = dict[key];
    }
  });
}




