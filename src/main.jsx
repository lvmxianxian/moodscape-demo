import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Crown,
  Eye,
  Heart,
  Leaf,
  Lock,
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
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Wind,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

/* ─── PRD-COMPLIANT TAXONOMIES ─────────────────────────────────── */

// PRD §6.1 — 8 mood esatti
const moodOptions = [
  'Stressata',
  'Annoiata',
  'Curiosa',
  'Romantica',
  'Energica',
  'Sola',
  'Sovraccarica',
  'In cerca di socialità'
];

// PRD §6.1 — 10 vibe esatte (con alias per compatibilità dati)
const vibeOptions = [
  'Dark academia',
  'Dolce vita',
  'Quiet luxury',
  'Vintage film',
  'Coastal mood',
  'Neon nightlife',
  'Romantic ruins',
  'Minimalismo giapponese',
  'Natura selvaggia',
  'City creative'
];


const moodRoutes = {
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
  Curiosa: {
    title: 'Biblioteche, atelier e stanze segrete',
    city: 'Torino',
    description: 'Un itinerario colto tra archivi storici, caffè letterari e musei piccoli ma memorabili.',
    price: '€12',
    duration: '3h',
    stops: '6 tappe'
  },
  Romantica: {
    title: 'Roma romantica al tramonto',
    city: 'Roma',
    description: 'Un percorso morbido tra viste panoramiche, scorci iconici e tappe perfette per una serata romantica.',
    price: '€9',
    duration: '2h 30min',
    stops: '5 tappe'
  },
  Energica: {
    title: 'Napoli coastal mood',
    city: 'Napoli',
    description: 'Mare, street food e viste luminose per trasformare l\'energia in una giornata viva.',
    price: '€14',
    duration: '4h',
    stops: '6 tappe'
  },
  Sola: {
    title: 'Giardini segreti senza fretta',
    city: 'Roma',
    description: 'Una sequenza di cortili verdi, terrazze silenziose e pause lente per respirare meglio.',
    price: '€8',
    duration: '2h',
    stops: '4 tappe'
  },
  Sovraccarica: {
    title: 'Quiet luxury sotto voce',
    city: 'Milano',
    description: 'Tappe ordinate, belle e poco rumorose per alleggerire la giornata senza rinunciare alla città.',
    price: '€12',
    duration: '2h',
    stops: '4 tappe'
  },
  'In cerca di socialità': {
    title: 'Aperitivo community sui Navigli',
    city: 'Milano',
    description: 'Posti conviviali e facili da amare, pensati per incontrare persone e cambiare ritmo.',
    price: '€11',
    duration: '2h 45min',
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
    description: 'Una luce dorata sopra la città, perfetta quando vuoi sentirti dentro un film.',
    user: '@roma_vibes',
    avatar: 'RV',
    isAI: false,
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
    isAI: false,
    img: image('photo-1521587760476-6c12a4b040da')
  },
  {
    title: 'Villa Borghese',
    city: 'Roma',
    mood: 'Sola',
    vibe: 'Natura selvaggia',
    description: 'Un giro lento quando hai bisogno di verde, aria e cieli larghi.',
    user: '@cafehunter',
    avatar: 'CH',
    isAI: false,
    img: image('photo-1500530855697-b586d89ba3ee')
  },
  {
    title: 'Brera nascosta',
    city: 'Milano',
    mood: 'Curiosa',
    vibe: 'City creative',
    description: 'Cortili, gallerie e dettagli eleganti per accendere idee nuove.',
    user: '@quietmilano',
    avatar: 'QM',
    isAI: false,
    img: image('photo-1513581166391-887a96ddeafd')
  },
  {
    title: 'Caffè vintage sui Navigli',
    city: 'Milano',
    mood: 'In cerca di socialità',
    vibe: 'Vintage film',
    description: 'Tavolini piccoli, luce bassa e playlist morbide per restare un po\'.',
    user: '@cafehunter',
    avatar: 'CH',
    isAI: false,
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
    isAI: false,
    img: image('photo-1543429258-cc721d95d7ec')
  },
  {
    title: 'Torino dark academia',
    city: 'Torino',
    mood: 'Curiosa',
    vibe: 'Dark academia',
    description: 'Portici, librerie e caffè storici per una giornata dal fascino misterioso.',
    user: '@quietmilano',
    avatar: 'QM',
    isAI: false,
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
    isAI: false,
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
    isAI: false,
    img: image('photo-1533105079780-92b9be482077')
  },
  {
    title: 'Lungomare Nazario Sauro',
    city: 'Bari',
    mood: 'Sola',
    vibe: 'Coastal mood',
    description: 'Una passeggiata aperta e salata per rimettere ordine nei pensieri.',
    user: '@pugliavibes',
    avatar: 'PV',
    isAI: false,
    img: image('photo-1507525428034-b723cf961d3e')
  },
  {
    title: 'Teatro Petruzzelli',
    city: 'Bari',
    mood: 'Curiosa',
    vibe: 'Quiet luxury',
    description: 'Eleganza storica, velluto, facciate teatrali e una serata che sembra già speciale.',
    user: '@bariagenda',
    avatar: 'BA',
    isAI: false,
    img: image('photo-1518998053901-5348d3961a04')
  },
  {
    title: 'Mercato del pesce di Molo San Nicola',
    city: 'Bari',
    mood: 'Energica',
    vibe: 'City creative',
    description: 'Rumore buono, mare vicino e sapori locali per una mattina piena di vita.',
    user: '@localrituals',
    avatar: 'LR',
    isAI: false,
    img: image('photo-1504674900247-0877df9cc836')
  },
  {
    title: 'Pane e Pomodoro',
    city: 'Bari',
    mood: 'In cerca di socialità',
    vibe: 'Coastal mood',
    description: 'Una spiaggia facile, luminosa e spontanea per stare con amici senza pianificare troppo.',
    user: '@barimood',
    avatar: 'BM',
    isAI: false,
    img: image('photo-1500375592092-40eb2168fd21')
  },
  {
    title: 'Libreria Laterza',
    city: 'Bari',
    mood: 'Sola',
    vibe: 'Dark academia',
    description: 'Scaffali, carta, silenzio e una pausa intima quando fuori la città corre.',
    user: '@quietpuglia',
    avatar: 'QP',
    isAI: false,
    img: image('photo-1524995997946-a1c2e315a42f')
  },
  {
    title: 'Muraglia di Bari',
    city: 'Bari',
    mood: 'Annoiata',
    vibe: 'Dolce vita',
    description: 'Pietra chiara, mare laterale e prospettive perfette per foto, appunti e idee.',
    user: '@pugliavibes',
    avatar: 'PV',
    isAI: false,
    img: image('photo-1534447677768-be436bb09401')
  },
  {
    title: 'Spazio Murat',
    city: 'Bari',
    mood: 'Curiosa',
    vibe: 'City creative',
    description: 'Design, mostre e community creativa nel cuore di Bari nuova.',
    user: '@bariagenda',
    avatar: 'BA',
    isAI: false,
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
    isAI: false,
    img: image('photo-1510414842594-a61c69b5ae57')
  },
  {
    title: 'Caffè storico in centro',
    city: 'Bari',
    mood: 'Stressata',
    vibe: 'Minimalismo giapponese',
    description: 'Colazione lenta, tavolini chiari e una mattina da iniziare senza notifiche.',
    user: '@quietpuglia',
    avatar: 'QP',
    isAI: false,
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
    isAI: true,
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
  ['18 Giu', 'Roma', 'Cinema all\'aperto al tramonto', 'Dolce vita', '€12', '28 posti', image('photo-1500530855697-b586d89ba3ee', 900, 650)],
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
  ['Milano quiet luxury', '12 luoghi', '@quietmilano', 'Sola · Quiet luxury', image('photo-1513581166391-887a96ddeafd', 700, 460)],
  ['Bologna vintage film', '15 luoghi', '@cafehunter', 'In cerca di socialità · Vintage film', image('photo-1517248135467-4c7edcad34c4', 700, 460)],
  ['Firenze romantic ruins', '21 luoghi', '@hiddenflorence', 'Romantica · Romantic ruins', image('photo-1543429258-cc721d95d7ec', 700, 460)],
  ['Napoli coastal mood', '16 luoghi', '@dolcevita.notes', 'Energica · Coastal mood', image('photo-1533104816931-20fa691ff6ca', 700, 460)],
  ['Torino dark academia', '14 luoghi', '@quietmilano', 'Curiosa · Dark academia', image('photo-1490633874781-1c63cc424610', 700, 460)]
];

const extraEvents = [
  ['28 Giu', 'Bari', 'Sunset walk sulla Muraglia', 'Dolce vita', '€10', '24 posti', image('photo-1534447677768-be436bb09401', 900, 650)],
  ['04 Lug', 'Bari', 'Orecchiette ritual tour', 'City creative', '€16', '18 posti', image('photo-1504674900247-0877df9cc836', 900, 650)],
  ['11 Lug', 'Bari', 'Secret rooftop listening night', 'Neon nightlife', '€22', '30 posti', image('photo-1514525253161-7a46d19cd819', 900, 650)]
];

const extraRoutes = [
  ['Bari vecchia e mare morbido', 'Bari', '3h', '€11', '6 tappe', 'Romantica', 'Dolce vita', image('photo-1533105079780-92b9be482077', 900, 650)],
  ['Bari coastal reset', 'Bari', '2h', '€8', '4 tappe', 'Sola', 'Coastal mood', image('photo-1507525428034-b723cf961d3e', 900, 650)],
  ['Bari local rituals', 'Bari', '4h', '€15', '7 tappe', 'Energica', 'City creative', image('photo-1504674900247-0877df9cc836', 900, 650)]
];

const extraLists = [
  ['Bari coastal mood', '22 luoghi', '@barimood', 'Sola · Coastal mood', image('photo-1507525428034-b723cf961d3e', 700, 460)],
  ['Bari local rituals', '19 luoghi', '@localrituals', 'Energica · City creative', image('photo-1504674900247-0877df9cc836', 700, 460)]
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

/* ─── ONBOARDING MODAL ─────────────────────────────────────────── */

function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(0); // 0=welcome, 1=mood, 2=vibe
  const [mood, setMood] = useState(null);
  const [vibe, setVibe] = useState(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  function handleComplete() {
    if (!mood || !vibe || !privacyAccepted) return;
    onComplete(mood, vibe);
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        {step === 0 && (
          <div className="onboarding-welcome">
            <div className="onboarding-logo">
              <span className="brand-mark"><BalloonLogo /></span>
              <span className="onboarding-brand">MoodScape</span>
            </div>
            <h2>Scopri la città in base a come ti senti</h2>
            <p>Non cercare solo un posto. Scegli un mood e una vibe: MoodScape li trasforma in luoghi, percorsi e consigli autentici dalla community.</p>
            <div className="onboarding-how">
              <div><span className="step-num">1</span><span>Scegli il tuo <strong>mood</strong></span></div>
              <div><span className="step-num">2</span><span>Scegli la <strong>vibe</strong> estetica</span></div>
              <div><span className="step-num">3</span><span>Scopri luoghi e percorsi su misura</span></div>
            </div>
            <button className="primary-button" onClick={() => setStep(1)}>
              Inizia <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-step">
            <div className="onboarding-progress">
              <span className="progress-dot active" />
              <span className="progress-line" />
              <span className="progress-dot" />
            </div>
            <span className="section-kicker">Come ti senti?</span>
            <h2>Scegli il tuo mood</h2>
            <p>Dove vuoi andare dipende da come ti senti adesso.</p>
            <div className="onboarding-mood-grid">
              {moodOptions.map((m) => (
                <button
                  key={m}
                  className={`onboarding-mood-chip ${mood === m ? 'active' : ''}`}
                  onClick={() => setMood(m)}
                >
                  {moodIcon(m)}
                  <span>{m}</span>
                </button>
              ))}
            </div>
            <div className="onboarding-nav">
              <button className="ghost-button" onClick={() => setStep(0)}>Indietro</button>
              <button className="primary-button" disabled={!mood} onClick={() => setStep(2)}>
                Avanti <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <div className="onboarding-progress">
              <span className="progress-dot active" />
              <span className="progress-line active" />
              <span className="progress-dot active" />
            </div>
            <span className="section-kicker">Che atmosfera cerchi?</span>
            <h2>Scegli la tua vibe</h2>
            <p>L'estetica che vuoi vivere oggi.</p>
            <div className="onboarding-vibe-grid">
              {vibeOptions.map((v) => (
                <button
                  key={v}
                  className={`onboarding-vibe-chip ${vibe === v ? 'active' : ''}`}
                  onClick={() => setVibe(v)}
                >
                  <Sparkles size={15} />
                  {v}
                </button>
              ))}
            </div>

            <label className="privacy-check">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
              />
              <span>
                Ho letto la <a href="#privacy">privacy policy</a>. Le mie selezioni di mood vengono usate solo per personalizzare l'esperienza e non vengono cedute a terzi.
              </span>
            </label>

            <div className="onboarding-nav">
              <button className="ghost-button" onClick={() => setStep(1)}>Indietro</button>
              <button
                className="primary-button"
                disabled={!vibe || !privacyAccepted}
                onClick={handleComplete}
              >
                Entra in MoodScape <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────────────────────────── */

function App() {
  const [onboardingDone, setOnboardingDone] = useState(() => {
    try { return sessionStorage.getItem('ms_onboarded') === '1'; } catch { return false; }
  });
  const [selectedMood, setSelectedMood] = useState(() => {
    try { return sessionStorage.getItem('ms_mood') || 'Romantica'; } catch { return 'Romantica'; }
  });
  const [selectedVibe, setSelectedVibe] = useState(() => {
    try { return sessionStorage.getItem('ms_vibe') || 'Dolce vita'; } catch { return 'Dolce vita'; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Feed');
  const [saved, setSaved] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ city: 'Bari', budget: null, time: null, company: null, vibe: 'Coastal mood', mapVibe: null });

  const route = moodRoutes[selectedMood] || moodRoutes.Romantica;

  // Budget → max price map (rough heuristic on route price string)
  const budgetMax = { '€': 9, '€€': 15, '€€€': Infinity };

  const suggested = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const cityPool = filters.city === 'Tutte' ? places : places.filter((p) => p.city === filters.city);
    const ranked = cityPool.filter((p) => {
      const matchesMoodOrVibe = p.mood === selectedMood || p.vibe === selectedVibe || p.vibe === filters.vibe;
      const matchesQuery = !query || [p.title, p.city, p.mood, p.vibe, p.description].join(' ').toLowerCase().includes(query);
      return query ? matchesQuery : matchesMoodOrVibe;
    });
    const fallback = cityPool.filter((p) => !ranked.includes(p));
    const globalFallback = places.filter((p) => !ranked.includes(p) && !fallback.includes(p));
    return [...ranked, ...fallback, ...globalFallback].slice(0, 8);
  }, [selectedMood, selectedVibe, filters.city, filters.vibe, searchQuery]);

  // Routes filtered by budget and time
  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(([title, city, duration, budget, stops, mood, vibe]) => {
      if (filters.budget) {
        const price = parseInt(budget.replace('€', '').trim()) || 0;
        const max = budgetMax[filters.budget] || Infinity;
        if (price > max) return false;
      }
      if (filters.time) {
        const hrs = parseFloat(duration);
        const maxHrs = filters.time === '1h' ? 1 : filters.time === '2h' ? 2 : filters.time === '3h' ? 3 : 24;
        if (hrs > maxHrs) return false;
      }
      return true;
    });
  }, [filters.budget, filters.time]);

  const toggleSaved = (key) => setSaved((current) => ({ ...current, [key]: !current[key] }));

  function handleOnboardingComplete(mood, vibe) {
    setSelectedMood(mood);
    setSelectedVibe(vibe);
    setOnboardingDone(true);
    try {
      sessionStorage.setItem('ms_onboarded', '1');
      sessionStorage.setItem('ms_mood', mood);
      sessionStorage.setItem('ms_vibe', vibe);
    } catch {}
  }

  // Sync mood/vibe to session when changed mid-session
  function updateMood(mood) {
    setSelectedMood(mood);
    try { sessionStorage.setItem('ms_mood', mood); } catch {}
  }
  function updateVibe(vibe) {
    setSelectedVibe(vibe);
    try { sessionStorage.setItem('ms_vibe', vibe); } catch {}
  }

  return (
    <div>
      {!onboardingDone && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
      <main>
        <Hero
          selectedMood={selectedMood}
          setSelectedMood={updateMood}
          selectedVibe={selectedVibe}
          setSelectedVibe={updateVibe}
          route={route}
          suggested={suggested}
        />
        <DiscoveryBar
          selectedMood={selectedMood}
          setSelectedMood={updateMood}
          selectedVibe={selectedVibe}
          setSelectedVibe={updateVibe}
          filters={filters}
          setFilters={setFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultCount={suggested.length}
        />
        <CurrentMatch selectedMood={selectedMood} selectedVibe={selectedVibe} route={route} />
        <TabDock activeTab={activeTab} setActiveTab={setActiveTab} />
        <SuggestedPlaces places={suggested} saved={saved} toggleSaved={toggleSaved} />
        <Feed active={activeTab === 'Feed'} places={suggested} saved={saved} toggleSaved={toggleSaved} />
        <Community active={activeTab === 'Community'} />
        <Creators />
        <Events active={activeTab === 'Eventi'} saved={saved} toggleSaved={toggleSaved} />
        <Routes active={activeTab === 'Percorsi'} saved={saved} toggleSaved={toggleSaved} routes={filteredRoutes} />
        <MapSection active={activeTab === 'Mappa'} filters={filters} setFilters={setFilters} selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <PilotCity filters={filters} setFilters={setFilters} saved={saved} toggleSaved={toggleSaved} />
        <VibeLists active={activeTab === 'Vibe Lists'} saved={saved} toggleSaved={toggleSaved} selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <Moodboard active={activeTab === 'Moodboard'} saved={saved} toggleSaved={toggleSaved} selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <Profile selectedMood={selectedMood} selectedVibe={selectedVibe} saved={saved} />
        <Premium />
        <HowItWorks />
        <PrivacyNotice />
      </main>
      <Footer />
    </div>
  );
}

/* ─── HEADER ────────────────────────────────────────────────────── */

function Header({ mobileOpen, setMobileOpen }) {
  const nav = ['Home', 'Feed', 'Mappa', 'Vibe Lists', 'Moodboard', 'Percorsi', 'Premium', 'Profilo'];
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
  const nav = ['Home', 'Feed', 'Mappa', 'Vibe Lists', 'Moodboard', 'Percorsi', 'Premium', 'Profilo'];
  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      {nav.map((item) => (
        <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setOpen(false)}>{item}</a>
      ))}
      <a className="primary-button" href="#mood" onClick={() => setOpen(false)}>Scegli mood</a>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */

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
        {vibeOptions.map((vibe) => (
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
              <a href="#current-match">Perché è perfetta per te <ChevronRight size={14} /></a>
            </div>
          </div>
        </div>
        <div className="panel-route">
          <div className="route-map">
            {[1, 2, 3, 4, 5].map((n) => <span key={n} style={{ '--x': `${18 + n * 12}%`, '--y': `${22 + (n % 2) * 32}%` }}>{n}</span>)}
          </div>
          <ol>
            <li>Belvedere segreto</li>
            <li>Caffè con vista</li>
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

/* ─── MOOD ICON ─────────────────────────────────────────────────── */

function moodIcon(mood) {
  const map = {
    Stressata: <Wind size={16} />,
    Annoiata: <Moon size={16} />,
    Curiosa: <Search size={16} />,
    Romantica: <Heart size={16} />,
    Energica: <Zap size={16} />,
    Sola: <Leaf size={16} />,
    Sovraccarica: <Compass size={16} />,
    'In cerca di socialità': <Users size={16} />
  };
  return map[mood] || <Moon size={16} />;
}

/* ─── DISCOVERY BAR ─────────────────────────────────────────────── */

function DiscoveryBar({ selectedMood, setSelectedMood, selectedVibe, setSelectedVibe, filters, setFilters, searchQuery, setSearchQuery, resultCount }) {
  const cities = ['Bari', 'Roma', 'Milano', 'Firenze', 'Torino', 'Napoli', 'Tutte'];

  const handleVibe = (vibe) => {
    setSelectedVibe(vibe);
    setFilters((f) => ({ ...f, vibe }));
  };

  return (
    <section className="section discovery-hub" id="discovery">
      <div className="discovery-panel">
        <div className="discovery-heading">
          <div>
            <span className="section-kicker">Discovery studio</span>
            <h2>Trova esperienze senza perderti tra mille sezioni</h2>
          </div>
          <div className="result-summary">
            <strong>{resultCount}</strong>
            <span>risultati coerenti</span>
          </div>
        </div>

        <label className="search-field">
          <Search size={18} />
          <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cerca luogo, vibe o quartiere" />
        </label>

        <div className="control-grid">
          <div>
            <span>Città</span>
            <div className="filter-row">
              {cities.map((city) => <button key={city} className={filters.city === city ? 'active' : ''} onClick={() => setFilters({ ...filters, city })}>{city}</button>)}
            </div>
          </div>
          <div>
            <span>Mood</span>
            <div className="filter-row">
              {moodOptions.map((mood) => <button key={mood} className={selectedMood === mood ? 'active' : ''} onClick={() => setSelectedMood(mood)}>{moodIcon(mood)}{mood}</button>)}
            </div>
          </div>
          <div>
            <span>Vibe</span>
            <div className="filter-row">
              {vibeOptions.map((vibe) => <button key={vibe} className={selectedVibe === vibe ? 'active' : ''} onClick={() => handleVibe(vibe)}>{vibe}</button>)}
            </div>
          </div>
          <div>
            <span>Compagnia</span>
            <div className="filter-row">
              {['solo', 'coppia', 'amici', 'gruppo'].map((company) => <button key={company} className={filters.company === company ? 'active' : ''} onClick={() => setFilters({ ...filters, company })}>{company}</button>)}
            </div>
          </div>
          <div>
            <span>Budget</span>
            <div className="filter-row">
              {['€', '€€', '€€€'].map((b) => <button key={b} className={filters.budget === b ? 'active' : ''} onClick={() => setFilters({ ...filters, budget: b })}>{b}</button>)}
            </div>
          </div>
          <div>
            <span>Tempo disponibile</span>
            <div className="filter-row">
              {['1h', '2h', '3h', 'giornata'].map((t) => <button key={t} className={filters.time === t ? 'active' : ''} onClick={() => setFilters({ ...filters, time: t })}>{t}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CURRENT MATCH ─────────────────────────────────────────────── */

function CurrentMatch({ selectedMood, selectedVibe, route }) {
  return (
    <section className="section" id="current-match">
      <div className="match-card">
        <div>
          <span className="section-kicker">Match attuale</span>
          <h2>{selectedMood} · {selectedVibe}</h2>
          <p className="muted-label">Percorso consigliato · <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {route.city}</p>
          <h3>{route.title}</h3>
          <p>{route.description}</p>
        </div>
        <div className="match-meta">
          <Stat label="Prezzo" value={route.price} />
          <Stat label="Durata" value={route.duration} />
          <Stat label="Tappe" value={route.stops} />
          <div className="button-stack">
            <a className="primary-button" href="#percorsi">Vedi percorso completo</a>
            <a className="secondary-button" href="#luoghi">Vedi luoghi del match</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong></div>;
}

/* ─── TAB DOCK ──────────────────────────────────────────────────── */

function TabDock({ activeTab, setActiveTab }) {
  const tabs = ['Feed', 'Mappa', 'Vibe Lists', 'Moodboard', 'Percorsi', 'Community'];
  return (
    <section className="section tab-section">
      <div className="tab-dock">
        {tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tabIcon(tab)}{tab}</button>)}
      </div>
    </section>
  );
}

function tabIcon(tab) {
  const map = {
    Feed: <Camera size={17} />,
    Mappa: <MapPin size={17} />,
    'Vibe Lists': <Bookmark size={17} />,
    Moodboard: <Palette size={17} />,
    Percorsi: <Route size={17} />,
    Community: <Users size={17} />
  };
  return map[tab];
}

/* ─── PLACE CARD (con tag prominenti e badge AI/community) ──────── */

function ContentBadge({ isAI }) {
  if (isAI) {
    return (
      <span className="content-badge ai" title="Suggerito dall'AI">
        <Sparkles size={11} /> AI
      </span>
    );
  }
  return (
    <span className="content-badge community" title="Condiviso dalla community">
      <Users size={11} /> Community
    </span>
  );
}

function MoodVibeTags({ mood, vibe }) {
  return (
    <div className="mood-vibe-tags">
      <span className="tag-mood">{moodIcon(mood)}{mood}</span>
      <span className="tag-vibe"><Sparkles size={12} />{vibe}</span>
    </div>
  );
}

function PlaceCard({ place, saved, onSave }) {
  return (
    <article className="place-card">
      <img src={place.img} alt={place.title} />
      <button className={saved ? 'save-bubble saved' : 'save-bubble'} onClick={onSave} aria-label="Salva luogo">
        <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <ContentBadge isAI={place.isAI} />
      <div className="place-content">
        <MoodVibeTags mood={place.mood} vibe={place.vibe} />
        <h3>{place.title}</h3>
        <p className="place-city">{place.city}</p>
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

/* ─── SUGGESTED PLACES (con empty state) ───────────────────────── */

function SuggestedPlaces({ places, saved, toggleSaved }) {
  return (
    <section className="section" id="luoghi">
      <SectionIntro title="Posti autentici consigliati dalla community" text="Dal feed alla città: salva, esplora, vivi." />
      {places.length === 0 ? (
        <EmptyState
          icon={<MapPin size={32} />}
          title="Nessun luogo per questo mood"
          text="Sii il primo a suggerire un posto per questa combinazione di mood e vibe."
          action="Aggiungi un luogo"
        />
      ) : (
        <div className="suggested-grid">
          {places.map((place) => <PlaceCard key={place.title} place={place} saved={saved[place.title]} onSave={() => toggleSaved(place.title)} />)}
        </div>
      )}
    </section>
  );
}

/* ─── FEED ──────────────────────────────────────────────────────── */

function Feed({ active, places: feedPlaces, saved, toggleSaved }) {
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="feed">
      <SectionIntro title="Feed ispirazionale" text="Scopri luoghi, storie e micro-itinerari come in una moodboard viva della città." />
      {feedPlaces.length === 0 ? (
        <EmptyState
          icon={<Camera size={32} />}
          title="Il feed è vuoto"
          text="Non ci sono ancora contenuti per questa selezione. Inizia a contribuire!"
          action="Condividi un luogo"
        />
      ) : (
        <div className="masonry">
          {feedPlaces.map((place, index) => (
            <article className={`feed-card size-${(index % 3) + 1}`} key={place.title}>
              <img src={place.img} alt={place.title} />
              <button className={saved[`feed-${place.title}`] ? 'save-bubble saved' : 'save-bubble'} onClick={() => toggleSaved(`feed-${place.title}`)} aria-label="Salva dal feed">
                <Bookmark size={16} fill={saved[`feed-${place.title}`] ? 'currentColor' : 'none'} />
              </button>
              <ContentBadge isAI={place.isAI} />
              <div className="feed-overlay">
                <MoodVibeTags mood={place.mood} vibe={place.vibe} />
                <h3>{place.title}</h3>
                <p>{place.city}</p>
                <span>{place.description}</span>
                <div className="feed-actions"><strong>{place.user}</strong><Heart size={17} /><Bookmark size={17} /><Send size={17} /></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── COMMUNITY ─────────────────────────────────────────────────── */

function Community({ active }) {
  const profiles = [
    ['@roma_vibes', 'Liste pubbliche', '18 luoghi', '124 salvataggi', 'RV', <MapPin size={28} />],
    ['@quietmilano', 'Recensioni narrative', '25 luoghi', '89 salvataggi', 'QM', <Leaf size={28} />],
    ['@dolcevita.notes', 'Percorsi condivisi', '32 luoghi', '203 salvataggi', 'DN', <Sparkles size={28} />],
    ['@hiddenflorence', 'Moodboard personali', '39 luoghi', '156 salvataggi', 'HF', <Palette size={28} />],
    ['@cafehunter', 'Creator locali', '46 luoghi', '312 salvataggi', 'CH', <Camera size={28} />],
    ['@barimood', 'Bari pilot diary', '52 luoghi', '278 salvataggi', 'BM', <Route size={28} />]
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
          {profiles.map(([profile, label, count, saves, initials, icon]) => (
            <article className="community-card" key={profile}>
              <IconAvatar label={initials} size="large" icon={icon} />
              <h3>{profile}</h3>
              <p>{label}</p>
              <div className="profile-metrics">
                <span><MapPin size={12} />{count}</span>
                <span><Bookmark size={12} />{saves}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="community-social">
        <div className="story-rail">
          {profiles.map(([profile, , , , initials, icon]) => (
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
                <MoodVibeTags mood={place.mood} vibe={place.vibe} />
                <div className="post-actions"><Heart size={16} /><Bookmark size={16} /><Share2 size={16} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CREATORS ──────────────────────────────────────────────────── */

function Creators() {
  return (
    <section className="section" id="creator">
      <SectionIntro title="Creator locali da seguire" text="Persone che conoscono davvero la città e la raccontano per atmosfera." />
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

/* ─── EVENTS ────────────────────────────────────────────────────── */

function Events({ active, saved, toggleSaved }) {
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="eventi">
      <SectionIntro title="Eventi in base alla tua vibe" text="Esperienze prenotabili con mood, prezzo e disponibilità subito leggibili." />
      <div className="event-grid">
        {allEvents.map(([date, city, title, vibe, price, seats, img]) => (
          <article className="event-card" key={title}>
            <div className="event-media">
              <img src={img} alt={title} />
              <div className="date-box">{date}</div>
            </div>
            <div>
              <div className="event-tags">
                <span className="tag-vibe"><Sparkles size={12} />{vibe}</span>
              </div>
              <p>{city}</p>
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

/* ─── ROUTES ────────────────────────────────────────────────────── */

// Static stop sequences per route (PRD §6.2 Vibe Route: sequenza logica + tempi)
const routeStops = {
  'Roma romantica al tramonto': [
    { name: 'Giardino degli Aranci', time: '18:00', duration: '30min' },
    { name: 'Ponte Sisto al tramonto', time: '18:45', duration: '20min' },
    { name: 'Campo de\' Fiori', time: '19:15', duration: '40min' },
    { name: 'Trastevere serale', time: '20:00', duration: '45min' },
    { name: 'Terrazza Gianicolo', time: '20:50', duration: '25min' }
  ],
  'Torino dark academia': [
    { name: 'Caffè Fiorio storico', time: '09:30', duration: '30min' },
    { name: 'Biblioteca Nazionale', time: '10:15', duration: '60min' },
    { name: 'Museo Egizio', time: '11:30', duration: '90min' },
    { name: 'Galleria Subalpina', time: '13:30', duration: '30min' },
    { name: 'Libreria Luxemburg', time: '14:15', duration: '45min' },
    { name: 'Portici di via Po al crepuscolo', time: '15:15', duration: '30min' }
  ]
};

function RouteDetail({ route: routeArr, onClose }) {
  const [title, city, duration, budget, stops, mood, vibe, img] = routeArr;
  const sequence = routeStops[title] || null;
  return (
    <div className="route-detail-overlay" onClick={onClose}>
      <div className="route-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="route-detail-close" onClick={onClose}><X size={20} /></button>
        <img src={img} alt={title} />
        <div className="route-detail-body">
          <MoodVibeTags mood={mood} vibe={vibe} />
          <h2>{title}</h2>
          <div className="route-detail-meta">
            <span><MapPin size={14} />{city}</span>
            <span><Clock size={14} />{duration}</span>
            <span><Route size={14} />{stops}</span>
            <span>{budget}</span>
          </div>
          {sequence ? (
            <>
              <p className="route-detail-label">Sequenza tappe</p>
              <ol className="route-stop-list">
                {sequence.map((stop, i) => (
                  <li key={i} className="route-stop-item">
                    <span className="stop-num">{i + 1}</span>
                    <div className="stop-info">
                      <strong>{stop.name}</strong>
                      <span>{stop.time} · {stop.duration}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
              Sequenza dettagliata disponibile dopo l'acquisto.
            </p>
          )}
          <div className="route-detail-actions">
            <button className="secondary-button">Salva percorso</button>
            <button className="primary-button">Acquista · {budget}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Routes({ active, saved, toggleSaved, routes }) {
  const [detailRoute, setDetailRoute] = useState(null);
  const displayRoutes = routes && routes.length > 0 ? routes : allRoutes;
  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="percorsi">
      <SectionIntro title="Percorsi già pronti per il tuo mood" text="Itinerari con sequenza di tappe, tempi stimati e prezzo. Clicca su un percorso per vedere le tappe." />
      {displayRoutes.length === 0 ? (
        <EmptyState
          icon={<Route size={32} />}
          title="Nessun percorso per questi filtri"
          text="Prova ad allargare budget o tempo disponibile."
          action={null}
        />
      ) : (
        <div className="route-grid">
          {displayRoutes.map((routeArr) => {
            const [title, city, duration, budget, stops, mood, vibe, img] = routeArr;
            return (
              <article className="route-card" key={title} style={{ cursor: 'pointer' }} onClick={() => setDetailRoute(routeArr)}>
                <img src={img} alt={title} />
                <div>
                  <MoodVibeTags mood={mood} vibe={vibe} />
                  <h3>{title}</h3>
                  <p>{city} · {duration} · {stops} · {budget}</p>
                  <div className="dual-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="secondary-button tiny" onClick={() => toggleSaved(`route-${title}`)}>{saved[`route-${title}`] ? 'Salvato' : 'Salva percorso'}</button>
                    <button className="primary-button tiny" onClick={() => setDetailRoute(routeArr)}>Vedi tappe</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {detailRoute && <RouteDetail route={detailRoute} onClose={() => setDetailRoute(null)} />}
    </section>
  );
}

/* ─── MAP SECTION (con toggle vibe a livelli) ───────────────────── */

function MapSection({ active, filters, setFilters, selectedMood, selectedVibe }) {
  const selectedCity = filters.city || 'Bari';
  const map = cityMaps[selectedCity] || cityMaps.Bari;

  // Toggle vibe layer: filtra i pin per vibe
  const activeMapVibe = filters.mapVibe;
  const visiblePins = places
    .filter((place) => place.city === selectedCity)
    .filter((place) => !activeMapVibe || place.vibe === activeMapVibe)
    .slice(0, 6);

  return (
    <section className={`section map-section ${active ? 'section-highlight' : ''}`} id="mappa">
      <div className="split map-split">
        <div>
          <SectionIntro title="Esplora la città per atmosfera" text="Non cercare solo ristoranti, bar o musei. Scopri zone e luoghi in base all'esperienza che vuoi vivere." />

          {/* Filtro città */}
          <div className="filter-block">
            <div>
              <span className="filter-label">Città</span>
              <div className="filter-row">
                {Object.keys(cityMaps).map((city) => (
                  <button key={city} className={filters.city === city ? 'active' : ''} onClick={() => setFilters({ ...filters, city, mapVibe: null })}>{city}</button>
                ))}
              </div>
            </div>

            {/* PRD §6.2 — Toggle a livelli per vibe sulla mappa */}
            <div style={{ marginTop: '1rem' }}>
              <span className="filter-label">Filtra mappa per vibe</span>
              <div className="filter-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <button
                  className={!activeMapVibe ? 'active' : ''}
                  onClick={() => setFilters({ ...filters, mapVibe: null })}
                >
                  Tutte le vibe
                </button>
                {vibeOptions.map((vibe) => (
                  <button
                    key={vibe}
                    className={activeMapVibe === vibe ? 'active' : ''}
                    onClick={() => setFilters({ ...filters, mapVibe: activeMapVibe === vibe ? null : vibe })}
                  >
                    <Sparkles size={12} />{vibe}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '0.8rem' }}>
              <span className="filter-label">Mood · Vibe attivi</span>
              <div className="filter-row">
                <button className="active">{selectedMood}</button>
                <button className="active">{selectedVibe}</button>
              </div>
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
            <span>{selectedMood} · {activeMapVibe || selectedVibe}</span>
            {visiblePins.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Nessun luogo per questa vibe. Cambia filtro o aggiungine uno!</p>
            ) : (
              <div className="map-place-list">
                {visiblePins.map((place) => (
                  <p key={place.title}>
                    <MapPin size={13} />
                    {place.title}
                    <span className="map-pin-vibe">{place.vibe}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PILOT CITY ────────────────────────────────────────────────── */

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
          <span className="section-kicker">Città pilota</span>
          <h2>Bari, scoperta per mood</h2>
          <p>Bari diventa il primo laboratorio MoodScape: mare, vicoli, rituali locali, eventi piccoli e percorsi acquistabili in base a tempo, budget, compagnia, estetica e vibe.</p>
        </div>
        <div className="pilot-filter-card">
          <span>Filtro demo Bari</span>
          <div className="filter-row">
            {['Coastal mood', 'Dolce vita', 'City creative', 'Dolce vita', 'Dark academia', 'City creative'].filter((v, i, a) => a.indexOf(v) === i).map((vibe) => (
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
                <MoodVibeTags mood={place.mood} vibe={place.vibe} />
                <h3>{place.title}</h3>
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
              <span className="tag-vibe" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', marginBottom: '4px' }}><Sparkles size={11} />{vibe}</span>
              <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>{date} · {city}</span>
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
              <MoodVibeTags mood={mood} vibe={vibe} />
              <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>{city} · {duration} · {stops}</span>
              <h3>{title}</h3>
              <p>{budget}</p>
              <button className="secondary-button tiny">Acquista percorso</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── VIBE LISTS (con empty state e filtro per mood/vibe) ───────── */

function VibeLists({ active, saved, toggleSaved, selectedMood, selectedVibe }) {
  const [activeFilter, setActiveFilter] = useState('Tutte');
  const filtered = activeFilter === 'Tutte'
    ? allLists
    : allLists.filter(([, , , meta]) => meta.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className={`section ${active ? 'section-highlight' : ''}`} id="vibe-lists">
      <SectionIntro title="Liste create dalla community" text="Raccolte salvabili per quando vuoi partire da un'atmosfera, non da un indirizzo." />
      <div className="filter-row" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className={activeFilter === 'Tutte' ? 'active' : ''} onClick={() => setActiveFilter('Tutte')}>Tutte</button>
        {vibeOptions.map((v) => (
          <button key={v} className={activeFilter === v ? 'active' : ''} onClick={() => setActiveFilter(v)}>
            {v}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={32} />}
          title="Nessuna lista per questa vibe"
          text="Sii il primo a creare una lista per questa atmosfera."
          action="Crea una Vibe List"
        />
      ) : (
        <div className="list-grid">
          {filtered.map(([title, count, creator, vibe, img]) => (
            <article className="list-card" key={title}>
              <img className="list-photo" src={img} alt={title} />
              <div><Sparkles size={22} /><h3>{title}</h3></div>
              <p>{count} · {creator}</p>
              <span>{vibe}</span>
              <button className="secondary-button tiny" onClick={() => toggleSaved(`list-${title}`)}>{saved[`list-${title}`] ? 'Lista salvata' : 'Salva lista'}</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── MOODBOARD (organizzata per vibe, con privacy toggle) ─────── */

function Moodboard({ active, saved, toggleSaved, selectedMood, selectedVibe }) {
  const [privacy, setPrivacy] = useState({}); // { key: 'private' | 'public' }
  const boards = [
    { key: 'Dolce vita', vibe: 'Dolce vita', mood: 'Romantica', count: 12 },
    { key: 'Dark academia', vibe: 'Dark academia', mood: 'Curiosa', count: 8 },
    { key: 'Coastal mood', vibe: 'Coastal mood', mood: 'Sola', count: 15 },
    { key: 'Quiet luxury', vibe: 'Quiet luxury', mood: 'Sovraccarica', count: 6 },
  ];

  const togglePrivacy = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: prev[key] === 'private' ? 'public' : 'private' }));
  };

  return (
    <section className={`section moodboard ${active ? 'section-highlight' : ''}`} id="moodboard">
      <SectionIntro title="La tua Moodboard" text="Trasforma l'ispirazione in esperienza: salva ciò che ti chiama e ritrovalo quando vuoi uscire." />
      <div className="board-grid">
        {boards.map(({ key, vibe, mood, count }, index) => {
          const isPrivate = privacy[key] !== 'public';
          const boardPlaces = places.filter((p) => p.vibe === vibe).slice(0, 4);
          const displayPlaces = boardPlaces.length ? boardPlaces : places.slice(index, index + 4);
          return (
            <article className="board-card" key={key}>
              <div className="board-collage">
                {displayPlaces.map((place) => <img key={place.title} src={place.img} alt="" />)}
              </div>
              <div>
                <MoodVibeTags mood={mood} vibe={vibe} />
                <h3>{vibe}</h3>
                <p>{count} elementi salvati</p>
                <div className="board-actions">
                  <button
                    className="privacy-toggle"
                    onClick={() => togglePrivacy(key)}
                    title={isPrivate ? 'Privata — clicca per rendere pubblica' : 'Pubblica — clicca per rendere privata'}
                  >
                    {isPrivate ? <Lock size={14} /> : <Eye size={14} />}
                    {isPrivate ? 'Privata' : 'Pubblica'}
                  </button>
                  <button className={saved[`board-${key}`] ? 'primary-button tiny' : 'secondary-button tiny'} onClick={() => toggleSaved(`board-${key}`)}>
                    {saved[`board-${key}`] ? <Check size={14} /> : <Bookmark size={14} />} {saved[`board-${key}`] ? 'Salvata' : 'Salva'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── PROFILE (con metriche engagement) ────────────────────────── */

function Profile({ selectedMood, selectedVibe, saved }) {
  const savedCount = Object.values(saved).filter(Boolean).length;
  return (
    <section className="section profile-section" id="profilo">
      <div className="profile-card">
        <div className="profile-head">
          <IconAvatar label="V" size="xxl" icon={<UserRound size={34} />} />
          <div>
            <h2>Profilo · Mood Diary</h2>
            <p>Il tuo Mood Diary raccoglie luoghi, percorsi e vibe che raccontano come vivi la città.</p>
          </div>
        </div>
        <div className="profile-stats">
          <Stat label="Mood più scelto" value={selectedMood} />
          <Stat label="Vibe preferita" value={selectedVibe} />
          <Stat label="Luoghi salvati" value={String(savedCount || 0)} />
          <Stat label="Percorsi acquistati" value="4" />
          <Stat label="Salvataggi ricevuti" value="312" />
          <Stat label="Condivisioni" value="87" />
        </div>
      </div>
    </section>
  );
}

/* ─── PREMIUM ───────────────────────────────────────────────────── */

function Premium() {
  const free = [
    'accesso Vibe Feed',
    'esplorazione Vibe Map',
    'fino a 5 Vibe Lists',
    'Vibe Route base',
    'Moodboard base',
    'filtri standard'
  ];
  const premium = [
    'Vibe Lists illimitate',
    'Vibe Route con AI',
    'Moodboard avanzata',
    'filtri estetici granulari',
    'suggerimenti AI personalizzati',
    'salvataggio offline',
    'raccolte curate dalla community',
    'layer tematici sulla mappa'
  ];
  return (
    <section className="section premium" id="premium">
      <SectionIntro title="MoodScape Premium" text="Più accesso, più ispirazione, più te. Sblocca una scoperta urbana ancora più personale." />
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

/* ─── HOW IT WORKS ──────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    ['Seleziona', 'Scegli mood, vibe estetica, tempo disponibile, budget e compagnia.', <Compass size={22} />],
    ['Scopri', 'Feed, mappa e liste filtrate per la tua combinazione di mood e vibe.', <Sparkles size={22} />],
    ['Esplora', 'Luoghi reali consigliati dalla community, non dalla pubblicità.', <MapPin size={22} />],
    ['Vivi', 'Salva luoghi, costruisci percorsi e condividi le tue esperienze.', <Navigation size={22} />]
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

/* ─── PRIVACY NOTICE (PRD §10) ──────────────────────────────────── */

function PrivacyNotice() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="section" id="privacy">
      <div className="privacy-notice">
        <div className="privacy-header">
          <ShieldCheck size={22} style={{ color: 'var(--teal)', flexShrink: 0 }} />
          <div>
            <h3>Come usiamo i tuoi dati di mood</h3>
            <p>MoodScape usa le tue selezioni di mood e vibe <strong>solo per personalizzare la tua esperienza</strong>. Non vengono ceduti a terzi, non vengono usati per pubblicità e non diagnosticano stati emotivi.</p>
          </div>
          <button className="ghost-button" onClick={() => setExpanded(!expanded)} style={{ flexShrink: 0 }}>
            {expanded ? 'Meno' : 'Dettagli'}
          </button>
        </div>
        {expanded && (
          <div className="privacy-detail">
            <ul>
              <li><Check size={14} /> Le selezioni di mood vengono salvate solo per migliorare i suggerimenti.</li>
              <li><Check size={14} /> Puoi esportare e cancellare i tuoi dati in qualsiasi momento (GDPR art. 17).</li>
              <li><Check size={14} /> MoodScape non diagnostica stati emotivi e non offre supporto psicologico.</li>
              <li><Check size={14} /> I luoghi consigliati dalla community non sono a pagamento — il ranking è basato sull'engagement.</li>
              <li><Check size={14} /> I contenuti generati dall'AI sono sempre chiaramente indicati con il badge "AI".</li>
            </ul>
            <div className="privacy-actions">
              <button className="secondary-button">Esporta i miei dati</button>
              <button className="ghost-button">Cancella account</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── EMPTY STATE ───────────────────────────────────────────────── */

function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && <button className="primary-button">{action}</button>}
    </div>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */

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
        <a href="#mappa">Mappa</a>
        <a href="#vibe-lists">Vibe Lists</a>
        <a href="#percorsi">Percorsi</a>
        <a href="#moodboard">Moodboard</a>
        <a href="#privacy">Privacy</a>
      </div>
      <form className="newsletter">
        <label htmlFor="email">Newsletter</label>
        <div><input id="email" placeholder="La tua email" /><button type="button"><ChevronRight size={18} /></button></div>
      </form>
      <div className="social"><Camera /><MessageCircle /><Share2 /></div>
    </footer>
  );
}

/* ─── SHARED COMPONENTS ─────────────────────────────────────────── */

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
