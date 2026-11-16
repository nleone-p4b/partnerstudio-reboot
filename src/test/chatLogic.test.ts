import { describe,it,expect } from 'vitest';
import { emptyLead,leadPayload,validEmail,serviceAnswer,needs } from '../components/studio/chatLogic';
import { network, sectors } from '../components/studio/network';
describe('Chat lead rules',()=>{
 it('validates the email before accepting it',()=>{expect(validEmail('nicola@example.it')).toBe(true);expect(validEmail('nicola@')).toBe(false);expect(validEmail('a b@example.it')).toBe(false);});
 it('keeps phone optional',()=>{expect(leadPayload({...emptyLead,name:'Ada',email:'ada@example.it',need:'GEO'}).phone).toBeUndefined();});
 it('sends need, notes and the required chat source with existing fields',()=>{expect(leadPayload({...emptyLead,name:' Ada ',email:' ada@example.it ',company:'ACME — CEO',need:'GEO',notes:'Progetto 2027',phone:'123'})).toEqual({name:'Ada',email:'ada@example.it',company:'ACME — CEO',phone:'123',message:'Esigenza: GEO\nNote: Progetto 2027\nFonte: chat sito'});});
 it('answers service questions without treating ordinary answers as questions',()=>{expect(serviceAnswer('Fate GEO per ChatGPT?')).toContain('Come ti vedono le AI');expect(serviceAnswer('Ada')).toBeNull();});
 it('offers the three workshops first among the needs',()=>{expect(needs.slice(0,3).every(n=>n.startsWith('Workshop'))).toBe(true);expect(needs.at(-1)).toBe('Altro');});
 it('gives every line its services and its entry workshop',()=>{expect(sectors.map(s=>s.name)).toEqual(['GEO','KNOWLEDGE MANAGEMENT','APP VERTICALI']);sectors.forEach(s=>{expect(s.services.length).toBeGreaterThan(2);expect(s.workshop.title.length).toBeGreaterThan(0);});});
 it('marks brands met through a master instead of passing them off as direct clients',()=>{const all=network.flatMap(g=>g.partners);const viaMaster=all.filter(p=>p.via);expect(viaMaster.length).toBeGreaterThan(30);viaMaster.forEach(p=>expect(p.via).toMatch(/Tor Vergata|More/));expect(all.find(p=>p.name==='TIM')?.via).toBe('Master EMCM — Tor Vergata');expect(all.map(p=>p.name)).toContain('Ministero della Salute (Progetto Vita)');});
});
