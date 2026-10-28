import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { AmbientBackground, GlassFilter, openChat } from '@/components/studio/Primitives';
import { ContactChat } from '@/components/studio/ContactChat';
import { formatDate, sortedPosts } from '@/content/posts';
import { readingMinutes } from '@/content/markdown';

export default function Blog() {
  const posts = sortedPosts();

  useEffect(() => {
    document.title = 'Corporate Blog | NL Partner Studio';
  }, []);

  return <div className="studio-page page-scroll">
    <GlassFilter/>
    <AmbientBackground/>
    <Header/>
    <main className="blog-page" aria-label="Corporate Blog">
      <header className="blog-head">
        <span className="eyebrow">Corporate Blog</span>
        <h1>Quello che impariamo lavorando.</h1>
        <p>Appunti su innovazione, formazione e organizzazione: nati dai progetti, non dalla teoria.</p>
      </header>

      {posts.length === 0
        ? <p className="blog-empty">Il primo articolo sta arrivando.</p>
        : <ul className="blog-list">{posts.map(post => <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{readingMinutes(post.body)} min di lettura</span>
                {post.placeholder && <span className="blog-flag">Segnaposto</span>}
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-more">Leggi <ArrowUpRight aria-hidden="true"/></span>
            </Link>
          </li>)}</ul>}

      <section className="blog-cta">
        <h2>Hai un progetto che somiglia a questi temi?</h2>
        <Button className="studio-button" onClick={openChat}>Parliamone <ArrowUpRight/></Button>
      </section>
    </main>
    <ContactChat ready/>
  </div>;
}
