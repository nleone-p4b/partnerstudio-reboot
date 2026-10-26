import { services } from './studio/data';
import { Eyebrow, SplitTitle, Reveal, LiquidGlass } from './studio/Primitives';
export function ServicesSection() {
 return <section id="services" className="studio-section services-section" aria-labelledby="services-heading"><header className="section-heading"><Eyebrow>I Nostri Servizi</Eyebrow><SplitTitle id="services-heading" first="I nostri" second="servizi."/></header><div className="services-grid">{services.map((service,i) => <Reveal index={i%4} key={service.title}><LiquidGlass tilt className={`service-card ${i===1 ? 'featured-card' : ''}`}><span className="card-number">{String(i+1).padStart(2,'0')}</span><h3>{service.title}</h3><p>{service.description}</p><ul className="service-features">{service.features.map((feature,j) => <li key={feature}><span>{String(j+1).padStart(2,'0')}</span> {feature}</li>)}</ul></LiquidGlass></Reveal>)}</div></section>;
}
