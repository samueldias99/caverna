export interface Quote {
  id: string;
  text: string;
  author: string;
  authorSlug: string;
  source: string;
  theme: 'Disciplina' | 'Morte' | 'Ansiedade' | 'Resiliência' | 'Autocontrole' | 'Virtude' | 'Relacionamentos' | 'Trabalho' | 'Dinheiro' | 'Adversidade' | 'Tempo' | 'Felicidade';
  context: string;
  practicalAction?: string;
  isVerified: boolean;
}

export interface Philosopher {
  slug: string;
  name: string;
  latinName?: string;
  period: string;
  role: string;
  bio: string;
  history: string[];
  keyTeachings: string[];
  classicWorks: { title: string; originalTitle?: string; description: string }[];
  quotes: Quote[];
  portraitPrompt?: string;
  recommendedBookSlugs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readTimeMinutes: number;
  author: string;
  theme: 'Disciplina' | 'Morte' | 'Ansiedade' | 'Resiliência' | 'Autocontrole' | 'Virtude' | 'Relacionamentos' | 'Trabalho' | 'Dinheiro' | 'Adversidade' | 'Tempo' | 'Felicidade';
  date: string;
  content: string;
  practicalExercise: {
    title: string;
    description: string;
    steps: string[];
  };
  recommendedBookSlugs: string[];
  relatedPostSlugs: string[];
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  originalPhilosopher?: string;
  badge: 'Clássico Fundamental' | 'Leitura Essencial' | 'Prática Moderna' | 'Biografia Filosófica';
  description: string;
  targetAudience: string;
  themes: string[];
  connectionToStoicism: string;
  amazonUrl: string;
  rating: number;
  pages: number;
}

export interface DailyReflection {
  id: string;
  dateStr: string;
  quote: Quote;
  reflection: string;
  historicalContext: string;
  dailyAction: string;
}

export interface NewsletterEdition {
  issueNumber: number;
  title: string;
  date: string;
  summary: string;
  reflection: string;
  quote: {
    text: string;
    author: string;
    source: string;
  };
  exercise: string;
  questionToPonder: string;
  readingSuggestion: string;
}

export const themesList = [
  'Disciplina',
  'Morte',
  'Ansiedade',
  'Resiliência',
  'Autocontrole',
  'Virtude',
  'Relacionamentos',
  'Trabalho',
  'Dinheiro',
  'Adversidade',
  'Tempo',
  'Felicidade'
] as const;

export const books: Book[] = [
  {
    slug: 'meditacoes-marco-aurelio',
    title: 'Meditações',
    subtitle: 'Edição comentada com introdução histórica e notas',
    author: 'Marco Aurélio',
    originalPhilosopher: 'Marco Aurélio',
    badge: 'Clássico Fundamental',
    description: 'O diário íntimo do imperador mais poderoso do mundo ocidental, escrito em tendas de campanha militar na fronteira do Danúbio. Sem intenção de publicação, Marco Aurélio conversa consigo mesmo sobre o dever, a brevidade da vida, a calma perante as intrigas políticas e a constante vigilância da mente.',
    targetAudience: 'Leitores que buscam clareza mental, liderança ética, serenidade sob pressão e uma introdução direta aos pensamentos originais de um praticante estoico.',
    themes: ['Autocontrole', 'Virtude', 'Morte', 'Disciplina', 'Trabalho'],
    connectionToStoicism: 'É a bíblia pessoal do estoicismo imperial. Mostra a filosofia aplicada não em uma torre de marfim, mas no ápice da responsabilidade de governar Roma durante guerras e pragas.',
    amazonUrl: 'https://www.amazon.com.br/dp/859508544X?tag=cavernadoestoico-20',
    rating: 4.9,
    pages: 208
  },
  {
    slug: 'cartas-de-um-estoico',
    title: 'Cartas de um Estoico',
    subtitle: 'Epístolas Morais a Lucílio (Volumes I, II e III)',
    author: 'Sêneca',
    originalPhilosopher: 'Sêneca',
    badge: 'Leitura Essencial',
    description: 'Uma das correspondências mais ricas da história da literatura universal. Nas cartas enviadas a seu amigo Lucílio, Sêneca aborda problemas humanos imediatos: a inveja, o apego às riquezas, o medo da doença e da morte, e a sublime importância da amizade leal e da serenidade cotidiana.',
    targetAudience: 'Quem aprecia prosa literária primorosa, conselhos íntimos, reflexões sobre maturidade emocional e discernimento sobre o uso do tempo.',
    themes: ['Tempo', 'Ansiedade', 'Relacionamentos', 'Morte', 'Felicidade'],
    connectionToStoicism: 'A mais elegante e pedagógica porta de entrada para a psicologia estoica romana, combinando estilo refinado com sabedoria prática imediata.',
    amazonUrl: 'https://www.amazon.com.br/dp/8595086888?tag=cavernadoestoico-20',
    rating: 4.8,
    pages: 352
  },
  {
    slug: 'sobre-a-brevidade-da-vida',
    title: 'Sobre a Brevidade da Vida',
    subtitle: 'Consolação a Minha Mãe Helvia & Da Tranquilidade da Alma',
    author: 'Sêneca',
    originalPhilosopher: 'Sêneca',
    badge: 'Clássico Fundamental',
    description: 'O texto definitivo sobre gestão da existência. Sêneca demonstra que a vida não é curta; nós é que desperdiçamos grande parte dela em futilidades, ambições cegas e ocupações vazias que nada acrescentam ao nosso bem maior.',
    targetAudience: 'Pessoas sobrecarregadas, que sentem que os dias voam sem sentido ou que vivem adiando a verdadeira vida para um futuro incerto.',
    themes: ['Tempo', 'Trabalho', 'Felicidade', 'Autocontrole'],
    connectionToStoicism: 'Um manifesto contundente sobre o valor do tempo presente e o perigo de viver como se fossemos eternos.',
    amazonUrl: 'https://www.amazon.com.br/dp/8582850937?tag=cavernadoestoico-20',
    rating: 4.8,
    pages: 112
  },
  {
    slug: 'manual-de-epicteto',
    title: 'Manual de Epicteto & A Arte de Viver',
    subtitle: 'Encheiridion e fragmentos dos Discursos',
    author: 'Epicteto (compilado por Arriano)',
    originalPhilosopher: 'Epicteto',
    badge: 'Clássico Fundamental',
    description: 'Um guia prático de bolso para quem vive no mundo real. Epicteto, ex-escravo que sobreviveu à violência e ao banimento, ensina com rigor lógico que nossa liberdade reside unicamente na distinção entre o que depende de nós e o que escapa à nossa vontade.',
    targetAudience: 'Quem busca resiliência diante de injustiças, superação de traumas, autocontrole inabalável e redução radical da ansiedade.',
    themes: ['Autocontrole', 'Ansiedade', 'Resiliência', 'Liberdade', 'Disciplina'],
    connectionToStoicism: 'A pedra angular da dicotomia do controle estoica. Texto direto, conciso, contundente e desprovido de rodeios teóricos.',
    amazonUrl: 'https://www.amazon.com.br/dp/8582850945?tag=cavernadoestoico-20',
    rating: 4.9,
    pages: 144
  },
  {
    slug: 'o-obstaculo-e-o-caminho',
    title: 'O Obstáculo É o Caminho',
    subtitle: 'A arte milenar de transformar adversidade em vantagem',
    author: 'Ryan Holiday',
    originalPhilosopher: 'Marco Aurélio & Estoicos',
    badge: 'Prática Moderna',
    description: 'Inspirado na célebre máxima de Marco Aurélio — "O impedimento à ação avança a ação. O que está no caminho torna-se o caminho" —, este livro examina como grandes figuras históricas transformaram crises devastadoras em seus maiores triunfos.',
    targetAudience: 'Empreendedores, estudantes, atletas e profissionais enfrentando reveses, bloqueios ou fases de crise aguda.',
    themes: ['Adversidade', 'Resiliência', 'Disciplina', 'Trabalho'],
    connectionToStoicism: 'Uma moderna ponte de acesso que traduz conceitos antigos de Amor Fati e perseverança em exemplos práticos e contemporâneos.',
    amazonUrl: 'https://www.amazon.com.br/dp/8580577907?tag=cavernadoestoico-20',
    rating: 4.7,
    pages: 224
  },
  {
    slug: 'o-diario-estoico',
    title: 'O Diário Estoico',
    subtitle: '366 meditações sobre sabedoria, perseverança e a arte de viver',
    author: 'Ryan Holiday e Stephen Hanselman',
    originalPhilosopher: 'Tradição Estoica',
    badge: 'Prática Moderna',
    description: 'Um companheiro diário organizado em 366 passagens traduzidas diretamente de Marco Aurélio, Sêneca, Epicteto, Musônio Rufo e Zenão, acompanhadas de reflexões práticas contemporâneas para cada dia do ano.',
    targetAudience: 'Leitores que desejam criar o hábito de leitura e reflexão matinal diária em pequenas doses consistentes.',
    themes: ['Disciplina', 'Felicidade', 'Virtude', 'Tempo'],
    connectionToStoicism: 'Ideal para quem deseja incorporar o estoicismo como uma disciplina diária de 5 minutos pela manhã ou à noite.',
    amazonUrl: 'https://www.amazon.com.br/dp/8551006155?tag=cavernadoestoico-20',
    rating: 4.9,
    pages: 416
  },
  {
    slug: 'como-pensar-como-um-imperador-romano',
    title: 'Como Pensar Como um Imperador Romano',
    subtitle: 'A sabedoria estoica de Marco Aurélio para os dias de hoje',
    author: 'Donald Robertson',
    originalPhilosopher: 'Marco Aurélio',
    badge: 'Biografia Filosófica',
    description: 'Escrito por um psicoterapeuta cognitivo-comportamental, a obra entrelaça a biografia dramática de Marco Aurélio com técnicas modernas da TCC (Terapia Cognitivo-Comportamental), provando a base científica dos exercícios estoicos.',
    targetAudience: 'Quem deseja compreender o rigor psicológico do estoicismo e aprender técnicas comprovadas contra ansiedade, raiva e dor.',
    themes: ['Ansiedade', 'Autocontrole', 'Resiliência', 'Virtude'],
    connectionToStoicism: 'Demonstra a profunda conexão genealógica entre o estoicismo antigo e a psicologia clínica moderna.',
    amazonUrl: 'https://www.amazon.com.br/dp/8542217646?tag=cavernadoestoico-20',
    rating: 4.8,
    pages: 304
  },
  {
    slug: 'a-quietude-e-a-chave',
    title: 'A Quietude É a Chave',
    subtitle: 'Sua melhor estratégia para enfrentar o ritmo alucinante da vida moderna',
    author: 'Ryan Holiday',
    originalPhilosopher: 'Sêneca e Tradição Filosófica',
    badge: 'Prática Moderna',
    description: 'Examina a arte estoica da ataraxia (imperturbabilidade da mente). Em um mundo ruidoso e hiperconectado, a habilidade de cultivar silêncio interior, desacelerar e pensar com profundidade torna-se a vantagem competitiva e existencial definitiva.',
    targetAudience: 'Pessoas com estafa mental, fadiga de decisão e dificuldade em silenciar o ruído constante do mundo digital.',
    themes: ['Ansiedade', 'Autocontrole', 'Tempo', 'Felicidade'],
    connectionToStoicism: 'Um hino à serenidade mental, explorando corpo, mente e espírito sob a ótica da contenção estoica.',
    amazonUrl: 'https://www.amazon.com.br/dp/8551006090?tag=cavernadoestoico-20',
    rating: 4.8,
    pages: 272
  }
];

export const philosophers: Philosopher[] = [
  {
    slug: 'marco-aurelio',
    name: 'Marco Aurélio',
    latinName: 'Marcus Aurelius Antoninus',
    period: '121 d.C. – 180 d.C.',
    role: 'Imperador Romano e Filósofo Estoico',
    bio: 'Último dos Cinco Bons Imperadores de Roma, governou com integridade moral exemplar durante guerras na Germânia e a devastadora Peste Antonina.',
    history: [
      'Marco Aurélio nasceu em Roma em 121 d.C. e foi adotado pelo imperador Antonino Pio a pedido de Adriano, que reconheceu no jovem uma integridade e seriedade incomuns. Ele assumiu o comando do maior império do mundo em 161 d.C., dividindo inicialmente o trono com seu irmão adotivo Lúcio Vero.',
      'Ao contrário da imagem habitual de imperadores sanguinários ou indulgentes, Marco Aurélio via o poder como um fardo cívico que exigia retidão inabalável. Ele passou quase metade de seu reinado em acampamentos militares lamacentos ao longo do rio Danúbio, defendendo as fronteiras romanas contra tribos germânicas.',
      'Foi nessas noites solitárias de vigília que escreveu "Meditações" (cujo título grego original era Ta Eis Heauton, "Coisas para si mesmo"). Jamais concebido para publicação, o livro é um autoexame implacável onde o imperador lembrava a si mesmo da efemeridade da glória, do dever para com a humanidade e da necessidade de não se deixar corromper pelo orgulho.'
    ],
    keyTeachings: [
      'O universo é mudança; nossa vida é o que nossos pensamentos fazem dela.',
      'Não perca mais tempo discutindo sobre o que um homem virtuoso deve ser. Seja um.',
      'As ações dos outros não podem ferir sua alma, a não ser que você concorde em ser ferido.',
      'Trate a todos com benevolência humana, lembrando que os erros nascem da ignorância do bem.'
    ],
    classicWorks: [
      {
        title: 'Meditações (Ta Eis Heauton)',
        originalTitle: 'Τὰ εἰς ἑαυτόν',
        description: 'Coleção de notas íntimas dividida em 12 livros, escritas entre 170 e 180 d.C., revelando os combates internos de um líder que lutava diariamente para manter sua alma pura.'
      }
    ],
    recommendedBookSlugs: ['meditacoes-marco-aurelio', 'como-pensar-como-um-imperador-romano', 'o-obstaculo-e-o-caminho'],
    quotes: []
  },
  {
    slug: 'seneca',
    name: 'Sêneca',
    latinName: 'Lucius Annaeus Seneca',
    period: 'c. 4 a.C. – 65 d.C.',
    role: 'Estadista, Dramaturgo e Mestre Estoico Romano',
    bio: 'Uma das mentes mais brilhantes e versáteis de Roma, conselheiro imperial, cujos ensaios e epístolas permanecem como o auge da prosa prática estoica.',
    history: [
      'Nascido em Córdoba (atual Espanha) e educado em Roma nas artes da retórica e filosofia, Lúcio Aneu Sêneca alcançou rápida notoriedade no Senado Romano. Enfrentou crises de asma crônica, exílio forçado de oito anos na Córsega sob o imperador Cláudio e o desafio monumental de orientar o jovem imperador Nero.',
      'A vida de Sêneca foi marcada por contradições fascinantes: embora acumulasse vasta fortuna e circulasse na corte imperial mais perigosa de Roma, insistia que o sábio deve usar a riqueza sem ser possuído por ela. Seu pensamento é eminentemente terapêutico: ensina a acalmar a raiva, encarar a pobreza com serenidade e não desperdiçar o bem mais precioso: o tempo.',
      'Em 65 d.C., acusado injustamente de conspirar contra Nero, Sêneca recebeu a ordem de tirar a própria vida. Diante de familiares e amigos desesperados, ele manteve a serenidade estoica, lembrando-os de que a filosofia não era um discurso estéril, mas uma preparação corajosa para a dignidade perante a morte.'
    ],
    keyTeachings: [
      'Sofremos mais frequentemente na imaginação do que na realidade.',
      'Não temos pouco tempo de vida, mas desperdiçamos a maior parte dele em coisas sem valor.',
      'A verdadeira riqueza consiste em ter poucas necessidades, não em acumular posses insaciáveis.',
      'A amizade verdadeira é um refúgio da alma; confie inteiramente no amigo após deliberar bem.'
    ],
    classicWorks: [
      {
        title: 'Cartas Morais a Lucílio (Epistulae Morales ad Lucilium)',
        description: '124 epístolas ricas em reflexões éticas e conselhos práticos para a maturidade interior.'
      },
      {
        title: 'Sobre a Brevidade da Vida (De Brevitate Vitae)',
        description: 'Ensaio indispensável demonstrando que a vida é suficientemente longa quando bem aproveitada.'
      },
      {
        title: 'Sobre a Ira (De Ira)',
        description: 'Tratado profundo sobre os malefícios da raiva desenfreada e técnicas práticas para desarmá-la.'
      }
    ],
    recommendedBookSlugs: ['cartas-de-um-estoico', 'sobre-a-brevidade-da-vida', 'a-quietude-e-a-chave'],
    quotes: []
  },
  {
    slug: 'epicteto',
    name: 'Epicteto',
    latinName: 'Epictetus',
    period: 'c. 50 d.C. – c. 135 d.C.',
    role: 'Filósofo Grego e Professor da Liberdade Interior',
    bio: 'Nascido escravo na Frígia, conquistou a liberdade pelo poder do intelecto e fundou a escola estoica mais influente da antiguidade em Nicópolis.',
    history: [
      'Epicteto nasceu em Hierápolis (atual Turquia) como escravo pertencente a Epafrodito, um secretário administrativo da corte de Nero. Durante a escravidão suportou maus-tratos que o deixaram coxo para sempre, mas teve permissão para estudar com o ilustre mestre estoico Musônio Rufo.',
      'Após ser libertado por volta da morte de Nero, começou a ensinar filosofia em Roma. Quando o imperador Domiciano baniu todos os filósofos da península itálica em 93 d.C., Epicteto transferiu-se para Nicópolis, na Grécia, onde fundou uma escola que atraiu cidadãos, magistrados e futuros líderes de todo o império mediterrâneo.',
      'Ele não escreveu nenhum livro; o legado que conhecemos foi transcrito por seu discípulo Arriano nos "Discursos" e sintetizado no célebre "Manual" (Encheiridion), que serviu de bússola para Marco Aurélio e séculos de pensadores.'
    ],
    keyTeachings: [
      'A dicotomia do controle: existem coisas que dependem de nós (opiniões, impulsos, desejos, repulsas) e coisas que não dependem (corpo, posses, reputação, o destino).',
      'Não são os acontecimentos que perturbam o homem, mas o julgamento que ele faz dos acontecimentos.',
      'Apenas o instruído é verdadeiramente livre.',
      'Se alguém disser que você foi insultado, responda que ele desconhece seus outros defeitos, senão mencionaria mais.'
    ],
    classicWorks: [
      {
        title: 'Manual de Epicteto (Encheiridion)',
        originalTitle: 'Ἐγχειρίδιον',
        description: 'Síntese concisa de 53 axiomas práticos, concebida para ser carregada como uma adaga defensiva para a alma.'
      },
      {
        title: 'Discursos (Diatribai)',
        description: 'Quatro livros de aulas e diálogos vivos preservados por Arriano, cobrindo o combate cotidiano com as ilusões da mente.'
      }
    ],
    recommendedBookSlugs: ['manual-de-epicteto', 'o-obstaculo-e-o-caminho', 'o-diario-estoico'],
    quotes: []
  },
  {
    slug: 'zenao-de-citio',
    name: 'Zenão de Cítio',
    latinName: 'Zeno Citieus',
    period: 'c. 334 a.C. – c. 262 a.C.',
    role: 'Fundador do Estoicismo na Grécia Antiga',
    bio: 'Comerciante fenício que perdeu tudo em um naufrágio na costa da Ática e descobriu na filosofia ateniense o propósito supremo da harmonia com a natureza.',
    history: [
      'Nascido em Cítio, na ilha de Chipre, Zenão era um próspero mercador de púrpura tíria. Por volta dos trinta anos de idade, seu navio naufragou perto do porto de Pireu, fazendo-o perder toda a sua carga preciosa. Chegando arruinado a Atenas, ele entrou em uma livraria, onde ouviu a leitura das "Memoráveis" de Sócrates escritas por Xenofonte.',
      'Fascinado, perguntou ao livreiro onde poderia encontrar homens que vivessem como Sócrates. Naquele exato momento passava Crates de Tebas, o filósofo cínico. "Siga aquele homem", disse o livreiro. Zenão tornou-se aluno de Crates, depois estudou com os acadêmicos e dialéticos megáricos.',
      'Por volta de 300 a.C., reuniu seus próprios discípulos no Pórtico Pintado (Stoa Poikile), na Ágora de Atenas. Porque ensinavam no pórtico, seu grupo ficou conhecido como os "estoicos". Zenão ensinou que a virtude é o único bem verdadeiro e que a felicidade é o fluxo sereno de uma vida vivida em harmonia com a razão universal.'
    ],
    keyTeachings: [
      'Temos dois ouvidos e apenas uma boca para que possamos ouvir o dobro do que falamos.',
      'A felicidade é um fluxo harmonioso da vida de acordo com a Natureza (eudaimonia).',
      'O bem não reside na quantidade de bens materiais, mas no uso racional e virtuoso do que temos.',
      'O homem sábio aceita as perdas com a mesma compostura de quem devolve algo que foi apenas emprestado.'
    ],
    classicWorks: [
      {
        title: 'A República (Politeia)',
        description: 'Obra inicial radical de Zenão imaginando uma sociedade cosmopolita ideal sem templos, tribunais ou dinheiro, guiada pela razão fraternal pura.'
      },
      {
        title: 'Sobre a Vida Segundo a Natureza',
        description: 'Tratado ético fundador do princípio estoico do Logos e da harmonia universal.'
      }
    ],
    recommendedBookSlugs: ['o-diario-estoico', 'meditacoes-marco-aurelio', 'cartas-de-um-estoico'],
    quotes: []
  },
  {
    slug: 'musonio-rufo',
    name: 'Musônio Rufo',
    latinName: 'Gaius Musonius Rufus',
    period: 'c. 30 d.C. – c. 100 d.C.',
    role: 'O "Sócrates Romano" e Mestre de Epicteto',
    bio: 'Cavaleiro romano que ensinou que a filosofia deve ser tratada como a medicina da alma: só tem utilidade se curar as feridas reais da vida.',
    history: [
      'Caio Musônio Rufo pertencia à ordem equestre romana e conquistou fama extraordinária durante os reinados tempestuosos de Nero, Galba, Otão, Vitélio e Vespasiano. Por sua coragem intransigente de falar a verdade contra tiranias políticas, foi exilado repetidas vezes, incluindo um banimento para a inóspita ilha de Giaro.',
      'Em Giaro, onde outros teriam se entregado ao desespero, Musônio encontrou uma fonte de água potável, começou a cultivar a terra e atraiu alunos de várias regiões que viajavam em barcos para ouvi-lo. Ele defendia fervorosamente que homens e mulheres deveriam receber exatamente a mesma instrução filosófica, pois ambos possuem a mesma capacidade natural para a virtude.',
      'Ele enfatizava que a filosofia não era retórica de gabinete, mas uma ginástica constante para o caráter: comer de forma sóbria, vestir-se sem ostentação, exercitar a resistência física e tratar o casamento como uma sociedade sagrada de ajuda mútua.'
    ],
    keyTeachings: [
      'A filosofia não é nada além da prática da nobre conduta.',
      'Assim como a medicina não serve para nada se não expulsar a doença do corpo, a filosofia é inútil se não expulsar a aflição da mente.',
      'A virtude não é privilégio de nobres ou homens; homens e mulheres têm igual faculdade de raciocínio.',
      'Se você realizar algo virtuoso com esforço penoso, a dor passa rápido, mas a virtude permanece.'
    ],
    classicWorks: [
      {
        title: 'Dissertações e Fragmentos (Preservados por Lúcio)',
        description: 'Coleção de ensaios práticos sobre alimentação, casamento, exílio, obediência aos pais e disciplina corporal.'
      }
    ],
    recommendedBookSlugs: ['manual-de-epicteto', 'o-diario-estoico', 'como-pensar-como-um-imperador-romano'],
    quotes: []
  },
  {
    slug: 'hierocles',
    name: 'Hierocles',
    latinName: 'Hierocles Stoicus',
    period: 'Século II d.C.',
    role: 'Filósofo Estoico e Teórico do Cosmopolitismo',
    bio: 'Pioneiro da teoria dos círculos concêntricos de afeição (Oikeiosis), mostrando como o estoico abraça toda a humanidade como sua família.',
    history: [
      'Hierocles foi um professor estoico que viveu no auge do Império Romano, contemporâneo de Marco Aurélio. Seus ensinamentos foram em grande parte esquecidos até a redescoberta de papiros e citações preservadas na antologia de Estobeu no século V.',
      'Sua contribuição mais influente para o pensamento universal é a doutrina da Oikeiosis aplicada aos "Círculos de Hierocles". Ele propôs que todo ser humano está cercado por círculos concêntricos: o primeiro é a própria mente; o segundo, o corpo e familiares imediatos; o terceiro, vizinhos e concidadãos; até o maior círculo, que engloba toda a espécie humana.',
      'A tarefa ética do praticante estoico é aproximar ativamente os círculos externos em direção ao centro: tratar um concidadão como irmão e qualquer ser humano estrangeiro como parente universal.'
    ],
    keyTeachings: [
      'Devemos trabalhar constantemente para puxar os círculos distantes para mais perto do nosso coração.',
      'Chamar estranhos de irmãos e concidadãos de parentes não é mera cortesia, mas a expressão da razão compartilhada.',
      'O dever de piedade e auxílio mútuo é a cola invisível que mantém o cosmos humano unido.',
      'A verdadeira serenidade pessoal surge quando paramos de enxergar o outro como um obstáculo e o vemos como membro do mesmo corpo cósmico.'
    ],
    classicWorks: [
      {
        title: 'Elementos de Ética (Ethike Stoicheiosis)',
        description: 'Tratado didático preservado em papiro sobre o instinto fundamental de autopreservação e o desenvolvimento natural do afeto social.'
      }
    ],
    recommendedBookSlugs: ['meditacoes-marco-aurelio', 'cartas-de-um-estoico', 'o-diario-estoico'],
    quotes: []
  }
];

export const quotes: Quote[] = [
  {
    id: 'q1',
    text: 'Você tem poder sobre a sua mente — não sobre eventos externos. Perceba isso e você encontrará a força inabalável.',
    author: 'Marco Aurélio',
    authorSlug: 'marco-aurelio',
    source: 'Meditações, Livro IV',
    theme: 'Autocontrole',
    context: 'Escrito em reflexão solitária enquanto comandava as legiões na Germânia, lembrando-se de não sofrer pelo que foge ao seu controle.',
    practicalAction: 'Ao se deparar com um imprevisto hoje, pergunte-se: "Eu controlo isso diretamente?" Se não, respire fundo e concentre-se apenas na sua resposta.',
    isVerified: true
  },
  {
    id: 'q2',
    text: 'Nós sofremos mais frequentemente na imaginação do que na realidade.',
    author: 'Sêneca',
    authorSlug: 'seneca',
    source: 'Cartas a Lucílio, Carta XIII',
    theme: 'Ansiedade',
    context: 'Conselho enviado ao amigo Lucílio, que vivia aflito com a possibilidade de processos jurídicos e perda de status político.',
    practicalAction: 'Escreva em um papel o pior cenário que sua ansiedade desenha. Ao lado, anote o que você realmente precisa fazer hoje para se proteger.',
    isVerified: true
  },
  {
    id: 'q3',
    text: 'Primeiro diga a si mesmo o que você seria; e depois faça sem hesitação o que tem que fazer.',
    author: 'Epicteto',
    authorSlug: 'epicteto',
    source: 'Discursos, Livro III',
    theme: 'Disciplina',
    context: 'Epicteto ensinando seus alunos em Nicópolis sobre a necessidade de coerência absoluta entre os valores declarados e a conduta visível.',
    practicalAction: 'Defina uma única prioridade que represente seu melhor eu hoje e execute-a antes de se perder nas urgências dos outros.',
    isVerified: true
  },
  {
    id: 'q4',
    text: 'Não perca mais tempo discutindo sobre o que um bom homem deve ser. Seja um.',
    author: 'Marco Aurélio',
    authorSlug: 'marco-aurelio',
    source: 'Meditações, Livro X',
    theme: 'Virtude',
    context: 'Uma repreensão direta do imperador a si mesmo contra a tentação da mera erudição teórica sem impacto prático.',
    practicalAction: 'Pratique um ato de generosidade ou paciência hoje em silêncio, sem contar a ninguém nem buscar reconhecimento.',
    isVerified: true
  },
  {
    id: 'q5',
    text: 'Não é que tenhamos pouco tempo de vida, mas que desperdiçamos muito dele.',
    author: 'Sêneca',
    authorSlug: 'seneca',
    source: 'Sobre a Brevidade da Vida, Cap. I',
    theme: 'Tempo',
    context: 'Abertura do célebre tratado dedicado a Paulino, alertando que os homens vivem como se fossem eternos até o tempo se esgotar.',
    practicalAction: 'Identifique uma atividade fútil que roubou sua atenção ontem (redes sociais, discussões estéreis) e elimine-a hoje.',
    isVerified: true
  },
  {
    id: 'q6',
    text: 'Não é o que acontece com você, mas como você reage a isso que importa.',
    author: 'Epicteto',
    authorSlug: 'epicteto',
    source: 'Manual de Epicteto (Encheiridion)',
    theme: 'Resiliência',
    context: 'Princípio central da escola de Epicteto, separando o fato em si do julgamento que imprimimos sobre ele.',
    practicalAction: 'Quando alguém for ríspido ou o trânsito parar, espere 5 segundos antes de responder. Escolha a serenidade como sua assinatura.',
    isVerified: true
  },
  {
    id: 'q7',
    text: 'A melhor vingança é não ser como o seu inimigo.',
    author: 'Marco Aurélio',
    authorSlug: 'marco-aurelio',
    source: 'Meditações, Livro VI',
    theme: 'Relacionamentos',
    context: 'Reflexão sobre traições políticas e ataques de rivais em Roma. Retribuir a mesquinhez apenas corrompe o próprio caráter.',
    practicalAction: 'Se alguém te ofender hoje, não responda na mesma moeda. Mantenha sua integridade e preserve sua paz.',
    isVerified: true
  },
  {
    id: 'q8',
    text: 'Aquele que teme a morte nunca fará nada digno de um homem que está vivo.',
    author: 'Sêneca',
    authorSlug: 'seneca',
    source: 'Cartas a Lucílio',
    theme: 'Morte',
    context: 'Ensinamento sobre o Memento Mori: encarar a finitude é a única maneira de agir com coragem e valor.',
    practicalAction: 'Lembre-se de que o dia de hoje é um presente irrecuperável. Trate as pessoas queridas com o carinho de quem reconhece a fragilidade da vida.',
    isVerified: true
  },
  {
    id: 'q9',
    text: 'Qualquer pessoa capaz de te irritar se torna teu senhor; ela só consegue irritá-lo se você permitir ser perturbado por ela.',
    author: 'Epicteto',
    authorSlug: 'epicteto',
    source: 'Discursos de Epicteto',
    theme: 'Autocontrole',
    context: 'Como ex-escravo, Epicteto entendia a escravidão física e advertia que a escravidão emocional autoimposta é muito pior.',
    practicalAction: 'Não entregue as chaves da sua tranquilidade ao mau humor de colegas ou comentários alheios.',
    isVerified: true
  },
  {
    id: 'q10',
    text: 'Temos dois ouvidos e apenas uma boca para que possamos ouvir o dobro do que falamos.',
    author: 'Zenão de Cítio',
    authorSlug: 'zenao-de-citio',
    source: 'Fragmentos preservados por Diógenes Laércio',
    theme: 'Disciplina',
    context: 'Zenão admoestando um jovem discípulo que falava precipitadamente sem antes escutar a sabedoria dos mais experientes.',
    practicalAction: 'Em sua próxima conversa hoje, pratique a escuta atenta: ouça até o fim sem interromper nem ensaiar sua resposta mental.',
    isVerified: true
  },
  {
    id: 'q11',
    text: 'Se você realizar algo belo com esforço penoso, o sofrimento passa depressa, mas a nobreza da ação permanece.',
    author: 'Musônio Rufo',
    authorSlug: 'musonio-rufo',
    source: 'Dissertações de Musônio Rufo',
    theme: 'Trabalho',
    context: 'Ensinamento aos alunos no exílio sobre o valor intransigente do esforço virtuoso contra o prazer fugaz.',
    practicalAction: 'Não desista daquela tarefa difícil que você começou. Lembre-se: o cansaço desaparece ao deitar, a satisfação do dever cumprido dura para sempre.',
    isVerified: true
  },
  {
    id: 'q12',
    text: 'A riqueza não consiste em ter grandes posses, mas em cultivar poucas necessidades.',
    author: 'Epicteto',
    authorSlug: 'epicteto',
    source: 'Fragmentos de Epicteto',
    theme: 'Dinheiro',
    context: 'O estoicismo não prega a miséria, mas a emancipação da dependência cega por luxos efêmeros.',
    practicalAction: 'Antes de fazer uma compra impulsiva hoje, pause e pergunte: "Isso é uma necessidade genuína ou apenas um desejo emprestado?"',
    isVerified: true
  },
  {
    id: 'q13',
    text: 'O impedimento à ação avança a ação. O que está no caminho torna-se o caminho.',
    author: 'Marco Aurélio',
    authorSlug: 'marco-aurelio',
    source: 'Meditações, Livro V',
    theme: 'Adversidade',
    context: 'Princípio operativo de Marco Aurélio diante de pragas, motins e derrotas temporárias.',
    practicalAction: 'Encare o maior problema da sua semana não como uma desgraça, mas como a melhor sala de aula para forjar sua paciência e inteligência.',
    isVerified: true
  },
  {
    id: 'q14',
    text: 'A sorte é o que acontece quando a preparação encontra a oportunidade.',
    author: 'Sêneca',
    authorSlug: 'seneca',
    source: 'Cartas Morais a Lucílio',
    theme: 'Trabalho',
    context: 'Desmistificação do conceito vulgar de destino: o sábio treina continuamente para estar pronto quando o momento exigir.',
    practicalAction: 'Dedique 20 minutos hoje ao aprimoramento de uma habilidade fundamental para seu ofício ou caráter.',
    isVerified: true
  },
  {
    id: 'q15',
    text: 'Devemos tratar os concidadãos como irmãos e os estrangeiros como parentes da mesma casa cósmica.',
    author: 'Hierocles',
    authorSlug: 'hierocles',
    source: 'Elementos de Ética',
    theme: 'Relacionamentos',
    context: 'A doutrina dos círculos de Hierocles, ensinando a expandir nossa compaixão além das fronteiras tribais.',
    practicalAction: 'Cumprimente com consideração genuína alguém que você costuma ignorar na rotina (porteiros, atendentes, vizinhos).',
    isVerified: true
  },
  {
    id: 'q16',
    text: 'Quando acordar pela manhã, diga a si mesmo: hoje encontrarei pessoas indiscretas, ingratas, insolentes, desleais e ciumentas. Elas são assim porque não distinguem o bem do mal.',
    author: 'Marco Aurélio',
    authorSlug: 'marco-aurelio',
    source: 'Meditações, Livro II',
    theme: 'Relacionamentos',
    context: 'O clássico exercício de premeditação matinal estoica (praemeditatio malorum) para evitar a frustração e o ressentimento.',
    practicalAction: 'Prepare sua mente no início do dia: não espere perfeição dos outros e arme-se de compaixão diante das fraquezas alheias.',
    isVerified: true
  },
  {
    id: 'q17',
    text: 'A verdadeira felicidade é desfrutar do presente sem depender ansiosamente do futuro.',
    author: 'Sêneca',
    authorSlug: 'seneca',
    source: 'Sobre a Tranquilidade da Alma',
    theme: 'Felicidade',
    context: 'Sêneca combatendo o hábito universal de hipotecar a paz de hoje em troca de esperanças vazias de amanhã.',
    practicalAction: 'Saboreie sua próxima refeição com presença plena, sem celular ou telas, prestando atenção real ao momento presente.',
    isVerified: true
  },
  {
    id: 'q18',
    text: 'Não espere que os acontecimentos ocorram como você quer, mas deseje que aconteçam exatamente como acontecem, e você terá uma vida serena.',
    author: 'Epicteto',
    authorSlug: 'epicteto',
    source: 'Manual de Epicteto, VIII',
    theme: 'Resiliência',
    context: 'A base grega do que mais tarde Friedrich Nietzsche chamaria de Amor Fati: a concordância ativa com o cosmos.',
    practicalAction: 'Se algo sair do seu plano hoje, diga a si mesmo com sinceridade: "Aceito isso e farei o melhor a partir daqui."',
    isVerified: true
  }
];

// Attach philosopher quotes
philosophers.forEach(p => {
  p.quotes = quotes.filter(q => q.authorSlug === p.slug);
});

export const blogPosts: BlogPost[] = [
  {
    slug: 'o-que-esta-sob-nosso-controle',
    title: 'O que está sob nosso controle? A dicotomia de Epicteto',
    subtitle: 'Como a distinção mais simples da filosofia antiga pode eliminar metade do seu sofrimento mental diário.',
    excerpt: 'Descubra a ferramenta essencial que separava o escravo Epicteto dos tiranos de Roma e aprenda a blindar sua atenção contra o caos exterior.',
    readTimeMinutes: 7,
    author: 'Epicteto & Caverna do Estoico',
    theme: 'Autocontrole',
    date: '12 de Setembro, 2026',
    content: `Ao longo de toda a história da filosofia prática, poucas ideias tiveram um impacto tão desinfetante sobre a mente humana quanto a abertura do *Encheiridion* (O Manual) de Epicteto:

> "Das coisas que existem, algumas dependem de nós, outras não dependem de nós."

Nascido na escravidão na Frígia e manco pelo resto da vida devido à brutalidade de um antigo senhor, Epicteto tinha todos os motivos empíricos para se considerar uma vítima desamparada das circunstâncias. Em vez disso, ele descobriu nas salas de aula de Musônio Rufo o maior dos segredos estoicos: **as cadeias físicas nunca conseguem aprisionar a mente de quem compreende a própria faculdade de escolha.**

### A Grande Fronteira da Mente

Para Epicteto, o universo divide-se rigorosamente em duas colunas inegociáveis:

1. **O que depende de nós (Interno):**
   * Nossos julgamentos de valor sobre as coisas.
   * Nossos impulsos para agir ou recuar.
   * Nossos desejos e aversões voluntárias.
   * Nosso caráter e a fidelidade aos nossos valores morais.

2. **O que NÃO depende de nós (Externo):**
   * A opinião, aprovação ou críticas de terceiros.
   * Os resultados finais de nossos esforços profissionais.
   * As oscilações do mercado, do clima e da economia.
   * O corpo, a saúde frágil, as doenças e a velhice inevitável.
   * A morte de entes queridos e o nosso próprio fim biológico.

A esmagadora maioria do sofrimento humano contemporâneo — o esgotamento profissional (burnout), a raiva nas redes sociais, as noites de insônia mastigando humilhações passadas — nasce de um único erro de cálculo cognitivo: **tentamos controlar o que não controlamos, enquanto negligenciamos solenemente a única coisa que está sob nosso pleno comando.**

### Como Aplicar no Cotidiano

Imagine que você participou de uma entrevista para a vaga dos seus sonhos. O que depende de você?
* Preparar-se com rigor e dedicação impecáveis.
* Dormir bem na véspera e chegar pontualmente.
* Responder com clareza, honestidade e presença de espírito.

O que NÃO depende de você?
* O humor particular do entrevistador naquele dia.
* Se a empresa já tinha um candidato interno pré-selecionado.
* A decisão final da diretoria executiva.

Se você ancora sua paz no resultado externo, você vive como um escravo de variáveis aleatórias. Se você ancora sua dignidade na excelência do seu próprio esforço, você permanece invencível, seja contratado ou recusado.`,
    practicalExercise: {
      title: 'O Filtro das Duas Colunas',
      description: 'Um exercício matinal de 3 minutos para restaurar a clareza e desarmar o estresse desnecessário.',
      steps: [
        'Pegue uma folha de papel e trace uma linha reta no meio, dividindo-a em duas colunas.',
        'Na coluna da esquerda, escreva: "Está Sob Meu Controle Total". Na coluna da direita, escreva: "Fora do Meu Controle".',
        'Liste a preocupação mais pesada que está ocupando sua mente hoje e desmembre seus elementos nas duas colunas.',
        'Trace uma linha firme sobre tudo o que estiver na coluna da direita e prometa solenemente dedicar 100% de sua energia apenas ao primeiro item da coluna da esquerda.'
      ]
    },
    recommendedBookSlugs: ['manual-de-epicteto', 'o-obstaculo-e-o-caminho'],
    relatedPostSlugs: ['como-lidar-com-a-ansiedade', 'aceitar-versus-desistir-amor-fati']
  },
  {
    slug: 'como-lidar-com-a-ansiedade',
    title: 'Como lidar com a ansiedade sobre o futuro: o antídoto de Sêneca',
    subtitle: 'Por que sofremos mais na imaginação do que na realidade e como desarmar a catastrofização mental.',
    excerpt: 'Em suas cartas a Lucílio, Sêneca desvenda a anatomia do pavor antecipado e ensina o método do pior cenário real para recuperar a serenidade.',
    readTimeMinutes: 8,
    author: 'Sêneca & Caverna do Estoico',
    theme: 'Ansiedade',
    date: '10 de Setembro, 2026',
    content: `Na Carta XIII a seu amigo Lucílio, Sêneca aborda o mal que atormenta a humanidade com a mesma força há mais de dois milênios:

> "Existem mais coisas, Lucílio, propensas a nos assustar do que a nos ferir; e sofremos mais frequentemente na imaginação do que na realidade."

A mente humana é uma extraordinária máquina de simulação de ameaças. Essa característica foi útil na savana pré-histórica para antecipar predadores na mata, mas torna-se uma tortura crônica no mundo moderno, onde projetamos desastres financeiros, rejeições sociais e humilhações hipotéticas que quase nunca se concretizam.

### A Anatomia do Medo Infundado

Sêneca analisa que a ansiedade nasce de três armadilhas psicológicas:
1. **Antecipamos calamidades futuras** antes que elas de fato aconteçam.
2. **Exageramos a intensidade** dos danos reais caso a adversidade venha a ocorrer.
3. **Imaginamos males que jamais existirão**, confundindo possibilidades remotas com certezas iminentes.

"O que te aconselho a fazer", escreve o filósofo de Córdoba, "é não ser infeliz antes que a hora chegue, pois é provável que os males que você teme como iminentes nunca cheguem a acontecer de forma alguma; certamente ainda não aconteceram."

### O Método da Premeditação dos Males (Praemeditatio Malorum)

Contrariando o pensamento positivo ingênuo — que prega que devemos apenas esperar pelo melhor —, os estoicos propõem um método muito mais robusto e eficaz: **olhar o pior cenário de frente com olhos calmos e racionais.**

Quando você foge do medo, ele cresce como um monstro no escuro. Mas quando você para, acende a luz da razão e examina detalhadamente o pior que pode acontecer, percebe que o ser humano é muito mais resiliente do que supõe. Como dizia Sêneca:

> "Mesmo se o mal acontecer, você terá tempo para sofrer quando ele vier. Por que desperdiçar a paz de hoje sofrendo adiantado por uma dor que talvez nunca chegue?"`,
    practicalExercise: {
      title: 'O Teste do Pior Cenário de Sêneca',
      description: 'Técnica estoica clássica para neutralizar o pânico antecipatório e resgatar a calma racional.',
      steps: [
        'Escreva exatamente qual é o pior cenário temido com todos os seus detalhes crus.',
        'Pergunte-se: "Se isso realmente acontecer, qual será o primeiro passo prático que tomarei para me reerguer?"',
        'Observe que, mesmo na pior hipótese, sua dignidade, sua inteligência e sua capacidade de agir continuarão com você.',
        'Diga a si mesmo: "Agora que conheço a pior face do problema, retorno com calma para o presente, onde a vida realmente acontece."'
      ]
    },
    recommendedBookSlugs: ['cartas-de-um-estoico', 'sobre-a-brevidade-da-vida', 'como-pensar-como-um-imperador-romano'],
    relatedPostSlugs: ['o-que-esta-sob-nosso-controle', 'memento-mori-a-bussola']
  },
  {
    slug: 'aceitar-versus-desistir-amor-fati',
    title: 'A diferença entre aceitar e desistir: desvendando o Amor Fati',
    subtitle: 'Por que o consentimento estoico com a realidade não é passividade covarde, mas a mais alta forma de coragem.',
    excerpt: 'Desmonte o mito de que o estoicismo prega apatia e descubra como amar o próprio destino transforma cada crise em matéria-prima para o crescimento.',
    readTimeMinutes: 6,
    author: 'Caverna do Estoico',
    theme: 'Resiliência',
    date: '08 de Setembro, 2026',
    content: `Uma das críticas mais superficiais e equivocadas contra o estoicismo afirma que a filosofia incitaria o conformismo apático: "se devemos aceitar tudo o que acontece, então não devemos lutar por nada".

Nada poderia estar mais longe da verdade histórica.

Marco Aurélio liderava legiões e reformava leis imperiais. Catão, o Jovem, enfrentou Júlio César até o último suspiro em defesa da República Romana. Epicteto lecionava com vigor inabalável. Esses homens não eram espectadores passivos da história; eram agentes corajosos de ação moral.

### A Fronteira entre Resignação e Amor Fati

* **Desistir (Resignação passiva):** É cruzar os braços, culpar o universo, adotar o papel de vítima indefesa e amargar um ressentimento surdo contra o mundo.
* **Aceitar ativamente (Amor Fati):** É reconhecer com frieza a realidade inalterável dos fatos passados e presentes, sem desperdiçar um único grama de energia brigando com o que já é, para poder direcionar toda a força da mente para o que ainda pode ser feito.

Você não pode desfazer uma demissão consumada há cinco minutos. Você não pode mudar a chuva torrencial que molhou seus pertences. Reclamar, maldizer a sorte ou gritar contra a tempestade não seca uma única gota de água.

O estoico olha para a chuva e diz: "Está chovendo. Agora, qual é a resposta mais digna e construtiva que posso dar a essa situação?"

### Transformando o Chumbo em Ouro

Como escreveu Marco Aurélio em uma das passagens mais célebres das *Meditações*:

> "O fogo brilhante consome tudo o que é jogado sobre ele e usa o próprio obstáculo como combustível para brilhar ainda mais alto."

O Amor Fati não significa que você gosta da dor ou deseja a tragédia. Significa que, uma vez que a adversidade se impôs, você a abraça como o atleta abraça o peso pesado da academia: não porque o peso seja agradável, mas porque vencer a resistência é o único caminho para se tornar verdadeiramente forte.`,
    practicalExercise: {
      title: 'A Reinterpretação do Obstáculo',
      description: 'Converta um aborrecimento recente em oportunidade de virtude.',
      steps: [
        'Escolha um fato desagradável que aconteceu com você nas últimas 48 horas.',
        'Complete a frase: "Isso aconteceu e eu não posso mudar o passado."',
        'Agora responda: "Qual virtude específica essa situação me obriga a treinar? (Paciência? Criatividade? Desapego? Coragem?)"',
        'Agradeça internamente pela oportunidade de treino prático.'
      ]
    },
    recommendedBookSlugs: ['o-obstaculo-e-o-caminho', 'meditacoes-marco-aurelio'],
    relatedPostSlugs: ['o-que-esta-sob-nosso-controle', 'como-desenvolver-disciplina']
  },
  {
    slug: 'como-desenvolver-disciplina',
    title: 'Como desenvolver disciplina inabalável sem queimar a mente',
    subtitle: 'A visão estoica sobre constância, pequenas vitórias e o veneno da motivação passageira.',
    excerpt: 'Aprenda por que os filósofos antigos desprezavam explosões emocionais de força de vontade e preferiam a arquitetura de hábitos diários simples.',
    readTimeMinutes: 7,
    author: 'Caverna do Estoico',
    theme: 'Disciplina',
    date: '05 de Setembro, 2026',
    content: `A sociedade moderna adora vender a disciplina como um espetáculo heroico: vídeos motivacionais barulhentos, promessas de acordar às 4 da manhã para transformar a vida em 21 dias e uma retórica de guerra constante contra si mesmo.

Para os mestres estoicos, esse tipo de entusiasmo febril é apenas mais uma paixão desordenada — e, como todo fogo de palha, queima com rapidez e deixa apenas cinzas e frustração para trás.

### A Disciplina como Serenidade Racional

Marco Aurélio acordava cedo em suas tendas frias não porque estivesse tomado por uma onda de adrenalina, mas porque reconhecia racionalmente seu dever humano:

> "Ao amanhecer, quando tiver dificuldade em se levantar da cama, tenha esse pensamento em mente: estou acordando para fazer o trabalho de um ser humano."

A disciplina estoica não é uma punição imposta a si mesmo; é um ato de profundo respeito pela própria vida e pelos talentos que a natureza lhe confiou. Ela repousa sobre três alicerces práticos:

1. **Adesão à Identidade antes da Ação:** Como ensinou Epicteto: "Primeiro decida quem você quer ser; depois faça o que tem de ser feito." Quando você decide que é uma pessoa pontual, honesta e comprometida com o estudo, as ações decorrem naturalmente da sua identidade, sem necessidade de negociações dramáticas a cada manhã.
2. **A Regra da Não-Exceção:** É muito mais fácil manter um hábito 100% das vezes do que 98% das vezes. A exceção abre uma brecha para o debate interno, e a mente preguiçosa é uma advogada brilhante na arte de criar desculpas.
3. **Pequenas Vitórias Invisíveis:** Zenão de Cítio lembrava que "o bem é alcançado aos poucos, mas não é coisa pequena". Um parágrafo lido com atenção, uma refeição sóbria, dez minutos de reflexão tranquila — são esses tijolos silenciosos que constroem a muralha da alma.`,
    practicalExercise: {
      title: 'O Pacto da Manhã Estoica',
      description: 'Três passos simples para iniciar o dia com comando de si.',
      steps: [
        'Ao soar o despertador, levante-se sem negociar ou ativar o botão "soneca".',
        'Beba um copo d’água e reserve 5 minutos para o silêncio, sem tocar nas redes sociais ou notícias.',
        'Escreva as três tarefas fundamentais do dia e comprometa-se a cumprir a primeira com foco absoluto antes do almoço.'
      ]
    },
    recommendedBookSlugs: ['meditacoes-marco-aurelio', 'manual-de-epicteto', 'a-quietude-e-a-chave'],
    relatedPostSlugs: ['marco-aurelio-no-cotidiano', 'o-que-esta-sob-nosso-controle']
  },
  {
    slug: 'marco-aurelio-no-cotidiano',
    title: 'A filosofia de Marco Aurélio no cotidiano: o diário de um imperador',
    subtitle: 'As lições de liderança, tolerância e humildade escondidas nas páginas das Meditações.',
    excerpt: 'Como o homem mais poderoso do mundo antigo lidava com traições, bajuladores e o cansaço do dever sem perder a serenidade da alma.',
    readTimeMinutes: 9,
    author: 'Marco Aurélio & Caverna do Estoico',
    theme: 'Virtude',
    date: '01 de Setembro, 2026',
    content: `O filósofo britânico Bertrand Russell certa vez observou que o poder tende a corromper, e o poder absoluto corrompe absolutamente. No entanto, o Império Romano forneceu ao mundo uma das raríssimas exceções a essa regra universal: **Marco Aurélio Antonino.**

Com uma única palavra, Marco Aurélio poderia condenar qualquer indivíduo à morte, confiscar riquezas inimagináveis ou satisfazer os apetites mais extravagantes. Em vez disso, o que encontramos ao abrir suas notas particulares escritas à luz de velas nas florestas geladas da Germânia?

Encontramos um homem lutando contra a própria vaidade, exercitando a paciência com colaboradores incompetentes e lembrando a si mesmo de que a vida de um imperador nada mais é do que fumaça passageira se não for dedicada ao bem comum.

### A Relação com Pessoas Difíceis

O trecho que abre o Livro II das *Meditações* deveria ser gravado na entrada de qualquer escritório ou lar moderno:

> "Ao acordar pela manhã, diga a si mesmo: hoje encontrarei o indiscreto, o ingrato, o insolente, o desleal, o ciumento e o egoísta. Eles agem assim porque não sabem distinguir o que é bom do que é mau. Mas eu, que vi a natureza do Bem e sei que é belo, não posso ser ferido por nenhum deles."

Observe a profundidade da postura estoica: Marco Aurélio não nutre ódio nem desprezo pelos indivíduos tóxicos. Ele reconhece que a grosseria alheia é fruto da ignorância moral e que revidar com a mesma baixeza seria destruir a própria integridade.`,
    practicalExercise: {
      title: 'O Diálogo Noturno de Autoexame',
      description: 'O ritual de Marco Aurélio antes de repousar.',
      steps: [
        'Sente-se em silêncio antes de dormir com um caderno.',
        'Responda sem autocrítica destrutiva: "Onde falhei hoje no meu autocontrole?"',
        'Responda: "Em que momento consegui agir com virtude e dignidade?"',
        'Feche o caderno perdoando a si mesmo pelas falhas e renovando o voto de vigilância para o amanhecer.'
      ]
    },
    recommendedBookSlugs: ['meditacoes-marco-aurelio', 'como-pensar-como-um-imperador-romano'],
    relatedPostSlugs: ['como-lidar-com-criticas', 'como-desenvolver-disciplina']
  },
  {
    slug: 'como-lidar-com-criticas',
    title: 'Como lidar com críticas, calúnias e ofensas segundo os estoicos',
    subtitle: 'O escudo invisível da razão contra o veneno das palavras alheias.',
    excerpt: 'Descubra a técnica de Epicteto para desarmar insultos e entenda por que ninguém pode ofendê-lo sem a sua prévia cumplicidade interior.',
    readTimeMinutes: 6,
    author: 'Caverna do Estoico',
    theme: 'Relacionamentos',
    date: '28 de Agosto, 2026',
    content: `Vivemos em uma época dominada pela hipersensibilidade e pelo cultivo do ressentimento. Uma palavra atravessada em uma reunião de trabalho, um comentário hostil nas redes sociais ou a ingratidão de um conhecido são suficientes para arruinar semanas inteiras de serenidade.

Para a escola estoica, a ofensa nunca está na boca de quem fala; **ela está exclusivamente na interpretação de quem escuta.**

Como Epicteto ensinava com humor implacável aos seus alunos:

> "Lembre-se de que não é aquele que insulta ou que agride que o fere, mas o seu próprio julgamento de que você foi ferido. Portanto, quando alguém o provocar, saiba que foi a sua própria mente que concordou com a provocação."

### O Teste da Pedra e do Insulto

Epicteto costumava usar uma metáfora magnífica: se você insultar uma rocha na beira do caminho com as piores palavras do vocabulário, o que a rocha fará? Ela permanecerá imóvel, fria e intacta. Ela não se sente insultada porque não atribui valor algum ao ruído do vento.

Por que você permite que as palavras de pessoas cujos julgamentos morais você nem sequer respeita tenham o poder de tirar o seu sono?

Se a crítica for verdadeira e justa: agradeça pelo aprendizado e corrija o seu erro.
Se a crítica for injusta e maldosa: ela não diz nada sobre quem você é, mas diz tudo sobre a miséria moral de quem a proferiu. Por que se indignar com quem machuca a si mesmo?`,
    practicalExercise: {
      title: 'A Regra dos Cinco Segundos de Epicteto',
      description: 'Como responder a ataques verbais ou virtuais sem cair na armadilha.',
      steps: [
        'Ao receber uma provocação, conte mentalmente até 5 antes de emitir qualquer som ou toque de tela.',
        'Pergunte a si mesmo: "Se eu me ofender agora, a quem entrego o controle do meu humor?"',
        'Se for necessária uma resposta, responda com polidez factual ou com o humor cortês de Epicteto.',
        'Se não for necessária resposta, guarde o silêncio: o silêncio do sábio é o espelho mais doloroso para o provocador.'
      ]
    },
    recommendedBookSlugs: ['manual-de-epicteto', 'cartas-de-um-estoico'],
    relatedPostSlugs: ['marco-aurelio-no-cotidiano', 'o-que-esta-sob-nosso-controle']
  },
  {
    slug: 'memento-mori-a-bussola',
    title: 'Memento Mori: a morte como bússola para uma vida com propósito',
    subtitle: 'Por que lembrar da finitude não é pessimismo mórbido, mas o maior acelerador de foco e generosidade.',
    excerpt: 'Compreenda a prática de Memento Mori como o filtro definitivo para eliminar futilidades e viver com urgência virtuosa.',
    readTimeMinutes: 7,
    author: 'Caverna do Estoico',
    theme: 'Morte',
    date: '22 de Agosto, 2026',
    content: `Em nossa cultura moderna, a morte tornou-se um tabu estéril: escondida em hospitais asseptizados, mascarada por cosméticos e banida das conversas educadas. Agimos no dia a dia como se fôssemos donos de séculos inesgotáveis de tempo.

Para os estoicos, no entanto, a consciência vívida da finitude é a ferramenta mais radiante e libertadora que o ser humano possui.

*Memento Mori* — "Lembre-se de que você é mortal" — não era um convite à depressão, mas um choque elétrico contra a letargia espiritual.

Como advertia Marco Aurélio:

> "Você poderia deixar a vida agora mesmo. Deixe que isso determine o que você faz, diz e pensa a cada instante."

### A Cura para as Pequenezas

Quando colocada contra o pano de fundo da finitude inevitável, quase toda a poeira das preocupações cotidianas se desfaz:
* A vaidade sobre status social parece ridícula.
* As brigas fúteis de família perdem o sentido.
* O rancor guardado por anos torna-se um fardo tolo.

Memento Mori ensina a abraçar o presente com gratidão feroz. Você não sabe se este é o seu último dia com a pessoa que você ama, a última refeição que provará ou a última página que lerá. Viver sabendo disso não é viver com medo; é viver com reverência absoluta pelo milagre de estar vivo hoje.`,
    practicalExercise: {
      title: 'A Meditação da Finitude Matinal',
      description: 'Um momento de reconexão antes de sair para o mundo.',
      steps: [
        'Olhe para o céu pela manhã e respire profundamente.',
        'Lembre-se: incontáveis homens e mulheres gostariam de ter o dia de hoje, mas já partiram.',
        'Diga a si mesmo: "Hoje estou vivo. Não desperdiçarei este dia em futilidades nem em queixas vazias."',
        'Diga a alguém importante que você valoriza a presença dela em sua vida.'
      ]
    },
    recommendedBookSlugs: ['sobre-a-brevidade-da-vida', 'meditacoes-marco-aurelio'],
    relatedPostSlugs: ['como-lidar-com-a-ansiedade', 'o-que-esta-sob-nosso-controle']
  },
  {
    slug: 'musonio-rufo-pratica-diaria',
    title: 'A arte da tranquilidade: o guia prático de Musônio Rufo',
    subtitle: 'As lições esquecidas do mestre que ensinou a Epicteto que a virtude se forja no prato de comida e no suor da fronte.',
    excerpt: 'Conheça o filósofo romano que defendia a igualdade educacional entre homens e mulheres e a prática da temperança na vida real.',
    readTimeMinutes: 8,
    author: 'Musônio Rufo & Caverna do Estoico',
    theme: 'Disciplina',
    date: '15 de Agosto, 2026',
    content: `Se Epicteto foi a voz contundente da liberdade interior e Sêneca o mestre da prosa elegante, Musônio Rufo foi o soldado prático do estoicismo. Conhecido em Roma como "o Sócrates romano", Musônio acreditava que falar sobre virtude sem praticá-la no cotidiano mais banal era pura impostura.

Em uma sociedade imperial romana marcada por banquetes extravagantes e consumismo ostentatório, Musônio chamava seus discípulos para a elegância da simplicidade.

### A Filosofia do Prato de Comida

Para Musônio, o treino da alma começava onde o homem senta três vezes ao dia: à mesa.

> "A gula e o descontrole alimentar são as portas de entrada de todas as outras fraquezas morais. Aquele que não consegue controlar o que coloca na própria boca dificilmente terá comando sobre a própria língua ou sobre os desejos do coração."

Ele não pregava o jejum ascético fanático, mas o prazer lúcido do suficiente: comer para nutrir a vida, e não para entorpecer os sentidos.

### Igualdade e Coragem

Musônio foi também um dos pensadores mais progressistas da antiguidade: em suas dissertações, argumentou veementemente que mulheres e homens receberam da natureza a mesma constituição racional e as mesmas sementes de virtude, devendo portanto ter acesso irrestrito ao estudo da filosofia moral.`,
    practicalExercise: {
      title: 'O Exercício da Sobriedade Voluntária',
      description: 'Treino simples de temperança para fortalecer a vontade.',
      steps: [
        'Em sua próxima refeição, escolha uma opção nutritiva e simples, sem excessos de açúcares ou temperos industriais.',
        'Coma devagar, pousando os talheres entre uma garfada e outra.',
        'Interrompa a refeição no momento exato em que a fome biológica cessar, dispensando a gula da sobremesa desnecessária.',
        'Observe como o autocontrole traz uma sensação duradoura de leveza e autodomínio.'
      ]
    },
    recommendedBookSlugs: ['manual-de-epicteto', 'o-diario-estoico'],
    relatedPostSlugs: ['como-desenvolver-disciplina', 'o-que-esta-sob-nosso-controle']
  }
];

export const dailyReflections: DailyReflection[] = [
  {
    id: 'dr1',
    dateStr: '2026-09-16',
    quote: quotes[0],
    reflection: 'Quantas vezes hoje você já se irritou com coisas sobre as quais não tem voto nem veto? O clima, a mensagem atrasada no celular, a expressão carrancuda do motorista ao lado. Nenhuma dessas coisas pertence ao seu reino interior. O único território soberano do ser humano é o que se passa entre suas próprias têmporas: a capacidade de pausar, julgar com retidão e responder com serenidade.',
    historicalContext: 'Marco Aurélio escreveu isso enquanto enfrentava a revolta de seu general Avídio Cássio e a devastação da Peste Antonina em Roma. Se um imperador sobrecarregado podia guardar a calma interior, nós também podemos em nossas pequenas tempestades cotidianas.',
    dailyAction: 'Antes de reagir a qualquer imprevisto ou contratempo hoje, espere 5 segundos em silêncio e pergunte-se: "Isso está sob meu controle direto?" Se a resposta for não, respire e foque exclusivamente no seu próximo passo.'
  },
  {
    id: 'dr2',
    dateStr: '2026-09-17',
    quote: quotes[1],
    reflection: 'O medo do futuro é quase sempre pior do que o futuro em si. Criamos tempestades mentais onde há apenas uma brisa passageira. Quando você examina a história da sua vida, quantas das catástrofes que tiraram o seu sono realmente aconteceram da forma assustadora como sua mente desenhou? Muito poucas. E as que aconteceram encontraram em você uma resiliência que você desconhecia.',
    historicalContext: 'Sêneca enviou essa mensagem ao seu amigo íntimo Lucílio quando este sofria com boatos políticos em Roma. Sêneca lembrava que torturar-se adiantado é um desperdício trágico da única vida que temos.',
    dailyAction: 'Identifique o pensamento que mais gerou ansiedade em você nas últimas 24 horas. Escreva-o em uma frase e pergunte-se: "Isso é um fato real acontecendo agora, ou apenas uma hipótese da minha imaginação?"'
  }
];

export const newsletterEditions: NewsletterEdition[] = [
  {
    issueNumber: 42,
    title: 'A Arte de Não Ser Perturbado',
    date: '14 de Setembro, 2026',
    summary: 'Como manter o centro de gravidade interior quando o ambiente ao redor parece desmoronar.',
    reflection: 'Caro amigo da Caverna,\n\nNesta semana, reflitamos sobre a diferença entre o ruído do mundo e a nossa própria voz interior. Muitas vezes reclamamos que o mundo está rápido demais, ruidoso demais, violento demais. Mas a verdade é que o mundo sempre foi turbulento. A questão nunca foi calar o mundo lá fora, mas silenciar o tumulto aqui dentro.\n\nQuando você aprende a não pegar carona nas provocações alheias, você descobre a liberdade mais radical que existe: ninguém pode tirar a sua paz sem a sua prévia permissão assinada.',
    quote: {
      text: 'Qualquer pessoa capaz de te irritar se torna teu senhor.',
      author: 'Epicteto',
      source: 'Discursos de Epicteto'
    },
    exercise: 'Escolha um momento de 10 minutos hoje para ficar completamente offline e em silêncio antes de dormir. Não responda a nenhuma notificação.',
    questionToPonder: 'A quem ou a que situação você tem entregado o poder de ditar o seu humor nesta semana?',
    readingSuggestion: 'Manual de Epicteto (Encheiridion) — Capítulos I ao XII.'
  },
  {
    issueNumber: 41,
    title: 'A Moeda Não Reembolsável do Tempo',
    date: '07 de Setembro, 2026',
    summary: 'O ensinamento de Sêneca sobre por que tratamos o dinheiro com avareza e o tempo com desperdício insensato.',
    reflection: 'Caro leitor,\n\nSe alguém tentasse roubar o dinheiro da sua carteira na rua, você chamaria a guarda ou reagiria imediatamente. No entanto, permitimos diariamente que reuniões inúteis, fofocas vazias e horas rolando feeds sem rumo roubem horas preciosas de nossa existência sem qualquer resistência.\n\nO dinheiro perdido pode ser reconquistado pelo trabalho. O tempo perdido nunca mais retorna.',
    quote: {
      text: 'Não é que tenhamos pouco tempo de vida, mas que desperdiçamos muito dele.',
      author: 'Sêneca',
      source: 'Sobre a Brevidade da Vida'
    },
    exercise: 'Hoje, faça um inventário honesto de como você gastou suas últimas 3 horas livres. O que disso valeu verdadeiramente a pena?',
    questionToPonder: 'Se você soubesse que só tem mais um ano de plena saúde, o que cortaria imediatamente da sua rotina?',
    readingSuggestion: 'Sobre a Brevidade da Vida — Sêneca.'
  }
];
