import { Fragment } from 'react';
import { parseMarkdown, type Block, type Inline } from '@/content/markdown';

function renderInline(content: Inline[]) {
  return content.map((piece, i) => {
    if (piece.kind === 'strong') return <strong key={i}>{piece.text}</strong>;
    if (piece.kind === 'em') return <em key={i}>{piece.text}</em>;
    if (piece.kind === 'code') return <code key={i}>{piece.text}</code>;
    if (piece.kind === 'link') {
      const external = /^https?:\/\//.test(piece.href);
      return <a key={i} href={piece.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{piece.text}</a>;
    }
    return <Fragment key={i}>{piece.text}</Fragment>;
  });
}

function renderBlock(block: Block, key: number) {
  switch (block.kind) {
    case 'heading':
      return block.level === 2
        ? <h2 key={key}>{renderInline(block.content)}</h2>
        : <h3 key={key}>{renderInline(block.content)}</h3>;
    case 'quote':
      return <blockquote key={key}>{renderInline(block.content)}</blockquote>;
    case 'list':
      return block.ordered
        ? <ol key={key}>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ol>
        : <ul key={key}>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>;
    default:
      return <p key={key}>{renderInline(block.content)}</p>;
  }
}

export function Markdown({ source }: { source: string }) {
  return <div className="prose">{parseMarkdown(source).map(renderBlock)}</div>;
}
