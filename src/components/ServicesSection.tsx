import React, { useState } from 'react';
import { 
  Zap, 
  Wrench, 
  Droplets, 
  Flame, 
  Hammer, 
  Check, 
  AlertTriangle, 
  Clock, 
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';
import { OfficialWhatsAppLogo } from './OfficialSocialIcons';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceCategory, ServiceDetail } from '../types';

interface ServicesSectionProps {
  onOpenLeadModal: (service: ServiceCategory) => void;
  selectedServiceFilter?: ServiceCategory | null;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenLeadModal,
  selectedServiceFilter,
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'todos'>(
    selectedServiceFilter || 'todos'
  );
  const [modalService, setModalService] = useState<ServiceDetail | null>(null);

  const getIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'eletrica':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'mecanica':
        return <Wrench className="w-5 h-5 text-blue-400" />;
      case 'hidraulica':
        return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'solda':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'alvenaria':
        return <Hammer className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getBorderColor = (category: ServiceCategory) => {
    switch (category) {
      case 'eletrica':
        return 'group-hover:border-amber-500/50';
      case 'mecanica':
        return 'group-hover:border-blue-500/50';
      case 'hidraulica':
        return 'group-hover:border-cyan-500/50';
      case 'solda':
        return 'group-hover:border-orange-500/50';
      case 'alvenaria':
        return 'group-hover:border-emerald-500/50';
    }
  };

  const openWhatsAppForService = (service: ServiceDetail) => {
    const text = encodeURIComponent(
      `Olá WFA Metais! Gostaria de solicitar um orçamento para o serviço de ${service.name}.`
    );
    window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
  };

  const filteredServices = activeTab === 'todos' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter((s) => s.id === activeTab);

  return (
    <section id="servicos" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-orange-400" />
            WFA Metais • Serralheria em Geral & Serviços Especializados
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Nossos Serviços e Especialidades
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Grades, portões, estruturas metálicas, soldas e manutenções com alto rigor técnico, acabamento primoroso e materiais de primeira linha.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black shadow-md shadow-yellow-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Todos os Serviços (5)
            </button>
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveTab(srv.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === srv.id
                    ? 'bg-slate-800 text-white border-2 border-yellow-400'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {getIcon(srv.id)}
                {srv.name.replace('Manutenção ', '').replace(' Especializada', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-slate-950/70 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col overflow-hidden ${getBorderColor(
                service.id
              )}`}
            >
              {/* Image banner */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Badge top-right */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md shadow">
                  {service.badge}
                </div>

                {/* Service Icon Pill (rendered when image does not have an integrated graphic banner) */}
                {service.id !== 'eletrica' && service.id !== 'mecanica' && (
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                    {getIcon(service.id)}
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {service.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-3 italic">
                    {service.tagline}
                  </p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Checklist of what we do */}
                  <div className="space-y-1.5 mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Principais Atividades:
                    </p>
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Common problems solved */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Sinais de que você precisa deste serviço:</span>
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                      {service.commonProblems.slice(0, 2).map((prob, i) => (
                        <li key={i}>{prob}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom stats and action buttons */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Tempo Médio: <strong className="text-slate-300 ml-1">{service.typicalTime}</strong>
                    </span>
                    <button
                      onClick={() => setModalService(service)}
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      Detalhes <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => openWhatsAppForService(service)}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/40 transition-all cursor-pointer gap-2"
                    >
                      <OfficialWhatsAppLogo className="w-5 h-5" />
                      Solicitar Orçamento no WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {getIcon(modalService.id)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {modalService.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {modalService.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {modalService.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Todas as Tarefas Executadas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalService.features.map((feat, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                  Problemas Frequentes que Diagnosticamos:
                </h4>
                <div className="space-y-1.5">
                  {modalService.commonProblems.map((prob, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => openWhatsAppForService(modalService)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <OfficialWhatsAppLogo className="w-5 h-5" />
                Solicitar Orçamento no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
