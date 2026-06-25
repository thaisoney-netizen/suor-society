import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DownloadGate from "@/components/DownloadGate";
import { PostToc } from "@/components/PostAside";

const TOC = [
  { id: "california", label: "20 na Califórnia" },
  { id: "us-races", label: "20 nos EUA" },
  { id: "faq", label: "Perguntas Frequentes" },
  { id: "download", label: "Baixar o guia" },
];

export const metadata = {
  title: "Corridas de inscrição aberta 2026, Suor Society",
  description:
    "Corridas de inscrição aberta que valem a pena. Sem índice, sem sorteio. Datas, preços e links diretos de inscrição.",
  alternates: {
    canonical: "/pt-br/culture/open-entry-races-2026",
    languages: {
      en: "/culture/open-entry-races-2026",
      "pt-BR": "/pt-br/culture/open-entry-races-2026",
    },
  },
  openGraph: { locale: "pt_BR" },
};

const CA_RACES = [
  {
    num: "01",
    name: "Beer City Half, Alameda",
    where: "Alameda, CA · 11 de jul de 2026",
    body: "Percurso plano, rápido e certificado pela USATF na orla da Bay Area. Boa opção de preparo no meio do ano. Cerveja artesanal na chegada.",
    dists: "5K · 10K · Meia Maratona",
    price: "A partir de US$ 27,50",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.alamedapint.com/",
  },
  {
    num: "02",
    name: "The San Francisco Marathon",
    where: "San Francisco, CA · 25-26 de jul de 2026",
    body: "Golden Gate Park, atravessando a ponte, cruzando a cidade. Meia maratona e distâncias menores abertas. Maratona esgotada. Entre na lista de espera se for o seu objetivo.",
    dists: "5K · Meia Maratona · Maratona",
    price: "A partir de US$ 165",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.thesfmarathon.com/",
  },
  {
    num: "03",
    name: "Napa to Sonoma Wine Country Half",
    where: "Napa, CA · 25-26 de jul de 2026",
    body: "Ponto a ponto por vinhedos em plena atividade. Meia maratona esgotada. Rosé 5K ainda aberta. Use o código N2SRG26 pra US$ 10 de desconto.",
    dists: "Rosé 5K (25 de jul) · Meia Maratona (26 de jul)",
    price: "A partir de US$ 208",
    status: "limit" as const,
    statusLabel: "5K aberta · Meia esgotada",
    url: "https://www.runnapatosonoma.com/",
  },
  {
    num: "04",
    name: "Santa Rosa Marathon",
    where: "Sonoma County, CA · 22-23 de ago de 2026",
    body: "Estradas da região vinícola, quase tudo plano, fim de semana com várias distâncias. Meia maratona ainda aberta. Maratona esgotada, então garanta a meia antes que ela vá também.",
    dists: "5K · 10K · Meia Maratona · Maratona",
    price: "A partir de US$ 114",
    status: "limit" as const,
    statusLabel: "Meia aberta · Maratona esgotada",
    url: "https://santarosamarathon.com/",
  },
  {
    num: "05",
    name: "Californian Dreamin' Half Marathon",
    where: "Long Beach, CA · 23 de ago de 2026",
    body: "Percurso litorâneo do sul da Califórnia, de Venice a Long Beach. Três distâncias começando abaixo de US$ 60. Chegada na praia em agosto. Difícil bater esse custo-benefício pra uma meia litorânea certificada.",
    dists: "5K · 10K · Meia Maratona",
    price: "A partir de US$ 49,75",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://runsignup.com/Race/CA/LongBeach/CalifornianDreaminKKHalfMarathon",
  },
  {
    num: "06",
    name: "Beer City Half, Bishop Ranch",
    where: "San Ramon, CA · 12 de set de 2026",
    body: "Edição East Bay. Formato com várias distâncias e opção de 1 milha. Certificada pela USATF. Bom preparo pro bloco de treino do segundo semestre.",
    dists: "1 Milha · 5K · 10K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://runsignup.com/Race/CA/SanRamon/BeerCityBishopRanch",
  },
  {
    num: "07",
    name: "2XU Long Beach Marathon",
    where: "Long Beach, CA · 10-11 de out de 2026",
    body: "Um dos fins de semana de prova mais consistentes do sul da Califórnia no segundo semestre. Ruas da cidade e orla. Outubro em Long Beach é o mais perto de condições perfeitas que o sul da Califórnia oferece.",
    dists: "5K · Meia Maratona · Maratona",
    price: "A partir de US$ 139",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.runlongbeach.com/",
  },
  {
    num: "08",
    name: "Two Cities Marathon",
    where: "Fresno/Clovis, CA · 1º de nov de 2026",
    body: "Clássico do Central Valley no segundo semestre. Várias distâncias, certificada pela USATF, ponto a ponto. Lote menor, menos hype, inscrição que anda rápido.",
    dists: "5K · 10K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.run2cm.com/",
  },
  {
    num: "09",
    name: "Silverado Half Marathon & 10K",
    where: "Silverado, CA · 7 de nov de 2026",
    body: "Região vinícola de Orange County, estradas de cânion, prova no segundo semestre. Menos cheia que os eventos de cidade grande. Certificada, inscrição aberta.",
    dists: "10K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "10",
    name: "Santa Barbara Half Marathon & 5K",
    where: "Santa Barbara, CA · 8 de nov de 2026",
    body: "Apresentada pela HOKA. 21 km à beira-mar mais uma 5K e uma corridinha kids. Esgotou quatro semanas antes em 2025. A expectativa é esgotar ainda mais cedo em 2026.",
    dists: "5K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Aberta · esgotando rápido",
    url: "https://santabarbarahalf.com/",
  },
  {
    num: "11",
    name: "Monterey Bay Half Marathon",
    where: "Monterey, CA · 8 de nov de 2026",
    body: "Esgotou em oito dias. Um dos percursos de meia mais bonitos da Califórnia. Vagas de caridade e de Race Benefactor são o caminho pra entrar.",
    dists: "Meia Maratona",
    price: "Caridade: US$ 350+",
    status: "sold" as const,
    statusLabel: "Geral esgotada · vagas de caridade abertas",
    url: "https://www.montereybayhalfmarathon.org/",
  },
  {
    num: "12",
    name: "Berkeley Half Marathon",
    where: "Berkeley, CA · 15 de nov de 2026",
    body: "Percurso East Bay certificado pela USATF serpenteando pelo campus de Berkeley, o centro e a marina. Prova em meados de novembro, com tempo fresco da estação.",
    dists: "Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://berkeleyhalfmarathon.com/",
  },
  {
    num: "13",
    name: "California International Marathon",
    where: "Sacramento, CA · 6 de dez de 2026",
    body: "Predominantemente em descida, ponto a ponto, certificada pela USATF e pela World Athletics. Um dos percursos de maratona mais rápidos dos EUA. Todos os lotes padrão esgotaram em tempo recorde. O sorteio do Gold Entry fechou em maio.",
    dists: "Maratona",
    price: "US$ 230 (Gold)",
    status: "sold" as const,
    statusLabel: "Esgotada · veja opções de caridade",
    url: "https://runsra.org/california-international-marathon/",
  },
  {
    num: "14",
    name: "San Diego Holiday Half Marathon & 5K",
    where: "San Diego, CA · 19 de dez de 2026",
    body: "21 km com 217 metros de queda de altimetria numa ciclovia em descida ondulada. Uma meia rápida em dezembro e um jeito de terminar o ano tentando um PR.",
    dists: "5K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.sandiegoholidayhalf.com/",
  },
  {
    num: "15",
    name: "Carlsbad Marathon, Half & 5K",
    where: "Carlsbad, CA · 17-18 de jan de 2027",
    body: "Prova litorânea do sul da Califórnia descendo a Carlsbad Boulevard, com vista pro Pacífico na maior parte do percurso. Inscrição aberta cedo, com o menor preço do ano.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Preço early bird",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://inmotionevents.com/event/carlsbad-marathon/",
  },
  {
    num: "16",
    name: "Surf City Marathon & Half",
    where: "Huntington Beach, CA · fev de 2027",
    body: "Pacific Coast Highway por Huntington Beach no domingo do Super Bowl. Litorânea, rápida, medalha de finisher em formato de prancha. Anual; as datas de 2027 ainda devem ser anunciadas.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://www.runsurfcity.com/",
  },
  {
    num: "17",
    name: "Los Angeles Marathon",
    where: "Los Angeles, CA · mar de 2027",
    body: "Stadium to the Sea, do Dodger Stadium a Santa Monica. Um dos percursos de maratona ponto a ponto mais icônicos do país. Inscrição aberta, sem índice.",
    dists: "Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://www.lamarathon.com/",
  },
  {
    num: "18",
    name: "Mountains 2 Beach Marathon & Half",
    where: "Ojai a Ventura, CA · abr de 2027",
    body: "Predominantemente em descida, de Ojai até a costa de Ventura. Conhecida como um dos percursos mais rápidos da Califórnia pra cravar o índice de Boston (BQ). Anual; as inscrições de 2027 abrem no segundo semestre de 2026.",
    dists: "Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://www.mountains2beachmarathon.com/",
  },
  {
    num: "19",
    name: "Hoag OC Marathon Running Festival",
    where: "Costa Mesa, CA · mai de 2027",
    body: "Fim de semana anual no sul da Califórnia com maratona, meia, 5K e desafios combinados. O percurso termina no OC Fair & Event Center. Inscrição aberta, várias distâncias.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://ocmarathon.com/",
  },
  {
    num: "20",
    name: "Rock 'n' Roll San Diego",
    where: "San Diego, CA · mai de 2027",
    body: "Largada no Balboa Park, chegada no Little Italy, música ao vivo a cada milha. Clássico anual do sul da Califórnia. As inscrições de 2027 abrem no fim de 2026.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://www.runrocknroll.com/events/san-diego",
  },
];

const US_RACES = [
  {
    num: "01",
    name: "Stars & Stripes Half Marathon",
    where: "Hoffman Estates, IL · 27 de jun de 2026",
    body: "Certificada pela USATF, inscrição aberta. Boa prova de meio de ano nos subúrbios de Chicago, celebrando os 250 anos dos EUA. Camisetas de edição especial do aniversário de 250 anos.",
    dists: "5K · 10K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://allcommunityevents.com/starsandstripesrun",
  },
  {
    num: "02",
    name: "Northside Hospital Peachtree Road Race",
    where: "Atlanta, GA · 4 de jul de 2026",
    body: "A maior 10K do mundo. 60 mil corredores. Certificada pela USATF. Correr uma 10K em Atlanta no 4 de Julho é um tipo específico de experiência.",
    dists: "10K",
    price: "US$ 60 a US$ 80",
    status: "open" as const,
    statusLabel: "Inscrições de última hora abertas",
    url: "https://www.atlantatrackclub.org/",
  },
  {
    num: "03",
    name: "Tunnel Light Marathon",
    where: "Snoqualmie Pass, WA · 17 de set de 2026",
    body: "Ponto a ponto, predominantemente em descida, pelo antigo túnel ferroviário Iron Horse e ao longo da Snoqualmie Valley Trail. Certificada pela USATF. Queridinha de quem busca PR.",
    dists: "Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.tunnelmarathon.com/",
  },
  {
    num: "04",
    name: "Life Time Chicago Half Marathon & 5K",
    where: "Chicago, IL · 27 de set de 2026",
    body: "Clima de cidade grande sem o sorteio. Público acolhedor, apoio animado no percurso. Certificada pela USATF. Inscrição aberta, sem índice.",
    dists: "5K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.chicagohalf.com/",
  },
  {
    num: "05",
    name: "Twin Cities Marathon",
    where: "Minneapolis-St. Paul, MN · 4 de out de 2026",
    body: "Sempre chamada de A Maratona Urbana Mais Bonita. Lagos, parques, folhagem de outono, ruas da cidade. Inscrição aberta, sem sorteio, sem índice. Inscreva-se e vá.",
    dists: "10K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.tcmevents.org/",
  },
  {
    num: "06",
    name: "Hartford Marathon & Half Marathon",
    where: "Hartford, CT · 10 de out de 2026",
    body: "Plana, rápida, certificada pela USATF. Percurso popular pra tentar o índice de Boston, porque a consistência é muito boa. Inscrição aberta, raramente esgota cedo.",
    dists: "Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://hartfordmarathon.com/",
  },
  {
    num: "07",
    name: "Steamtown Marathon",
    where: "Scranton, PA · 11 de out de 2026",
    body: "Ponto a ponto, descida líquida significativa, certificada pela USATF. Quem leva o PR a sério escolhe a Steamtown justamente pelo perfil do percurso. Lote pequeno. Inscrição aberta.",
    dists: "Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://steamtownmarathon.com/",
  },
  {
    num: "08",
    name: "Baltimore Running Festival",
    where: "Baltimore, MD · 17 de out de 2026",
    body: "26ª edição anual com um percurso cênico pelo porto. Certificada pela USATF, inscrição aberta, várias distâncias. Leve uma turma de níveis diferentes.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.thebaltimoremarathon.com/",
  },
  {
    num: "09",
    name: "Rocket Mortgage Detroit Free Press",
    where: "Detroit, MI · 18 de out de 2026",
    body: "A Meia Internacional cruza a Ambassador Bridge até Windsor e volta pelo túnel. A maratona e a Motor City Half estão esgotadas. A Meia Internacional segue aberta até 8 de set.",
    dists: "5K · Meia Internacional · 1 Milha",
    price: "Ver no site",
    status: "limit" as const,
    statusLabel: "Meia Intl aberta · Maratona esgotada",
    url: "https://www.freepmarathon.com/",
  },
  {
    num: "10",
    name: "Marine Corps Marathon",
    where: "Arlington, VA / Washington D.C. · 25 de out de 2026",
    body: "Sem premiação em dinheiro. Sem pelotão de elite. Só corredores. O percurso passa pelo Lincoln Memorial e por pontos turísticos de Washington. Inscrição geral esgotada. Vagas de caridade abertas até 31 de julho.",
    dists: "10K · Maratona",
    price: "US$ 240 (militar US$ 225)",
    status: "limit" as const,
    statusLabel: "Vagas de caridade abertas",
    url: "https://www.marinemarathon.com/event/marine-corps-marathon/",
  },
  {
    num: "11",
    name: "CNO Financial Indianapolis Monumental",
    where: "Indianapolis, IN · 7 de nov de 2026",
    body: "Plana, rápida, certificada pela USATF. Inscrição aberta, sem sorteio, sem índice. Uma das provas de cidade grande mais amigáveis pro corredor no país.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://monumentalmarathon.com/",
  },
  {
    num: "12",
    name: "Savannah Southern Half Marathon & 5K",
    where: "Savannah, GA · 14 de nov de 2026",
    body: "21 km pelas praças históricas de Savannah, ruas arborizadas de carvalhos e chegada pelo Grayson Stadium, dos Savannah Bananas. Tem código promocional pra US$ 10 de desconto.",
    dists: "5K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.southernhalf.com/",
  },
  {
    num: "13",
    name: "Allianz Richmond Marathon",
    where: "Richmond, VA · 14 de nov de 2026",
    body: "Chamada de A Maratona Mais Amigável dos EUA. Sancionada e certificada pela USATF, e um ótimo percurso pra cravar o índice de Boston. Vagas limitadas, mas a inscrição está aberta no momento.",
    dists: "8K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.richmondmarathon.org/",
  },
  {
    num: "14",
    name: "Philadelphia Marathon Weekend",
    where: "Philadelphia, PA · 20-22 de nov de 2026",
    body: "Maratona esgotada. Meia maratona e 8K ainda abertas. Percurso certificado pela Filadélfia histórica. Sem índice pras distâncias restantes.",
    dists: "8K · Meia Maratona",
    price: "Ver no site",
    status: "limit" as const,
    statusLabel: "Meia e 8K abertas · Maratona esgotada",
    url: "https://www.philadelphiamarathon.com/",
  },
  {
    num: "15",
    name: "BMW Dallas Marathon Festival",
    where: "Dallas, TX · 11-13 de dez de 2026",
    body: "55ª edição. Novo modelo de preço dinâmico: quanto antes você se inscrever, menos paga. Fim de semana de provas com várias distâncias no centro de Dallas.",
    dists: "5K · 10K · Meia Maratona · Maratona",
    price: "Preço dinâmico",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://dallasmarathon.com/",
  },
  {
    num: "16",
    name: "JAL Honolulu Marathon",
    where: "Honolulu, HI · 13 de dez de 2026",
    body: "Sem índice, sem tempo limite, a partir de 7 anos. O percurso vai de Ala Moana por Waikiki, contorna o Diamond Head e volta. Maratona de dezembro pra lista de desejos.",
    dists: "Merrie Mile · 10K · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições abertas",
    url: "https://www.honolulumarathon.org/",
  },
  {
    num: "17",
    name: "Chevron Houston Marathon Weekend",
    where: "Houston, TX · 15-17 de jan de 2027",
    body: "Aramco Houston Half no domingo, 17 de jan. Plana, rápida, certificada pela USATF. As inscrições vão de 1º de nov de 2026 até o começo de janeiro.",
    dists: "5K · Meia Maratona · Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://www.chevronhoustonmarathon.com/",
  },
  {
    num: "18",
    name: "Cherry Blossom Ten Mile",
    where: "Washington D.C. · abr de 2027",
    body: "Tidal Basin, cerejeiras no auge da floração, dez milhas planas. Sorteio anual pra inscrição geral; números de caridade disponíveis. Certificada pela USATF.",
    dists: "5K · 10 Milhas",
    price: "Ver no site",
    status: "limit" as const,
    statusLabel: "Sorteio + vagas de caridade",
    url: "https://www.cherryblossom.org/",
  },
  {
    num: "19",
    name: "Crescent City Classic 10K",
    where: "New Orleans, LA · abr de 2027",
    body: "Uma das 10K mais antigas do país. O percurso passa pelo centro de Nova Orleans, o French Quarter e a Esplanade Ave. Certificada pela USATF. Inscrições de 2027 abertas.",
    dists: "10K",
    price: "US$ 55 a US$ 80",
    status: "open" as const,
    statusLabel: "Inscrições 2027 abertas",
    url: "https://ccc10k.com/",
  },
  {
    num: "20",
    name: "NYCRUNS Brooklyn Spring Half",
    where: "Brooklyn, NY · 25 de abr de 2027",
    body: "Percurso em volta do Prospect Park. A NYCRUNS faz tudo redondinho: retirada de número fácil, certificada pela USATF, sem sorteio. A meia do Brooklyn sem a lista de espera da meia do Brooklyn.",
    dists: "5K · Meia Maratona",
    price: "Ver no site",
    status: "open" as const,
    statusLabel: "Inscrições 2027",
    url: "https://brooklynexperience.com/",
  },
];

const FAQS = [
  {
    q: "O que é uma corrida de inscrição aberta?",
    a: "Uma corrida de inscrição aberta é aquela em que você se inscreve sem precisar bater um índice de tempo nem ganhar um sorteio. Você paga a inscrição e está dentro. A maioria das corridas de rua funciona assim. As exceções são Boston, Nova York e Chicago, que exigem índice de tempo ou inscrição por sorteio.",
  },
  {
    q: "Preciso de índice pra correr uma meia maratona ou maratona?",
    a: "Na maioria das provas, não. Índices de tempo são exigidos principalmente na Maratona de Boston e em alguns eventos de elite por convite. Todas as provas desta lista são abertas a qualquer corredor, independente do ritmo ou da experiência.",
  },
  {
    q: "O que significa certificada pela USATF?",
    a: "A certificação da USATF significa que a distância do percurso foi medida e verificada oficialmente pela USA Track & Field. Isso garante que você correu a distância anunciada. Importa pra PRs e pra qualquer índice futuro.",
  },
  {
    q: "Quais corridas da Califórnia ainda estão abertas agora?",
    a: "Em junho de 2026: Maratona de San Francisco (meia e distâncias menores), Santa Rosa Marathon (só a meia), Californian Dreamin' em Long Beach, Beer City Half em Alameda (julho) e San Ramon (setembro), 2XU Long Beach Marathon, Two Cities (Fresno/Clovis), Silverado, Santa Barbara Half (esgotando rápido), Berkeley Half, San Diego Holiday Half e a Rosé 5K da Napa to Sonoma. Monterey Bay e a CIM estão esgotadas, veja opções de caridade. As provas de 2027 (Carlsbad, Surf City, LA, Mountains 2 Beach, OC, Rock 'n' Roll San Diego) estão listadas com suas janelas anuais de inscrição.",
  },
  {
    q: "Um iniciante pode correr uma meia maratona de inscrição aberta?",
    a: "Pode. Nenhuma das provas desta lista tem exigência mínima de ritmo. Algumas têm tempo limite, normalmente de 3h30 a 4h pra meia maratona. Confira o FAQ de cada prova antes de se inscrever se isso for uma preocupação.",
  },
  {
    q: "Qual é a melhor maratona de inscrição aberta do segundo semestre nos EUA?",
    a: "Twin Cities (4 de outubro), Hartford (10 de outubro), Steamtown (11 de outubro), Baltimore (17 de outubro) e Indianapolis Monumental (7 de novembro) têm inscrição aberta e certificação da USATF. Steamtown, Hartford e Indianapolis são as escolhas certeiras pra quem busca um PR.",
  },
];

function RaceRow({ race }: { race: typeof CA_RACES[0] }) {
  return (
    <div className="race-row">
      <span className="race-num">{race.num}</span>
      <div className="race-info">
        <div className="race-name">{race.name}</div>
        <div className="race-where">{race.where}</div>
        <p className="race-body">{race.body}</p>
        <div className="race-dists">{race.dists}</div>
        <div className={`race-status ${race.status}`}>{race.statusLabel}</div>
      </div>
      <div className="race-action">
        <span className="race-price">{race.price}</span>
        <a
          className="race-link"
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Inscreva-se →
        </a>
      </div>
    </div>
  );
}

export default function OpenEntryRaces2026PtBr() {
  return (
    <div lang="pt-BR">
      {/* NAV */}
      <SiteNav lang="pt" />

      <main className="post">

        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Junho 2026</div>
            <h1 className="article-headline">
              40 corridas de inscrição aberta na <span>Califórnia</span> e nos EUA que você ainda pode correr em 2026
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Milhares de corredores na linha de largada da Rock 'n' Roll San Diego Marathon and Half Marathon"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              Sem índice. Sem sorteio. 20 corridas na Califórnia, 20 pelos EUA.
              De agora até meados de 2027. Todas as distâncias, de 5K à maratona, todas certificadas pela USATF.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
              <span>San Diego, CA</span>
              <span>Junho 2026</span>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="article-body">
          <div className="page">
            <p>
              É temporada de corrida. Se você estava esperando o momento certo pra se inscrever em
              alguma coisa, é agora. 40 corridas de rua de inscrição aberta: 20 na Califórnia, 20 pelos
              EUA. Todas certificadas pela USATF. Todas abertas a todo mundo, não importa o quão rápido
              ou devagar você corre.
            </p>
            <p>
              A regra pra tudo nesta lista: sem índice, sem sorteio. Você se inscreve, treina e aparece.
              As provas vão de agora até meados de 2027, então tem uma janela pra qualquer objetivo que
              você esteja construindo.
            </p>
            <p>
              Algumas observações. Os preços sobem conforme o dia da prova se aproxima. Algumas estão com
              os lotes padrão esgotados, mas têm vagas de caridade ou de benfeitor. Marcamos o status de
              cada uma. Clique e confirme antes de se inscrever. Vagas e preços mudam rápido.
            </p>
          </div>
        </section>

        {/* ── CALIFORNIA RACES ── */}
        <section id="california" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">20 corridas na Califórnia</div>
              <div className="article-section-sub">Inscrição aberta · do 2º semestre de 2026 a meados de 2027</div>
            </div>
            <div className="guide-cta">
              <div className="guide-cta-inner">
                <span className="guide-cta-tag">PDF Grátis</span>
                <p className="guide-cta-text">Todas as 40 corridas em um guia formatado — datas, preços e links de inscrição, prontos para salvar ou compartilhar.</p>
              </div>
              <a className="guide-cta-btn" href="#download">Baixar o Guia Completo ↓</a>
            </div>
            <div className="race-list">
              {CA_RACES.map((r) => <RaceRow key={r.num} race={r} />)}
            </div>
          </div>
        </section>

        {/* ── US RACES ── */}
        <section id="us-races" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">20 corridas certificadas nos EUA</div>
              <div className="article-section-sub">Sem índice · todas certificadas pela USATF</div>
            </div>
            <div className="race-list">
              {US_RACES.map((r) => <RaceRow key={r.num} race={r} />)}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="faq-section">
          <div className="page">
            <div className="faq-head">Perguntas Frequentes</div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOWNLOAD GATE ── */}
        <section id="download" className="download-gate">
          <div className="page">
            <div className="gate-label">Download grátis</div>
            <div className="gate-title">Baixe o<br />Guia Completo</div>
            <p className="gate-desc">
              As 40 corridas num PDF formatado. Datas, preços, distâncias e
              links diretos de inscrição, prontos pra salvar, imprimir ou compartilhar.
            </p>
            <ul className="gate-what">
              <li>20 corridas de inscrição aberta na Califórnia, do 2º semestre de 2026 a meados de 2027</li>
              <li>20 das melhores corridas dos EUA certificadas pela USATF, sem índice</li>
              <li>Todas as distâncias: 5K, 10K, Meia Maratona, Maratona</li>
              <li>Preços atuais e links diretos de inscrição</li>
              <li>Disponibilidade e status atualizados em junho de 2026</li>
            </ul>
            <DownloadGate lang="pt" />
          </div>
        </section>

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} title="Nesta página" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </div>
  );
}
