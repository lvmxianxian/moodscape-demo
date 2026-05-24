import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Compass,
  Crown,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Palette,
  Route,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  Ticket,
  UserRound,
  Users,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const moodOptions = [
  'Calma',
  'Romantica',
  'Curiosa',
  'Sociale',
  'Creativa',
  'Nostalgica',
  'Energica',
  'Stressata',
  'Annoiata',
  'Sovraccarica'
];

const vibeOptions = [
  'Dolce vita',
  'Dark academia',
  'Hidden garden',
  'Golden hour walk',
  'Art gallery mood',
  'Neon nightlife',
  'Cozy cafe',
  'Old money',
  'Romantic ruins',
  'Quiet luxury',
  'Coastal mood',
  'Vintage film',
  'Seaside soft',
  'Food market',
  'Sunset rooftop',
  'Bookshop rain',
  'Slow morning',
  'Local rituals',
  'Indie concert',
  'Design hotel'
];

const aestheticOptions = [
  'minimal warm',
  'analog diary',
  'mediterranean',
  'quiet luxury',
  'soft social',
  'night glow',
  'retro seaside',
  'botanical'
];

const moodRoutes = {
  Calma: {
    title: 'Giardini segreti senza fretta',
    city: 'Roma',
    description: 'Una sequenza di cortili verdi, terrazze silenziose e pause lente per respirare meglio.',
    price: '€8',
    duration: '2h',
    stops: '4 tappe'
  },
  Romantica: {
    title: 'Roma romantica al tramonto',
    city: 'Roma',
    description: 'Un percorso morbido tra viste panoramiche, scorci iconici e tappe perfette per una serata romantica.',
    price: '€9',
    duration: '2h 30min',
    stops: '5 tappe'
  },
  Curiosa: {
    title: 'Biblioteche, atelier e stanze segrete',
    city: 'Torino',
    description: 'Un itinerario colto tra archivi storici, caffe letterari e musei piccoli ma memorabili.',
    price: '€12',
    duration: '3h',
    stops: '6 tappe'
  },
  Sociale: {
    title: 'Aperitivo community sui Navigli',
    city: 'Milano',
    description: 'Posti conviviali e facili da amare, pensati per incontrare persone e cambiare ritmo.',
    price: '€11',
    duration: '2h 45min',
    stops: '4 tappe'
  },
  Creativa: {
    title: 'Brera nascosta e gallerie indipendenti',
    city: 'Milano',
    description: "Una passeggiata tra studi, concept store e cortili dove l'ispirazione arriva naturale.",
    price: '€13',
    duration: '3h 15min',
    stops: '5 tappe'
  },
  Nostalgica: {
    title: "Caffe vintage e cinema d'essai",
    city: 'Bologna',
    description: "Vetrine d'epoca, portici caldi e luoghi che sembrano conservare una storia personale.",
    price: '€10',
    duration: '2h 20min',
    stops: '5 tappe'
  },
  Energica: {
    title: 'Napoli coastal mood',
    city: 'Napoli',
    description: "Mare, street food e viste luminose per trasformare l'energia in una giornata viva.",
    price: '€14',
    duration: '4h',
    stops: '6 tappe'
  },
  Stressata: {
    title: 'Reset urbano tra acqua e silenzio',
    city: 'Firenze',
    description: 'Spazi quieti, rituali semplici e micro-tappe per ritrovare presenza senza scappare via.',
    price: '€7',
    duration: '1h 40min',
    stops: '3 tappe'
  },
  Annoiata: {
    title: 'Piccole scoperte fuori radar',
    city: 'Roma',
    description: 'Un percorso anti-routine tra luoghi imprevisti, botteghe e angoli poco raccontati.',
    price: '€9',
    duration: '2h 10min',
    stops: '5 tappe'
  },
  Sovraccarica: {
    title: 'Quiet luxury sotto voce',
    city: 'Milano',
    description: 'Tappe ordinate, belle e poco rumorose per alleggerire la giornata senza rinunciare alla citta.',
    price: '€12',
    duration: '2h',
    stops: '4 tappe'
  }
};

const image = (id, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;

const places = [
  {
    title: 'Giardino degli Aranci',
    city: 'Roma',
    mood: 'Romantica',
    vibe: 'Dolce vita',
    description: 'Una luce dorata sopra la citta, perfetta quando vuoi sentirti dentro un film.',
    user: '@roma_vibes',
    avatar: 'RV',
    img: image('photo-1529260830199-42c24126f198')
  },
  {
    title: 'Biblioteca Angelica',
    city: 'Roma',
    mood: 'Curiosa',
    vibe: 'Dark academia',
    description: 'Scaffali antichi, silenzio buono e quella sensazione di scoprire qualcosa solo tuo.',
    user: '@dolcevita.notes',
    avatar: 'DN',
    img: image('photo-1521587760476-6c12a4b040da')
  },
  {
    title: 'Villa Borghese',
    city: 'Roma',
    mood: 'Calma',
    vibe: 'Golden hour walk',
    description: 'Un giro lento quando hai bisogno di verde, aria e cieli larghi.',
    user: '@cafehunter',
    avatar: 'CH',
    img: image('photo-1500530855697-b586d89ba3ee')
  },
  {
    title: 'Brera nascosta',
    city: 'Milano',
    mood: 'Creativa',
    vibe: 'Art gallery mood',
    description: 'Cortili, gallerie e dettagli eleganti per accendere idee nuove.',
    user: '@quietmilano',
    avatar: 'QM',
    img: image('photo-1513581166391-887a96ddeafd')
  },
  {
    title: 'Cafe vintage sui Navigli',
    city: 'Milano',
    mood: 'Nostalgica',
    vibe: 'Cozy cafe',
    description: "Tavolini piccoli, luce bassa e playlist morbide per restare un po'.",
    user: '@cafehunter',
    avatar: 'CH',
    img: image('photo-1517248135467-4c7edcad34c4')
  },
  {
    title: 'Firenze romantic ruins',
    city: 'Firenze',
    mood: 'Romantica',
    vibe: 'Romantic ruins',
    description: 'Pietra calda, ponti, logge e passi lenti dopo il tramonto.',
    user: '@hiddenflorence',
    avatar: 'HF',
    img: image('photo-1543429258-cc721d95d7ec')
  },
  {
    title: 'Torino dark academia',
    city: 'Torino',
    mood: 'Curiosa',
    vibe: 'Dark academia',
    description: 'Portici, librerie e caffe storici per una giornata dal fascino misterioso.',
    user: '@quietmilano',
    avatar: 'QM',
    img: image('photo-1490633874781-1c63cc424610')
  },
  {
    title: 'Napoli coastal mood',
    city: 'Napoli',
    mood: 'Energica',
    vibe: 'Coastal mood',
    description: 'Blu intenso, strade vive e una fame felice di cose belle.',
    user: '@roma_vibes',
    avatar: 'RV',
    img: image('photo-1533104816931-20fa691ff6ca')
  },
  {
    title: 'Bari Vecchia al tramonto',
    city: 'Bari',
    mood: 'Romantica',
    vibe: 'Dolce vita',
    description: 'Vicoli bianchi, panni stesi, piazzette vive e luce morbida prima di arrivare al mare.',
    user: '@barimood',
    avatar: 'BM',
    img: image('photo-1533105079780-92b9be482077')
  },
  {
    title: 'Lungomare Nazario Sauro',
    city: 'Bari',
    mood: 'Calma',
    vibe: 'Coastal mood',
    description: 'Una passeggiata aperta e salata per rimettere ordine nei pensieri.',
    user: '@pugliavibes',
    avatar: 'PV',
    img: image('photo-1507525428034-b723cf961d3e')
  },
  {
    title: 'Teatro Petruzzelli',
    city: 'Bari',
    mood: 'Curiosa',
    vibe: 'Old money',
    description: 'Eleganza storica, velluto, facciate teatrali e una serata che sembra gia speciale.',
    user: '@bariagenda',
    avatar: 'BA',
    img: image('photo-1518998053901-5348d3961a04')
  },
  {
    title: 'Mercato del pesce di Molo San Nicola',
    city: 'Bari',
    mood: 'Energica',
    vibe: 'Food market',
    description: 'Rumore buono, mare vicino e sapori locali per una mattina piena di vita.',
    user: '@localrituals',
    avatar: 'LR',
    img: image('photo-1504674900247-0877df9cc836')
  },
  {
    title: 'Pane e Pomodoro',
    city: 'Bari',
    mood: 'Sociale',
    vibe: 'Seaside soft',
    description: 'Una spiaggia facile, luminosa e spontanea per stare con amici senza pianificare troppo.',
    user: '@barimood',
    avatar: 'BM',
    img: image('photo-1500375592092-40eb2168fd21')
  },
  {
    title: 'Libreria Laterza',
    city: 'Bari',
    mood: 'Nostalgica',
    vibe: 'Bookshop rain',
    description: 'Scaffali, carta, silenzio e una pausa intima quando fuori la citta corre.',
    user: '@quietpuglia',
    avatar: 'QP',
    img: image('photo-1524995997946-a1c2e315a42f')
  },
  {
    title: 'Muraglia di Bari',
    city: 'Bari',
    mood: 'Creativa',
    vibe: 'Golden hour walk',
    description: 'Pietra chiara, mare laterale e prospettive perfette per foto, appunti e idee.',
    user: '@pugliavibes',
    avatar: 'PV',
    img: image('photo-1534447677768-be436bb09401')
  },
  {
    title: 'Spazio Murat',
    city: 'Bari',
    mood: 'Creativa',
    vibe: 'Art gallery mood',
    description: 'Design, mostre e community creativa nel cuore di Bari nuova.',
    user: '@bariagenda',
    avatar: 'BA',
    img: image('photo-1541961017774-22349e4a1262')
  },
  {
    title: 'Polignano escape',
    city: 'Bari',
    mood: 'Energica',
    vibe: 'Coastal mood',
    description: 'Il viaggio breve quando vuoi mare scenografico, roccia bianca e giornata piena.',
    user: '@weekendpuglia',
    avatar: 'WP',
    img: image('photo-1510414842594-a61c69b5ae57')
  },
  {
    title: 'Caffe storico in centro',
    city: 'Bari',
    mood: 'Calma',
    vibe: 'Slow morning',
    description: 'Colazione lenta, tavolini chiari e una mattina da iniziare senza notifiche.',
    user: '@quietpuglia',
    avatar: 'QP',
    img: image('photo-1442512595331-e89e73853f31')
  },
  {
    title: 'Venezia quiet luxury',
    city: 'Venezia',
    mood: 'Sovraccarica',
    vibe: 'Quiet luxury',
    description: 'Canali minori, hotel silenziosi e dettagli lenti per una pausa elegante.',
    user: '@quietmilano',
    avatar: 'QM',
    img: image('photo-1514890547357-a9ee288728e0')
  }
];

const creators = [
  ['Giulia', 'Roma', 'Dolce vita', '12 liste', '18k follower', 'G', <SunsetIcon />],
  ['Marco', 'Milano', 'Quiet luxury', '8 liste', '11k follower', 'M', <Crown size={30} />],
  ['Sofia', 'Firenze', 'Romantic ruins', '10 liste', '15k follower', 'S', <Heart size={30} />],
  ['Elena', 'Torino', 'Dark academia', '9 liste', '9k follower', 'E', <Moon size={30} />]
];

const events = [
  ['12 Giu', 'Milano', 'Mostra immersiva serale', 'Neon nightlife', '€18', '42 posti', image('photo-1514525253161-7a46d19cd819', 900, 650)],
  ['18 Giu', 'Roma', "Cinema all'aperto al tramonto", 'Dolce vita', '€12', '28 posti', image('photo-1500530855697-b586d89ba3ee', 900, 650)],
  ['21 Giu', 'Firenze', 'Passeggiata fotografica', 'Vintage film', '€15', '16 posti', image('photo-1492684223066-81342ee5ff30', 900, 650)]
];

const routes = [
  ['Roma romantica al tramonto', 'Roma', '2h 30min', '€9', '5 tappe', 'Romantica', 'Dolce vita', image('photo-1529260830199-42c24126f198', 900, 650)],
  ['Milano quiet luxury sotto i 30€', 'Milano', '3h', '€12', '4 tappe', 'Sovraccarica', 'Quiet luxury', image('photo-1513581166391-887a96ddeafd', 900, 650)],
  ['Torino dark academia', 'Torino', '4h', '€14', '6 tappe', 'Curiosa', 'Dark academia', image('photo-1490633874781-1c63cc424610', 900, 650)],
  ['Firenze romantic ruins', 'Firenze', '1 giorno', '€19', '7 tappe', 'Romantica', 'Romantic ruins', image('photo-1543429258-cc721d95d7ec', 900, 650)]
];

const lists = [
  ['Roma dolce vita', '18 luoghi', '@roma_vibes', 'Romantica · Dolce vita', image('photo-1529260830199-42c24126f198', 700, 460)],
  ['Milano quiet luxury', '12 luoghi', '@quietmilano', 'Calma · Quiet luxury', image('photo-1513581166391-887a96ddeafd', 700, 460)],
  ['Bologna vintage film', '15 luoghi', '@cafehunter', 'Nostalgica · Vintage film', image('photo-1517248135467-4c7edcad34c4', 700, 460)],
  ['Firenze romantic ruins', '21 luoghi', '@hiddenflorence', 'Romantica · Romantic ruins', image('photo-1543429258-cc721d95d7ec', 700, 460)],
  ['Napoli coastal mood', '16 luoghi', '@dolcevita.notes', 'Energica · Coastal mood', image('photo-1533104816931-20fa691ff6ca', 700, 460)],
  ['Torino dark academia', '14 luoghi', '@quietmilano', 'Curiosa · Dark academia', image('photo-1490633874781-1c63cc424610', 700, 460)]
];

const extraEvents = [
  ['28 Giu', 'Bari', 'Sunset walk sulla Muraglia', 'Golden hour walk', '€10', '24 posti', image('photo-1534447677768-be436bb09401', 900, 650)],
  ['04 Lug', 'Bari', 'Orecchiette ritual tour', 'Food market', '€16', '18 posti', image('photo-1504674900247-0877df9cc836', 900, 650)],
  ['11 Lug', 'Bari', 'Secret rooftop listening night', 'Sunset rooftop', '€22', '30 posti', image('photo-1514525253161-7a46d19cd819', 900, 650)]
];

const extraRoutes = [
  ['Bari vecchia e mare morbido', 'Bari', '3h', '€11', '6 tappe', 'Romantica', 'Dolce vita', image('photo-1533105079780-92b9be482077', 900, 650)],
  ['Bari coastal reset', 'Bari', '2h', '€8', '4 tappe', 'Calma', 'Coastal mood', image('photo-1507525428034-b723cf961d3e', 900, 650)],
  ['Bari local rituals', 'Bari', '4h', '€15', '7 tappe', 'Energica', 'Food market', image('photo-1504674900247-0877df9cc836', 900, 650)]
];

const extraLists = [
  ['Bari coastal mood', '22 luoghi', '@barimood', 'Calma · Coastal mood', image('photo-1507525428034-b723cf961d3e', 700, 460)],
  ['Bari local rituals', '19 luoghi', '@localrituals', 'Energica · Food market', image('photo-1504674900247-0877df9cc836', 700, 460)]
];

const allEvents = [...events, ...extraEvents];
const allRoutes = [...routes, ...extraRoutes];
const allLists = [...lists, ...extraLists];

const cityMaps = {
  Bari: { lat: 41.1171, lon: 16.8719, bbox: '16.8300,41.0950,16.9100,41.1450' },
  Roma: { lat: 41.9028, lon: 12.4964, bbox: '12.4300,41.8700,12.5450,41.9300' },
  Milano: { lat: 45.4642, lon: 9.19, bbox: '9.1300,45.4300,9.2500,45.5000' },
  Firenze: { lat: 43.7696, lon: 11.2558, bbox: '11.2100,43.7450,11.3000,43.7900' },
  Torino: { lat: 45.0703, lon: 7.6869, bbox: '7.6300,45.0350,7.7450,45.1050' },
  Napoli: { lat: 40.8518, lon: 14.2681, bbox: '14.2100,40.8150,14.3200,40.8900' }
};

function App() {
  const [selectedMood, setSelectedMood] = useState('Romantica');
  const [selectedVibe, setSelectedVibe] = useState('Dolce vita');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Feed');
  const [saved, setSaved] = useState({});
  const [filters, setFilters] = useState({ city: 'Bari', budget: '€€', time: '2h', company: 'coppia', aesthetic: 'mediterranean', type: 'luoghi', vibe: 'Coastal mood' });

  const route = moodRoutes[selectedMood] || moodRoutes.Romantica;
  const suggested = useMemo(() => {
    const primary = places.filter((p) => p.mood === selectedMood || p.vibe === selectedVibe);
    return [...primary, ...places.filter((p) => !primary.includes(p))].slice(0, 5);
  }, [selectedMood, selectedVibe]);

  const toggleSaved = (key) => setSaved((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div>
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
      <main>
        <Hero
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
          route={route}
          suggested={suggested}
        />
        <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        <VibeSelector selectedVibe={selectedVibe} setSelectedVibe={setSelectedVibe} />
        <CurrentMatch selectedMood={selectedMood} selectedVibe={selectedVibe} route={route} />
        <TabDock activeTab={activeTab} setActiveTab={setActiveTab} />
        <SuggestedPlaces places={suggested} saved={saved} toggleSaved={toggleSaved} />
        <Feed active={activeTab === 'Feed'} saved={saved} toggleSaved={toggleSaved} />
        <Community active={activeTab === 'Community'} />
        <Creators />
        <Events active={activeTab === 'Eventi'} saved={saved} toggleSaved={toggleSaved} />
        <Routes active={activeTab === 'Percorsi'} saved={saved} toggleSaved={toggleSaved} />
        <MapSection active={activeTab === 'Mappa'} filters={filters} setFilters={setFilters} selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <PilotCity filters={filters} setFilters={setFilters} saved={saved} toggleSaved={toggleSaved} />
        <VibeLists saved={saved} toggleSaved={toggleSaved} />
        <Moodboard saved={saved} toggleSaved={toggleSaved} />
        <Profile selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <Premium />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

function Header({ mobileOpen, setMobileOpen }) {
  const nav = ['Home', 'Feed', 'Community', 'Creator', 'Eventi', 'Percorsi', 'Mappa', 'Bari Pilot', 'Vibe Lists', 'Moodboard', 'Premium', 'Profilo'];
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="MoodScape home">
        <span className="brand-mark"><BalloonLogo /></span>
        <span>MoodScape</span>
      </a>
      <nav className="desktop-nav">
        {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <button className="ghost-button">Login</button>
        <a className="primary-button compact" href="#mood">Scegli mood</a>
        <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Apri menu">
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ open, setOpen }) {
  const nav = ['Home', 'Feed', 'Community', 'Creator', 'Eventi', 'Percorsi', 'Mappa', 'Bari Pilot', 'Vibe Lists', 'Moodboard', 'Premium', 'Profilo'];
  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      {nav.map((item) => (
        <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setOpen(false)}>{item}</a>
      ))}
      <a className="primary-button" href="#mood" onClick={() => setOpen(false)}>Scegli mood</a>
    </div>
  );
}

function Hero(props) {
  return (
    <section className="hero section" id="home">
      <div className="hero-copy reveal">
        <h1>Scopri luoghi in base a come ti senti</h1>
        <p className="hero-subtitle">Scegli un mood e una vibe. MoodScape li trasforma in luoghi, eventi, percorsi e consigli autentici dalla community.</p>
        <p className="key-phrase">Non cercare solo un posto. Cerca la tua atmosfera.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#mood">Trova la tua vibe</a>
          <a className="secondary-button" href="#feed">Esplora il feed</a>
        </div>
      </div>
      <div className="hero-panel-wrap reveal delay">
        <AppPanel {...props} />
      </div>
    </section>
  );
}

function AppPanel({ selectedMood, setSelectedMood, selectedVibe, setSelectedVibe, route, suggested }) {
  return (
    <div className="app-panel">
      <div className="panel-top">
        <strong>MoodScape</strong>
        <div><Search size={17} /><IconAvatar label="Profilo" size="micro" icon={<UserRound size={15} />} /></div>
      </div>
      <div className="mini-label">1. Come ti senti?</div>
      <div className="mini-grid">
        {moodOptions.slice(0, 6).map((mood) => (
          <button key={mood} className={selectedMood === mood ? 'mini-chip active' : 'mini-chip'} onClick={() => setSelectedMood(mood)}>
            {moodIcon(mood)}
            {mood}
          </button>
        ))}
      </div>
      <div className="mini-label">2. Che vibe cerchi?</div>
      <div className="mini-row">
        {vibeOptions.slice(0, 7).map((vibe) => (
          <button key={vibe} className={selectedVibe === vibe ? 'mini-pill active' : 'mini-pill'} onClick={() => setSelectedVibe(vibe)}>
            {vibe}
          </button>
        ))}
      </div>
      <div className="panel-layout">
        <div className="panel-match">
          <span>La tua combinazione perfetta</span>
          <div className="panel-match-card">
            <img src={suggested[0].img} alt={suggested[0].title} />
            <div>
              <h3>{selectedMood} · {selectedVibe}</h3>
              <p>{route.title}</p>
              <a href="#current-match">Perche e perfetta per te <ChevronRight size={14} /></a>
            </div>
          </div>
        </div>
        <div className="panel-route">
          <div className="route-map">
            {[1, 2, 3, 4, 5].map((n) => <span key={n} style={{ '--x': `${18 + n * 12}%`, '--y': `${22 + (n % 2) * 32}%` }}>{n}</span>)}
          </div>
          <ol>
            <li>Belvedere segreto</li>
            <li>Cafe con vista</li>
            <li>Giardino nascosto</li>
            <li>Terrazza dorata</li>
          </ol>
        </div>
      </div>
      <div className="panel-places">
        {suggested.slice(0, 3).map((place) => (
          <article key={place.title}>
            <img src={place.img} alt={place.title} />
            <strong>{place.title}</strong>
            <span>{place.city}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function moodIcon(mood) {
  const map = {
    Calma: <Leaf size={16} />,
    Romantica: <Heart size={16} />,
    Curiosa: <Search size={16} />,
    Sociale: <Users size={16} />,
    Creativa: <Palette size={16} />,
    Nostalgica: <Camera size={16} />,
    Energica: <Zap size={16} />
  };
  return map[mood] || <Moon size={16} />;
}

function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <section className="section compact-section" id="mood">
      <SectionIntro title="Come ti senti?" text="Dove vuoi andare dipende da come ti senti. Scegli un mood e lascia che la citta cambi forma." />
      <div className="chip-row">
        {moodOptions.map((mood) => (
          <button key={mood} onClick={() => setSelectedMood(mood)} className={selectedMood === mood ? 'chip active' : 'chip'}>
            {moodIcon(mood)}
            {mood}
          </button>
        ))}
      </div>
    </section>
  );
}

function VibeSelector({ selectedVibe, setSelectedVibe }) {
  return (
    <section className="section compact-section" id="vibe">
      <SectionIntro title="Scegli la vibe" text="Ogni mood merita un percorso. Aggiungi la tua estetica e trasforma l'ispirazione in esperienza." />
      <div className="chip-row">
        {vibeOptions.map((vibe) => (
          <button key={vibe} onClick={() => setSelectedVibe(vibe)} className={selectedVibe === vibe ? 'chip vibe active' : 'chip vibe'}>
            <Sparkles size={16} />
            {vibe}
          </button>
        ))}
      </div>
    </section>
  );
}

function CurrentMatch({ selectedMood, selectedVibe, route }) {
  return (
    <section className="section" id="current-match">
      <div className="match-card">
        <div>
          <span className="section-kicker">Match attuale</span>
          <h2>{selectedMood} · {selectedVibe}</h2>
          <p className="muted-label">Percorso consigliato</p>
          <h3>{route.title}</h3>
          <p>{route.description}</p>
        </div>
        <div className="match-meta">
          <Stat label="Prezzo" value={route.price} />
          <Stat label="Durata" value={route.duration} />
          <Stat label="Tappe" value={route.stops} />
          <div className="button-stack">
            <button className="primary-button">Acquista percorso</button>
            <button className="secondary-button">Vedi luoghi del match</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong></div>;
}

function TabDock({ activeTab, setActiveTab }) {
  const tabs = ['Feed', 'Eventi', 'Percorsi', 'Community', 'Mappa'];
  return (
    <section className="section tab-section">
      <div className="tab-dock">
        {tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tabIcon(tab)}{tab}</button>)}
      </div>
    </section>
  );
}

function tabIcon(tab) {
  const map = { Feed: <Camera size={17} />, Eventi: <CalendarDays size={17} />, Percorsi: <Route size={17} />, Community: <Users size={17} />, Mappa: <MapPin size={17} /> };
  return map[tab];
}

function SuggestedPlaces({ places, saved, toggleSaved }) {
  return (
    <section className="section" id="luoghi">
      <SectionIntro title="Posti autentici consigliati dalla community" text="Dal feed alla citta: salva, esplora, vivi." />
      <div className="suggested-grid">
        {places.map((place) => <PlaceCard key={place.title} place={place} saved={saved[place.title]} onSave={() => toggleSaved(place.title)} />)}
      </div>
    </section>
  );
}

function PlaceCard({ place, saved, onSave }) {
  return (
    <article className="place-card">
      <img src={place.img} alt={place.title} />
      <button className={saved ? 'save-bubble saved' : 'save-bubble'} onClick={onSave} aria-label="Salva luogo">
        <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <div className="place-content">
        <h3>{place.title}</h3>
        <p>{place.city} · {place.mood} · {place.vibe}</p>
        <span>{place.description}</span>
        <div className="social-row">
          <IconAvatar label={place.avatar} />
          <strong>{place.user}</strong>
          <div className="social-icons"><Heart size={16} /><Bookmark size={16} /><Share2 size={16} /></div>
        </div>
      </div>
    </article>
  );
}

function Feed({ active, saved, toggleSaved }) {
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="feed">
      <SectionIntro title="Feed ispirazionale" text="Scopri luoghi, storie e micro-itinerari come in una moodboard viva della citta." />
      <div className="masonry">
        {places.map((place, index) => (
          <article className={`feed-card size-${(index % 3) + 1}`} key={place.title}>
            <img src={place.img} alt={place.title} />
            <button className={saved[`feed-${place.title}`] ? 'save-bubble saved' : 'save-bubble'} onClick={() => toggleSaved(`feed-${place.title}`)} aria-label="Salva dal feed">
              <Bookmark size={16} fill={saved[`feed-${place.title}`] ? 'currentColor' : 'none'} />
            </button>
            <div className="feed-overlay">
              <h3>{place.title}</h3>
              <p>{place.city} · {place.mood} · {place.vibe}</p>
              <span>{place.description}</span>
              <div className="feed-actions"><strong>{place.user}</strong><Heart size={17} /><Bookmark size={17} /><Send size={17} /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Community({ active }) {
  const profiles = [
    ['@roma_vibes', 'Liste pubbliche', '18 luoghi salvati', 'RV', <MapPin size={28} />],
    ['@quietmilano', 'Recensioni narrative', '25 luoghi salvati', 'QM', <Leaf size={28} />],
    ['@dolcevita.notes', 'Percorsi condivisi', '32 luoghi salvati', 'DN', <Sparkles size={28} />],
    ['@hiddenflorence', 'Moodboard personali', '39 luoghi salvati', 'HF', <Palette size={28} />],
    ['@cafehunter', 'Creator locali', '46 luoghi salvati', 'CH', <Camera size={28} />],
    ['@barimood', 'Bari pilot diary', '52 luoghi salvati', 'BM', <Route size={28} />]
  ];
  const socialPosts = places.filter((place) => ['Bari', 'Roma', 'Milano'].includes(place.city)).slice(0, 6);
  return (
    <section className={`section community-band ${active ? 'section-highlight' : ''}`} id="community">
      <div className="split">
        <div>
          <SectionIntro title="La community che trasforma mood e vibe in luoghi reali" text="Profili utenti, creator locali, liste pubbliche, recensioni narrative, percorsi condivisi e moodboard personali convivono in un unico flusso elegante." />
          <p className="quote">Scopri posti autentici consigliati dalla community.</p>
        </div>
        <div className="community-grid">
          {profiles.map(([profile, label, count, initials, icon]) => (
            <article className="community-card" key={profile}>
              <IconAvatar label={initials} size="large" icon={icon} />
              <h3>{profile}</h3>
              <p>{label}</p>
              <span>{count}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="community-social">
        <div className="story-rail">
          {profiles.map(([profile, , , initials, icon]) => (
            <article className="story-bubble" key={`story-${profile}`}>
              <IconAvatar label={initials} icon={icon} />
              <span>{profile}</span>
            </article>
          ))}
        </div>
        <div className="social-mosaic">
          {socialPosts.map((place, index) => (
            <article className={`social-post post-${index % 3}`} key={`community-${place.title}`}>
              <img src={place.img} alt={place.title} />
              <div>
                <span>{place.user}</span>
                <h3>{place.title}</h3>
                <p>{place.city} · {place.mood} · {place.vibe}</p>
                <div className="post-actions"><Heart size={16} /><Bookmark size={16} /><Share2 size={16} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Creators() {
  return (
    <section className="section" id="creator">
      <SectionIntro title="Creator locali da seguire" text="Persone che conoscono davvero la citta e la raccontano per atmosfera." />
      <div className="creator-grid">
        {creators.map(([name, city, vibe, listsCount, followers, initial, icon]) => (
          <article className="creator-card" key={name}>
            <div className="creator-symbol">
              <IconAvatar label={initial} size="xl" icon={icon} />
            </div>
            <h3>{name}</h3>
            <p>{city} · {vibe} · {listsCount}</p>
            <span>{followers}</span>
            <div className="dual-actions"><button className="primary-button tiny">Segui</button><button className="secondary-button tiny">Vedi liste</button></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Events({ active, saved, toggleSaved }) {
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="eventi">
      <SectionIntro title="Eventi in base alla tua vibe" text="Esperienze prenotabili con mood, prezzo e disponibilita subito leggibili." />
      <div className="event-grid">
        {allEvents.map(([date, city, title, vibe, price, seats, img]) => (
          <article className="event-card" key={title}>
            <div className="event-media">
              <img src={img} alt={title} />
              <div className="date-box">{date}</div>
            </div>
            <div>
              <p>{city} · {vibe}</p>
              <h3>{title}</h3>
              <span>{price} · {seats} disponibili</span>
            </div>
            <div className="dual-actions">
              <button className="secondary-button tiny" onClick={() => toggleSaved(`event-${title}`)}>{saved[`event-${title}`] ? 'Salvato' : 'Salva'}</button>
              <button className="primary-button tiny">Prenota</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Routes({ active, saved, toggleSaved }) {
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="percorsi">
      <SectionIntro title="Percorsi gia pronti per il tuo mood" text="Itinerari come una boutique travel agency: curati, belli da seguire, facili da acquistare." />
      <div className="route-grid">
        {allRoutes.map(([title, city, duration, budget, stops, mood, vibe, img]) => (
          <article className="route-card" key={title}>
            <img src={img} alt={title} />
            <div>
              <h3>{title}</h3>
              <p>{city} · {duration} · {stops} · {budget}</p>
              <span>{mood} · {vibe}</span>
              <div className="dual-actions">
                <button className="secondary-button tiny" onClick={() => toggleSaved(`route-${title}`)}>{saved[`route-${title}`] ? 'Salvato' : 'Salva percorso'}</button>
                <button className="primary-button tiny">Acquista</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MapSection({ active, filters, setFilters, selectedMood, selectedVibe }) {
  const selectedCity = filters.city || 'Bari';
  const map = cityMaps[selectedCity] || cityMaps.Bari;
  const visiblePins = places.filter((place) => place.city === selectedCity).slice(0, 5);
  const filterSets = {
    city: ['Bari', 'Roma', 'Milano', 'Firenze', 'Torino', 'Napoli'],
    budget: ['€', '€€', '€€€'],
    time: ['1h', '2h', '3h', '1 giorno'],
    company: ['solo', 'coppia', 'amici', 'gruppo'],
    type: ['luoghi', 'eventi', 'percorsi', 'liste'],
    aesthetic: aestheticOptions,
    vibe: vibeOptions
  };
  return (
    <section className={`section map-section ${active ? 'section-highlight' : ''}`} id="mappa">
      <div className="split map-split">
        <div>
          <SectionIntro title="Esplora la citta per atmosfera" text="Non cercare solo ristoranti, bar o musei. Scopri zone e luoghi in base all'esperienza che vuoi vivere." />
          <div className="filter-block">
            {Object.entries(filterSets).map(([key, values]) => (
              <div key={key}>
                <span>{filterLabel(key)}</span>
                <div className="filter-row">
                  {values.map((value) => <button key={value} className={filters[key] === value ? 'active' : ''} onClick={() => setFilters({ ...filters, [key]: value })}>{value}</button>)}
                </div>
              </div>
            ))}
            <div>
              <span>Mood · Vibe</span>
              <div className="filter-row"><button className="active">{selectedMood}</button><button className="active">{selectedVibe}</button></div>
            </div>
          </div>
        </div>
        <div className="real-map-card">
          <iframe
            title={`Mappa reale di ${selectedCity}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${map.bbox}&layer=mapnik&marker=${map.lat}%2C${map.lon}`}
            loading="lazy"
          />
          <div className="map-overlay-panel">
            <strong>{selectedCity} mood map</strong>
            <span>{selectedMood} · {filters.vibe || selectedVibe} · {filters.aesthetic}</span>
            <div className="map-place-list">
              {visiblePins.map((place) => <p key={place.title}><MapPin size={13} />{place.title}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function filterLabel(key) {
  return { city: 'Citta', budget: 'Budget', time: 'Tempo disponibile', company: 'Compagnia', type: 'Cosa cerchi', aesthetic: 'Estetica', vibe: 'Vibe' }[key];
}

function PilotCity({ filters, setFilters, saved, toggleSaved }) {
  const bariPlaces = places.filter((place) => place.city === 'Bari');
  const bariEvents = allEvents.filter((event) => event[1] === 'Bari');
  const bariRoutes = allRoutes.filter((route) => route[1] === 'Bari');
  const selectedVibe = filters.vibe || 'Coastal mood';
  const matchingBari = bariPlaces.filter((place) => place.vibe === selectedVibe || place.mood === filters.mood).slice(0, 6);
  const displayPlaces = matchingBari.length ? matchingBari : bariPlaces.slice(0, 6);

  return (
    <section className="section pilot-city" id="bari-pilot">
      <div className="pilot-head">
        <div>
          <span className="section-kicker">Citta pilota</span>
          <h2>Bari, scoperta per mood</h2>
          <p>Bari diventa il primo laboratorio MoodScape: mare, vicoli, rituali locali, eventi piccoli e percorsi acquistabili in base a tempo, budget, compagnia, estetica e vibe.</p>
        </div>
        <div className="pilot-filter-card">
          <span>Filtro demo Bari</span>
          <div className="filter-row">
            {['Coastal mood', 'Dolce vita', 'Food market', 'Golden hour walk', 'Bookshop rain', 'Art gallery mood'].map((vibe) => (
              <button key={vibe} className={selectedVibe === vibe ? 'active' : ''} onClick={() => setFilters({ ...filters, city: 'Bari', vibe })}>{vibe}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="pilot-layout">
        <div className="pilot-map">
          <iframe
            title="Mappa reale Bari pilot"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${cityMaps.Bari.bbox}&layer=mapnik&marker=${cityMaps.Bari.lat}%2C${cityMaps.Bari.lon}`}
            loading="lazy"
          />
        </div>
        <div className="pilot-stack">
          {displayPlaces.map((place) => (
            <article className="pilot-place" key={`pilot-${place.title}`}>
              <img src={place.img} alt={place.title} />
              <div>
                <h3>{place.title}</h3>
                <p>{place.mood} · {place.vibe}</p>
                <span>{place.description}</span>
              </div>
              <button className={saved[`pilot-${place.title}`] ? 'save-bubble saved inline' : 'save-bubble inline'} onClick={() => toggleSaved(`pilot-${place.title}`)} aria-label="Salva luogo Bari">
                <Bookmark size={15} fill={saved[`pilot-${place.title}`] ? 'currentColor' : 'none'} />
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="pilot-booking-row">
        {bariEvents.map(([date, city, title, vibe, price, seats, img]) => (
          <article className="booking-card" key={`bari-event-${title}`}>
            <img src={img} alt={title} />
            <div>
              <span>{date} · {city} · {vibe}</span>
              <h3>{title}</h3>
              <p>{price} · {seats} disponibili</p>
              <button className="primary-button tiny">Prenota</button>
            </div>
          </article>
        ))}
        {bariRoutes.map(([title, city, duration, budget, stops, mood, vibe, img]) => (
          <article className="booking-card" key={`bari-route-${title}`}>
            <img src={img} alt={title} />
            <div>
              <span>{city} · {duration} · {stops}</span>
              <h3>{title}</h3>
              <p>{budget} · {mood} · {vibe}</p>
              <button className="secondary-button tiny">Acquista percorso</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VibeLists({ saved, toggleSaved }) {
  return (
    <section className="section" id="vibe-lists">
      <SectionIntro title="Liste create dalla community" text="Raccolte salvabili per quando vuoi partire da un'atmosfera, non da un indirizzo." />
      <div className="list-grid">
        {allLists.map(([title, count, creator, vibe, img]) => (
          <article className="list-card" key={title}>
            <img className="list-photo" src={img} alt={title} />
            <div><Sparkles size={22} /><h3>{title}</h3></div>
            <p>{count} · {creator}</p>
            <span>{vibe}</span>
            <button className="secondary-button tiny" onClick={() => toggleSaved(`list-${title}`)}>{saved[`list-${title}`] ? 'Lista salvata' : 'Salva lista'}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Moodboard({ saved, toggleSaved }) {
  const categories = ['Luoghi', 'Percorsi', 'Eventi', 'Idee weekend'];
  return (
    <section className="section moodboard" id="moodboard">
      <SectionIntro title="La tua Moodboard" text="Trasforma l'ispirazione in esperienza: salva cio che ti chiama e ritrovalo quando vuoi uscire." />
      <div className="board-grid">
        {categories.map((category, index) => (
          <article className="board-card" key={category}>
            <div className="board-collage">
              {places.slice(index, index + 4).map((place) => <img key={place.title} src={place.img} alt="" />)}
            </div>
            <div>
              <h3>{category}</h3>
              <p>{index + 3} elementi salvati</p>
              <button className={saved[`board-${category}`] ? 'primary-button tiny' : 'secondary-button tiny'} onClick={() => toggleSaved(`board-${category}`)}>
                {saved[`board-${category}`] ? <Check size={14} /> : <Bookmark size={14} />} {saved[`board-${category}`] ? 'Salvato' : 'Salva'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Profile({ selectedMood, selectedVibe }) {
  return (
    <section className="section profile-section" id="profilo">
      <div className="profile-card">
        <div className="profile-head">
          <IconAvatar label="V" size="xxl" icon={<UserRound size={34} />} />
          <div>
            <h2>Profilo · Mood Diary</h2>
            <p>Il tuo Mood Diary raccoglie luoghi, percorsi e vibe che raccontano come vivi la citta.</p>
          </div>
        </div>
        <div className="profile-stats">
          <Stat label="Mood piu scelto" value={selectedMood} />
          <Stat label="Vibe preferita" value={selectedVibe} />
          <Stat label="Luoghi salvati" value="38" />
          <Stat label="Percorsi acquistati" value="4" />
        </div>
      </div>
    </section>
  );
}

function Premium() {
  const free = ['esplora feed', 'salva alcune liste', 'consulta Mood Map base', 'scopri percorsi community'];
  const premium = ['liste illimitate', 'moodboard avanzate', 'percorsi personalizzati', 'filtri estetici avanzati', 'suggerimenti AI', 'salvataggio offline', 'Mood Diary personale'];
  return (
    <section className="section premium" id="premium">
      <SectionIntro title="MoodScape Premium" text="Piu accesso, piu ispirazione, piu te. Sblocca una scoperta urbana ancora piu personale." />
      <div className="pricing-grid">
        <Plan title="Gratuito" price="€0" items={free} />
        <Plan title="Premium" price="€4,99/mese" items={premium} featured />
      </div>
    </section>
  );
}

function Plan({ title, price, items, featured }) {
  return (
    <article className={featured ? 'plan-card featured' : 'plan-card'}>
      <Crown size={24} />
      <h3>{title}</h3>
      <strong>{price}</strong>
      <ul>{items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
      {featured && <button className="primary-button">Passa a Premium</button>}
    </article>
  );
}

function HowItWorks() {
  const steps = [
    ['Analizza', "L'utente seleziona come si sente, la vibe estetica, tempo, budget e distanza.", <Compass size={22} />],
    ['Interpreta', 'Il sistema usa AI, geolocalizzazione, database esperienze e recensioni della community.', <Sparkles size={22} />],
    ['Propone', 'Le attivita vengono presentate tramite Mood Map, liste e storytelling visivo.', <MapPin size={22} />],
    ['Accompagna', "L'utente salva luoghi, percorsi e moodboard nel proprio Mood Diary.", <Navigation size={22} />]
  ];
  return (
    <section className="section how" id="how">
      <SectionIntro title="Come funziona" text="Un flusso semplice, emozionale e credibile per un MVP evoluto." />
      <div className="step-grid">
        {steps.map(([title, text, icon], index) => (
          <article className="step-card" key={title}>
            <span>{index + 1}</span>
            {icon}
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="#home"><span className="brand-mark"><BalloonLogo /></span><span>MoodScape</span></a>
        <p>Viaggia secondo il tuo umore</p>
        <p>© 2026 MoodScape. Demo MVP.</p>
      </div>
      <div className="footer-links">
        <a href="#feed">Feed</a>
        <a href="#community">Community</a>
        <a href="#creator">Creator</a>
        <a href="#eventi">Eventi</a>
        <a href="#percorsi">Percorsi</a>
        <a href="#mappa">Mappa</a>
      </div>
      <form className="newsletter">
        <label htmlFor="email">Newsletter</label>
        <div><input id="email" placeholder="La tua email" /><button type="button"><ChevronRight size={18} /></button></div>
      </form>
      <div className="social"><Camera /><MessageCircle /><Share2 /></div>
    </footer>
  );
}

function SectionIntro({ title, text }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function IconAvatar({ label, icon, size = '' }) {
  return (
    <span className={`icon-avatar ${size}`} aria-label={label}>
      <span className="avatar-glyph">{icon || <UserRound size={16} />}</span>
      <span className="avatar-initial">{label}</span>
    </span>
  );
}

function SunsetIcon() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
      <path d="M5 21h22" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M9 21a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M16 4v4M6.8 8.8l2.8 2.8M25.2 8.8l-2.8 2.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function BalloonLogo() {
  return (
    <img className="balloon-logo" src="/assets/moodscape-balloon.png" alt="" aria-hidden="true" />
  );
}

createRoot(document.getElementById('root')).render(<App />);

