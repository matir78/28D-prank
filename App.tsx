import React, { useState, useEffect } from 'react';
import { generateRobotPitch, generateFakeReview } from './services/geminiService';
import { RaffleForm } from './components/RaffleForm';
import { FeatureCard } from './components/FeatureCard';
import { PrankModal } from './components/PrankModal';
import { SpecsModal } from './components/SpecsModal';
import { Countdown } from './components/Countdown';
import { AppState, UserEntry } from './types';

// Icons using SVG directly to avoid extra dependencies
const BatteryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING_PITCH);
  const [pitch, setPitch] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isSorteoActive, setIsSorteoActive] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    const initData = async () => {
      const [pitchText, reviewText] = await Promise.all([
        generateRobotPitch(),
        generateFakeReview()
      ]);
      setPitch(pitchText);
      setReview(reviewText);
      setAppState(AppState.LANDING);
    };
    initData();

    // Check Date Logic
    const checkDate = () => {
      const now = new Date();
      // Allow testing by adding #test to URL
      if (window.location.hash === '#test') {
        setIsSorteoActive(true);
        return;
      }

      const currentYear = now.getFullYear();
      // JavaScript months are 0-indexed (11 is December)
      const isTodayInocentes = now.getDate() === 28 && now.getMonth() === 11;

      if (isTodayInocentes) {
        setIsSorteoActive(true);
      } else {
        setIsSorteoActive(false);
        // Calculate next activation date
        let nextEvent = new Date(currentYear, 11, 28, 0, 0, 0);
        if (now > nextEvent) {
          nextEvent = new Date(currentYear + 1, 11, 28, 0, 0, 0);
        }
        setTargetDate(nextEvent);
      }
    };

    checkDate();
    const interval = setInterval(checkDate, 60000); // Check every minute
    return () => clearInterval(interval);

  }, []);

  const handleFormSubmit = (data: UserEntry) => {
    setAppState(AppState.SUBMITTING);

    // Fake processing time to build suspense
    setTimeout(() => {
      setAppState(AppState.PRANK_REVEALED);
    }, 2500);
  };

  const handleReset = () => {
    setAppState(AppState.LANDING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-gray-200">
      <PrankModal
        isOpen={appState === AppState.PRANK_REVEALED}
        onClose={handleReset}
      />

      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-deep-space/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-blue rounded-full animate-pulse"></div>
              <span className="text-xl font-bold tracking-widest text-white">NEOGENESIS</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isSorteoActive ? 'text-neon-blue' : 'text-red-500'}`}>
                  {isSorteoActive ? 'Sorteo Activo' : 'Sorteo Inactivo'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-deep-space to-black -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">

            <div className="inline-flex flex-col md:flex-row items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-neon-blue/30 transition-colors">
              <span className="text-neon-blue font-bold tracking-widest text-sm">NEOGENESIS</span>
              <span className="text-gray-500 text-xs italic">en colaboración con</span>
              <span className="text-white font-bold tracking-widest text-sm">SAN JOSÉ HOGAR</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6 leading-tight">
              El Futuro <br />
              <span className="text-neon-blue">Es Tuyo.</span>
            </h1>

            {appState === AppState.LOADING_PITCH ? (
              <div className="h-20 w-full bg-gray-800/50 animate-pulse rounded-lg mb-8"></div>
            ) : (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-neon-blue pl-6 italic">
                "{pitch}"
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => document.getElementById('raffle-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-neon-blue text-black font-bold rounded-full hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Participar Ahora
              </button>
              <button
                onClick={() => setIsSpecsOpen(true)}
                className="px-8 py-4 border border-gray-600 rounded-full hover:border-white transition-colors"
              >
                Ver Especificaciones
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center">
            {/* Decorative glow */}
            <div className="absolute w-72 h-72 bg-neon-blue/20 rounded-full filter blur-[100px] animate-pulse"></div>
            <img
              src="/28d-prank.webp"
              alt="NeoGenesis Robot"
              className="relative rounded-3xl shadow-2xl border border-white/10 z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tecnología Más Allá de la Comprensión</h2>
            <p className="text-gray-400">Diseñado por ingenieros ex-NASA y artistas del Renacimiento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="IA Empática Cuántica"
              description="Anticipa tus necesidades emocionales antes de que tú mismo las sientas. Prepara café cuando estás triste."
              icon={<BrainIcon />}
            />
            <FeatureCard
              title="Energía Infinita"
              description="Batería de fusión fría miniaturizada. No necesita recarga durante 50 años."
              icon={<BatteryIcon />}
            />
            <FeatureCard
              title="Seguridad Biométrica"
              description="Solo responde a tu ADN. Literalmente indestructible por medios convencionales."
              icon={<ShieldIcon />}
            />
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-12 border-y border-white/5 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
          {appState === AppState.LOADING_PITCH ? (
            <div className="h-8 w-3/4 mx-auto bg-gray-800 animate-pulse rounded"></div>
          ) : (
            <blockquote className="text-2xl text-gray-300 font-light">
              "{review}"
            </blockquote>
          )}
          <p className="mt-4 text-neon-blue font-bold">- Ganador del Sorteo 2023</p>
        </div>
      </section>

      {/* Form Section */}
      <section id="raffle-form" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="mb-10 text-center w-full">
            <h2 className="text-4xl font-bold text-white mb-4">Únete a la Revolución</h2>

            {isSorteoActive ? (
              <p className="text-green-400 font-mono text-xl animate-pulse">
                ¡REGISTRO ABIERTO - ACCESO LIMITADO!
              </p>
            ) : (
              <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                <p className="text-cyan-400 font-mono tracking-[0.2em] mb-2 uppercase text-sm md:text-base">
                  Activación del Protocolo En:
                </p>
                <Countdown targetDate={targetDate} />
                <p className="text-red-400 text-xs mt-2 font-mono">
                  * Acceso restringido hasta la activación del protocolo
                </p>
              </div>
            )}
          </div>

          <div className="w-full relative">
            {appState === AppState.SUBMITTING && (
              <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neon-blue font-mono animate-pulse">Analizando compatibilidad biométrica...</p>
                <p className="text-xs text-gray-500 mt-2">Conectando con servidor cuántico...</p>
              </div>
            )}

            <RaffleForm
              onSubmit={handleFormSubmit}
              isSubmitting={appState === AppState.SUBMITTING}
              isLocked={!isSorteoActive}
            />
          </div>

          <p className="mt-8 text-xs text-gray-600 max-w-lg text-center">
            * Al participar, aceptas que NeoGenesis Corp no se hace responsable si el robot decide conquistar tu hogar. Sorteo válido solo en la Tierra y Marte.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-space py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 NeoGenesis Corporation. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;