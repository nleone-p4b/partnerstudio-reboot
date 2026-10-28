// Gli articoli del blog stanno qui. Per pubblicarne uno: aggiungi un oggetto in
// cima all'elenco, con uno slug tutto minuscolo e senza spazi — e' l'indirizzo
// della pagina. Il corpo e' Markdown: ## e ### per i titoli, - per gli elenchi,
// > per le citazioni, **grassetto**, _corsivo_, [testo](https://indirizzo).
// Il tempo di lettura si calcola da solo.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO, YYYY-MM-DD */
  date: string;
  author: string;
  tags: string[];
  /** Togli l'articolo dall'elenco pubblico senza cancellarlo. */
  draft?: boolean;
  /** Segnaposto di impianto: va sostituito, non pubblicato. */
  placeholder?: boolean;
  body: string;
};

export const posts: Post[] = [
  {
    slug: 'esempio-struttura-articolo',
    title: 'Questo è un segnaposto, non un articolo',
    excerpt: 'Serve solo a mostrare come si impagina un pezzo. Sostituiscilo con il primo articolo vero.',
    date: '2026-10-28',
    author: 'NL Partner Studio',
    tags: ['Impianto'],
    placeholder: true,
    body: `Questo testo esiste per far vedere come viene impaginato un articolo: titoli, paragrafi, elenchi e citazioni. Non è un contenuto pubblicabile e va sostituito.

## Come si scrive un articolo

Gli articoli stanno in un unico file del progetto, \`src/content/posts.ts\`. Per pubblicarne uno si aggiunge un oggetto in cima all'elenco: titolo, sommario, data, tag e corpo del testo.

Il corpo si scrive in Markdown, quindi senza toccare codice:

- due cancelletti per un titolo di sezione, tre per un sottotitolo
- un trattino a inizio riga per un punto elenco
- **doppio asterisco** per il grassetto, _trattino basso_ per il corsivo
- parentesi quadre e tonde per un [collegamento](https://nlpartnerstudio.it)

### Cosa succede dopo

L'elenco e la pagina del singolo articolo si costruiscono da soli: indirizzo, data, tempo di lettura e tag vengono dal file. Non c'è un pannello di amministrazione e non c'è un database: si aggiunge il testo, si pubblica, l'articolo è online.

> Finché resta questo segnaposto, il blog è un impianto vuoto: meglio non diffondere l'indirizzo.

## Il primo articolo vero

Quando hai il primo pezzo, cancella questo oggetto dall'elenco e metti il tuo al suo posto.`,
  },
];

export const publishedPosts = posts.filter(post => !post.draft);

export function findPost(slug: string): Post | undefined {
  return publishedPosts.find(post => post.slug === slug);
}

export function sortedPosts(): Post[] {
  return [...publishedPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}
