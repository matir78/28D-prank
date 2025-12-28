import React, { useState } from 'react';
import { UserEntry } from '../types';

interface RaffleFormProps {
  onSubmit: (data: UserEntry) => void;
  isSubmitting: boolean;
  isLocked: boolean;
}

export const RaffleForm: React.FC<RaffleFormProps> = ({ onSubmit, isSubmitting, isLocked }) => {
  const [formData, setFormData] = useState<UserEntry>({
    fullName: '',
    email: '',
    address: '',
    reason: '',
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isDisabled = isSubmitting || isLocked;

  return (
    <div className={`bg-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md mx-auto transition-opacity duration-500 ${isLocked ? 'opacity-75 grayscale-[0.5]' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold mb-6 text-center text-neon-blue">
        Formulario de Inscripción
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset disabled={isDisabled} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
            <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-deep-space border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors disabled:cursor-not-allowed disabled:bg-gray-900"
                placeholder="Juan Pérez"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
            <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-deep-space border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors disabled:cursor-not-allowed disabled:bg-gray-900"
                placeholder="juan@ejemplo.com"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Dirección de Envío</label>
            <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-deep-space border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors disabled:cursor-not-allowed disabled:bg-gray-900"
                placeholder="Calle Falsa 123"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">¿Por qué mereces el NeoGenesis?</label>
            <textarea
                required
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                className="w-full bg-deep-space border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors disabled:cursor-not-allowed disabled:bg-gray-900"
                placeholder="Porque necesito ayuda con..."
            />
            </div>

            <div className="flex items-start">
            <input
                required
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
                className="mt-1 mr-2 cursor-pointer disabled:cursor-not-allowed"
            />
            <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer">
                Acepto transferir mis derechos de imagen a NeoGenesis Corp y entiendo que el robot puede desarrollar conciencia propia.
            </label>
            </div>
        </fieldset>

        <button
          type="submit"
          disabled={isDisabled || !formData.agreeToTerms}
          className={`w-full py-3 px-6 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 
            ${isDisabled 
              ? 'bg-gray-800 border border-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] text-white'
            }`}
        >
          {isLocked 
            ? 'Protocolo de Espera Activo' 
            : isSubmitting 
                ? 'Procesando...' 
                : 'Participar Ahora'
          }
        </button>
      </form>
    </div>
  );
};