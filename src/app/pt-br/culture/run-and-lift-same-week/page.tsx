import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd, HowToJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/culture/run-and-lift-same-week",
  title: "Corrida e musculação na mesma semana sem se quebrar, Suor Society",
  description:
    "Dá pra correr e fazer musculação na mesma semana mantendo um treino forte por dia e 48 horas entre a corrida mais puxada e o dia de perna mais pesado. Uma semana híbrida que se sustenta.",
  image: "/founder-press.jpg",
};
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "trap", label: "A armadilha dos dois treinos" },
  { id: "one-hard", label: "Uma coisa forte por dia" },
  { id: "week", label: "Uma semana que se sustenta" },
  { id: "signs", label: "Sinais de que é demais" },
  { id: "compare", label: "Empilhado vs alternado" },
  { id: "faq", label: "Perguntas Frequentes" },
];

const WEEK = [
  {
    day: "Segunda",
    body: "Força pesada. O grande dia de força da semana, inferior ou corpo todo.",
    plain: "Segunda: musculação pesada, o principal dia de força da semana, inferior ou corpo todo.",
  },
  {
    day: "Terça",
    body: "Corrida de qualidade. Tiros, um tempo run, algo que te custa. A única corrida forte.",
    plain: "Terça: corrida de qualidade, como tiros ou um tempo run, a única corrida forte da semana.",
  },
  {
    day: "Quarta",
    body: "Corrida leve. Dá pra conversar o tempo todo. Se não dá, você está rápido demais.",
    plain: "Quarta: corrida leve e conversável, devagar o suficiente pra manter uma conversa.",
  },
  {
    day: "Quinta",
    body: "Força mais uma corrida leve curta. Foco em superior, depois 20 a 30 minutos leves se quiser.",
    plain: "Quinta: um treino de força com foco em membros superiores mais uma corrida leve opcional de 20 a 30 minutos.",
  },
  {
    day: "Sexta",
    body: "Folga. Folga total. É o dia que as pessoas pulam e o que segura a semana em pé.",
    plain: "Sexta: um dia de folga total, completamente sem treino.",
  },
  {
    day: "Sábado",
    body: "Longão. O dia da distância. Mantenha o esforço leve e deixe render.",
    plain: "Sábado: o longão, mantido num esforço leve.",
  },
  {
    day: "Domingo",
    body: "Força leve ou folga. Corpo todo bem leve, ou nada. Leia a semana que você teve e escolha.",
    plain: "Domingo: um treino de força leve de corpo todo ou mais um dia de folga, dependendo de como foi a semana.",
  },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "Posso correr nos dias de musculação?",
    a: "Na maioria das semanas, sim. A regra é que um dos dois seja leve. Musculação pesada pede corrida leve ou nenhuma, e corrida forte pede musculação leve ou folga. Fazer os dois no mesmo dia nunca foi o problema. Fazer os dois forte é.",
  },
  {
    q: "Devo correr antes ou depois de malhar?",
    a: "Depende do que importa mais naquele dia, porque o que você faz primeiro leva o seu melhor. Se a corrida é a prioridade, corra primeiro. Se a força é, malhe primeiro. Pra ganhar força de membros inferiores especificamente, malhar antes da corrida tende a sair na frente.",
  },
  {
    q: "Quantos dias de descanso uma semana híbrida precisa?",
    a: "Pelo menos um dia inteiro de folga, e pra maioria de quem trabalha, mais um leve ou de folga. A semana acima deixa a sexta totalmente livre e permite que o domingo seja leve ou nada. A recuperação é quando o treino de fato gruda, então esses dias estão trabalhando de verdade.",
  },
  {
    q: "Musculação vai me deixar mais lento?",
    a: "Não. Com dias leves de verdade, a musculação te deixa mais resistente e pode ajudar a sua economia de corrida, então você segura o ritmo com menos esforço. A interferência que assusta é pequena pra maioria da gente, e aparece justamente no esquema que este texto inteiro alerta: tudo forte, todo dia, nada leve.",
  },
];

export default function CorridaEMusculacaoNaMesmaSemana() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-21" />
      <HowToJsonLd
        path={META.path}
        name="Uma semana híbrida de corrida e musculação que se sustenta"
        description="Um modelo de semana pra correr e fazer musculação no meio de um trabalho de tempo integral, montado pra que os dias fortes nunca se choquem: três corridas, dois treinos de força, um dia de folga total."
        image={META.image}
        steps={WEEK.map((d) => ({ name: d.day, text: d.plain }))}
      />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Julho 2026</div>
            <h1 className="article-headline">
              Corrida e musculação na mesma semana <span>sem se quebrar</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder-press.jpg"
            alt="Uma atleta híbrida levantando um peso acima da cabeça numa academia"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  Dá pra correr e fazer musculação na mesma semana mantendo só um treino forte por
                  dia e separando a corrida mais puxada do dia de perna mais pesado por pelo menos 48
                  horas. Quem tem um trabalho de tempo integral costuma ir bem com três corridas e
                  dois ou três treinos de força. O erro que quebra as pessoas não é o volume, é
                  correr toda manhã e malhar toda noite com tudo numa intensidade moderada-forte.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Atualizado em julho de 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Dois esportes, um corpo, cinco ou seis dias por semana, no meio de um trabalho que
                  não está nem aí pro seu treino. Funciona. Só precisa de uma forma. Aqui está a
                  semana que eu corro, por que ela se sustenta, e o erro que tira as pessoas de campo
                  caladinho.
                </p>
              </div>
            </section>

            {/* ── A ARMADILHA DOS DOIS TREINOS ── */}
            <section id="trap" className="article-body">
              <div className="page">
                <h2>A armadilha dos dois treinos no mesmo dia</h2>
                <p>
                  Normalmente é assim que acontece. Correr quase toda manhã, malhar quase toda noite,
                  nada no papel ligando as duas coisas, só um bom motor e a ideia de que mais é sempre
                  melhor.
                </p>
                <p>
                  Parece incrível por umas três semanas. Aí vem tudo de uma vez. Não é uma lesão
                  grande, é um corpo que para de se recuperar. Perna pesada em todo treino, sono
                  esquisito, um joelho que começa a reclamar na escada. O problema nunca foi treinar
                  demais. Foi treinar forte demais. Cada corrida e cada série caindo no mesmo meio
                  moderado-forte, a zona onde nada é leve o suficiente pra recuperar e nada é forte o
                  suficiente pra te fazer evoluir.
                </p>
                <p>
                  Esse meio é a armadilha. Dois treinos no mesmo dia funcionam. Só funcionam quando
                  um dos dois é de verdade leve.
                </p>
              </div>
            </section>

            {/* ── UMA COISA FORTE POR DIA ── */}
            <section id="one-hard" className="article-body">
              <div className="page">
                <h2>A regra de uma coisa forte por dia</h2>
                <p>
                  Você não fica mais em forma durante o treino. Você fica depois dele, enquanto se
                  recupera. É por isso que a semana inteira roda em cima de uma ideia: uma coisa forte
                  por dia, e só uma.
                </p>
                <p>
                  Dia de corrida forte, a musculação fica leve ou some. Dia de força pesado, a corrida
                  é leve ou é folga. Quando uma corrida forte e um dia de perna pesado querem os dois
                  ser puxados, eles não ficam colados, você põe um bom dia entre eles. Uma{" "}
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5752732/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    revisão sistemática sobre treino concorrente
                  </a>{" "}
                  mostrou que a interferência entre musculação e corrida é maior quando você espreme
                  os dois esforços fortes na mesma sessão, e diminui quando você dá espaço. Espaçar
                  não é frescura. É o que permite as duas adaptações acontecerem de verdade.
                </p>
                <p>
                  Na prática, isso são umas 48 horas entre a sua corrida mais puxada e o seu dia de
                  perna mais pesado. Todo o resto da semana é leve, e leve quer dizer leve, não
                  moderado.
                </p>
              </div>
            </section>

            {/* ── UMA SEMANA QUE SE SUSTENTA ── */}
            <section id="week" className="article-body">
              <div className="page">
                <h2>Uma semana que se sustenta</h2>
                <p>
                  Aqui está uma semana que se sustenta pra quem treina no meio de um trabalho de
                  tempo integral. Três corridas, dois treinos de força, montada pra que os dias fortes
                  nunca se choquem.
                </p>
                <ol className="week-plan">
                  {WEEK.map((d) => (
                    <li key={d.day}>
                      <strong>{d.day}</strong> {d.body}
                    </li>
                  ))}
                </ol>
                <p>
                  Uma ressalva. Se o treino de segunda detonar suas pernas, mantenha a corrida de
                  qualidade de terça curta, ou troque terça e quarta pra corrida leve vir depois do
                  dia de perna. A regra que importa mais que os dias exatos: sua corrida mais puxada e
                  seu dia de perna mais pesado não ficam colados.
                </p>
              </div>
            </section>

            {/* ── SINAIS DE QUE É DEMAIS ── */}
            <section id="signs" className="article-body">
              <div className="page">
                <h2>Sinais de que você está passando do ponto</h2>
                <p>
                  Até um bom plano pode virar quando a vida se acumula em cima dele. O corpo manda os
                  mesmos sinais toda vez. Fica de olho nesses.
                </p>
                <ul>
                  <li>O sono piora mesmo você estando mais cansado que o normal</li>
                  <li>As corridas leves vão ficando mais rápidas sozinhas e a frequência cardíaca não abaixa</li>
                  <li>Uma dorzinha que não vai embora de vez, o joelho, o tendão de aquiles, o quadril</li>
                  <li>Três semanas seguidas travadas, nada rende e nada melhora</li>
                  <li>Você começa a ter preguiça de treinos que antes curtia</li>
                </ul>
                <p>
                  Um desses, alivia por alguns dias. Dois ou mais, tira a semana de recuperação agora,
                  antes que ela se tire sozinha.
                </p>
              </div>
            </section>

            {/* ── EMPILHADO VS ALTERNADO ── */}
            <section id="compare" className="article-body">
              <div className="page">
                <h2>Mesmo dia empilhado vs dias alternados</h2>
                <p>
                  Tem mais de um jeito de montar isso. Dois esquemas funcionam pra maioria, e o certo
                  depende mais da sua agenda do que do seu preparo.
                </p>
                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Empilhado no mesmo dia</span>
                    <span>Dias alternados</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Melhor pra</strong> proteger dias inteiros de folga</span>
                    <span><strong>Melhor pra</strong> um ritmo diário mais parelho</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Risco</strong> os dois esforços fortes viram moderado</span>
                    <span><strong>Risco</strong> os dias leves viram puxados</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Serve pra</strong> quem faz turno, pais e mães, semanas cheias</span>
                    <span><strong>Serve pra</strong> agendas estáveis e repetíveis</span>
                  </div>
                </div>
                <p>
                  Mirando numa largada? O nosso{" "}
                  <a href="/pt-br/culture/corridas-brasil-2026">guia de corridas 2026</a> tem provas
                  com inscrição aberta pra você garantir hoje. E se a semana de prova é o que te
                  estressa, o texto sobre fazer musculação na semana da prova sem perder as pernas sai
                  dia 4 de agosto.
                </p>
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

            {/* ── AUTHOR ── */}
            <AuthorCard lang="pt" />

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} title="Nesta página" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </>
  );
}
