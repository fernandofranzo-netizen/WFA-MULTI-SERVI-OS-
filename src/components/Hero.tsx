import React from 'react';
import { 
  Zap, 
  Wrench, 
  Droplets, 
  Flame, 
  Hammer, 
  Calendar, 
  Star
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ServiceCategory } from '../types';

interface HeroProps {
  onOpenLeadModal: (service?: string) => void;
  onSelectService: (serviceId: ServiceCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onSelectService }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá! Gostaria de agendar uma visita técnica com a equipe da WFA MultiServiços.');
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
  };

  const serviceChips = [
    { id: 'eletrica' as ServiceCategory, label: 'Elétrica', icon: Zap, color: 'text-amber-400 bg-amber-500/10 border-blue-500/40 hover:border-amber-400' },
    { id: 'mecanica' as ServiceCategory, label: 'Mecânica', icon: Wrench, color: 'text-blue-400 bg-blue-500/10 border-blue-500/40 hover:border-blue-400' },
    { id: 'alvenaria' as ServiceCategory, label: 'Alvenaria', icon: Hammer, color: 'text-orange-400 bg-orange-500/10 border-orange-500/40 hover:border-orange-400' },
    { id: 'hidraulica' as ServiceCategory, label: 'Hidráulica', icon: Droplets, color: 'text-cyan-400 bg-cyan-500/10 border-blue-500/40 hover:border-cyan-400' },
    { id: 'solda' as ServiceCategory, label: 'Soldagem', icon: Flame, color: 'text-amber-400 bg-amber-500/10 border-orange-500/40 hover:border-amber-400' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-slate-950 via-[#0a1120] to-slate-950">
      {/* Background glow with WFA colors: Royal Blue and Safety Orange */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-orange-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-600/10 via-orange-500/10 to-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill badge with WFA branding */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs sm:text-sm text-slate-300 shadow-lg shadow-blue-950/40">
              <span className="flex h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-bold text-orange-400">WFA MultiServiços</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Equipe Técnica Pronta para Atendimento</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Mão de Obra Especializada com a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Qualidade e Segurança{' '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 underline decoration-blue-500/60 decoration-wavy">
                WFA
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Soluções completas e confiáveis em <strong>Elétrica</strong>, <strong>Mecânica</strong>, <strong>Hidráulica</strong>, <strong>Solda</strong> e <strong>Alvenaria</strong> com garantia formal por escrito, ferramental de ponta e orçamentos sem custos surpresa.
            </p>

            {/* Service quick chips mirroring the logo emblems */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-center lg:justify-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                As 5 Especialidades WFA:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {serviceChips.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => onSelectService(chip.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all hover:scale-105 cursor-pointer shadow-sm ${chip.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={openWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 transition-all hover:-translate-y-0.5 cursor-pointer group"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Falar com a WFA no WhatsApp
              </button>

              <button
                onClick={() => onOpenLeadModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-xl shadow-orange-950/40 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Visita Técnica
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card with Official WFA Logo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-slate-900/80 p-3 sm:p-4 border-2 border-blue-500/30 shadow-2xl shadow-blue-950/50 backdrop-blur-xl group hover:border-orange-500/50 transition-all duration-500">
              
              {/* Official WFA Logo Card with Metallic Industrial Presentation */}
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-b from-slate-950 via-[#070d18] to-slate-950 p-4 flex flex-col items-center justify-center border border-slate-800">
                
                {/* Glowing gear backdrop effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-orange-500/10 to-transparent pointer-events-none" />

                <img
                  src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                  alt="Logotipo Oficial WFA MultiServiços"
                  className="w-4/5 h-4/5 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-white tracking-wider">
                      MARCA REGISTRADA WFA
                    </span>
                  </div>
                  <span className="text-[10px] text-orange-400 font-bold uppercase">
                    Manutenção Pro
                  </span>
                </div>
              </div>

              {/* Floating review card */}
              <div className="mt-3 bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow">
                    4.9
                  </div>
                  <div>
                    <div className="flex items-center text-orange-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Mais de 180 avaliações de clientes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal()}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 underline cursor-pointer"
                >
                  Agendar Visita Técnica &rarr;
                </button>
              </div>

              {/* Quick stats grid */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-white">10+</div>
                  <div className="text-[11px] text-slate-400">Anos de Prática</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-amber-400">1.800+</div>
                  <div className="text-[11px] text-slate-400">Obras Feitas</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400">Garantidos</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
