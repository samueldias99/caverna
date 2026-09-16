import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Feather
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Caverna do Estoico — Missão, Filosofia e Transparência',
  description: 'Conheça o propósito da Caverna do Estoico: um refúgio de serenidade e reflexão clássica, com curadoria editorial e transparência absoluta.',
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <span>🏛️</span>
          <span>Manifesto & Identidade</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground">
          Sobre a Caverna do Estoico
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
          Um refúgio digital para quem busca desenvolver disciplina, serenidade, autocontrole, resiliência e clareza mental através do estoicismo.
        </p>
      </div>

      {/* Concept */}
      <section className="space-y-6 rounded-2xl border border-border bg-card/85 p-8 sm:p-10 shadow-sm leading-relaxed text-foreground/90 font-serif">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          O Conceito da Caverna
        </h2>
        <p className="text-base sm:text-lg">
          Na antiguidade clássica, a filosofia não era um exercício acadêmico de abstrações insolúveis. Era uma <em>arte de viver</em> — um manual para não se deixar despedaçar pelas tempestades políticas de Roma ou pelas perdas súbitas da existência.
        </p>
        <p className="text-base sm:text-lg">
          A <strong>Caverna do Estoico</strong> nasceu como um contraponto ao ruído incessante, aos algoritmos de indignação rápida e à ansiedade epidêmica do nosso século. Quando você entra neste espaço, a intenção é a mesma de quem adentrava uma biblioteca filosófica silenciosa da Antiguidade: encontrar refúgio, examinar suas escolhas com sobriedade e retornar ao mundo com mais calma, dignidade e propósito.
        </p>
      </section>

      {/* The 4 Cardinal Virtues */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          Os Quatro Pilares da Virtude Estoica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <span className="text-xs font-mono uppercase text-primary font-bold">1. Sophia</span>
            <h3 className="font-serif font-bold text-lg text-foreground">Sabedoria Prática</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              A habilidade de discernir o que está sob o nosso controle e o que pertence ao destino exterior, agindo com bom senso em cada decisão.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <span className="text-xs font-mono uppercase text-primary font-bold">2. Andreia</span>
            <h3 className="font-serif font-bold text-lg text-foreground">Coragem Moral</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Não a ausência de medo, mas a determinação inabalável de fazer o que é correto mesmo diante da dor, da oposição e da incerteza.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <span className="text-xs font-mono uppercase text-primary font-bold">3. Dikaiosyne</span>
            <h3 className="font-serif font-bold text-lg text-foreground">Justiça & Simpatia</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Tratar todos os seres humanos com equidade, fraternidade e respeito, reconhecendo que somos membros de uma mesma comunidade cósmica.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <span className="text-xs font-mono uppercase text-primary font-bold">4. Sophrosyne</span>
            <h3 className="font-serif font-bold text-lg text-foreground">Temperança & Autocontrole</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              O domínio voluntário sobre impulsos destrutivos, prazeres desmedidos e reações intempestivas, mantendo o equilíbrio interno.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Affiliate Disclosure & Editorial Policy */}
      <section className="rounded-2xl border border-border-accent bg-card/90 backdrop-blur-sm p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <ShieldCheck className="w-4 h-4" />
          <span>Diretrizes Editoriais & Sustentabilidade</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-foreground">
          Transparência com Você, Nosso Leitor
        </h3>

        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed font-sans">
          <p>
            A Caverna do Estoico recusa qualquer modelo predatório de monetização. Nós não vendemos dados pessoais, não exibimos anúncios intrusivos em pop-up, não usamos títulos caça-cliques com falsas promessas de enriquecimento e não vendemos cursos com urgência artificial.
          </p>
          <p>
            Nossa sustentabilidade financeira provém exclusivamente da nossa <strong>curadoria de livros recomendados</strong> por meio do Programa de Associados da Amazon. Quando você se interessa por um livro citado em nossos ensaios ou na biblioteca e opta por adquiri-lo através do link fornecido, a Amazon nos repassa uma pequena comissão percentual. O preço final para você é rigorosamente o mesmo do site oficial da Amazon.
          </p>
          <p>
            Indicamos somente obras clássicas e contemporâneas com reconhecido valor filosófico e traduções de qualidade comprovada.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="text-center pt-4 space-y-4">
        <p className="text-xs text-foreground-muted">
          Deseja acompanhar nossas reflexões semanais?
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-colors shadow-sm"
        >
          <Feather className="w-4 h-4" />
          <span>Inscrever-se na Carta da Caverna</span>
        </Link>
      </div>
    </div>
  );
}
