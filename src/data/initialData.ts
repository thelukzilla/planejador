import {
  AppState,
  BlockConfig,
  ActivityTemplate,
  CodingChallenge,
  Book,
  DocumentaryWeek,
  PersonalTheme,
  BuffMission,
} from '../types';

export const BLOCKS_CONFIG: Record<string, BlockConfig> = {
  base: {
    id: 'base',
    name: 'Base de Estudo',
    tagline: 'Fundamentos escolares, raciocínio lógico e interpretação',
    description: 'Recuperar fundamentos escolares úteis para tecnologia, raciocínio lógico e aprendizagem.',
    accentColor: '#3b82f6', // blue-500
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    badgeText: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50',
    iconName: 'BookOpen',
  },
  carreira: {
    id: 'carreira',
    name: 'Carreira',
    tagline: 'Domínio progressivo de Python e mentalidade dev',
    description: 'Desenvolver domínio progressivo de Python e construir o hábito diário de programar.',
    accentColor: '#10b981', // emerald-500
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    badgeText: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50',
    iconName: 'Code2',
  },
  pessoal: {
    id: 'pessoal',
    name: 'Desenvolvimento Pessoal',
    tagline: 'História, leitura, reflexão e compreensão do mundo',
    description: 'Estimular curiosidade, leitura, reflexão e compreensão da sociedade com foco em História.',
    accentColor: '#a855f7', // purple-500
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    badgeText: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/50',
    iconName: 'Compass',
  },
  buff: {
    id: 'buff',
    name: 'Buff',
    tagline: 'Preparação para oportunidades profissionais',
    description: 'Ações pontuais para portfólio, empregabilidade, inglês e oratória sem sobrecarga.',
    accentColor: '#f59e0b', // amber-500
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    badgeText: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    iconName: 'Zap',
  },
};

export const MOTIVATIONAL_QUOTES = [
  'Você não precisa recuperar três anos em uma semana.',
  'Consistência não é fazer tudo. É conseguir continuar.',
  'Aprender também significa errar e tentar novamente.',
  'O objetivo é construir uma rotina que caiba na sua vida.',
  'Hoje você pode fazer pouco, desde que isso faça sentido.',
  'Um tijolo por dia constrói uma fortaleza com o tempo.',
  'A evolução silenciosa é a mais duradoura.',
  'Não se cobre perfeição. Celebre a presença.',
];

export const DEFAULT_WEEKLY_ACTIVITIES: ActivityTemplate[] = [
  // SEGUNDA-FEIRA (1)
  {
    id: 'act_seg_base',
    blockId: 'base',
    dayOfWeek: 1,
    title: 'Fundamentos de Matemática ou Raciocínio',
    description: 'Revisar conceitos essenciais e resolver pequenos problemas contextualizados.',
    subtasks: ['Revisar porcentagens ou operações', 'Resolver 2 a 3 problemas contextualizados'],
    phase: 'both',
  },
  {
    id: 'act_seg_carreira',
    blockId: 'carreira',
    dayOfWeek: 1,
    title: 'Prática de Python: Conceito & Código',
    description: 'Estudar um tópico da trilha de Python e escrever código sem copiar cegamente.',
    subtasks: ['Estudar 1 conceito da trilha', 'Implementar 1 exercício prático por conta própria'],
    phase: 'both',
  },
  {
    id: 'act_seg_pessoal',
    blockId: 'pessoal',
    dayOfWeek: 1,
    title: 'Leitura Leve',
    description: 'Ler algumas páginas do livro atual com atenção tranquila, sem meta rígida de páginas.',
    subtasks: ['Ler no ritmo confortável', 'Opcional: anotar uma passagem marcante'],
    phase: 'both',
  },

  // TERÇA-FEIRA (2)
  {
    id: 'act_ter_carreira',
    blockId: 'carreira',
    dayOfWeek: 2,
    title: 'Mão no Código: Resolução Prática',
    description: 'Avançar na lista de exercícios ou em um dos desafios de código propostos.',
    subtasks: ['Testar hipóteses e depurar erros', 'Comentar a lógica por escrito'],
    phase: 'both',
  },
  {
    id: 'act_ter_pessoal',
    blockId: 'pessoal',
    dayOfWeek: 2,
    title: 'Leitura Opcional ou Exploração Histórica',
    description: 'Espaço aberto para continuar o livro atual ou pesquisar um tema de interesse pessoal.',
    subtasks: ['Leitura sem compromisso'],
    phase: 'both',
  },

  // QUARTA-FEIRA (3) - Faculdade (Sem exigências dos 4 blocos)
  {
    id: 'act_qua_faculdade',
    blockId: 'base', // categorized cleanly
    dayOfWeek: 3,
    title: 'Dia de Faculdade & Foco Acadêmico',
    description: 'Sem exigência dos quatro blocos do projeto. Priorize suas aulas e trabalhos da faculdade com calma.',
    subtasks: ['Assistir aulas e organizar notas', 'Descansar sem sentimento de culpa'],
    phase: 'both',
  },

  // QUINTA-FEIRA (4)
  {
    id: 'act_qui_base',
    blockId: 'base',
    dayOfWeek: 4,
    title: 'Interpretação e Lógica Matemática',
    description: 'Trabalhar interpretação de enunciados, gráficos ou argumentos estruturados.',
    subtasks: ['Interpretar um gráfico ou problema', 'Explicar a linha de raciocínio'],
    phase: 'both',
  },
  {
    id: 'act_qui_carreira',
    blockId: 'carreira',
    dayOfWeek: 4,
    title: 'Estruturas de Dados e Funções em Python',
    description: 'Fortalecer listas, dicionários, funções ou modularização de código.',
    subtasks: ['Dividir um problema em partes menores', 'Validar saídas esperadas'],
    phase: 'both',
  },

  // SEXTA-FEIRA (5)
  {
    id: 'act_sex_carreira',
    blockId: 'carreira',
    dayOfWeek: 5,
    title: 'Revisão Semanal de Código & Refatoração',
    description: 'Revisitar códigos da semana, limpar variáveis e consolidar o aprendizado.',
    subtasks: ['Revisar soluções anteriores', 'Otimizar ou comentar trechos'],
    phase: 'both',
  },
  {
    id: 'act_sex_buff',
    blockId: 'buff',
    dayOfWeek: 5,
    title: 'Missão Buff da Semana',
    description: 'Ação pontual e objetiva em Portfólio, Empregabilidade, Inglês técnico ou Oratória.',
    subtasks: ['Executar 1 ação prática de valorização profissional'],
    phase: 'both',
  },
  {
    id: 'act_sex_pessoal',
    blockId: 'pessoal',
    dayOfWeek: 5,
    title: 'Leitura Opcional de Sexta',
    description: 'Momento de relaxamento com livro de ficção, filosofia ou história.',
    subtasks: ['Páginas livres'],
    phase: 'both',
  },

  // SÁBADO (6) - Faculdade (Tarde e noite livres)
  {
    id: 'act_sab_faculdade',
    blockId: 'base',
    dayOfWeek: 6,
    title: 'Faculdade (Manhã) — Tarde & Noite Livres',
    description: 'Cumpra seus compromissos acadêmicos. O restante do sábado é inteiramente livre para descanso e lazer.',
    subtasks: ['Atividades acadêmicas', 'Desconexão e recarga'],
    phase: 'both',
  },

  // DOMINGO (7)
  {
    id: 'act_dom_revisao',
    blockId: 'pessoal',
    dayOfWeek: 7,
    title: 'Revisão Leve da Semana & Diário',
    description: 'Avaliar com honestidade e carinho como foi a semana e responder as 3 perguntas de domingo.',
    subtasks: ['Refletir: o que funcionou e o que ajustar', 'Sem culpa por dias em branco'],
    phase: 'both',
  },
  {
    id: 'act_dom_doc',
    blockId: 'pessoal',
    dayOfWeek: 7,
    title: 'Documentário da Semana',
    description: 'Assistir a um documentário histórico ou científico e registrar impressões.',
    subtasks: ['Assistir documentário', 'Anotar o que mais chamou atenção'],
    phase: 'both',
  },
  {
    id: 'act_dom_planejamento',
    blockId: 'buff',
    dayOfWeek: 7,
    title: 'Planejamento da Próxima Semana & Família',
    description: 'Visualizar a próxima semana sem ansiedade e desfrutar do convívio familiar.',
    subtasks: ['Dar uma olhada nos próximos dias', 'Descansar com a família'],
    phase: 'both',
  },
];

export const INITIAL_BASE_STUDY_TOPICS = [
  {
    id: 'mat_fundamentos',
    title: 'Matemática Essencial — Fundamentos',
    description: 'Bases aritméticas indispensáveis para cálculo mental e raciocínio quantitativo',
    topics: [
      { id: 'mat_1', title: 'Quatro operações fundamentais', completed: false },
      { id: 'mat_2', title: 'Ordem das operações (PEMDAS/BODMAS)', completed: false },
      { id: 'mat_3', title: 'Números negativos e jogo de sinais', completed: false },
      { id: 'mat_4', title: 'Frações e equivalências', completed: false },
      { id: 'mat_5', title: 'Números decimais e arredondamentos', completed: false },
      { id: 'mat_6', title: 'Razão e proporção', completed: false },
      { id: 'mat_7', title: 'Regra de três simples e composta', completed: false },
      { id: 'mat_8', title: 'Porcentagens e acréscimos/descontos', completed: false },
    ],
  },
  {
    id: 'mat_algebra',
    title: 'Matemática Essencial — Álgebra',
    description: 'Transição da aritmética para expressões e funções',
    topics: [
      { id: 'alg_1', title: 'Variáveis e expressões algébricas', completed: false },
      { id: 'alg_2', title: 'Equações de 1º grau', completed: false },
      { id: 'alg_3', title: 'Sistemas simples de equações', completed: false },
      { id: 'alg_4', title: 'Introdução conceitual a funções (f(x))', completed: false },
      { id: 'alg_5', title: 'Interpretação e leitura de gráficos cartesianos', completed: false },
    ],
  },
  {
    id: 'mat_logica',
    title: 'Raciocínio Lógico',
    description: 'Estruturação de pensamento analítico e resolução de problemas',
    topics: [
      { id: 'log_1', title: 'Identificação de padrões e regularidades', completed: false },
      { id: 'log_2', title: 'Sequências lógicas numéricas e conceituais', completed: false },
      { id: 'log_3', title: 'Operadores lógicos: E, OU e NÃO', completed: false },
      { id: 'log_4', title: 'Condições, implicações e causa/efeito (Se... então)', completed: false },
      { id: 'log_5', title: 'Decomposição de problemas complexos em partes', completed: false },
      { id: 'log_6', title: 'Conjuntos e operações básicas (união, intersecção)', completed: false },
    ],
  },
  {
    id: 'mat_estatistica',
    title: 'Estatística Introdutória',
    description: 'Leitura de dados da realidade e indicadores',
    topics: [
      { id: 'est_1', title: 'Média aritmética', completed: false },
      { id: 'est_2', title: 'Mediana', completed: false },
      { id: 'est_3', title: 'Moda', completed: false },
      { id: 'est_4', title: 'Amplitude e dispersão inicial', completed: false },
      { id: 'est_5', title: 'Interpretação de tabelas de dados', completed: false },
      { id: 'est_6', title: 'Interpretação crítica de gráficos estatísticos', completed: false },
    ],
  },
  {
    id: 'portugues_interpretacao',
    title: 'Português e Interpretação',
    description: 'Comunicação escrita clara, compreensão textual e raciocínio crítico',
    topics: [
      { id: 'port_1', title: 'Identificar a ideia central de um texto', completed: false },
      { id: 'port_2', title: 'Distinguir com clareza fatos de opiniões', completed: false },
      { id: 'port_3', title: 'Identificar informações relevantes e descartar ruído', completed: false },
      { id: 'port_4', title: 'Interpretar enunciados técnicos e problemas', completed: false },
      { id: 'port_5', title: 'Resumir informações mantendo a fidelidade', completed: false },
      { id: 'port_6', title: 'Desenvolver argumentação coesa e lógica', completed: false },
      { id: 'port_7', title: 'Explicar uma solução ou código por escrito', completed: false },
    ],
  },
];

export const INITIAL_CAREER_LEVELS = [
  {
    id: 'py_lvl_1',
    title: 'Nível 1 — Fundamentos',
    description: 'Construção da base de sintaxe e manipulação de valores fundamentais em Python',
    topics: [
      { id: 'py_1_var', title: 'Variáveis e convenções de nomenclatura', completed: false },
      { id: 'py_1_types', title: 'Tipos de dados primitivos (int, float, str, bool)', completed: false },
      { id: 'py_1_ops', title: 'Operadores aritméticos e de atribuição', completed: false },
      { id: 'py_1_io', title: 'Entrada e saída (input() e print())', completed: false },
      { id: 'py_1_conv', title: 'Conversão de tipos (type casting)', completed: false },
      { id: 'py_1_cond', title: 'Condicionais (if, elif, else)', completed: false },
      { id: 'py_1_logops', title: 'Operadores lógicos (and, or, not)', completed: false },
    ],
  },
  {
    id: 'py_lvl_2',
    title: 'Nível 2 — Controle e Estruturas',
    description: 'Repetição e coleções para processar múltiplos dados',
    topics: [
      { id: 'py_2_for', title: 'Laços for e função range()', completed: false },
      { id: 'py_2_while', title: 'Laços while e controle de fluxo (break, continue)', completed: false },
      { id: 'py_2_list', title: 'Listas e métodos essenciais (append, pop, slice)', completed: false },
      { id: 'py_2_tuple', title: 'Tuplas e imutabilidade', completed: false },
      { id: 'py_2_dict', title: 'Dicionários (chave/valor e métodos úteis)', completed: false },
      { id: 'py_2_set', title: 'Conjuntos (sets) e eliminação de duplicatas', completed: false },
      { id: 'py_2_str', title: 'Manipulação e formatação avançada de strings', completed: false },
    ],
  },
  {
    id: 'py_lvl_3',
    title: 'Nível 3 — Organização e Modularidade',
    description: 'Código limpo, reutilizável e tratamento de falhas',
    topics: [
      { id: 'py_3_func', title: 'Definição de funções (def)', completed: false },
      { id: 'py_3_params', title: 'Parâmetros posicionais, nomeados e default', completed: false },
      { id: 'py_3_return', title: 'Retorno de valores (return vs print)', completed: false },
      { id: 'py_3_scope', title: 'Escopo de variáveis (local vs global)', completed: false },
      { id: 'py_3_mods', title: 'Organização em módulos e imports (standard library)', completed: false },
      { id: 'py_3_except', title: 'Tratamento de exceções (try, except, finally)', completed: false },
      { id: 'py_3_files', title: 'Leitura e escrita de arquivos simples (.txt, .json)', completed: false },
    ],
  },
  {
    id: 'py_lvl_4',
    title: 'Nível 4 — Prática e Raciocínio Algorítmico',
    description: 'Aplicação prática para solucionar problemas do mundo real',
    topics: [
      { id: 'py_4_prob_list', title: 'Resolver problemas práticos com listas', completed: false },
      { id: 'py_4_search', title: 'Buscar valores específicos em coleções', completed: false },
      { id: 'py_4_count', title: 'Contar ocorrências e frequências de dados', completed: false },
      { id: 'py_4_filter', title: 'Filtrar e transformar informações estruturadas', completed: false },
      { id: 'py_4_stats', title: 'Calcular médias, totais e indicadores a partir de listas', completed: false },
      { id: 'py_4_decomp', title: 'Dividir problemas reais em pequenas funções cooperantes', completed: false },
      { id: 'py_4_tests', title: 'Testar soluções com casos extremos e asserts', completed: false },
      { id: 'py_4_debug', title: 'Depurar erros de forma metódica com prints/debugger', completed: false },
    ],
  },
  {
    id: 'py_lvl_5',
    title: 'Nível 5 — Introdução à Orientação a Objetos',
    description: 'Fundamentos de POO para projetos mais robustos',
    topics: [
      { id: 'py_5_class', title: 'Conceito de Classes como moldes de dados e ações', completed: false },
      { id: 'py_5_obj', title: 'Instanciação de Objetos na memória', completed: false },
      { id: 'py_5_attr', title: 'Atributos de instância e de classe', completed: false },
      { id: 'py_5_meth', title: 'Métodos e o parâmetro self', completed: false },
      { id: 'py_5_init', title: 'Construtores (__init__) para inicialização', completed: false },
      { id: 'py_5_encap', title: 'Noções de encapsulamento e privacidade', completed: false },
      { id: 'py_5_comp', title: 'Composição simples entre objetos', completed: false },
    ],
  },
];

export const INITIAL_CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal_1',
    name: 'Calculadora de Descontos e Acréscimos',
    description: 'Programa que recebe valor do produto, tipo de pagamento e aplica regras de desconto ou parcelamento.',
    difficulty: 'Iniciante',
    status: 'Não iniciado',
    notes: 'Excelente para treinar condicionais (if/elif/else) e operações aritméticas com floats.',
  },
  {
    id: 'chal_2',
    name: 'Simulador de Orçamento Mensal',
    description: 'Calcula receitas, despesas categorizadas e indica saldo final com percentuais de gastos essenciais.',
    difficulty: 'Iniciante',
    status: 'Não iniciado',
    notes: 'Prática de listas ou dicionários para armazenar múltiplos lançamentos.',
  },
  {
    id: 'chal_3',
    name: 'Organizador de Tarefas em Linha de Comando',
    description: 'Interface de terminal onde o usuário pode adicionar, listar, marcar e remover tarefas salvas em lista.',
    difficulty: 'Intermediário',
    status: 'Não iniciado',
    notes: 'Ótimo para praticar laços while, menus no terminal e funções de manipulação de lista.',
  },
  {
    id: 'chal_4',
    name: 'Analisador de Vendas Diárias',
    description: 'Processa uma lista de pedidos/vendas e calcula total faturado, ticket médio, produto mais vendido e menor venda.',
    difficulty: 'Intermediário',
    status: 'Não iniciado',
    notes: 'Fortalece raciocínio de contagem, busca e agregação estatística.',
  },
  {
    id: 'chal_5',
    name: 'Sistema Simples de Cadastro de Clientes',
    description: 'Armazena cadastros em dicionários, valida dados de entrada (como e-mail e idade) e salva em arquivo JSON.',
    difficulty: 'Intermediário',
    status: 'Não iniciado',
    notes: 'Integra dicionários, funções de validação e leitura/escrita em arquivo com json.dump.',
  },
  {
    id: 'chal_6',
    name: 'Analisador de Pedidos com Classes (POO)',
    description: 'Modela as classes Item, Pedido e Cliente, calculando subtotal, taxa de entrega e resumo formatado.',
    difficulty: 'Avançado',
    status: 'Não iniciado',
    notes: 'Aplica construtores, métodos de cálculo e composição entre classes.',
  },
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book_1',
    title: 'O Mundo de Sofia',
    author: 'Jostein Gaarder',
    category: 'Filosofia & História',
    status: 'Quero ler',
    totalPages: 560,
    currentPage: 0,
    notes: 'Romance clássico sobre a história da filosofia ocidental de forma acessível e envolvente.',
  },
  {
    id: 'book_2',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    category: 'História & Sociedade',
    status: 'Quero ler',
    totalPages: 464,
    currentPage: 0,
    notes: 'Visão ampla sobre como nossa espécie estruturou mitos, dinheiro, impérios e ciência.',
  },
  {
    id: 'book_3',
    title: 'Entendendo Algoritmos',
    author: 'Aditya Bhargava',
    category: 'Computação & Lógica',
    status: 'Quero ler',
    totalPages: 264,
    currentPage: 0,
    notes: 'Guia ilustrado muito visual e agradável sobre algoritmos fundamentais.',
  },
];

export const INITIAL_DOCUMENTARIES: Record<number, DocumentaryWeek> = {
  1: {
    weekNumber: 1,
    title: 'A Revolução Industrial e o Trabalho Moderno',
    theme: 'História Econômica e Social',
    url: '',
    completed: false,
    keyTakeaway: '',
    followUpResearch: '',
  },
  2: {
    weekNumber: 2,
    title: 'Origens da Computação: De Babbage a Turing',
    theme: 'História da Tecnologia',
    url: '',
    completed: false,
    keyTakeaway: '',
    followUpResearch: '',
  },
  3: {
    weekNumber: 3,
    title: 'A Queda do Muro de Berlim e a Guerra Fria',
    theme: 'História Contemporânea',
    url: '',
    completed: false,
    keyTakeaway: '',
    followUpResearch: '',
  },
};

export const INITIAL_PERSONAL_THEMES: PersonalTheme[] = [
  {
    id: 'thm_1',
    title: 'Revolução Industrial e Sociedade',
    description: 'Como as máquinas a vapor e fábricas transformaram o tempo, o trabalho e a vida urbana.',
    notes: 'Conectar com a ascensão da automação e programação de hoje.',
    status: 'Ativo',
  },
  {
    id: 'thm_2',
    title: 'Formação das Democracias Modernas',
    description: 'Iluminismo, Revolução Francesa e a consolidação de direitos civis e constituições.',
    notes: 'Interesse em entender a separação de poderes e participação cívica.',
    status: 'Ativo',
  },
  {
    id: 'thm_3',
    title: 'História do Brasil Contemporâneo',
    description: 'Da Era Vargas à redemocratização: transformações sociais, migrações e industrialização.',
    notes: 'Compreender as raízes das desigualdades e potencialidades do nosso país.',
    status: 'Ativo',
  },
  {
    id: 'thm_4',
    title: 'Guerra Fria e a Corrida Espacial',
    description: 'Bipolaridade mundial, avanços científicos em semicondutores e a internet.',
    notes: 'Como a disputa geopolítica gerou as sementes da revolução digital.',
    status: 'Ativo',
  },
];

export const INITIAL_BUFF_MISSIONS: BuffMission[] = [
  // Portfólio
  {
    id: 'buff_1',
    category: 'Portfólio',
    title: 'Criar ou revisar o README de um projeto Python',
    description: 'Explicar com clareza o problema resolvido, como executar e o que aprendeu com a solução.',
    completed: false,
  },
  {
    id: 'buff_2',
    category: 'Portfólio',
    title: 'Adicionar validações ou testes simples em projeto existente',
    description: 'Garantir que entradas inválidas não quebrem o código e documentar isso.',
    completed: false,
  },
  // Empregabilidade
  {
    id: 'buff_3',
    category: 'Empregabilidade',
    title: 'Atualizar e enxugar o LinkedIn',
    description: 'Colocar título objetivo focado em desenvolvimento de software e resumir sua jornada de estudos.',
    completed: false,
  },
  {
    id: 'buff_4',
    category: 'Empregabilidade',
    title: 'Mapear 5 empresas da região ou remotas com vagas júnior/estágio',
    description: 'Pesquisar os requisitos mais pedidos (ex: Python, Git, SQL) para calibrar os estudos.',
    completed: false,
  },
  // Inglês
  {
    id: 'buff_5',
    category: 'Inglês',
    title: 'Ler 1 página da documentação oficial do Python em inglês',
    description: 'Anotar 5 termos técnicos novos e seus significados reais.',
    completed: false,
  },
  // Oratória
  {
    id: 'buff_6',
    category: 'Oratória',
    title: 'Explicar em voz alta por 2 minutos como funciona uma função',
    description: 'Como se estivesse ensinando alguém leigo ou respondendo a uma pergunta em entrevista.',
    completed: false,
  },
];

export const INITIAL_APP_STATE: AppState = {
  version: 1,
  settings: {
    userName: 'Billy',
    startDate: new Date().toISOString().split('T')[0], // Today's date YYYY-MM-DD
    theme: 'dark',
    energyMode: 'normal',
  },
  activityOccurrences: {},
  customActivities: [],
  baseStudyTopics: INITIAL_BASE_STUDY_TOPICS,
  careerLevels: INITIAL_CAREER_LEVELS,
  codingChallenges: INITIAL_CODING_CHALLENGES,
  books: INITIAL_BOOKS,
  documentaries: INITIAL_DOCUMENTARIES,
  personalThemes: INITIAL_PERSONAL_THEMES,
  buffMissions: INITIAL_BUFF_MISSIONS,
  reflections: [],
  sundayReviews: {},
};
