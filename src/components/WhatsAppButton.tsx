import React, { useState } from 'react';
import { X, Zap, Droplets, Flame, Hammer, Wrench, AlertTriangle, Calendar } from 'lucide-react';
import { OfficialWhatsAppLogo } from './OfficialSocialIcons';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = (customMessage?: string) => {
    // Track click on backend analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'whatsapp_click' }),
    }).catch(() => {});

    const baseText = customMessage || 'Olá WFA Metais! Acessei seu site e gostaria de solicitar um orçamento.';
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
            <div className="flex items-center gap-2.5">
              <OfficialWhatsAppLogo className="w-8 h-8 shrink-0" />
              <div>
                <strong className="text-white text-xs block">WhatsApp Oficial</strong>
                <span className="text-[10px] text-emerald-400 font-semibold">(84) 99673-7378</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-[11px]">
            Selecione o serviço para solicitar seu orçamento diretamente no WhatsApp:
          </p>

          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleOpenWhatsApp('Olá WFA Metais! Gostaria de um orçamento para Grades e Portões.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer border border-slate-800"
            >
              <Hammer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Orçamento de Grades & Portões</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA Metais! Gostaria de um orçamento para Estruturas Metálicas.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer border border-slate-800"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Orçamento de Estruturas Metálicas</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA Metais! Gostaria de um orçamento para Soldas em Geral.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer border border-slate-800"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Soldas em Geral (MIG / TIG)</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA Metais! Gostaria de um orçamento para Serviços Personalizados em Serralheria.')}
              className="w-full text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer border border-slate-800"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Serviços Personalizados</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('Olá WFA Metais! Gostaria de falar com Wellington para tirar dúvidas ou fazer orçamento.')}
              className="w-full text-left p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <OfficialWhatsAppLogo className="w-4 h-4 shrink-0" />
              <span>Conversar no WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button: Only Official Logomark */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="WhatsApp Oficial: (84) 99673-7378"
        aria-label="Abrir WhatsApp Oficial"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all cursor-pointer group bg-transparent"
      >
        <OfficialWhatsAppLogo className="w-14 h-14 drop-shadow-xl group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
};
