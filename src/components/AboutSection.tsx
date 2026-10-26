import { Eyebrow, SplitTitle, Reveal, LiquidGlass } from './studio/Primitives';
const highlights = [
 {title:'Consulenza Manageriale',description:'Solida base accademica unita a concreta esperienza sul campo'},
 {title:'AI & Innovation',description:"Soluzioni AI per l'ottimizzazione dei processi aziendali"},
 {title:'Formazione Accademica',description:'Docente universitario e PhD in Innovation Management'},
 {title:'Track Record',description:'Co-founder Minnovo.it, esperienza cross-industry'},
];
export function AboutSection() {
 return <section id="about" className="studio-section about-section" aria-labelledby="about-heading"><header className="section-heading"><Eyebrow>Chi Siamo</Eyebrow><SplitTitle id="about-heading" first="Doppia anima: rigore accademico" second="e pragmatismo operativo"/></header><div className="about-grid" role="list">{highlights.map((item,i) => <Reveal index={i} key={item.title} className="about-reveal"><LiquidGlass className={`about-card ${i===0 ? 'featured-card' : ''}`} role="listitem"><span className="card-number">0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-bottom-line"/></LiquidGlass></Reveal>)}</div></section>;
}
