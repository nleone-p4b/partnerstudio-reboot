import { describe, expect, it } from 'vitest';
import { parseInline, parseMarkdown, readingMinutes } from '../content/markdown';
import { findPost, publishedPosts, sortedPosts } from '../content/posts';

describe('Markdown degli articoli', () => {
  it('riconosce titoli, paragrafi, elenchi e citazioni', () => {
    const blocks = parseMarkdown('## Titolo\n\nUn paragrafo\nsu due righe.\n\n- uno\n- due\n\n> una citazione');
    expect(blocks.map(b => b.kind)).toEqual(['heading', 'paragraph', 'list', 'quote']);
    expect(blocks[2]).toMatchObject({ kind: 'list', ordered: false });
    expect((blocks[2] as { items: unknown[] }).items).toHaveLength(2);
  });
  it('separa elenchi numerati da quelli puntati', () => {
    const blocks = parseMarkdown('- uno\n1. primo');
    expect(blocks.map(b => (b as { ordered?: boolean }).ordered)).toEqual([false, true]);
  });
  it('estrae grassetto, corsivo e link senza perdere il testo attorno', () => {
    const parts = parseInline('prima **forte** poi _lieve_ e [un link](https://esempio.it) in fondo');
    expect(parts.map(p => p.kind)).toEqual(['text', 'strong', 'text', 'em', 'text', 'link', 'text']);
    expect(parseInline('apri `posts.ts` e scrivi').map(p => p.kind)).toEqual(['text', 'code', 'text']);
    expect(parts.find(p => p.kind === 'link')).toMatchObject({ href: 'https://esempio.it', text: 'un link' });
  });
  it('non perde il testo quando non c\'è nulla da formattare', () => {
    expect(parseInline('solo testo')).toEqual([{ kind: 'text', text: 'solo testo' }]);
  });
  it('stima almeno un minuto di lettura', () => {
    expect(readingMinutes('poche parole')).toBe(1);
    expect(readingMinutes(Array(600).fill('parola').join(' '))).toBe(3);
  });
});

describe('Elenco degli articoli', () => {
  it('ha slug unici e si trova per slug', () => {
    const slugs = publishedPosts.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach(slug => expect(slug).toMatch(/^[a-z0-9-]+$/));
    expect(findPost(slugs[0])?.slug).toBe(slugs[0]);
  });
  it('ordina dal più recente', () => {
    const dates = sortedPosts().map(p => p.date);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });
});
