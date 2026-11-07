import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for server runtime (synced with client)
let leadsStore = [
  {
    id: 'lead-1',
    name: 'Carlos Alberto Mendes',
    phone: '(11) 98123-4567',
    email: 'carlos.mendes@email.com',
    service: 'eletrica',
    urgency: 'emergencia',
    description: 'Quadro de distribuição desarmando toda hora ao ligar o chuveiro e o forno elétrico.',
    address: 'Vila Mariana, São Paulo - SP',
    date: '2026-11-05 14:30',
    status: 'novo',
    notes: 'Cliente precisa de vistoria urgente hoje se possível.',
    estimatedValue: 'R$ 450 - R$ 800'
  },
  {
    id: 'lead-2',
    name: 'Mariana Duarte Silva',
    phone: '(11) 97234-8901',
    email: 'mariana.duarte@empresa.com.br',
    service: 'hidraulica',
    urgency: 'esta_semana',
    description: 'Troca de tubulação antiga de água fria e instalação de nova caixa d\'água de 1000L.',
    address: 'Pinheiros, São Paulo - SP',
    date: '2026-11-04 10:15',
    status: 'orcamento_enviado',
    notes: 'Orçamento detalhado enviado via WhatsApp. Aguardando aprovação de condomínio.',
    estimatedValue: 'R$ 1.850,00'
  },
  {
    id: 'lead-3',
    name: 'Oficina & Transportes Rocha',
    phone: '(11) 99345-6712',
    email: 'contato@rochatransp.com.br',
    service: 'mecanica',
    urgency: 'proximos_dias',
    description: 'Manutenção preventiva e troca de rolamentos do motor de esteira de carga.',
    address: 'Barueri, SP',
    date: '2026-11-02 16:45',
    status: 'fechado',
    notes: 'Serviço agendado para terça-feira às 08:00.',
    estimatedValue: 'R$ 2.400,00'
  },
  {
    id: 'lead-4',
    name: 'Roberto Fagundes',
    phone: '(11) 98456-1122',
    email: 'rfagundes@outlook.com',
    service: 'solda',
    urgency: 'esta_semana',
    description: 'Reforço estrutural com solda MIG em portão basculante de garagem e grade de proteção.',
    address: 'Mooca, São Paulo - SP',
    date: '2026-10-29 11:20',
    status: 'concluido',
    notes: 'Serviço finalizado com sucesso. Cliente avaliou com 5 estrelas.',
    estimatedValue: 'R$ 750,00'
  },
  {
    id: 'lead-5',
    name: 'Juliana Pires',
    phone: '(11) 97567-3344',
    email: 'juliana.pires@gmail.com',
    service: 'alvenaria',
    urgency: 'cotacao',
    description: 'Construção de muro divisório de 18 metros e reboco em área externa.',
    address: 'Santana, São Paulo - SP',
    date: '2026-10-25 09:00',
    status: 'em_contato',
    notes: 'Visita técnica realizada para medição e compra de materiais.',
    estimatedValue: 'R$ 3.200,00'
  }
];

// Analytics metrics counter
let analyticsData = {
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
};

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Setup Gemini client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client:', err);
    }
  }

  // --- API: Chatbot Inteligente com Gemini ---
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem inválida' });
    }

    const systemInstruction = `Você é o Assistente Virtual Oficial da "WFA MultiServiços", empresa liderada por Fernando Franzo, prestador de serviços especialista com mais de 10 anos de experiência em:
1. Manutenção Elétrica: instalações, quadros de distribuição, iluminação, tomadas, disjuntores, chuveiros, laudos e padrão de entrada.
2. Manutenção Mecânica: corretiva e preventiva de motores, bombas, esteiras, redutores, compressores e maquinário geral.
3. Manutenção Hidráulica: vazamentos em geral, troca de canos, desentupimentos, caixas d'água, torneiras, registros, esgoto e pressurizadores.
4. Soldagem Especializada: solda TIG, MIG/MAG e eletrodo revestido, portões, estruturas metálicas, grades, corrimãos e conserto de peças.
5. Alvenaria e Reformas: construção de muros, paredes, reboco, contrapiso, assentamento de pisos e porcelanatos, reformas e acabamentos.

Instruções fundamentais:
- Responda sempre em Português do Brasil com tom profissional, prestativo, confiante e ágil.
- Seja objetivo e claro (1 a 3 parágrafos curtos).
- Se o usuário relatar uma emergência (ex: fumaça no quadro elétrico, cano estourado inundando casa, portão caído), oriente o primeiro passo de segurança (ex: desligar disjuntor geral ou registro de água) e instrua a chamar imediatamente pelo botão do WhatsApp de emergência!
- Quando apropriado, informe que os orçamentos da WFA são transparentes, com garantia do serviço, emissão de nota/recibo e atendimento pontual.
- Convide o cliente a enviar fotos pelo WhatsApp ou agendar uma visita técnica sem compromisso com a WFA.`;

    // Try Gemini API if available
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
          },
        });

        const replyText = response.text || 'Olá! Como posso ajudar você hoje com seus reparos ou reformas?';
        return res.json({ reply: replyText });
      } catch (err: any) {
        console.error('Erro ao chamar Gemini:', err?.message || err);
        // Fall back to rule-based response
      }
    }

    // Intelligent Technical Fallback when API key is not present or rate limited
    const lower = message.toLowerCase();
    let fallbackReply = '';

    if (lower.includes('eletric') || lower.includes('luz') || lower.includes('chuveiro') || lower.includes('disjuntor') || lower.includes('curto') || lower.includes('tomada')) {
      fallbackReply = 'Na parte de Elétrica, a WFA realiza desde troca de disjuntores, chuveiros e fiação até montagem e adequação completa de quadros de distribuição com segurança e padrão técnico. Para casos urgentes de curto ou cheiro de queimado, desligue o disjuntor geral e nos chame no WhatsApp para atendimento prioritário!';
    } else if (lower.includes('hidraul') || lower.includes('vazamento') || lower.includes('cano') || lower.includes('agua') || lower.includes('água') || lower.includes('torneira') || lower.includes('esgoto')) {
      fallbackReply = 'Em Hidráulica, a WFA atende localização e conserto de vazamentos, substituição de tubulações, instalação e limpeza de caixas d\'água, registros e pressurizadores. Se houver vazamento contínuo, feche o registro geral e clique no botão do WhatsApp da WFA para agendarmos uma visita rápida!';
    } else if (lower.includes('solda') || lower.includes('portao') || lower.includes('portão') || lower.includes('grade') || lower.includes('ferro') || lower.includes('estrutura')) {
      fallbackReply = 'A WFA trabalha com soldagem profissional TIG, MIG e eletrodo para recuperação e fabricação de portões basculantes, grades, corrimãos, suportes e estruturas metálicas com acabamento de primeira e alta resistência mecânica. Envie fotos da peça pelo WhatsApp para avaliarmos!';
    } else if (lower.includes('alvenaria') || lower.includes('obra') || lower.includes('reforma') || lower.includes('piso') || lower.includes('muro') || lower.includes('reboco') || lower.includes('azulejo')) {
      fallbackReply = 'Nossos serviços de alvenaria cobrem reformas completas, construção de muros, paredes, reboco, contrapiso, colocação de pisos e porcelanatos com nivelamento perfeito. A WFA fornece lista detalhada de materiais e cronograma de execução!';
    } else if (lower.includes('mecanic') || lower.includes('motor') || lower.includes('bomba') || lower.includes('maquina') || lower.includes('máquina') || lower.includes('rolamento')) {
      fallbackReply = 'Em Manutenção Mecânica, a WFA realiza revisão preventiva e corretiva de motores elétricos, bombas d\'água, esteiras, redutores e equipamentos mecânicos comerciais e industriais. Efetuamos troca de rolamentos, alinhamento e lubrificação técnica.';
    } else if (lower.includes('orçamento') || lower.includes('orcamento') || lower.includes('preco') || lower.includes('preço') || lower.includes('valor') || lower.includes('quanto custa') || lower.includes('visita')) {
      fallbackReply = 'Os serviços da WFA contam com transparência e garantia formal! Para avaliação no seu imóvel, agendamos uma visita técnica presencial. Clique no botão "Agendar Visita Técnica" no site ou nos envie uma mensagem no WhatsApp!';
    } else if (lower.includes('garantia') || lower.includes('nota') || lower.includes('recibo') || lower.includes('confia')) {
      fallbackReply = 'Todos os serviços da WFA contam com garantia formal de mão de obra, emissão de Nota Fiscal ou recibo profissional, cumprimento rigoroso de prazos e cumprimento das normas técnicas brasileiras (ABNT/NR10).';
    } else {
      fallbackReply = 'Olá! Sou o assistente da WFA MultiServiços. Somos especialistas em Elétrica, Mecânica, Hidráulica, Soldagem e Alvenaria. Você precisa de um reparo emergencial, quer agendar uma visita técnica ou tirar uma dúvida sobre seu projeto? Fale comigo ou clique no botão do WhatsApp para falar diretamente com nossa equipe!';
    }

    return res.json({ reply: fallbackReply });
  });

  // --- API: Leads & Orçamentos ---
  app.get('/api/leads', (_req, res) => {
    return res.json(leadsStore);
  });

  app.post('/api/leads', (req, res) => {
    const { name, phone, email, service, urgency, description, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email: email || '',
      service: service || 'eletrica',
      urgency: urgency || 'esta_semana',
      description: description || '',
      address: address || '',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'novo',
      notes: 'Lead recebido através do site.',
      estimatedValue: 'A definir'
    };

    leadsStore.unshift(newLead);
    analyticsData.realtimeCounters.totalQuotesRequested += 1;

    return res.status(201).json(newLead);
  });

  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes, estimatedValue } = req.body;

    const leadIndex = leadsStore.findIndex((l) => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    if (status) leadsStore[leadIndex].status = status;
    if (notes !== undefined) leadsStore[leadIndex].notes = notes;
    if (estimatedValue !== undefined) leadsStore[leadIndex].estimatedValue = estimatedValue;

    return res.json(leadsStore[leadIndex]);
  });

  app.delete('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    leadsStore = leadsStore.filter((l) => l.id !== id);
    return res.json({ success: true });
  });

  // --- API: Relatórios de Desempenho & Analytics ---
  app.get('/api/analytics', (_req, res) => {
    return res.json(analyticsData);
  });

  app.post('/api/analytics/track', (req, res) => {
    const { eventType } = req.body;
    if (eventType === 'whatsapp_click') {
      analyticsData.realtimeCounters.totalWhatsAppClicks += 1;
    } else if (eventType === 'page_view') {
      analyticsData.realtimeCounters.totalPageViews += 1;
    }
    return res.json({ success: true, counters: analyticsData.realtimeCounters });
  });

  // Vite development mode integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WFA MultiServiços running at http://localhost:${PORT}`);
  });
}

startServer();
