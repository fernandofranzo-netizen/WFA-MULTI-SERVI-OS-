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
import { OfficialWhatsAppLogo } from './OfficialSocialIcons';
import { ServiceCategory } from '../types';

interface HeroProps {
  onOpenLeadModal: (service?: string) => void;
  onSelectService: (serviceId: ServiceCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectService }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá Wellington! Acessei o site da WFA Metais e gostaria de solicitar um orçamento para um serviço de serralheria.');
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
  };

  const serviceChips = [
    { id: 'solda' as ServiceCategory, label: 'Grades', icon: Flame, color: 'text-amber-400 bg-amber-500/10 border-amber-500/40 hover:border-amber-400' },
    { id: 'solda' as ServiceCategory, label: 'Portões', icon: Flame, color: 'text-orange-400 bg-orange-500/10 border-orange-500/40 hover:border-orange-400' },
    { id: 'mecanica' as ServiceCategory, label: 'Estruturas Metálicas', icon: Wrench, color: 'text-blue-400 bg-blue-500/10 border-blue-500/40 hover:border-blue-400' },
    { id: 'solda' as ServiceCategory, label: 'Soldas em Geral', icon: Flame, color: 'text-amber-300 bg-amber-500/10 border-amber-500/40 hover:border-amber-300' },
    { id: 'alvenaria' as ServiceCategory, label: 'Serviços Personalizados', icon: Hammer, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40 hover:border-emerald-400' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-slate-950 via-[#0a1120] to-slate-950">
      {/* Background glow with WFA colors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-600/10 via-amber-500/10 to-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill badge with WFA Metais branding */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm text-slate-300 shadow-lg shadow-amber-950/40">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-bold text-amber-400">WFA METAIS</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Serralheria em Geral & Estruturas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Serralheria de Alta Resistência com a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-300">
                Qualidade e Precisão{' '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 underline decoration-blue-500/60 decoration-wavy">
                WFA METAIS
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-base sm:text-xl text-yellow-400 font-bold tracking-wide">
                "Qualidade, Resistência e Compromisso com você!"
              </p>
              <span className="hidden sm:inline text-slate-600">•</span>
              <p className="text-base sm:text-lg text-yellow-300 font-bold italic">
                "Seu projeto em boas mãos!"
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Fabricação e manutenção especializada em <strong>Grades</strong>, <strong>Portões</strong>, <strong>Estruturas Metálicas</strong>, <strong>Soldas em Geral</strong> e <strong>Serviços Personalizados</strong> com acabamento fino, durabilidade e cumprimento rigoroso de prazos sob a responsabilidade de <strong>Wellington Silva Nascimento</strong>.
            </p>

            {/* Service quick chips mirroring the flyer */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-center lg:justify-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Especialidades WFA METAIS:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {serviceChips.map((chip, idx) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={idx}
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

            {/* CTAs with WFA official WhatsApp badge style */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={openWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-base font-black bg-slate-950 hover:bg-slate-900 text-white border-2 border-yellow-400 hover:border-yellow-300 shadow-xl shadow-yellow-500/10 transition-all hover:-translate-y-0.5 cursor-pointer group gap-3"
              >
                <div className="bg-emerald-500/20 p-1.5 rounded-full">
                  <OfficialWhatsAppLogo className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <span>
                  Solicitar Orçamento: <strong className="text-yellow-400 font-mono tracking-wider ml-1">84 99673-7378</strong>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card with Official Wellington Silva Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-slate-900/80 p-3 sm:p-4 border-2 border-yellow-500/40 shadow-2xl shadow-blue-950/50 backdrop-blur-xl group hover:border-yellow-400 transition-all duration-500">
              
              {/* Floating Official Company Logo Badge */}
              <div className="absolute -top-3.5 -right-2 z-20 bg-slate-950/95 border-2 border-yellow-500/70 rounded-2xl p-1.5 shadow-2xl shadow-black/80 flex items-center justify-center px-3 hover:scale-105 transition-transform">
                <img
                  src="/assets/aistudio/image_dc0dbf4b.png"
                  alt="Logotipo Oficial WFA METAIS"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>

              {/* Official Photo of Wellington Silva Nascimento in uniform */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square bg-slate-950 border border-slate-800">
                <img
                  src="/assets/aistudio/image_3794ec9d_1efb893f.jpg"
                  alt="Wellington Silva Nascimento - WFA Metais Serralheria"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-yellow-500/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-xs font-black text-white tracking-wider block">
                        WELLINGTON SILVA NASCIMENTO
                      </span>
                      <span className="text-[10px] text-yellow-400 font-bold uppercase">
                        WFA Metais • Serralheiro Responsável
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="mt-3 bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm shadow">
                    5.0
                  </div>
                  <div>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Mais de 180 portões e grades entregues
                    </p>
                  </div>
                </div>

                <button
                  onClick={openWhatsApp}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Chamar no WhatsApp &rarr;
                </button>
              </div>

              {/* Quick stats grid */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400">Resistência</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-amber-400">Garantia</div>
                  <div className="text-[11px] text-slate-400">Por Escrito</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg py-2">
                  <div className="text-lg font-black text-emerald-400">Entrega</div>
                  <div className="text-[11px] text-slate-400">No Prazo</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
