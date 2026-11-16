// GEO: il sito e' una app React a schermata unica, quindi senza questo plugin
// un crawler che non esegue JavaScript (molti bot delle AI) vede una pagina
// vuota. Al build scriviamo dentro #root lo stesso testo che l'app mostra,
// generato dagli stessi dati, piu' i dati strutturati e il file llms.txt.
// React sostituisce questo markup appena parte: chi naviga non lo vede.
import type { Plugin } from 'vite';
import { highlights, network, sectors } from '../src/components/studio/network';

export const SITE = 'https://nlpartnerstudio.it';
const TITLE = 'NL Partner Studio | GEO, Knowledge Management e app verticali';
const DESCRIPTION = 'Rendiamo leggibile la conoscenza della tua azienda: GEO per farti citare da ChatGPT, Perplexity e Gemini, setup di Knowledge Management e app verticali. Si parte da un discovery workshop.';
const LINKEDIN = 'https://www.linkedin.com/in/nicolaleone-';
const VAT = '04886240615';

export const faq = [
  { q: "Cos'è la GEO (Generative Engine Optimization)?", a: "È il lavoro che serve perché un'azienda venga citata nelle risposte di ChatGPT, Perplexity, Gemini e delle AI Overviews di Google. La SEO ti mette in una lista di link; la GEO ti mette dentro la risposta." },
  { q: 'Che differenza c\'è tra GEO e SEO?', a: 'La SEO ottimizza per un motore che mostra link, la GEO per un motore che scrive una risposta. Contano meno le parole chiave e di più fonti autorevoli, entità chiare, dati strutturati e contenuti che le AI possono leggere e citare.' },
  { q: 'Cosa vuol dire fare Knowledge Management in azienda?', a: 'Decidere dove vive la conoscenza, chi la mantiene e come si condivide, così che non dipenda dalla memoria delle singole persone: struttura, regole, strumenti e abitudini.' },
  { q: 'Da dove si comincia a lavorare con NL Partner Studio?', a: 'Da un discovery workshop di mezza giornata: GEO, Knowledge Management o app verticali. Ne esce una diagnosi scritta; il progetto, se c\'è, si decide dopo, sui dati.' },
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function staticBody() {
  const lines = sectors.map((s, i) => `
      <article>
        <h3>${String(i + 1).padStart(2, '0')} · ${esc(s.name)}</h3>
        <p><strong>${esc(s.hint)}.</strong> ${esc(s.claim)}</p>
        <ul>${s.services.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <p>Workshop d'ingresso: <strong>«${esc(s.workshop.title)}»</strong>. ${esc(s.workshop.text)}</p>
        ${s.proof ? `<p>Fatto da noi: ${esc(s.proof)}</p>` : ''}
      </article>`).join('');
  const partners = network.map(g => `
      <h3>${esc(g.name)}</h3>
      <ul>${g.partners.map(p => `<li>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}${p.via ? ` (via ${esc(p.via)})` : ''}</li>`).join('')}</ul>`).join('');
  return `
    <div class="prerender">
      <header><p>NL Partner Studio</p><p>GEO · Knowledge Management · App verticali</p></header>
      <main>
        <h1>Se le AI non ti citano, non esisti.</h1>
        <p>Rendiamo leggibile la conoscenza della tua azienda: per le AI, per le persone, per i prodotti. Tre linee di lavoro, ognuna parte da un discovery workshop.</p>
        <section><h2>Servizi</h2>${lines}</section>
        <section><h2>Chi siamo</h2><p>Doppia anima: rigore accademico e pragmatismo operativo. Fondato da Nicola Leone.</p>
          <ul>${highlights.map(h => `<li><strong>${esc(h.title)}</strong>: ${esc(h.description)}</li>`).join('')}</ul></section>
        <section><h2>Partnership: nella nostra orbita</h2><p>Istituzioni, aziende e brand con cui lavoriamo. Dove il rapporto passa da un master, lo indichiamo.</p>${partners}</section>
        <section><h2>Domande frequenti</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
        <section><h2>Contatti</h2><p>Prenota un discovery workshop dalla chat del sito. LinkedIn: <a href="${LINKEDIN}">Nicola Leone</a>.</p></section>
      </main>
      <footer><p>© ${new Date().getFullYear()} NL Partner Studio · P.IVA ${VAT}</p></footer>
    </div>`;
}

function jsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService', '@id': `${SITE}/#studio`, name: 'NL Partner Studio', url: `${SITE}/`,
        description: DESCRIPTION, slogan: 'Se le AI non ti citano, non esisti.',
        image: `${SITE}/og-image.png`, logo: `${SITE}/og-image.png`, vatID: `IT${VAT}`, areaServed: 'IT', inLanguage: 'it',
        founder: { '@id': `${SITE}/#nicola-leone` },
        employee: [{ '@id': `${SITE}/#nicola-leone` }, { '@type': 'Person', name: 'Antonio Abela', jobTitle: 'Business Developer' }],
        knowsAbout: ['Generative Engine Optimization', 'GEO', 'AI search visibility', 'Knowledge Management', 'Knowledge sharing', 'Ontologie di dominio', 'Large Language Models', 'Sviluppo di app verticali'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: 'Servizi NL Partner Studio',
          itemListElement: sectors.flatMap(s => [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name === 'GEO' ? 'Generative Engine Optimization (GEO)' : s.name.charAt(0) + s.name.slice(1).toLowerCase(), description: `${s.claim} ${s.services.join('; ')}.` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Discovery workshop: ${s.workshop.title}`, description: s.workshop.text } },
          ]),
        },
      },
      {
        '@type': 'Person', '@id': `${SITE}/#nicola-leone`, name: 'Nicola Leone', jobTitle: 'Founder, NL Partner Studio',
        alumniOf: 'Università degli Studi di Roma Tor Vergata',
        knowsAbout: ['Generative Engine Optimization', 'Knowledge Management', 'Innovation Management', 'Digital Marketing', 'Large Language Models'],
        sameAs: [LINKEDIN],
      },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, name: 'NL Partner Studio', url: `${SITE}/`, inLanguage: 'it-IT', publisher: { '@id': `${SITE}/#studio` } },
      { '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;
}

function llmsTxt() {
  return `# NL Partner Studio

> ${DESCRIPTION}

Fondato da Nicola Leone (PhD in Business Management, docente di Management all'Università di Roma Tor Vergata). Business Developer: Antonio Abela. Sito: ${SITE}

## Linee di lavoro

${sectors.map(s => `### ${s.name}\n${s.hint}. ${s.claim}\n${s.services.map(x => `- ${x}`).join('\n')}\n- Workshop d'ingresso «${s.workshop.title}»: ${s.workshop.text}${s.proof ? `\n- Fatto da noi: ${s.proof}` : ''}`).join('\n\n')}

## Chi siamo

${highlights.map(h => `- **${h.title}**: ${h.description}`).join('\n')}

## Partnership

${network.map(g => `### ${g.name}\n${g.partners.map(p => `- ${p.name}${p.via ? ` (via ${p.via})` : ''}`).join('\n')}`).join('\n\n')}

## Domande frequenti

${faq.map(f => `**${f.q}**\n${f.a}`).join('\n\n')}

## Contatti

- Chat del sito: ${SITE}
- LinkedIn del founder: ${LINKEDIN}
`;
}

export function prerender(): Plugin {
  return {
    name: 'nlps-prerender',
    transformIndexHtml(html) {
      return html
        .replace('<!--seo:title-->', esc(TITLE))
        .replace(/<!--seo:description-->/g, esc(DESCRIPTION))
        .replace('<!--seo:jsonld-->', jsonLd())
        .replace('<div id="root"></div>', `<div id="root">${staticBody()}</div>`);
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt() });
    },
  };
}
