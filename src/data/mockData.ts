import { ServiceDetail, Project, Testimonial, BlogPost, SEOSettings, Lead } from '../types';

export const WFA_LOGO_URL = '/assets/aistudio/image_dc0dbf4b.png';
export const WFA_BANNER_IMAGE = '/assets/aistudio/image_3794ec9d_1efb893f.jpg';
export const WFA_PROPRIETARIO_IMAGE = '/assets/aistudio/image_3794ec9d_1efb893f.jpg';
export const WFA_PROPRIETARIO = 'Wellington Silva Nascimento';
export const WFA_EMAIL = 'wellingtonsilvanascimento419@gmail.com';
export const WFA_INSTAGRAM = 'wellingtonsilvanascimento419';
export const WFA_PHONE = '(84) 99673-7378';
export const WFA_PHONE_CLEAN = '5584996737378';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'eletrica',
    name: 'Manutenção Elétrica',
    tagline: 'Segurança, conformidade com a NR-10 e eficiência energética',
    shortDesc: 'Instalação e reparos de quadros de distribuição, disjuntores, chuveiros, fiação, iluminação LED e tomadas.',
    fullDesc: 'Serviços completos em eletricidade residencial, predial e comercial. Executamos desde o diagnóstico de sobrecargas e quedas de energia até a reforma integral de padrões de entrada e cabeamento estruturado, sempre seguindo rigorosamente as normas ABNT NBR 5410.',
    iconName: 'Zap',
    accentColor: 'amber',
    badge: 'Atendimento Rápido 24h',
    features: [
      'Montagem e reorganização de quadro de distribuição (QDC)',
      'Instalação de DR (Diferencial Residual) e DPS contra raios',
      'Troca de fiação antiga com risco de incêndio',
      'Instalação de tomadas 10A e 20A para ar-condicionado e fornos',
      'Substituição de chuveiros e fiação de alta potência',
      'Projetos luminotécnicos e iluminação em fita LED'
    ],
    commonProblems: [
      'Disjuntor desarmando com frequência',
      'Cheiro de queimado nas tomadas ou interruptores',
      'Choque elétrico nas torneiras ou registro do chuveiro',
      'Lâmpadas piscando ou oscilação repentina de voltagem'
    ],
    typicalTime: '1h a 1 dia',
    image: '/assets/aistudio/IMG-20261107-WA0032_b4f7ebd5.jpg'
  },
  {
    id: 'mecanica',
    name: 'Manutenção Mecânica',
    tagline: 'Diagnóstico preciso e máxima disponibilidade de maquinário',
    shortDesc: 'Manutenção preventiva e corretiva de motores, bombas d\'água, redutores, compressores e esteiras industriais.',
    fullDesc: 'Soluções mecânicas especializadas para comércios, pequenas indústrias, condomínios e oficinas. Realizamos substituição de rolamentos, retentores, alinhamento a laser, balanceamento e lubrificação técnica de equipamentos rotativos e prensas.',
    iconName: 'Wrench',
    accentColor: 'blue',
    badge: 'Preventiva & Corretiva',
    features: [
      'Revisão e rebobinamento de motores elétricos trifásicos e monofásicos',
      'Troca de mancais, rolamentos e retentores com sacadores hidráulicos',
      'Manutenção em bombas centrífugas e submersas de condomínio',
      'Reparo em compressores de ar e sistemas pneumáticos',
      'Alinhamento e tensionamento de correias e correntes',
      'Adequação mecânica de segurança (NR-12)'
    ],
    commonProblems: [
      'Ruído excessivo ou vibração anormal no motor',
      'Aquecimento excessivo de carcaça e rolamentos',
      'Perda de pressão em compressores ou bombas d\'água',
      'Travamento intermitente de esteiras ou eixos rotativos'
    ],
    typicalTime: '2h a 3 dias',
    image: '/assets/aistudio/IMG-20261107-WA0028_88cbce11.jpg'
  },
  {
    id: 'hidraulica',
    name: 'Manutenção Hidráulica',
    tagline: 'Solução definitiva para vazamentos, esgoto e pressão d\'água',
    shortDesc: 'Caça-vazamentos, troca de canos PVC/PPR/cobre, desentupimentos, caixas d\'água, pressurizadores e registros.',
    fullDesc: 'Atendimento especializado para conter desperdícios e infiltrações que danificam seu imóvel. Atuamos com tubulações de água potável, água quente (cobre e CPVC), esgoto sanitário, válvulas de descarga Hydra e instalação de bombas pressurizadoras.',
    iconName: 'Droplets',
    accentColor: 'cyan',
    badge: 'Caça-Vazamentos',
    features: [
      'Localização acústica de vazamentos não visíveis',
      'Troca e reparo de válvulas de descarga e caixas acopladas',
      'Substituição de barriletes e colunas de água em prédios',
      'Instalação e higienização de caixas d\'água e boias de alta vazão',
      'Desentupimento técnico de pias, ralos e redes de esgoto',
      'Instalação de pressurizadores para chuveiros com pouca água'
    ],
    commonProblems: [
      'Conta de água subindo sem motivo aparente',
      'Manchas de umidade, mofo ou infiltração nas paredes',
      'Pouca pressão de água nos pontos superiores',
      'Retorno de mau cheiro pelos ralos ou sifões'
    ],
    typicalTime: '1h a 2 dias',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'solda',
    name: 'Soldagem Especializada',
    tagline: 'Resistência mecânica, soldas técnicas e acabamento perfeito',
    shortDesc: 'Solda TIG, MIG/MAG e eletrodo revestido para portões, estruturas metálicas, grades, mezaninos e peças industriais.',
    fullDesc: 'Serralheria e soldagem de precisão em aço carbono, aço inoxidável e ferro fundido. Atendemos desde o conserto de dobradiças e roldanas de portões automáticos até a confecção sob medida de grades, corrimãos, guarda-corpos e reforços estruturais.',
    iconName: 'Flame',
    accentColor: 'orange',
    badge: 'TIG / MIG / Eletrodo',
    features: [
      'Reparo estrutural em portões basculantes e de correr emperrados',
      'Solda de alta resistência em estruturas metálicas e mezaninos',
      'Confecção e conserto de grades de segurança e corrimãos',
      'Recuperação de peças trincadas em aço e ferro fundido',
      'Corte a plasma e acabamento com lixamento fino anti-rebarba',
      'Aplicação de fundo primer anticorrosivo e pintura protetiva'
    ],
    commonProblems: [
      'Portão raspando no chão ou descarrilando',
      'Solda trincada por fadiga ou peso excessivo',
      'Grades soltas ou oxidadas que comprometem a segurança',
      'Peça mecânica metálica quebrada de reposição cara'
    ],
    typicalTime: '2h a 2 dias',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'alvenaria',
    name: 'Alvenaria e Reformas',
    tagline: 'Construção sólida, acabamento fino e obra limpa',
    shortDesc: 'Construção de muros, paredes, contrapiso, reboco, assentamento de porcelanato, reformas e pequenas construções.',
    fullDesc: 'Execução de serviços civis com rigor nas medidas, nivelamento a laser e descarte correto de entulhos. Desde a abertura de vãos para portas e janelas até o revestimento cerâmico impecável em cozinhas e banheiros com argamassa apropriada.',
    iconName: 'Hammer',
    accentColor: 'emerald',
    badge: 'Nivelamento a Laser',
    features: [
      'Levantamento de paredes em tijolo cerâmico ou bloco de concreto',
      'Reboco paulista, massa fina e acabamentos em gesso',
      'Contrapiso nivelado e impermeabilização de lajes e baldrames',
      'Assentamento de porcelanatos em grandes formatos e azulejos',
      'Abertura de vãos, colocação de batentes e vergas estruturais',
      'Construção de churrasqueiras, calçadas e muros de contenção'
    ],
    commonProblems: [
      'Piso estufado, oco ou com rejunte trincado',
      'Trincas e fissuras superficiais ou estruturais nas paredes',
      'Infiltração vinda do solo através do rodapé',
      'Necessidade de remodelar cômodos e derrubar divisórias com segurança'
    ],
    typicalTime: '1 dia a 2 semanas',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Modernização Completa de QDC Residencial',
    category: 'eletrica',
    description: 'Substituição de quadro antigo com fusíveis e fiação de tecido por quadro moderno com barramento pente, 18 disjuntores DIN, DPS Clamper classe II e IDR de proteção contra choques.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    location: 'Vila Mariana - São Paulo, SP',
    date: 'Outubro 2026',
    clientName: 'Dr. Paulo Sampaio',
    clientReview: 'O Fernando explicou detalhadamente o risco da fiação antiga. O serviço foi impecável, organizado e com etiquetas em todos os disjuntores!',
    executionTime: '8 horas',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Troca de Tubulação e Instalação de Pressurizador',
    category: 'hidraulica',
    description: 'Substituição de cano de ferro galvanizado corroído por tubulação Tigre PPR soldada a quente, eliminando vazamento crônico no teto da garagem e aumentando a pressão dos banheiros em 3x.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    location: 'Pinheiros - São Paulo, SP',
    date: 'Setembro 2026',
    clientName: 'Condomínio Residencial Bougainville',
    clientReview: 'Nenhum outro encanador conseguiu achar a origem da infiltração. O Fernando resolveu de primeira e sem quebrar azulejos desnecessários.',
    executionTime: '2 dias',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Reforma Estrutural e Solda MIG de Portão Basculante',
    category: 'solda',
    description: 'Reforço do chassi de sustentação com vigas U em aço carbono, substituição de roldanas rolamentadas blindadas e alinhamento do contrapeso para subida suave sem esforço do motor.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    location: 'Mooca - São Paulo, SP',
    date: 'Outubro 2026',
    clientName: 'Marcos Vinicius',
    clientReview: 'O portão estava quase caindo e travando o carro na garagem. Ficou novinho em folha, silencioso e muito seguro.',
    executionTime: '6 horas',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Assentamento de Porcelanato Retificado e Rodapé',
    category: 'alvenaria',
    description: 'Nivelamento de 65m² de sala e cozinha com contrapiso autonivelante e aplicação de porcelanato 84x84cm com espaçadores niveladores e junta mínima de 1.5mm.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    location: 'Santo André, SP',
    date: 'Novembro 2026',
    clientName: 'Camila & Thiago',
    clientReview: 'Alinhamento espetacular, sem dentes ou desníveis. O Fernando foi super pontual e deixou a casa varrida ao final de cada dia.',
    executionTime: '5 dias',
    featured: true
  },
  {
    id: 'proj-5',
    title: 'Manutenção Preventiva de Bombas de Recalque e Motor',
    category: 'mecanica',
    description: 'Desmontagem, limpeza química, troca de rolamentos SKF e selo mecânico de par de bombas Schneider 3CV que abastecem as caixas superiores de prédio de 12 andares.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    location: 'Tatuapé - São Paulo, SP',
    date: 'Agosto 2026',
    clientName: 'Síndico Renato Oliveira',
    clientReview: 'O barulho das bombas que incomodava o térreo sumiu completamente. Excelente trabalho com laudo técnico entregue ao condomínio.',
    executionTime: '1 dia',
    featured: false
  },
  {
    id: 'proj-6',
    title: 'Instalação de Padrão Trifásico e Entrada Enel',
    category: 'eletrica',
    description: 'Adequação da caixa de entrada de medição trifásica para 100A, tubulação de bengala galvanizada e aterramento com 3 hastes de cobre conforme normas da concessionária.',
    afterImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    location: 'Ipiranga - São Paulo, SP',
    date: 'Julho 2026',
    clientName: 'Oficina Mecânica São Cristóvão',
    executionTime: '1 dia',
    featured: false
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Renato F. Albuquerque',
    role: 'Proprietário Residencial',
    service: 'eletrica',
    serviceLabel: 'Manutenção Elétrica',
    rating: 5,
    comment: 'Tive um curto-circuito em pleno sábado à noite. O Fernando foi extremamente solicito, veio com equipamento profissional e detectou um cabo prensado atrás da tomada. Salvou nosso fim de semana com muita ética no preço!',
    date: 'Há 1 semana',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
    location: 'São Paulo - SP'
  },
  {
    id: 'test-2',
    name: 'Helena Montenegro',
    role: 'Arquiteta e Gestora de Obras',
    service: 'alvenaria',
    serviceLabel: 'Alvenaria e Acabamentos',
    rating: 5,
    comment: 'Trabalho com o Fernando há mais de 3 anos nas minhas reformas de interiores. Nivelamento de contrapiso e assentamento de porcelanato dele é padrão de construtora de luxo. Zero dor de cabeça com prazos.',
    date: 'Há 2 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    verified: true,
    location: 'São Caetano do Sul - SP'
  },
  {
    id: 'test-3',
    name: 'Cláudio Esteves',
    role: 'Gerente Operacional',
    service: 'mecanica',
    serviceLabel: 'Mecânica Industrial',
    rating: 5,
    comment: 'Nossa esteira de transporte parou de rodar com ruído nos rolamentos. O Fernando fez a substituição das peças e o alinhamento com tolerância micrométrica. Maquinário voltou a rodar liso sem parada de produção.',
    date: 'Há 3 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    verified: true,
    location: 'Barueri - SP'
  },
  {
    id: 'test-4',
    name: 'Patrícia Zanin',
    role: 'Dona de Casa',
    service: 'hidraulica',
    serviceLabel: 'Hidráulica & Vazamentos',
    rating: 5,
    comment: 'Nossa conta de água veio o triplo do normal. O Fernando usou o aparelho de caça-vazamento e encontrou o furo exatamente sob a pia da lavanderia. Trocou o trecho e consertou o piso. Profissional nota 10!',
    date: 'Há 1 mês',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    verified: true,
    location: 'Mooca - São Paulo, SP'
  },
  {
    id: 'test-5',
    name: 'Sérgio Varella',
    role: 'Comerciante',
    service: 'solda',
    serviceLabel: 'Soldagem & Serralheria',
    rating: 5,
    comment: 'O portão da minha loja sofreu uma batida de caminhão e entortou a guia. O Fernando veio com a máquina de solda MIG móvel e refez toda a trava com aço reforçado. Ficou mais forte que o original.',
    date: 'Há 1 mês',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    verified: true,
    location: 'Guarulhos - SP'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: '5-sinais-de-sobrecarga-eletrica',
    title: '5 Sinais Críticos de que a Elétrica da sua Casa Está Sobrecarregada',
    category: 'eletrica',
    categoryLabel: 'Elétrica',
    summary: 'Aprenda a identificar fios quentes, disjuntores desarmando e quedas de tensão antes que ocorra um princípio de incêndio.',
    content: `
A rede elétrica é o coração invisível de qualquer residência ou comércio. No entanto, muitas instalações ainda possuem 20 ou 30 anos e não foram dimensionadas para o número de aparelhos modernos como micro-ondas, fritadeiras elétricas (Airfryer), ar-condicionado e carregadores rápidos.

Aqui estão os 5 sinais que merecem sua atenção imediata:

1. **Disjuntores desarmando no horário de pico**: Se ao ligar o chuveiro e o ferro de passar o disjuntor cai, não troque por um disjuntor mais forte sem antes recalcular a bitola da fiação. Isso evita o superaquecimento dos cabos na parede.
2. **Cheiro característico de queimado ou plástico derretido**: Se sentir cheiro de queimado próximo a interruptores ou tomadas, desligue a chave geral. O afrouxamento dos parafusos gera efeito Joule e faíscas.
3. **Placas de tomadas escurecidas ou amareladas**: Mudança de cor na tampa plástica é evidência de temperatura elevada constante.
4. **Luzes que diminuem de intensidade**: Quando o motor da geladeira liga ou o chuveiro é acionado, as luzes da casa não devem vacilar. Oscilações frequentes indicam cabeamento subdimensionado ou conexões frouxas.
5. **Choques leves em eletrodomésticos metálicos**: Choque na carcaça da máquina de lavar ou geladeira indica falta grave de aterramento e ausência de IDR (Interruptor Diferencial Residual).

Se você identificou algum desses itens, solicite uma vistoria técnica com medição térmica preventiva. Segurança não tem preço!
    `,
    coverImageUrl: '/assets/aistudio/IMG-20261107-WA0032_b4f7ebd5.jpg',
    readTime: '4 min',
    author: 'Wellington Silva Nascimento (WFA Metais)',
    date: '02 Nov 2026',
    tags: ['Segurança', 'Prevenção', 'Fiação', 'Disjuntor', 'NBR 5410'],
    views: 842
  },
  {
    id: 'post-2',
    slug: 'como-descobrir-vazamento-oculto',
    title: 'Conta de Água Alta? O Guia Prático para Identificar Vazamentos Ocultos',
    category: 'hidraulica',
    categoryLabel: 'Hidráulica',
    summary: 'Testes simples que você mesmo pode fazer no hidrômetro e nas descargas antes de quebrar qualquer parede.',
    content: `
Um pequeno filete de água de 1 milímetro escorrendo na válvula de descarga pode desperdiçar mais de 2.000 litros de água tratada por dia. Além do prejuízo financeiro na conta mensal da concessionária, vazamentos não contidos causam infiltrações que apodrecem a estrutura de concreto e soltam revestimentos.

Faça estes testes simples em 10 minutos:

- **Teste 1: O Teste do Hidrômetro (Relógio de Água)**
Feche todas as torneiras da casa, desligue aparelhos como máquina de lavar e espere as caixas d'água encherem. Verifique o ponteiro do hidrômetro ou a engrenagem central. Se continuar girando mesmo com tudo fechado, existe vazamento na rede alimentada diretamente pela rua.

- **Teste 2: O Teste da Caixa d'Água**
Feche o registro de entrada da rua e trave a boia da caixa d'água. Marque com um lápis o nível da água. Após 2 horas, confira se o nível baixou. Se baixou, há vazamento nos canos de distribuição interna, pias, chuveiros ou vasos sanitários.

- **Teste 3: O Teste do Pó de Café no Vaso Sanitário**
Jogue um pouco de pó de café ou talco na bacia sanitária. Se o pó for sugado para o fundo sem acionar a descarga, a vedação da válvula Hydra ou da comporta da caixa acoplada está com defeito e precisa de reparo.

Precisando de detecção eletrônica com geofone de ultrassom? Fale conosco para atendimento pontual!
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min',
    author: 'Wellington Silva Nascimento (WFA Metais)',
    date: '28 Out 2026',
    tags: ['Economia de Água', 'Caça Vazamento', 'Manutenção Predial'],
    views: 1120
  },
  {
    id: 'post-3',
    slug: 'solda-tig-mig-ou-eletrodo-diferencas',
    title: 'Solda TIG, MIG ou Eletrodo Revestido: Qual a Melhor para seu Portão ou Estrutura?',
    category: 'solda',
    categoryLabel: 'Soldagem',
    summary: 'Entenda como a escolha do processo de solda afeta a durabilidade, estética e resistência mecânica da sua peça metálica.',
    content: `
Na serralheria e manutenção metálica, não existe um processo único para tudo. Cada técnica possui características de penetração, limpeza de escória e acabamento estético que determinam a qualidade final do serviço.

- **Soldagem MIG/MAG (Arame contínuo com gás)**
Ideal para fabricação e reparo de portões, grades de ferro, tubos de metalon e chapas finas. Produz um cordão de solda rápido, com penetração excelente e quase nenhuma escória, garantindo soldas limpas e com grande resistência à tração.

- **Soldagem TIG (Tungstênio e Gás Inerte)**
É a rainha do acabamento visual e da precisão. Utilizada em aço inoxidável, corrimãos de escada, tubulações de alta pureza e recuperação de carcaças de alumínio. O cordão parece uma escama de peixe perfeita e dispensa desbaste pesado com esmerilhadeira.

- **Eletrodo Revestido (MMA)**
A mais robusta para campo aberto e obras pesadas. Excelente para soldagem de vigas estruturais, perfis de aço carbono grosso e reparos onde há vento ou ferrugem superficial.

Na WFA Metais levamos a melhor técnica e maquinário até você para garantir soldas com máxima resistência e durabilidade!
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min',
    author: 'Wellington Silva Nascimento (WFA Metais)',
    date: '15 Out 2026',
    tags: ['Serralheria', 'Solda MIG', 'Solda TIG', 'Estruturas Metálicas'],
    views: 654
  },
  {
    id: 'post-4',
    slug: 'cuidados-ao-assentar-porcelanato-grande-formato',
    title: 'Porcelanato Grande Formato: Cuidados Essenciais para Não Trincar nem Soltar',
    category: 'alvenaria',
    categoryLabel: 'Alvenaria',
    summary: 'Dicas sobre argamassa AC-III, dupla colagem, niveladores de piso e tempo correto de cura para um acabamento perfeito.',
    content: `
O porcelanato de grandes dimensões (como 80x80cm, 90x90cm ou réguas de 120cm) valoriza qualquer ambiente e cria uma sensação de amplitude fantástica. Porém, por ter baixíssima absorção de água, exige técnicas de assentamento muito mais rigorosas que a cerâmica tradicional.

Confira as boas práticas que adotamos em nossas obras:

1. **Uso obrigatório de Argamassa AC-III**: Nunca use AC-I ou AC-II em porcelanatos. A argamassa AC-III possui polímeros de alta aderência química necessários para reter a placa vitrificada.
2. **Método da Dupla Colagem**: Em peças acima de 30x30cm, deve-se passar a desempenadeira dentada no contrapiso e também no verso da peça (tardoz), com cordões paralelos. Isso garante 100% de preenchimento e evita peças ocas que quebram ao pisar com salto ou móvel pesado.
3. **Clipes Niveladores com Cunha**: Essenciais para garantir que não haja "dentes" entre as placas, propiciando um piso perfeitamente plano ao tato.
4. **Respeito às Juntas de Dilatação**: Nunca assente porcelanato colado sem junta. Mesmo o porcelanato retificado precisa de pelo menos 1mm a 2mm para absorver a expansão térmica natural da edificação.

Planeje sua reforma com a equipe da WFA Metais e cuide de cada detalhe com nivelamento e acabamento primoroso!
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min',
    author: 'Wellington Silva Nascimento (WFA Metais)',
    date: '04 Out 2026',
    tags: ['Reforma', 'Pisos', 'Porcelanato', 'Alvenaria Fina'],
    views: 930
  }
];

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  metaTitle: 'WFA Metais – Serralheria em Geral | Grades, Portões, Estruturas e Soldas',
  metaDescription: 'WFA Metais: Serralheria em geral com qualidade, resistência e compromisso com você! Solicite seu orçamento com Wellington Silva Nascimento via WhatsApp.',
  keywords: 'WFA Metais, serralheria, grades, portoes, estruturas metalicas, soldas em geral, servicos personalizados, Wellington Silva Nascimento, serralheiro, soldador',
  canonicalUrl: 'https://wfametais.com.br',
  googleBusinessName: 'WFA Metais - Serralheria em Geral',
  googleMapsLink: 'https://maps.google.com/?q=WFA+Metais',
  serviceArea: 'Atendimento Especializado em Serralheria e Manutenção',
  phoneWhatsapp: '+55 (84) 99673-7378',
  emailContact: 'wellingtonsilvanascimento419@gmail.com'
};
