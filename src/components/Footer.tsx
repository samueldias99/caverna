export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-background/50">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-neutral-500">
        <p className="font-serif italic text-lg mb-2 text-neutral-400">Memento Mori. Amor Fati.</p>
        <p>© {new Date().getFullYear()} Sabedoria Estoica. Criado com Next.js.</p>
      </div>
    </footer>
  );
}
