import React, { useState, useEffect } from 'react';
import { 
  Project, 
  BlogPost, 
  Testimonial, 
  Lead, 
  SEOSettings, 
  AnalyticsData, 
  ServiceCategory 
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOG_POSTS, 
  DEFAULT_SEO_SETTINGS 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  // Application Data States (persisted with LocalStorage & synced with API)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('wfa_projects') || localStorage.getItem('franzo_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('wfa_testimonials') || localStorage.getItem('franzo_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('wfa_blog') || localStorage.getItem('franzo_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [leads, setLeads] = useState<Lead[]>([]);
  
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(() => {
    const saved = localStorage.getItem('wfa_seo') || localStorage.getItem('franzo_seo');
    return saved ? JSON.parse(saved) : DEFAULT_SEO_SETTINGS;
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    monthlyVisits: [
      { month: 'Junho', visits: 1240, unique: 980, whatsappClicks: 145, leads: 32 },
      { month: 'Julho', visits: 1560, unique: 1190, whatsappClicks: 182, leads: 41 },
      { month: 'Agosto', visits: 1890, unique: 1430, whatsappClicks: 215, leads: 53 },
      { month: 'Setembro', visits: 2310, unique: 1780, whatsappClicks: 270, leads: 68 },
      { month: 'Outubro', visits: 2780, unique: 2150, whatsappClicks: 334, leads: 82 },
      { month: 'Novembro', visits: 3150, unique: 2480, whatsappClicks: 395, leads: 96 }
    ],
    serviceDistribution: [
      { service: 'Elétrica', count: 184, percentage: 31 },
      { service: 'Hidráulica', count: 142, percentage: 24 },
      { service: 'Alvenaria', count: 112, percentage: 19 },
      { service: 'Soldagem', count: 88, percentage: 15 },
      { service: 'Mecânica', count: 65, percentage: 11 }
    ],
    trafficSources: [
      { source: 'Busca Orgânica Google (SEO)', visits: 1520, percentage: 48 },
      { source: 'WhatsApp Direto e Indicações', visits: 780, percentage: 25 },
      { source: 'Redes Sociais (Instagram/Facebook)', visits: 540, percentage: 17 },
      { source: 'Acesso Direto ao Site', visits: 310, percentage: 10 }
    ],
    realtimeCounters: {
      totalPageViews: 3150,
      totalWhatsAppClicks: 395,
      totalQuotesRequested: 96,
      avgResponseTimeMin: 12
    }
  });

  // UI Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalService, setLeadModalService] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<ServiceCategory | null>(null);

  // Load backend data and track page view
  useEffect(() => {
    // Track initial page view in analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'page_view' }),
    }).catch(() => {});

    // Fetch leads
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
        }
      })
      .catch(() => {
        // Fallback local leads
        setLeads([
          {
            id: 'lead-1',
            name: 'Carlos Alberto Mendes',
            phone: '(11) 98123-4567',
            email: 'carlos.mendes@email.com',
            service: 'eletrica',
            urgency: 'emergencia',
            description: 'Quadro de distribuição desarmando ao ligar o chuveiro.',
            address: 'Vila Mariana, São Paulo',
            date: '2026-11-05 14:30',
            status: 'novo',
            notes: 'Aguardando contato urgente.'
          }
        ]);
      });

    // Fetch analytics
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.monthlyVisits) {
          setAnalytics(data);
        }
      })
      .catch(() => {});
  }, []);

  // Save changes to localStorage
  const handleUpdateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('wfa_projects', JSON.stringify(newProjects));
  };

  const handleUpdateBlogPosts = (newPosts: BlogPost[]) => {
    setBlogPosts(newPosts);
    localStorage.setItem('wfa_blog', JSON.stringify(newPosts));
  };

  const handleUpdateTestimonials = (newTestimonial: Testimonial) => {
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('wfa_testimonials', JSON.stringify(updated));
  };

  const handleUpdateLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
  };

  const handleLeadSubmitted = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateSEO = (newSEO: SEOSettings) => {
    setSeoSettings(newSEO);
    localStorage.setItem('wfa_seo', JSON.stringify(newSEO));
    // Dynamically update document title if modified
    document.title = newSEO.metaTitle;
  };

  const handleOpenLeadModal = (service?: string) => {
    setLeadModalService(service);
    setIsLeadModalOpen(true);
  };

  const handleSelectServiceFromHero = (serviceId: ServiceCategory) => {
    setSelectedServiceFilter(serviceId);
    handleNavigateSection('servicos');
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        onOpenLeadModal={handleOpenLeadModal}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onOpenLeadModal={handleOpenLeadModal}
            onSelectService={handleSelectServiceFromHero}
          />
        </div>

        {/* 5 Core Services Section */}
        <ServicesSection
          onOpenLeadModal={handleOpenLeadModal}
          selectedServiceFilter={selectedServiceFilter}
        />

        {/* Portfolio & Before/After Gallery */}
        <PortfolioSection
          projects={projects}
          onOpenLeadModal={handleOpenLeadModal}
        />

        {/* About Fernando Franzo */}
        <AboutSection
          onOpenLeadModal={() => handleOpenLeadModal()}
        />

        {/* Testimonials from Satisfied Customers */}
        <TestimonialsSection
          testimonials={testimonials}
          onAddTestimonial={handleUpdateTestimonials}
        />

        {/* Blog & Maintenance Tips with Social Sharing */}
        <BlogSection
          posts={blogPosts}
          onOpenLeadModal={handleOpenLeadModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenLeadModal={handleOpenLeadModal}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Personalized Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        preselectedService={leadModalService}
        onLeadSubmitted={handleLeadSubmitted}
      />

      {/* Full Administrative Management Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
        blogPosts={blogPosts}
        onUpdateBlogPosts={handleUpdateBlogPosts}
        leads={leads}
        onUpdateLeads={handleUpdateLeads}
        seoSettings={seoSettings}
        onUpdateSEO={handleUpdateSEO}
        analytics={analytics}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

    </div>
  );
}
