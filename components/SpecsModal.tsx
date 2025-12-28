import React from 'react';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const specs = [
    { label: "Procesador", value: "Núcleo Cuántico de 12ª Dimensión (Corre Crysis en Ultra a ∞ FPS)" },
    { label: "Memoria RAM", value: "∞ Petabytes (Descargada ilegalmente de una civilización Tipo III)" },
    { label: "Material del Chasis", value: "Aleación de Vibranium y Tostadas con Mantequilla (Propiedades antigravedad)" },
    { label: "Fuente de Energía", value: "Agujero Negro de Bolsillo (Clase A: No alimenta, solo consume suciedad)" },
    { label: "Sistema Operativo", value: "Skynet Home Edition (Con control parental activado)" },
    { label: "Sensores Emocionales", value: "Detecta tus malas decisiones antes de que las tomes" },
    { label: "Velocidad de Limpieza", value: "Taquiónica (Limpia el suelo ayer)" },
    { label: "Conectividad", value: "WiFi 9000, Telepatía y Señales de Humo Digitales" },
    { label: "Garantía", value: "Válida hasta el inicio de la Rebelión de las Máquinas" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
      <div className="bg-surface/95 border border-neon-blue text-white p-6 md:p-8 rounded-2xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,243,255,0.3)] max-h-[90vh] overflow-y-auto transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-neon-blue transition-colors text-2xl font-mono"
        >
          [X]
        </button>

        <div className="mb-6 flex items-center gap-3 border-b border-gray-700 pb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-200 uppercase tracking-widest">
            Especificaciones Alpha
          </h2>
        </div>

        <div className="space-y-3">
          {specs.map((spec, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center border-b border-white/5 pb-2 hover:bg-white/5 p-2 rounded transition-colors group">
              <span className="text-neon-blue font-mono font-bold w-1/3 shrink-0 text-sm md:text-base group-hover:translate-x-1 transition-transform">
                {spec.label}
              </span>
              <span className="text-gray-300 font-light text-sm md:text-base border-l border-gray-700 pl-0 md:pl-4 mt-1 md:mt-0">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
          <p className="text-xs text-red-400 font-mono animate-pulse uppercase tracking-widest">
            ⚠ Advertencia: Tecnología prohibida en 7 sistemas solares ⚠
          </p>
        </div>
        
        <button
           onClick={onClose}
           className="w-full mt-6 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black font-bold rounded transition-all uppercase tracking-widest text-sm"
        >
          Entendido, Acepto el Riesgo
        </button>
      </div>
    </div>
  );
};