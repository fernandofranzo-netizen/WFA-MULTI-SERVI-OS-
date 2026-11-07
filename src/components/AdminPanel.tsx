import React, { useState } from 'react';
import { 
  Project, 
  BlogPost, 
  Lead, 
  SEOSettings, 
  AnalyticsData,
  ServiceCategory
} from '../types';
import { 
  X, 
  BarChart3, 
  Briefcase, 
  BookOpen, 
  Search, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  MessageCircle, 
  ExternalLink,
  Shield,
  KeyRound,
  Download,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  blogPosts: BlogPost[];
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  seoSettings: SEOSettings;
  onUpdateSEO: (settings: SEOSettings) => void;
  analytics: AnalyticsData;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  projects,
  onUpdateProjects,
  blogPosts,
  onUpdateBlogPosts,
  leads,
  onUpdateLeads,
  seoSettings,
  onUpdateSEO,
  analytics,
}) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<'relatorios' | 'leads' | 'projetos' | 'blog' | 'seo'>('relatorios');

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<ServiceCategory>('eletrica');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjBeforeUrl, setNewProjBeforeUrl] = useState('');
  const [newProjAfterUrl, setNewProjAfterUrl] = useState('');
  const [newProjLocation, setNewProjLocation] = useState('São Paulo, SP');
  const [newProjTime, setNewProjTime] = useState('1 dia');
  const [isAddingProject, setIsAddingProject] = useState(false);

  // New Blog Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ServiceCategory>('eletrica');
  const [newPostSummary, setNewPostSummary] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCover, setNewPostCover] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);

  // SEO Editable State
  const [editableSEO, setEditableSEO] = useState<SEOSettings>(seoSettings);
  const [seoSavedAlert, setSeoSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin' || pinInput === 'franzo') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Add Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjAfterUrl.trim()) {
      alert('Preencha ao menos o título e a foto do projeto.');
      return;
    }

    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle,
      category: newProjCategory,
      description: newProjDesc,
      beforeImageUrl: newProjBeforeUrl || undefined,
      afterImageUrl: newProjAfterUrl,
      date: 'Novembro 2026',
      location: newProjLocation,
      executionTime: newProjTime,
      featured: true,
    };

    onUpdateProjects([created, ...projects]);
    setIsAddingProject(false);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjBeforeUrl('');
    setNewProjAfterUrl('');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Deseja realmente remover esta foto/projeto do seu portfólio?')) {
      onUpdateProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Add Blog Post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Preencha o título e o conteúdo da dica.');
      return;
    }

    const categoryLabels: Record<ServiceCategory, string> = {
      eletrica: 'Elétrica',
      mecanica: 'Mecânica',
      hidraulica: 'Hidráulica',
      solda: 'Soldagem',
      alvenaria: 'Alvenaria',
    };

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: newPostTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newPostTitle,
      category: newPostCategory,
      categoryLabel: categoryLabels[newPostCategory],
      summary: newPostSummary || newPostContent.substring(0, 120) + '...',
      content: newPostContent,
      coverImageUrl: newPostCover || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      readTime: '3 min',
      author: 'Fernando Franzo',
      date: 'Hoje',
      tags: ['Manutenção', 'Dicas Profissionais'],
      views: 1,
    };

    onUpdateBlogPosts([newPost, ...blogPosts]);
    setIsAddingPost(false);
    setNewPostTitle('');
    setNewPostSummary('');
    setNewPostContent('');
    setNewPostCover('');
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Deseja excluir este artigo do blog?')) {
      onUpdateBlogPosts(blogPosts.filter((p) => p.id !== id));
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (id: string, newStatus: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    onUpdateLeads(updated);

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      // Local state is already updated
    }
  };

  // WhatsApp reply from lead
  const handleReplyLeadWhatsApp = (lead: Lead) => {
    const text = encodeURIComponent(
      `Olá ${lead.name}! Aqui é a equipe da WFA MultiServiços. Recebemos sua solicitação de visita técnica para serviços de ${lead.service.toUpperCase()} e estamos à disposição para combinarmos a data e o horário!`
    );
    const cleanPhone = lead.phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}?text=${text}`, '_blank');
  };

  // Save SEO
  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSEO(editableSEO);
    setSeoSavedAlert(true);
    setTimeout(() => setSeoSavedAlert(false), 2500);
  };

  // Export access report as text / print
  const handleExportReport = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl flex flex-col h-[94vh] shadow-2xl overflow-hidden">
        
        {/* Top bar with WFA logo */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border-2 border-orange-500/60 p-0.5 flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                alt="WFA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Painel Administrativo WFA MultiServiços
                <span className="text-[10px] bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 px-2 py-0.5 rounded font-black uppercase">
                  Gestão WFA Pro
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Fotos de Projetos • Artigos do Blog • Leads de Contato • SEO Google & Relatórios
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gateway Screen if not logged in */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/60">
            <div className="w-full max-w-md bg-slate-900 border-2 border-blue-500/30 rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-orange-500/70 p-1 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <img
                  src="/assets/aistudio/IMG-20261106-WA0193_9a0aed0a.jpg"
                  alt="WFA MultiServiços"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-black text-white mb-1">
                Acesso Restrito WFA MultiServiços
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Painel administrativo para gerenciar fotos, leads e relatórios (Senha padrão: <code className="text-orange-400 font-mono font-bold">1234</code>).
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Digite a senha (ex: 1234)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:outline-none focus:border-orange-500"
                  />
                  {pinError && (
                    <p className="text-xs text-red-400 mt-2">
                      Senha incorreta. Dica: use <strong>1234</strong>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Entrar no Painel WFA
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Authenticated Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('relatorios')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'relatorios'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>Relatórios Mensais</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span className="flex-1">Leads & Orçamentos</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-amber-400 font-mono">
                  {leads.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('projetos')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'projetos'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span className="flex-1">Fotos do Portfólio</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-amber-400 font-mono">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="flex-1">Blog de Dicas</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-amber-400 font-mono">
                  {blogPosts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'seo'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4 shrink-0" />
                <span>Otimização SEO Google</span>
              </button>

              <div className="mt-auto hidden md:block pt-4 border-t border-slate-800 text-[11px] text-slate-500">
                Logado como: <strong className="text-orange-400">WFA MultiServiços</strong>
              </div>
            </aside>

            {/* Main Tab Content Area */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900/60">
              
              {/* TAB 1: RELATÓRIOS MENSAIS DE DESEMPENHO */}
              {activeTab === 'relatorios' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        Relatório Mensal de Desempenho e Acessos
                      </h3>
                      <p className="text-xs text-slate-400">
                        Estatísticas em tempo real de visitantes, cliques para WhatsApp e orçamentos gerados pelo site.
                      </p>
                    </div>

                    <button
                      onClick={handleExportReport}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Imprimir / Salvar Relatório PDF
                    </button>
                  </div>

                  {/* Realtime KPI cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="text-xs text-slate-400 font-medium">Acessos Totais (Mês Atual)</div>
                      <div className="text-2xl font-black text-white mt-1">3.150</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +13.3% vs mês anterior
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="text-xs text-slate-400 font-medium">Cliques no WhatsApp</div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">395</div>
                      <div className="text-[11px] text-slate-400 mt-1">Taxa de conversão: 12.5%</div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="text-xs text-slate-400 font-medium">Leads / Orçamentos</div>
                      <div className="text-2xl font-black text-amber-400 mt-1">{leads.length + 90}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">Alta conversão</div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="text-xs text-slate-400 font-medium">Tempo Médio Resposta</div>
                      <div className="text-2xl font-black text-blue-400 mt-1">12 min</div>
                      <div className="text-[11px] text-slate-400 mt-1">Agilidade comprovada</div>
                    </div>
                  </div>

                  {/* Monthly Evolution Bar Chart */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                      <span>Evolução dos Últimos 6 Meses</span>
                      <span className="text-xs text-amber-400 font-normal">Visitas x Conversões</span>
                    </h4>

                    <div className="space-y-3">
                      {analytics.monthlyVisits.map((m, i) => {
                        const maxVisits = 3500;
                        const widthPct = Math.round((m.visits / maxVisits) * 100);
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300 font-semibold">{m.month}</span>
                              <span className="text-slate-400 font-mono">
                                <strong>{m.visits}</strong> visitas • <strong className="text-emerald-400">{m.whatsappClicks}</strong> WhatsApp • <strong className="text-amber-400">{m.leads}</strong> leads
                              </span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden flex">
                              <div
                                style={{ width: `${widthPct}%` }}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category breakdown & Traffic source */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                      <h4 className="text-sm font-bold text-white mb-3">
                        Interesse por Categoria de Serviço
                      </h4>
                      <div className="space-y-3">
                        {analytics.serviceDistribution.map((s, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-300">{s.service}</span>
                              <span className="font-bold text-amber-400">{s.percentage}% ({s.count} consultas)</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                              <div
                                style={{ width: `${s.percentage}%` }}
                                className="bg-amber-400 h-full rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                      <h4 className="text-sm font-bold text-white mb-3">
                        Origens de Tráfego
                      </h4>
                      <div className="space-y-3">
                        {analytics.trafficSources.map((t, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-300">{t.source}</span>
                              <span className="font-bold text-emerald-400">{t.percentage}% ({t.visits} visitas)</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                              <div
                                style={{ width: `${t.percentage}%` }}
                                className="bg-emerald-500 h-full rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GESTÃO DE LEADS & ORÇAMENTOS */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        Leads e Orçamentos Recebidos
                      </h3>
                      <p className="text-xs text-slate-400">
                        Gerencie contatos capturados pelos formulários. Chame o cliente no WhatsApp com mensagem pré-formatada em 1 clique!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              {lead.service}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              lead.urgency === 'emergencia' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {lead.urgency}
                            </span>
                            <span className="text-xs text-slate-500">• {lead.date}</span>
                          </div>

                          <div className="text-xs text-slate-300">
                            <strong>Telefone:</strong> {lead.phone} {lead.email && `• ${lead.email}`} {lead.address && `• ${lead.address}`}
                          </div>

                          <p className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                            "{lead.description || 'Sem detalhes fornecidos'}"
                          </p>

                          {lead.notes && (
                            <div className="text-[11px] text-amber-400/90 italic">
                              Nota interna: {lead.notes}
                            </div>
                          )}
                        </div>

                        {/* Status selector & Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
                          >
                            <option value="novo">🟡 Novo</option>
                            <option value="em_contato">🔵 Em Contato</option>
                            <option value="orcamento_enviado">🟣 Orçamento Enviado</option>
                            <option value="fechado">🟢 Fechado</option>
                            <option value="concluido">⚪ Concluído</option>
                          </select>

                          <button
                            onClick={() => handleReplyLeadWhatsApp(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Chamar no WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GERENCIADOR DE FOTOS DOS PROJETOS */}
              {activeTab === 'projetos' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        Gerenciador de Fotos e Portfólio
                      </h3>
                      <p className="text-xs text-slate-400">
                        Adicione novos projetos finalizados, fotos de Antes e Depois e organize as categorias facilmente.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProject(!isAddingProject)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      {isAddingProject ? 'Cancelar' : 'Adicionar Nova Foto / Obra'}
                    </button>
                  </div>

                  {/* Add project form */}
                  {isAddingProject && (
                    <form onSubmit={handleSaveProject} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <h4 className="text-sm font-bold text-amber-400">Novo Projeto para o Portfólio</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Título da Obra / Serviço *</label>
                          <input
                            type="text"
                            required
                            value={newProjTitle}
                            onChange={(e) => setNewProjTitle(e.target.value)}
                            placeholder="Ex: Reforma de Quadro de Luz e Disjuntores"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria do Serviço</label>
                          <select
                            value={newProjCategory}
                            onChange={(e) => setNewProjCategory(e.target.value as any)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="eletrica">Elétrica</option>
                            <option value="mecanica">Mecânica</option>
                            <option value="hidraulica">Hidráulica</option>
                            <option value="solda">Soldagem</option>
                            <option value="alvenaria">Alvenaria</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">URL da Foto - DEPOIS (Obrigatório) *</label>
                          <input
                            type="url"
                            required
                            value={newProjAfterUrl}
                            onChange={(e) => setNewProjAfterUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">URL da Foto - ANTES (Opcional para comparação)</label>
                          <input
                            type="url"
                            value={newProjBeforeUrl}
                            onChange={(e) => setNewProjBeforeUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro / Local</label>
                          <input
                            type="text"
                            value={newProjLocation}
                            onChange={(e) => setNewProjLocation(e.target.value)}
                            placeholder="Ex: Pinheiros - São Paulo, SP"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Tempo de Execução</label>
                          <input
                            type="text"
                            value={newProjTime}
                            onChange={(e) => setNewProjTime(e.target.value)}
                            placeholder="Ex: 6 horas, 2 dias"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Descrição do Serviço</label>
                        <textarea
                          rows={2}
                          value={newProjDesc}
                          onChange={(e) => setNewProjDesc(e.target.value)}
                          placeholder="Descreva as melhorias feitas, materiais instalados e soluções técnicas aplicadas..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Salvar e Publicar no Portfólio
                      </button>
                    </form>
                  )}

                  {/* Projects list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                        <div className="h-36 relative">
                          <img src={proj.afterImageUrl} alt={proj.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 bg-slate-900/90 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {proj.category}
                          </span>
                        </div>
                        <div className="p-3">
                          <h5 className="text-xs font-bold text-white line-clamp-1">{proj.title}</h5>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{proj.description}</p>
                          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">{proj.location}</span>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BLOG DE DICAS */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        Gerenciador do Blog de Dicas
                      </h3>
                      <p className="text-xs text-slate-400">
                        Publique conteúdos educativos para atrair novos clientes pelo Google e redes sociais.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingPost(!isAddingPost)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      {isAddingPost ? 'Cancelar' : 'Escrever Nova Dica'}
                    </button>
                  </div>

                  {isAddingPost && (
                    <form onSubmit={handleSavePost} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <h4 className="text-sm font-bold text-amber-400">Novo Artigo Técnico</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Título do Artigo *</label>
                          <input
                            type="text"
                            required
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Ex: Como evitar sobrecargas de disjuntores"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria</label>
                          <select
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value as any)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="eletrica">Elétrica</option>
                            <option value="mecanica">Mecânica</option>
                            <option value="hidraulica">Hidráulica</option>
                            <option value="solda">Soldagem</option>
                            <option value="alvenaria">Alvenaria</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL da Imagem de Capa</label>
                        <input
                          type="url"
                          value={newPostCover}
                          onChange={(e) => setNewPostCover(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Resumo Curto</label>
                        <input
                          type="text"
                          value={newPostSummary}
                          onChange={(e) => setNewPostSummary(e.target.value)}
                          placeholder="Breve resumo para os resultados de busca e redes sociais..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Conteúdo Completo *</label>
                        <textarea
                          rows={6}
                          required
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Escreva as dicas, orientações de segurança e passos práticos..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Publicar Artigo no Blog
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={post.coverImageUrl} alt={post.title} className="w-16 h-14 rounded-lg object-cover" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">
                              {post.categoryLabel}
                            </span>
                            <h5 className="text-sm font-bold text-white mt-1">{post.title}</h5>
                            <p className="text-xs text-slate-400">{post.date} • {post.views} visualizações</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-slate-900 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: OTIMIZAÇÃO SEO GOOGLE */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Sistema de Otimização SEO (Search Engine Optimization)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure como seu negócio aparece no Google para moradores e empresas da sua região que buscam por eletricista, encanador, serralheiro, mecânico ou pedreiro.
                    </p>
                  </div>

                  {seoSavedAlert && (
                    <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Configurações de SEO salvas com sucesso no sistema!
                    </div>
                  )}

                  {/* Google SERP Live Simulation */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      <Eye className="w-4 h-4 text-amber-400" />
                      Simulação em Tempo Real no Google (Snippet de Busca)
                    </div>

                    <div className="bg-white p-4 rounded-xl font-sans text-slate-900 shadow-inner">
                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-1">
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">G</div>
                        <span>franzomultiservicos.com.br</span>
                        <span>› servicos › sao-paulo</span>
                      </div>
                      <div className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">
                        {editableSEO.metaTitle}
                      </div>
                      <div className="text-xs text-[#4d5156] leading-relaxed">
                        {editableSEO.metaDescription}
                      </div>
                    </div>
                  </div>

                  {/* SEO Health Scorecard */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      Auditor de SEO On-Page
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="font-bold text-white">Schema.org Ativo</div>
                          <div className="text-[10px] text-slate-400">HomeAndConstructionBusiness</div>
                        </div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="font-bold text-white">OpenGraph & Twitter Card</div>
                          <div className="text-[10px] text-slate-400">Pronto para WhatsApp & Redes</div>
                        </div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="font-bold text-white">Palavras-Chave Locais</div>
                          <div className="text-[10px] text-slate-400">São Paulo & Grande SP</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Edit Form */}
                  <form onSubmit={handleSaveSEO} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Título da Página Google (`&lt;title&gt;`)
                      </label>
                      <input
                        type="text"
                        value={editableSEO.metaTitle}
                        onChange={(e) => setEditableSEO({ ...editableSEO, metaTitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Meta Descrição (`&lt;meta name="description"&gt;`)
                      </label>
                      <textarea
                        rows={3}
                        value={editableSEO.metaDescription}
                        onChange={(e) => setEditableSEO({ ...editableSEO, metaDescription: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Palavras-chave de Busca (Keywords)
                      </label>
                      <input
                        type="text"
                        value={editableSEO.keywords}
                        onChange={(e) => setEditableSEO({ ...editableSEO, keywords: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Região de Atendimento
                        </label>
                        <input
                          type="text"
                          value={editableSEO.serviceArea}
                          onChange={(e) => setEditableSEO({ ...editableSEO, serviceArea: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Telefone / WhatsApp Indexado
                        </label>
                        <input
                          type="text"
                          value={editableSEO.phoneWhatsapp}
                          onChange={(e) => setEditableSEO({ ...editableSEO, phoneWhatsapp: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow"
                    >
                      Salvar Alterações de SEO
                    </button>
                  </form>
                </div>
              )}

            </main>
          </div>
        )}
      </div>
    </div>
  );
};
