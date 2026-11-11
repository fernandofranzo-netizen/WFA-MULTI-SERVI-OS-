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
import { OfficialWhatsAppLogo, OfficialInstagramLogo, OfficialEmailLogo } from './OfficialSocialIcons';

interface AboutSectionProps {
  onOpenLeadModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá Wellington! Acessei o site da WFA Metais e gostaria de falar sobre um projeto de serralheria/portão/estrutura.');
    window.open(`https://wa.me/558499637378?text=${text}`, '_blank');
  };

  return (
    <section id="sobre" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait of Wellington Silva Nascimento & Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden bg-slate-950 border-2 border-amber-500/40 p-3 shadow-2xl shadow-blue-950/40">
              
              {/* Logo Badge */}
              <div className="absolute top-5 right-5 z-20 bg-slate-950/95 border border-amber-500/60 rounded-xl p-1 shadow-xl flex items-center justify-center px-2.5">
                <img
                  src="/assets/aistudio/image_dc0dbf4b.png"
                  alt="Logotipo WFA METAIS"
                  className="h-7 w-auto object-contain"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                <img
                  src="/assets/aistudio/IMG-20261109-WA0123_fabed3be.jpg"
                  alt="Wellington Silva Nascimento - WFA Metais Serralheria"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-amber-500/30">
                  <div className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-black uppercase mb-1">
                    Proprietário & Especialista
                  </div>
                  <h3 className="text-xl font-black text-white">Wellington Silva Nascimento</h3>
                  <p className="text-xs text-amber-300 font-semibold">
                    WFA METAIS • Serralheria em Geral
                  </p>
                </div>
              </div>

              {/* Official Contact & Social Buttons: Only Official Logomarks */}
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-around gap-3">
                {/* Official WhatsApp */}
                <a
                  href="https://wa.me/558499637378?text=Ol%C3%A1%20Wellington!%20Gostaria%20de%20um%20or%C3%A7amento."
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Oficial: (84) 99637-7378"
                  aria-label="WhatsApp Oficial"
                  className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 p-2 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <OfficialWhatsAppLogo className="w-8 h-8" />
                </a>

                {/* Official Instagram */}
                <a
                  href="https://instagram.com/wellingtonsilvanascimento419"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram Oficial: @wellingtonsilvanascimento419"
                  aria-label="Instagram Oficial"
                  className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-pink-500/60 p-2 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <OfficialInstagramLogo className="w-8 h-8" />
                </a>

                {/* Official Email */}
                <a
                  href="mailto:wellingtonsilvanascimento419@gmail.com"
                  title="E-mail Oficial: wellingtonsilvanascimento419@gmail.com"
                  aria-label="E-mail Oficial"
                  className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-500/60 p-2 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <OfficialEmailLogo className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Experience story & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              WFA METAIS • Serralheria em Geral
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              A Força do Aço com Precisão e Dedicação Artesanal
            </h2>

            <p className="text-base sm:text-lg text-amber-300 font-bold italic">
              "Qualidade, Resistência e Compromisso com você!"
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Liderada por <strong>Wellington Silva Nascimento</strong>, a <strong>WFA METAIS</strong> é referência em serviços de serralheria, entregando projetos robustos, esteticamente impecáveis e com segurança de ponta a ponta.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Trabalhamos com materiais de alta durabilidade e maquinário profissional para atender residências, condomínios, comércios e indústrias em:
            </p>

            {/* Core Offerings from Flyer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Grades & Portões Sob Medida</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Portões basculantes, de correr e grades de proteção com solda reforçada e fino acabamento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
                <Wrench className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Estruturas Metálicas</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mezaninos, coberturas, galpões e suportes de aço com cálculo e resistência comprovada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <FileSpreadsheet className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Soldas em Geral</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Soldagem técnica MIG, TIG e eletrodo revestido em aço carbono, ferro fundido e inox.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Serviços Personalizados</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Projetos especiais desenhados de acordo com a sua necessidade e espaço.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={openWhatsApp}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-950/50 transition-all cursor-pointer group"
              >
                <OfficialWhatsAppLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Falar no WhatsApp: (84) 99637-7378
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
