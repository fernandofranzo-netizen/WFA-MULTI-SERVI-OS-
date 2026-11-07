export type ServiceCategory = 'eletrica' | 'mecanica' | 'hidraulica' | 'solda' | 'alvenaria';

export interface ServiceDetail {
  id: ServiceCategory;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  accentColor: string;
  badge: string;
  features: string[];
  commonProblems: string[];
  typicalTime: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  beforeImageUrl?: string;
  afterImageUrl: string;
  extraImages?: string[];
  date: string;
  location: string;
  clientName?: string;
  clientReview?: string;
  executionTime?: string;
  featured?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: ServiceCategory | 'outro';
  urgency: 'emergencia' | 'esta_semana' | 'proximos_dias' | 'cotacao';
  description: string;
  address: string;
  date: string;
  status: 'novo' | 'em_contato' | 'orcamento_enviado' | 'fechado' | 'concluido';
  notes?: string;
  estimatedValue?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  service: ServiceCategory;
  serviceLabel: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
  verified: boolean;
  location: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory | 'dicas_gerais';
  categoryLabel: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  readTime: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
}

export interface MonthlyVisit {
  month: string;
  visits: number;
  unique: number;
  whatsappClicks: number;
  leads: number;
}

export interface ServiceDistribution {
  service: string;
  count: number;
  percentage: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface AnalyticsData {
  monthlyVisits: MonthlyVisit[];
  serviceDistribution: ServiceDistribution[];
  trafficSources: TrafficSource[];
  realtimeCounters: {
    totalPageViews: number;
    totalWhatsAppClicks: number;
    totalQuotesRequested: number;
    avgResponseTimeMin: number;
  };
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  googleBusinessName: string;
  googleMapsLink: string;
  serviceArea: string;
  phoneWhatsapp: string;
  emailContact: string;
}
