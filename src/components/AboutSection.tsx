import { Eyebrow, SplitTitle } from './studio/Primitives';
import { Conveyor } from './studio/Conveyor';
const highlights = [
 {title:'Consulenza Manageriale',description:'Solida base accademica unita a concreta esperienza sul campo'},
 {title:'AI & Innovation',description:"Soluzioni AI per l'ottimizzazione dei processi aziendali"},
 {title:'Formazione Accademica',description:'Docente universitario e PhD in Innovation Management'},
 {title:'Track Record',description:'Co-founder Minnovo.it, esperienza cross-industry'},
];
export function AboutSection() {
 return <section id="about" className="studio-section about-section" aria-labelledby="about-heading"><div className="horizontal-stage"><header className="section-heading"><Eyebrow>Chi Siamo</Eyebrow><SplitTitle id="about-heading" first="Doppia anima: rigore accademico" second="e pragmatismo operativo"/></header><Conveyor items={highlights} small/></div></section>;
}
