export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-invert">
      <h1 className="text-4xl font-serif font-bold mb-8">Sobre Este Projeto</h1>
      <div className="bg-card border border-border p-8 rounded-2xl text-lg leading-relaxed text-neutral-300">
        <p className="mb-6">
          Este projeto foi construído como uma aplicação web moderna dedicada à filosofia Estoica. 
          Ele utiliza Next.js 14, Tailwind CSS e TypeScript para entregar uma experiência rápida, responsiva 
          e esteticamente agradável.
        </p>
        <p className="mb-6">
          O principal recurso é o gerador de citações aleatórias, que traz a sabedoria de grandes pensadores estoicos 
          como Marco Aurélio, Sêneca e Epicteto. A aplicação utiliza um mecanismo de contingência 
          para garantir que as citações estejam sempre disponíveis.
        </p>
        <p className="italic text-neutral-400 border-l-4 border-neutral-600 pl-4">
          &quot;O Estoicismo não é uma maneira de ser sem emoção, mas sim uma maneira de evitar que emoções negativas dominem sua mente racional.&quot;
        </p>
      </div>
    </div>
  );
}
