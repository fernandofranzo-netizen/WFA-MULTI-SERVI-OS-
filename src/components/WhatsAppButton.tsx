import React, { useState } from 'react';
import { X, Zap, Droplets, Flame, Hammer, Wrench, AlertTriangle, Calendar } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = (customMessage?: string) => {
    // Track click on backend analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'whatsapp_click' }),
    }).catch(() => {});

    const baseText = customMessage || 'Olá WFA MultiServiços! Acessei seu site e gostaria de agendar uma visita técnica.';
    const text = encodeURIComponent(baseText);
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 p-4 shadow-2xl animate-fade-in text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg overflow-hidden bg-slate-950 border border-slate-700">
                <img
                  src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                  alt="WFA"
                  className="w-full h-full object-contain"
                />
              </div>
              <strong className="text-white text-xs">WhatsApp WFA MultiServiços</strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-[11px]">
            Selecione para agendar visita técnica ou falar com a equipe WFA:
          </p>

          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleOpenWhatsApp('🚨 EMERGÊNCIA WFA: Preciso de atendimento urgente para reparo no meu imóvel.')}
              className="w-full text-left p-2 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/60 transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Emergência 24 Horas</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para Manutenção Elétrica.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Visita Técnica de Elétrica</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para Manutenção Hidráulica / Vazamento.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Visita Técnica de Hidráulica</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para Soldagem / Portão / Estrutura.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Visita Técnica de Solda</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para Alvenaria, Piso ou Reforma.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Hammer className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Visita Técnica de Alvenaria</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para Manutenção Mecânica de motor ou maquinário.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Visita Técnica de Mecânica</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Falar no WhatsApp"
        className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-2xl shadow-emerald-950/60 hover:scale-105 transition-all cursor-pointer group"
      >
        <WhatsAppIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
};
