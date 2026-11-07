import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  Lock
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenAdminModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLeadModal,
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
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-orange-500/60 p-1 flex items-center justify-center shadow-lg shadow-blue-950/40">
                <img
                  src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                  alt="WFA MultiServiços"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight font-mono flex items-center">
                  W<span className="text-orange-500">F</span>A
                </span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                  MultiServiços
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              Prestação de serviços técnicos da WFA com mais de 10 anos de experiência comprovada em Elétrica, Mecânica, Hidráulica, Soldagem e Alvenaria. Rigor técnico, pontualidade e transparência em cada projeto.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Serviços Prestados
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Manutenção Elétrica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Manutenção Mecânica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Hidráulica & Vazamentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Soldagem TIG, MIG & Eletrodo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('servicos')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Alvenaria, Pisos & Reformas
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links & Regiões */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Regiões Atendidas
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• São Paulo (Capital)</li>
              <li>• Zona Sul & Zona Oeste</li>
              <li>• Zona Leste & Zona Norte</li>
              <li>• Santo André, São Bernardo, SCS</li>
              <li>• Barueri, Alphaville & Osasco</li>
              <li>• Guarulhos & Região</li>
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
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                (84) 99673-7378
              </a>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Seg a Sáb: 07h30 às 19h</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Garantia de Mão de Obra</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenLeadModal()}
                  className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Agendar Visita Técnica
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] text-slate-600 space-y-2">
          <p className="font-semibold text-slate-500">Termos de Pesquisa Local (Google SEO):</p>
          <p className="leading-relaxed">
            Eletricista residencial e predial • Manutenção mecânica de motores e bombas • Conserto de vazamentos e encanador profissional • Solda de portão basculante MIG TIG • Reforma de alvenaria e assentamento de porcelanato • Instalação de quadro de distribuição disjuntores DIN • Troca de tubulação Tigre PPR • Agendar visita técnica prestador de serviços WFA MultiServiços.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} WFA MultiServiços. Todos os direitos reservados. CNPJ e Laudos Técnicos disponíveis.
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
