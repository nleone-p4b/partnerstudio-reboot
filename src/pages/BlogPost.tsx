import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { AmbientBackground, GlassFilter, openChat } from '@/components/studio/Primitives';
import { ContactChat } from '@/components/studio/ContactChat';
import { Markdown } from '@/components/studio/Markdown';
import { findPost, formatDate, sortedPosts } from '@/content/posts';
import { readingMinutes } from '@/content/markdown';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | NL Partner Studio`;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute('content') ?? '';
    meta?.setAttribute('content', post.excerpt);
    window.scrollTo(0, 0);
    return () => { meta?.setAttribute('content', previous); };
  }, [post]);

  const others = sortedPosts().filter(other => other.slug !== post?.slug).slice(0, 2);

  return <div className="studio-page page-scroll">
    <GlassFilter/>
    <AmbientBackground/>
    <Header/>
    <main className="blog-page" aria-label={post?.title ?? 'Articolo non trovato'}>
      <Link to="/blog" className="blog-back"><ArrowLeft aria-hidden="true"/> Tutti gli articoli</Link>

      {!post
        ? <div className="blog-head">
            <h1>Articolo non trovato</h1>
            <p>L&apos;indirizzo non corrisponde a nessun articolo pubblicato.</p>
          </div>
        : <article className="blog-article">
            <header className="blog-head">
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{readingMinutes(post.body)} min di lettura</span>
                {post.placeholder && <span className="blog-flag">Segnaposto</span>}
              </div>
              <h1>{post.title}</h1>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="blog-author">{post.author}</p>
              {post.tags.length > 0 && <ul className="blog-tags">{post.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
            </header>
            <Markdown source={post.body}/>
          </article>}

      <section className="blog-cta">
        <h2>Ne parliamo?</h2>
        <Button className="studio-button" onClick={openChat}>Scrivici <ArrowUpRight/></Button>
      </section>

      {others.length > 0 && <section className="blog-more">
        <h2>Altri articoli</h2>
        <ul className="blog-list">{others.map(other => <li key={other.slug}>
          <Link to={`/blog/${other.slug}`} className="blog-card">
            <div className="blog-card-meta"><time dateTime={other.date}>{formatDate(other.date)}</time></div>
            <h2>{other.title}</h2>
            <p>{other.excerpt}</p>
          </Link>
        </li>)}</ul>
      </section>}
    </main>
    <ContactChat ready/>
  </div>;
}
