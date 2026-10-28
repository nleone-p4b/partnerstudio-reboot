import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiquidGlass, Logo, openChat } from './studio/Primitives';

type Props = {
  introActive?: boolean;
  onOpenAbout?: () => void;
  onOpenSectors?: () => void;
  onOpenPartners?: () => void;
};

export function Header({ introActive = false, onOpenAbout, onOpenSectors, onOpenPartners }: Props) {
  const [menu, setMenu] = useState(false);
  // Fuori dalla home i pannelli non esistono: quelle voci tornano alla home.
  const items = [
    { label: 'Chi Siamo', action: onOpenAbout, to: '/' },
    { label: 'Servizi', action: onOpenSectors, to: '/' },
    { label: 'Partnership', action: onOpenPartners, to: '/' },
  ];

  return <header className="site-header"><LiquidGlass className="header-glass">
    <nav aria-label="Navigazione principale">
      <Link to="/" aria-label="NL Partner Studio — Home" className="header-brand">{!introActive && <Logo shared/>}</Link>
      <div className="desktop-nav">
        {items.map(item => item.action
          ? <button type="button" key={item.label} onClick={item.action}>{item.label}</button>
          : <Link to={item.to} key={item.label}>{item.label}</Link>)}
        <Link to="/blog">Blog</Link>
      </div>
      <Button className="studio-button header-contact" onClick={openChat}>Contattaci <ArrowUpRight size={16}/></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Chiudi menu' : 'Apri menu'}>{menu ? <X/> : <Menu/>}</Button>
    </nav>
    {menu && <div className="mobile-nav">
      {items.map(item => item.action
        ? <button type="button" key={item.label} onClick={() => { setMenu(false); item.action?.(); }}>{item.label}</button>
        : <Link to={item.to} key={item.label} onClick={() => setMenu(false)}>{item.label}</Link>)}
      <Link to="/blog" onClick={() => setMenu(false)}>Blog</Link>
      <Button className="studio-button" onClick={() => { setMenu(false); openChat(); }}>Contattaci <ArrowUpRight/></Button>
    </div>}
  </LiquidGlass></header>;
}
