import React, { useState } from 'react';
import { 
  Project, 
  ServiceCategory 
} from '../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  UserCheck, 
  Layers, 
  Eye, 
  Sparkles, 
  ArrowRight,
  SplitSquareVertical
} from 'lucide-react';

interface PortfolioSectionProps {
  projects: Project[];
  onOpenLeadModal: (service?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onOpenLeadModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'todos'>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBeforeMap, setShowBeforeMap] = useState<Record<string, boolean>>({});

  const toggleBeforeAfter = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBeforeMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const getCategoryLabel = (cat: ServiceCategory) => {
    switch (cat) {
      case 'eletrica': return 'Elétrica';
      case 'mecanica': return 'Mecânica';
      case 'hidraulica': return 'Hidráulica';
      case 'solda': return 'Soldagem';
      case 'alvenaria': return 'Alvenaria';
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5 text-orange-400" />
              Portfólio de Obras WFA
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Portfólio de Projetos Concluídos
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Confira a evolução real dos nossos trabalhos com fotos de <strong>Antes e Depois</strong>, acabamento de alto padrão e satisfação comprovada dos clientes da WFA.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({projects.length})
            </button>
            {(['eletrica', 'mecanica', 'hidraulica', 'solda', 'alvenaria'] as ServiceCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const isShowingBefore = showBeforeMap[proj.id] || false;
            const currentImg = isShowingBefore && proj.beforeImageUrl 
              ? proj.beforeImageUrl 
              : proj.afterImageUrl;

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer hover:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Before/After Toggle */}
                <div className="relative h-60 overflow-hidden bg-slate-950">
                  <img
                    src={currentImg}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Category tag */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-400 border border-slate-700/80 uppercase tracking-wide">
                    {getCategoryLabel(proj.category)}
                  </div>

                  {/* Interactive Before & After Switcher */}
                  {proj.beforeImageUrl && (
                    <button
                      onClick={(e) => toggleBeforeAfter(proj.id, e)}
                      title="Clique para alternar entre Antes e Depois"
                      className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all ${
                        isShowingBefore
                          ? 'bg-red-500 text-white'
                          : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                      <span>{isShowingBefore ? 'Antes' : 'Depois'}</span>
                    </button>
                  )}

                  {/* Execution time pill */}
                  {proj.executionTime && (
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[11px] px-2 py-0.5 rounded flex items-center gap-1 border border-slate-800">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {proj.executionTime}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-slate-400 text-xs mb-1.5 gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{proj.location}</span>
                      <span>•</span>
                      <span>{proj.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    {/* Client quote snippet */}
                    {proj.clientReview && (
                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 mb-3 text-[11px] text-slate-400 italic">
                        "{proj.clientReview}"
                        {proj.clientName && (
                          <div className="text-[10px] text-amber-400/90 font-semibold not-italic mt-1">
                            — {proj.clientName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                      Ver detalhes do projeto <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                      Garantido
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA underneath gallery */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Gostou dos nossos trabalhos?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Podemos executar seu projeto com a mesma qualidade, cronograma rigoroso e orçamento sem custos surpresa.
            </p>
          </div>
          <button
            onClick={() => onOpenLeadModal()}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            Agendar Visita Técnica com a WFA
          </button>
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase mb-2">
              {getCategoryLabel(selectedProject.category)}
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              {selectedProject.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {selectedProject.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Tempo de execução: {selectedProject.executionTime || 'Sob medida'}
              </span>
            </div>

            {/* Images display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {selectedProject.beforeImageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                  <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    ANTES
                  </div>
                  <img
                    src={selectedProject.beforeImageUrl}
                    alt="Antes da obra"
                    className="w-full h-56 object-cover"
                  />
                </div>
              )}
              <div className={`rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative ${
                !selectedProject.beforeImageUrl ? 'sm:col-span-2' : ''
              }`}>
                <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  DEPOIS (FINALIZADO)
                </div>
                <img
                  src={selectedProject.afterImageUrl}
                  alt="Depois da obra"
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {selectedProject.clientReview && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6">
                <div className="text-xs font-bold text-amber-400 mb-1">
                  Avaliação do Cliente:
                </div>
                <p className="text-xs text-slate-300 italic">
                  "{selectedProject.clientReview}"
                </p>
                {selectedProject.clientName && (
                  <p className="text-[11px] text-slate-500 font-semibold mt-2">
                    — {selectedProject.clientName}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const s = selectedProject.category;
                  setSelectedProject(null);
                  onOpenLeadModal(s);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm"
              >
                Agendar Visita Técnica Deste Tipo de Serviço
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
