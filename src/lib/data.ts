export interface Quote {
  text: string;
  author: string;
}

export const fallbackQuotes: Quote[] = [
  { text: "Você tem poder sobre a sua mente - não sobre eventos externos. Perceba isso e você encontrará força.", author: "Marco Aurélio" },
  { text: "Nós sofremos mais frequentemente na imaginação do que na realidade.", author: "Sêneca" },
  { text: "Primeiro diga a si mesmo o que você seria; e depois faça o que tem que fazer.", author: "Epicteto" },
  { text: "Não perca mais tempo discutindo sobre o que um bom homem deve ser. Seja um.", author: "Marco Aurélio" },
  { text: "Aquele que teme a morte nunca fará nada digno de um homem que está vivo.", author: "Sêneca" },
  { text: "Não é o que acontece com você, mas como você reage a isso que importa.", author: "Epicteto" },
];

export const philosophers = [
  {
    slug: "marco-aurelio",
    name: "Marco Aurélio",
    bio: "Marco Aurélio foi um imperador romano de 161 a 180 e um filósofo estoico. Ele foi o último dos governantes conhecidos como os Cinco Bons Imperadores.",
    history: [
      "Marco Aurélio Antonino Augusto foi Imperador Romano desde 161 até sua morte em 180 d.C. Diferente da maioria dos líderes de seu tempo, ele é lembrado não por conquistas militares (embora tenha passado grande parte de seu reinado em campanhas na fronteira do império), mas sim por sua mente reflexiva e dedicação à filosofia estoica.",
      "Apesar de ter o poder absoluto do mundo ocidental nas mãos, Marco Aurélio escreveu o que hoje conhecemos como 'Meditações'. Este diário pessoal nunca foi planejado para publicação; era um diálogo consigo mesmo, escrito à noite em tendas militares. Nele, ele lembrava a si mesmo da efemeridade da vida, da importância do dever e de como não se deixar corromper pelo imenso poder que possuía.",
      "Seu legado nos ensina que o verdadeiro poder não é o controle sobre os outros ou sobre os eventos do mundo, mas o controle estrito sobre a própria mente e as próprias reações."
    ],
    quotes: [
      "Você tem poder sobre a sua mente - não sobre eventos externos. Perceba isso e você encontrará força.",
      "A felicidade da sua vida depende da qualidade dos seus pensamentos.",
      "Não perca mais tempo discutindo sobre o que um bom homem deve ser. Seja um.",
      "Quando você acordar de manhã, diga a si mesmo: as pessoas com as quais lidarei hoje serão intrometidas, ingratas, arrogantes, desonestas, invejosas e rudes.",
      "A melhor vingança é não ser como o seu inimigo.",
      "Aquilo que não é bom para a colmeia, também não é bom para a abelha."
    ]
  },
  {
    slug: "seneca",
    name: "Sêneca",
    bio: "Sêneca, o Jovem, foi um filósofo estoico romano, estadista, dramaturgo e satirista da Idade de Prata da literatura latina.",
    history: [
      "Lúcio Aneu Sêneca foi um dos intelectuais mais brilhantes do Império Romano. Nascido na Espanha e educado em Roma, ele se tornou uma figura de imenso poder político ao atuar como tutor e depois conselheiro do notório imperador Nero.",
      "A vida de Sêneca foi marcada por um contraste fascinante: ele pregava a virtude estoica, a moderação e o desapego material, mas acumulou uma das maiores fortunas de Roma trabalhando para um líder tirânico. Apesar dessas contradições, seus escritos - na forma de cartas a amigos (Cartas Morais a Lucílio) e ensaios - formam algumas das obras mais acessíveis e práticas do estoicismo.",
      "Sêneca focava intensamente na prática. Ele ensinava como lidar com a raiva, como se preparar para o exílio e o luto, e acima de tudo, o valor inestimável do tempo humano, culminando em sua trágica morte ordenada pelo próprio Nero, a qual enfrentou com impressionante calma estoica."
    ],
    quotes: [
      "Nós sofremos mais frequentemente na imaginação do que na realidade.",
      "A sorte é o que acontece quando a preparação encontra a oportunidade.",
      "Aquele que teme a morte nunca fará nada digno de um homem que está vivo.",
      "Não é que tenhamos pouco tempo de vida, mas que desperdiçamos muito dele.",
      "Enquanto ensinamos, nós aprendemos.",
      "Ocasionalmente, é bom até mesmo enlouquecer um pouco."
    ]
  },
  {
    slug: "epicteto",
    name: "Epicteto",
    bio: "Epicteto foi um filósofo estoico grego. Nasceu escravo em Hierápolis, Frígia, e viveu em Roma até seu banimento, quando foi para Nicópolis no noroeste da Grécia.",
    history: [
      "A história de Epicteto é um testamento vivo da força interior. Nascido escravo, ele suportou abusos brutais (diz-se que seu mestre quebrou sua perna, deixando-o manco para sempre). No entanto, foi na escravidão que ele começou a estudar a filosofia estoica.",
      "Após ganhar sua liberdade, ele começou a ensinar filosofia em Roma. Diferente de Sêneca (um bilionário) ou Marco Aurélio (um imperador), Epicteto representava o estoicismo nas trincheiras das pessoas comuns. Quando filósofos foram banidos de Roma, ele se mudou para a Grécia e abriu sua própria escola, tornando-se possivelmente o professor mais famoso do seu tempo.",
      "Seu ensino principal divide o mundo categoricamente em duas partes: o que está sob nosso controle (nossos pensamentos e ações) e o que não está (tudo o resto). Epicteto não escreveu nada pessoalmente; o que temos de seu conhecimento ('O Manual' ou 'Enchiridion') foi compilado por seu aluno fiel, Arriano."
    ],
    quotes: [
      "Primeiro diga a si mesmo o que você seria; e depois faça o que tem que fazer.",
      "Não é o que acontece com você, mas como você reage a isso que importa.",
      "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.",
      "Qualquer pessoa capaz de te irritar se torna teu mestre.",
      "Não espere que os eventos aconteçam como você deseja, mas deseje que aconteçam como acontecem, e sua vida será serena.",
      "Apenas o instruído é verdadeiramente livre."
    ]
  }
];

export const blogPosts = [
  {
    slug: "entendendo-memento-mori",
    title: "Entendendo Memento Mori",
    excerpt: "A prática estoica de lembrar da nossa mortalidade.",
    content: "A prática de 'Memento Mori' — que se traduz como 'lembre-se de que você vai morrer' — é frequentemente confundida com um pensamento mórbido ou pessimista. No entanto, para os estoicos, é paradoxalmente a ferramenta mais poderosa para despertar para a vida e encontrar verdadeiro foco.\n\nAo cultivarmos a consciência constante da nossa mortalidade, retiramos o poder das trivialidades cotidianas. A ansiedade paralisante sobre a opinião alheia, o estresse exagerado no trânsito ou a frustração por expectativas não atendidas perdem rapidamente o sentido quando colocados na perspectiva implacável da nossa finitude.\n\nSêneca nos adverte com firmeza: 'Não é que tenhamos pouco tempo de vida, mas que desperdiçamos muito dele'. Memento Mori atua como um filtro rigoroso para as nossas ações diárias. Se você soubesse com certeza absoluta que este é seu último dia na terra, você realmente se importaria com aquela discussão fútil que teve pela manhã? Você adiantaria um projeto importante ou diria àqueles que ama o quanto eles importam?\n\nPortanto, o estoicismo nos ensina a não fugir da ideia do fim, mas a usá-la como um farol. Acorde todos os dias com o entendimento claro de que o tempo é o único recurso humano que não pode ser recuperado ou comprado. Viva o momento presente com urgência virtuosa, aja com justiça hoje e não adie a sua excelência para um futuro que não lhe pertence."
  },
  {
    slug: "amor-fati",
    title: "Amor Fati: Amando o Seu Destino",
    excerpt: "Como abraçar tudo o que acontece na vida e transformar obstáculos em força.",
    content: "O conceito de 'Amor Fati' — amor ao destino — representa o ápice da atitude estoica perante as inevitáveis adversidades da existência humana. Para o praticante estoico, não basta apenas suportar o caos da vida com resignação amarga ou tolerância apática; a verdadeira maestria exige que aprendamos a abraçar, aceitar e, em última instância, amar tudo aquilo que o destino nos apresenta.\n\nComo ensinou Epicteto, a esmagadora maioria do nosso sofrimento psicológico nasce de uma resistência irracional: a nossa teimosia em exigir que o mundo funcione de acordo com as nossas expectativas, em vez de aceitar como ele de fato é. O universo e a natureza obedecem a uma ordem lógica (Logos) que é totalmente indiferente aos nossos desejos pessoais.\n\nAplicar o Amor Fati significa que, diante de uma demissão inesperada, do fim de um relacionamento ou de uma crise financeira, você recusa o papel de vítima. Você não perde tempo lamentando 'por que isso está acontecendo comigo?'. Em vez disso, você olha para a provação de frente e declara: 'Isso é exatamente o que eu precisava para testar a minha resiliência e forjar a minha coragem'.\n\nNesta filosofia prática, o obstáculo se torna o próprio caminho. Amar o destino é compreender profundamente que cada revés é matéria-prima para a construção do caráter. Quando você passa a amar ativamente tudo o que lhe acontece — o bom, o ruim e o indiferente —, você se torna verdadeiramente inabalável, pois qualquer infortúnio é instantaneamente convertido em uma oportunidade para exercer a virtude."
  }
];
