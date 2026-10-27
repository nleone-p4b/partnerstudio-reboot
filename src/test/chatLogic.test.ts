import { describe,it,expect } from 'vitest';
import { emptyLead,leadPayload,validEmail,serviceAnswer,needs } from '../components/studio/chatLogic';
import { sectors } from '../components/studio/network';
describe('Chat lead rules',()=>{
 it('validates the email before accepting it',()=>{expect(validEmail('nicola@example.it')).toBe(true);expect(validEmail('nicola@')).toBe(false);expect(validEmail('a b@example.it')).toBe(false);});
 it('keeps phone optional',()=>{expect(leadPayload({...emptyLead,name:'Ada',email:'ada@example.it',need:'Strategia'}).phone).toBeUndefined();});
 it('sends need, notes and the required chat source with existing fields',()=>{expect(leadPayload({...emptyLead,name:' Ada ',email:' ada@example.it ',company:'ACME — CEO',need:'Bandi e rendicontazioni',notes:'Progetto 2027',phone:'123'})).toEqual({name:'Ada',email:'ada@example.it',company:'ACME — CEO',phone:'123',message:'Esigenza: Bandi e rendicontazioni\nNote: Progetto 2027\nFonte: chat sito'});});
 it('answers service questions without treating ordinary answers as questions',()=>{expect(serviceAnswer('Offrite supporto ai bandi?')).toContain('bandi e rendicontazioni');expect(serviceAnswer('Ada')).toBeNull();});
 it('includes all seven requested needs',()=>{expect(needs).toEqual(['Strategia','AI & processi','Formazione','Healthcare','Communication','Bandi e rendicontazioni','Altro']);});
 it('keeps every sector populated and labelled',()=>{expect(sectors).toHaveLength(5);sectors.forEach(s=>{expect(s.partners.length).toBeGreaterThan(0);expect(s.keywords.length).toBeGreaterThan(0);});expect(sectors[1].partners.map(p=>p.name)).toContain('Ministero della Salute (Progetto Vita)');expect(sectors[2].partners.map(p=>p.name)).toContain("Il futuro dell'immobiliare");});
 it('marks brands met through a master instead of passing them off as direct clients',()=>{const viaMaster=sectors.flatMap(s=>s.partners).filter(p=>p.via);expect(viaMaster.length).toBeGreaterThan(30);viaMaster.forEach(p=>expect(p.via).toMatch(/Tor Vergata|More/));expect(sectors[2].partners.find(p=>p.name==='TIM')?.via).toBe('Master EMCM — Tor Vergata');});
});
