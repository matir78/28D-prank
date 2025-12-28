import React, { useEffect, useState } from 'react';

interface PrankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrankModal: React.FC<PrankModalProps> = ({ isOpen, onClose }) => {
  const [particles, setParticles] = useState<{ id: number; left: string; color: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: ['#ff0000', '#00f3ff', '#ffff00', '#ff00ff', '#00ff00'][Math.floor(Math.random() * 5)],
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 3}s`
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-[-20px] w-2 h-6 rounded-full opacity-70 animate-fall"
            style={{
              left: p.left,
              backgroundColor: p.color,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      <div className="relative bg-surface border-4 border-white/10 p-1 md:p-2 rounded-[3rem] max-w-lg w-full overflow-hidden shadow-[0_0_80px_rgba(0,243,255,0.2)]">
        <div className="bg-white text-black p-4 xs:p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-center relative overflow-hidden">

          {/* Glitch Overlay Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          <div className="relative z-10">
            <div className="text-5xl md:text-7xl mb-4 md:mb-6 animate-bounce-slow inline-block">🤡</div>

            <h2 className="text-4xl md:text-6xl font-black mb-2 md:mb-4 uppercase tracking-tighter italic text-red-600 animate-pulse">
              ¡INOCENTE!
            </h2>

            <div className="h-1 w-24 bg-red-600 mx-auto mb-4 md:mb-6"></div>

            <p className="text-xl md:text-2xl font-bold mb-2 text-gray-900 leading-tight">
              ¡Inocente palomita que te dejaste engañar!
            </p>

            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 italic">
              "La tecnología NeoGenesis es tan avanzada que aún no existe en esta realidad."
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="bg-red-50 border-2 border-dashed border-red-200 p-3 md:p-4 rounded-xl md:rounded-2xl">
                <p className="text-xs md:text-sm font-mono text-red-800 uppercase tracking-widest font-bold mb-1">
                  Estado del Sorteo:
                </p>
                <p className="text-red-600 font-bold text-sm md:text-base">CANCELADO POR EXCESO DE HUMOR</p>
              </div>

              <div className="text-xs text-gray-400 font-medium px-2 md:px-4">
                No te preocupes, tus datos no han sido procesados por ninguna IA rebelde.
                Todo es parte de la tradición del Día de los Inocentes.
                <span className="block mt-1 font-bold text-gray-500">¡Gracias por jugar con nosotros!</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 md:mt-10 w-full bg-black text-white font-black py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl flex items-center justify-center gap-3 group"
            >
              <span className="text-sm md:text-base">VOLVER A LA REALIDAD</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-[0.3em]">
              NeoGenesis Corp & San José Hogar
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};