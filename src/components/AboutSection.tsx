import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  FileSpreadsheet, 
  Wrench,
  ThumbsUp,
  Calendar
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AboutSectionProps {
  onOpenLeadModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLeadModal }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá WFA MultiServiços! Gostaria de agendar uma visita técnica para um serviço/reforma.');
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
  };

  return (
    <section id="sobre" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait, Logo & Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden bg-slate-950 border-2 border-blue-500/30 p-3 shadow-2xl shadow-blue-950/40">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Fernando Franzo - Fundador WFA MultiServiços"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* WFA Floating Logo Pill */}
                <div className="absolute top-3 right-3 w-16 h-16 rounded-2xl bg-slate-950/90 border-2 border-orange-500/80 p-1 shadow-xl flex items-center justify-center">
                  <img
                    src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                    alt="Logo WFA"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block px-2.5 py-0.5 rounded-lg bg-orange-500 text-slate-950 text-xs font-black uppercase mb-1">
                    Responsável Técnico & Fundador
                  </div>
                  <h3 className="text-xl font-black text-white">Fernando Franzo</h3>
                  <p className="text-xs text-orange-300 font-semibold">
                    WFA MultiServiços • 10+ Anos de Atuação
                  </p>
                </div>
              </div>

              {/* Badges bar */}
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <div className="font-black text-orange-400 text-base">10+ Anos</div>
                  <div className="text-[10px] text-slate-400">Na Construção & Indústria</div>
                </div>
                <div>
                  <div className="font-black text-blue-400 text-base">NR-10 & NR-12</div>
                  <div className="text-[10px] text-slate-400">Certificações e Segurança</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience story & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-orange-400" />
              Compromisso WFA MultiServiços
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              A Segurança de Contratar uma Empresa Especializada e Comprometida
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              A <strong>WFA MultiServiços</strong> nasceu da missão de entregar serviços técnicos com rigor industrial, honestidade em orçamentos e acabamento impecável, eliminando o estresse e o retrabalho tão comuns em obras e reparos.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Com expertise integrada nas 5 principais áreas técnicas — <strong>Elétrica, Mecânica, Hidráulica, Soldagem e Alvenaria</strong> — diagnosticamos a causa raiz de cada problema com instrumentos de medição de precisão antes de executar qualquer intervenção.
            </p>

            {/* 4 Pillars with WFA colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/40 transition-colors">
                <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Garantia Formal WFA</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Todos os serviços contam com garantia de mão de obra registrada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Pontualidade Rigorosa</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Respeito absoluto à sua rotina com horário marcado e cronograma cumprido.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/40 transition-colors">
                <FileSpreadsheet className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Orçamento Transparente</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Discriminação item a item de peças e mão de obra, sem custos ocultos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
                <Wrench className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Ferramental de Ponta</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Soldas inverter, geofones eletrônicos, multímetros e lasers de nível.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={openWhatsApp}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Conversar no WhatsApp da WFA
              </button>

              <button
                onClick={onOpenLeadModal}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Agendar Visita Técnica
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
