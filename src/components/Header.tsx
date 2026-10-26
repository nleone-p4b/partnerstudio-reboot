import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiquidGlass, Logo, openChat } from './studio/Primitives';
const navItems = [{label:'Chi Siamo', href:'#about'}, {label:'Servizi',href:'#services'}, {label:'Partnership',href:'#partnerships'}];
export function Header({ introActive = false }: { introActive?: boolean }) {
  const [menu, setMenu] = useState(false);
  return <header className="site-header"><LiquidGlass className="header-glass"><nav aria-label="Navigazione principale"><a href="#" aria-label="NL Partner Studio — Home" className="header-brand">{!introActive && <Logo shared/>}</a><div className="desktop-nav">{navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</div><Button className="studio-button header-contact" onClick={openChat}>Contattaci <ArrowUpRight size={16}/></Button><Button variant="ghost" size="icon" className="mobile-menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Chiudi menu' : 'Apri menu'}>{menu ? <X/> : <Menu/>}</Button></nav>{menu && <div className="mobile-nav">{navItems.map(item => <a href={item.href} key={item.href} onClick={() => setMenu(false)}>{item.label}</a>)}<Button className="studio-button" onClick={() => {setMenu(false);openChat();}}>Contattaci <ArrowUpRight/></Button></div>}</LiquidGlass></header>;
}
