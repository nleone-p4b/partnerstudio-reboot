import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiquidGlass, Logo, openChat } from './studio/Primitives';

type Props = { introActive?: boolean; onOpenAbout: () => void; onOpenSectors: () => void; onOpenPartners: () => void };

export function Header({ introActive = false, onOpenAbout, onOpenSectors, onOpenPartners }: Props) {
  const [menu, setMenu] = useState(false);
  const items = [
    { label: 'Chi Siamo', action: onOpenAbout },
    { label: 'Servizi', action: onOpenSectors },
    { label: 'Partnership', action: onOpenPartners },
  ];
  return <header className="site-header"><LiquidGlass className="header-glass">
    <nav aria-label="Navigazione principale">
      <a href="#" aria-label="NL Partner Studio — Home" className="header-brand">{!introActive && <Logo shared/>}</a>
      <div className="desktop-nav">{items.map(item => <button type="button" key={item.label} onClick={item.action}>{item.label}</button>)}</div>
      <Button className="studio-button header-contact" onClick={openChat}>Contattaci <ArrowUpRight size={16}/></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Chiudi menu' : 'Apri menu'}>{menu ? <X/> : <Menu/>}</Button>
    </nav>
    {menu && <div className="mobile-nav">
      {items.map(item => <button type="button" key={item.label} onClick={() => { setMenu(false); item.action(); }}>{item.label}</button>)}
      <Button className="studio-button" onClick={() => { setMenu(false); openChat(); }}>Contattaci <ArrowUpRight/></Button>
    </div>}
  </LiquidGlass></header>;
}
