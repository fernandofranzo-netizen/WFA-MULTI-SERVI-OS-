import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Lock
} from 'lucide-react';
import { OfficialWhatsAppLogo, OfficialInstagramLogo, OfficialEmailLogo } from './OfficialSocialIcons';

interface FooterProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenAdminModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLeadModal: _onOpenLeadModal,
  onOpenAdminModal,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="h-14 rounded-2xl bg-slate-900 border-2 border-orange-500/60 p-1.5 overflow-hidden flex items-center justify-center shadow-lg shadow-blue-950/40 px-2.5">
                <img
                  src="/assets/aistudio/image_dc0dbf4b.png"
                  alt="Logotipo WFA METAIS"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight font-mono flex items-center">
                  W<span className="text-orange-500">F</span>A <span className="text-blue-400 ml-1.5 text-xl">METAIS</span>
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Serralheria em Geral
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              <strong className="text-white font-semibold">WFA METAIS</strong> — Sob a direção de <strong className="text-amber-400">Wellington Silva Nascimento</strong>. Especialistas em Grades, Portões, Estruturas Metálicas, Soldas em Geral e Serviços Personalizados.
            </p>

            <p className="text-amber-400 italic text-xs font-serif">
              "Qualidade, Resistência e Compromisso com você!"
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/5584996737378"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Oficial: (84) 99673-7378"
                aria-label="WhatsApp Oficial"
                className="hover:scale-110 active:scale-95 transition-transform"
              >
                <OfficialWhatsAppLogo className="w-8 h-8" />
              </a>
              <a
                href="https://instagram.com/wellingtonsilvanascimento419"
                target="_blank"
                rel="noreferrer"
                title="Instagram Oficial: @wellingtonsilvanascimento419"
                aria-label="Instagram Oficial"
                className="hover:scale-110 active:scale-95 transition-transform"
              >
                <OfficialInstagramLogo className="w-8 h-8" />
              </a>
              <a
                href="mailto:wellingtonsilvanascimento419@gmail.com"
                title="E-mail Oficial: wellingtonsilvanascimento419@gmail.com"
                aria-label="E-mail Oficial"
                className="hover:scale-110 active:scale-95 transition-transform"
              >
                <OfficialEmailLogo className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Specialties Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Especialidades WFA
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Grades de Proteção
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Portões Basculantes & Deslizantes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Estruturas Metálicas & Galpões
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Soldas em Geral (MIG / TIG / Eletrodo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Serviços Personalizados
                </button>
              </li>
            </ul>
          </div>

          {/* Service areas / Destaques */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Diferenciais WFA Metais
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Aço e ferro de alta durabilidade</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Solda com acabamento industrial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Pintura antiferrugem e eletrostática</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Projetos sob medida residencial e comercial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Cumprimento rigoroso de prazos</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Contato Direto
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://wa.me/5584996737378"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-bold text-sm group"
              >
                <OfficialWhatsAppLogo className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>(84) 99673-7378</span>
              </a>

              <a
                href="mailto:wellingtonsilvanascimento419@gmail.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-colors text-[11px] break-all group"
              >
                <OfficialEmailLogo className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>wellingtonsilvanascimento419@gmail.com</span>
              </a>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Seg a Sáb: 07h30 às 19h</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Garantia e Nota Fiscal</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/5584996737378?text=Ol%C3%A1%20WFA%20Metais!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <OfficialWhatsAppLogo className="w-4 h-4" />
                  Solicite seu Orçamento no WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] text-slate-600 space-y-2">
          <p className="font-semibold text-slate-500">Termos de Pesquisa Local (Google SEO):</p>
          <p className="leading-relaxed">
            WFA Metais • Serralheria em Geral • Wellington Silva Nascimento • Grades de proteção para janelas e muros • Fabricação e reforma de portões basculantes e de correr • Estruturas metálicas e mezaninos • Soldas em geral MIG TIG e eletrodo • Serviços personalizados em ferro e aço • Contato WhatsApp (84) 99673-7378 • Orçamento rápido e transparente.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} WFA METAIS — Serralheria em Geral. Proprietário Wellington Silva Nascimento. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminModal}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" /> Acesso Administrativo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
