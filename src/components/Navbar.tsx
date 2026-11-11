import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  Lock,
  Clock,
  MapPin
} from 'lucide-react';
import { OfficialWhatsAppLogo, OfficialInstagramLogo, OfficialEmailLogo } from './OfficialSocialIcons';

interface NavbarProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenAdminModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLeadModal,
  onOpenAdminModal,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent('Olá Wellington! Acessei o site da WFA Metais e gostaria de solicitar um orçamento para um serviço de serralheria.');
    window.open(`https://wa.me/558499637378?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top micro-bar for credibility & direct contact */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-400" />
              WFA METAIS • Serralheria em Geral
            </span>
            <span className="hidden sm:flex items-center text-slate-400">
              <Clock className="w-3.5 h-3.5 mr-1 text-blue-400" />
              Seg a Sáb: 07h30 às 18h30
            </span>
            <span className="hidden md:flex items-center text-slate-400">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Atendimento Especializado
            </span>
          </div>

          <div className="flex items-center space-x-2.5 ml-auto">
            {/* Official WhatsApp */}
            <a
              href="https://wa.me/558499637378"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform"
              title="WhatsApp Oficial: (84) 99637-7378"
              aria-label="WhatsApp Oficial"
            >
              <OfficialWhatsAppLogo className="w-4 h-4" />
            </a>

            {/* Official Instagram */}
            <a
              href="https://instagram.com/wellingtonsilvanascimento419"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform"
              title="Instagram Oficial"
              aria-label="Instagram Oficial"
            >
              <OfficialInstagramLogo className="w-4 h-4" />
            </a>

            {/* Official Email */}
            <a
              href="mailto:wellingtonsilvanascimento419@gmail.com"
              className="hover:scale-110 active:scale-95 transition-transform"
              title="E-mail Oficial: wellingtonsilvanascimento419@gmail.com"
              aria-label="E-mail Oficial"
            >
              <OfficialEmailLogo className="w-4 h-4" />
            </a>

            <span className="text-slate-700">|</span>
            <a
              href="tel:+5584996377378"
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 mr-1 text-amber-400" />
              <span className="font-semibold">(84) 99637-7378</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdminModal}
              title="Acesso Administrativo"
              className="flex items-center text-slate-400 hover:text-amber-400 transition-colors text-xs py-0.5 px-2 rounded hover:bg-slate-800"
            >
              <Lock className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Área Restrita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            {/* WFA Metais Official Logo */}
            <div className="relative h-14 rounded-2xl p-1 bg-gradient-to-br from-amber-500/30 via-slate-900 to-blue-600/30 border border-amber-500/50 shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center bg-slate-950 px-2.5">
              <img
                src="/assets/aistudio/image_dc0dbf4b.png"
                alt="Logotipo WFA METAIS"
                className="h-11 w-auto max-w-[120px] object-contain"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-950 shadow-sm" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono flex items-center">
                  WFA <span className="text-amber-400 ml-1">METAIS</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md">
                  Serralheria
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Grades • Portões • Estruturas Metálicas • Soldas
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('servicos')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Portfólio & Obras
            </button>
            <button
              onClick={() => handleNavClick('depoimentos')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Depoimentos
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Dicas Técnicas
            </button>
            <button
              onClick={() => handleNavClick('sobre')}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Sobre a WFA
            </button>
          </nav>

          {/* Desktop Call to Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={openWhatsAppDirect}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition-all hover:-translate-y-0.5 cursor-pointer gap-2"
            >
              <OfficialWhatsAppLogo className="w-5 h-5" />
              Solicitar Orçamento
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={openWhatsAppDirect}
              className="p-1.5 rounded-full hover:scale-105 transition-transform"
              title="Chamar no WhatsApp Oficial"
              aria-label="WhatsApp Oficial"
            >
              <OfficialWhatsAppLogo className="w-7 h-7" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNavClick('servicos')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-orange-400"
            >
              Serviços Especializados
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-orange-400"
            >
              Portfólio e Antes & Depois
            </button>
            <button
              onClick={() => handleNavClick('depoimentos')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-orange-400"
            >
              Avaliações de Clientes
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-orange-400"
            >
              Blog & Dicas
            </button>
            <button
              onClick={() => handleNavClick('sobre')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-orange-400"
            >
              Sobre a WFA
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                openWhatsAppDirect();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-base shadow-lg shadow-emerald-950/40 gap-2"
            >
              <OfficialWhatsAppLogo className="w-5 h-5" />
              Solicitar Orçamento no WhatsApp
            </button>
            <button
              onClick={() => {
                onOpenAdminModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800"
            >
              <Lock className="w-4 h-4 mr-2 text-slate-400" />
              Painel Administrativo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
