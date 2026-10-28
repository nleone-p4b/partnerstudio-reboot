// Markdown minimo, scritto in casa: aggiungere una libreria significherebbe
// toccare package.json, e il bun.lockb che usa Lovable non e' rigenerabile da
// qui. Copre quello che serve a un articolo: titoli, paragrafi, elenchi,
// citazioni, grassetto, corsivo e link.

export type Inline =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'em'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'link'; text: string; href: string };

export type Block =
  | { kind: 'heading'; level: 2 | 3; content: Inline[] }
  | { kind: 'paragraph'; content: Inline[] }
  | { kind: 'quote'; content: Inline[] }
  | { kind: 'list'; ordered: boolean; items: Inline[][] };

const INLINE = /(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(_[^_]+_)|(`[^`]+`)/g;

export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const match of source.matchAll(INLINE)) {
    const start = match.index ?? 0;
    if (start > last) out.push({ kind: 'text', text: source.slice(last, start) });
    const token = match[0];
    if (token.startsWith('[')) {
      const split = token.indexOf('](');
      out.push({ kind: 'link', text: token.slice(1, split), href: token.slice(split + 2, -1) });
    } else if (token.startsWith('**')) {
      out.push({ kind: 'strong', text: token.slice(2, -2) });
    } else if (token.startsWith('`')) {
      out.push({ kind: 'code', text: token.slice(1, -1) });
    } else {
      out.push({ kind: 'em', text: token.slice(1, -1) });
    }
    last = start + token.length;
  }
  if (last < source.length) out.push({ kind: 'text', text: source.slice(last) });
  return out.length ? out : [{ kind: 'text', text: source }];
}

export function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = [];
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ kind: 'paragraph', content: parseInline(paragraph.join(' ').trim()) });
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push({ kind: 'list', ordered: list.ordered, items: list.items.map(parseInline) });
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushList(); continue; }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph(); flushList();
      blocks.push({ kind: 'heading', level: heading[1].length === 2 ? 2 : 3, content: parseInline(heading[2]) });
      continue;
    }
    if (line.startsWith('> ')) {
      flushParagraph(); flushList();
      blocks.push({ kind: 'quote', content: parseInline(line.slice(2)) });
      continue;
    }
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      flushParagraph();
      const ordered = !!numbered;
      if (!list || list.ordered !== ordered) { flushList(); list = { ordered, items: [] }; }
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function readingMinutes(source: string): number {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
