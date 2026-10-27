import { services } from './studio/data';
import { Eyebrow, SplitTitle } from './studio/Primitives';
import { Conveyor } from './studio/Conveyor';
export function ServicesSection() {
 return <section id="services" className="studio-section services-section" aria-labelledby="services-heading"><div className="horizontal-stage"><header className="section-heading"><Eyebrow>I Nostri Servizi</Eyebrow><SplitTitle id="services-heading" first="I nostri" second="servizi."/></header><Conveyor items={services}/></div></section>;
}
