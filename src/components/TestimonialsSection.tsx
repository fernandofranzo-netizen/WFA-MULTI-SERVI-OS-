import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Quote, 
  PlusCircle, 
  CheckCircle2, 
  MapPin,
  X
} from 'lucide-react';
import { Testimonial, ServiceCategory } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
}) => {
  const [filterService, setFilterService] = useState<ServiceCategory | 'todos'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New testimonial form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [service, setService] = useState<ServiceCategory>('eletrica');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filteredTestimonials = filterService === 'todos'
    ? testimonials
    : testimonials.filter((t) => t.service === filterService);

  const handleSubmitNewTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const serviceLabels: Record<ServiceCategory, string> = {
      eletrica: 'Manutenção Elétrica',
      mecanica: 'Manutenção Mecânica',
      hidraulica: 'Hidráulica & Vazamentos',
      solda: 'Soldagem Especializada',
      alvenaria: 'Alvenaria e Reformas',
    };

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name,
      role: role.trim() || 'Cliente Satisfeito',
      service,
      serviceLabel: serviceLabels[service],
      rating,
      comment,
      date: 'Hoje',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 100)}?auto=format&fit=crop&w=150&q=80`,
      verified: true,
      location: location.trim() || 'São Paulo - SP',
    };

    onAddTestimonial(newTestimonial);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setIsModalOpen(false);
      setName('');
      setRole('');
      setComment('');
      setLocation('');
    }, 1800);
  };

  return (
    <section id="depoimentos" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              Credibilidade & Confiança
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Avaliações reais de proprietários, condomínios e empresas que contrataram a WFA MultiServiços e atestam nossa pontualidade e qualidade técnica.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Avaliar um Serviço
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilterService('todos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterService === 'todos'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Todos os Depoimentos ({testimonials.length})
          </button>
          {[
            { id: 'eletrica', label: 'Elétrica' },
            { id: 'mecanica', label: 'Mecânica' },
            { id: 'hidraulica', label: 'Hidráulica' },
            { id: 'solda', label: 'Soldagem' },
            { id: 'alvenaria', label: 'Alvenaria' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterService(s.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterService === s.id
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                {/* Rating & Service tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400/90">
                    {t.serviceLabel}
                  </span>
                </div>

                {/* Comment */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-slate-800 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed relative z-10 pl-2">
                    "{t.comment}"
                  </p>
                </div>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {t.name}
                      {t.verified && (
                        <span title="Cliente Verificado">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {t.role}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-500">
                  <div className="flex items-center justify-end gap-1">
                    <MapPin className="w-2.5 h-2.5 text-slate-500" />
                    <span>{t.location}</span>
                  </div>
                  <div>{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Leave review modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedFeedback ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">
                  Muito Obrigado pela sua Avaliação!
                </h4>
                <p className="text-xs text-slate-300">
                  Seu depoimento ajuda outros clientes a escolherem serviços com confiança e segurança.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-black text-white mb-1">
                  Deixar um Depoimento
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Conte como foi sua experiência com os serviços da WFA MultiServiços.
                </p>

                <form onSubmit={handleSubmitNewTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Sua Nota:
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'fill-current text-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-400 ml-2">
                        {rating} de 5 estrelas
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Roberto Silva"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Sua Profissão / Perfil
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Ex: Morador de Residência, Síndico"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Qual serviço foi realizado?
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="eletrica">Manutenção Elétrica</option>
                        <option value="mecanica">Manutenção Mecânica</option>
                        <option value="hidraulica">Hidráulica & Vazamentos</option>
                        <option value="solda">Soldagem Especializada</option>
                        <option value="alvenaria">Alvenaria e Reformas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Bairro / Cidade
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: Santo André - SP"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seu Comentário *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Descreva o atendimento, pontualidade, qualidade do acabamento..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Publicar Depoimento
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
