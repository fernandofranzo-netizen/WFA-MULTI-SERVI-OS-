import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  Zap, 
  Wrench, 
  Droplets, 
  Flame, 
  Hammer
} from 'lucide-react';
import { OfficialWhatsAppLogo } from './OfficialSocialIcons';
import { ServiceCategory, Lead } from '../types';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onLeadSubmitted: (lead: Lead) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onLeadSubmitted,
}) => {
  const [service, setService] = useState<ServiceCategory | 'outro'>(
    (preselectedService as ServiceCategory) || 'eletrica'
  );
  const [urgency, setUrgency] = useState<'emergencia' | 'esta_semana' | 'proximos_dias' | 'cotacao'>('esta_semana');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, sendToWhatsApp: boolean = false) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('Por favor, informe ao menos seu nome e telefone/WhatsApp para contato.');
      return;
    }

    setSubmitting(true);

    const leadPayload = {
      name,
      phone,
      email,
      service,
      urgency,
      description,
      address,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      let createdLead: Lead;
      if (res.ok) {
        createdLead = await res.json();
      } else {
        // Local fallback
        createdLead = {
          id: `lead-${Date.now()}`,
          name,
          phone,
          email,
          service,
          urgency,
          description,
          address,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'novo',
          notes: 'Recebido via formulário',
        };
      }

      onLeadSubmitted(createdLead);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore if not loaded
      }

      setSubmitted(true);

      if (sendToWhatsApp) {
        const urgencyText = {
          emergencia: '🚨 EMERGÊNCIA 24h',
          esta_semana: '📅 Para esta semana',
          proximos_dias: '🗓️ Próximos dias',
          cotacao: '💬 Avaliação técnica',
        }[urgency];

        const text = encodeURIComponent(
          `*NOVA SOLICITAÇÃO DE ORÇAMENTO - WFA METAIS*\n\n` +
          `👤 *Nome:* ${name}\n` +
          `📞 *Telefone:* ${phone}\n` +
          `🔧 *Serviço:* ${service.toUpperCase()}\n` +
          `⚡ *Disponibilidade/Urgência:* ${urgencyText}\n` +
          `📍 *Local/Bairro:* ${address || 'A combinar'}\n\n` +
          `📝 *Detalhes:* ${description || 'Solicitação de orçamento'}`
        );

        window.open(`https://wa.me/5584996737378?text=${text}`, '_blank');
      }
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      // Fallback lead
      const localLead: Lead = {
        id: `lead-${Date.now()}`,
        name,
        phone,
        email,
        service,
        urgency,
        description,
        address,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'novo',
      };
      onLeadSubmitted(localLead);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-blue-500/30 rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Solicitação Enviada com Sucesso!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Obrigado, <strong>{name}</strong>! Recebemos sua solicitação para serviços de{' '}
              <strong className="text-orange-400 uppercase">{service}</strong>. Wellington Silva Nascimento e a equipe da <strong>WFA METAIS</strong> entrarão em contato em breve via WhatsApp.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  handleSubmit(new Event('submit') as any, true);
                }}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 cursor-pointer gap-2"
              >
                <OfficialWhatsAppLogo className="w-5 h-5" />
                Continuar no WhatsApp Agora
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                WFA METAIS • Wellington Silva Nascimento
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Solicitar Orçamento
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Preencha os dados abaixo para receber um orçamento transparente e detalhado.
            </p>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. Qual serviço você precisa?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'eletrica', label: 'Elétrica', icon: Zap },
                    { id: 'mecanica', label: 'Mecânica', icon: Wrench },
                    { id: 'hidraulica', label: 'Hidráulica', icon: Droplets },
                    { id: 'solda', label: 'Soldagem', icon: Flame },
                    { id: 'alvenaria', label: 'Alvenaria', icon: Hammer },
                    { id: 'outro', label: 'Outro / Misto', icon: FileText },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setService(item.id as any)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          service === item.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Nível de urgência:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'emergencia', label: '🚨 Emergência 24h', desc: 'Preciso hoje' },
                    { id: 'esta_semana', label: '📅 Esta semana', desc: 'Em 2 a 3 dias' },
                    { id: 'proximos_dias', label: '🗓️ Próx. dias', desc: 'Planejado' },
                    { id: 'cotacao', label: '💬 Cotação', desc: 'Sem pressa' },
                  ].map((u) => (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => setUrgency(u.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        urgency === u.id
                          ? 'bg-slate-800 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{u.label}</div>
                      <div className="text-[10px] text-slate-500">{u.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp ou Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(84) 99673-7378"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bairro ou Cidade
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Seu bairro ou cidade"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail (Opcional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descreva o que você precisa ou medidas do seu projeto:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Gostaria de um orçamento para grade de proteção de 2 janelas e um portão basculante de 3 metros..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  {submitting ? 'Enviando...' : 'Solicitar Orçamento'}
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={submitting}
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <OfficialWhatsAppLogo className="w-5 h-5" />
                  Enviar pelo WhatsApp
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
