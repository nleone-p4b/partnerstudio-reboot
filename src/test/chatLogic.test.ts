import { describe,it,expect } from 'vitest';
import { emptyLead,leadPayload,validEmail,serviceAnswer,needs } from '../components/studio/chatLogic';
import { sectors } from '../components/studio/network';
describe('Chat lead rules',()=>{
 it('validates the email before accepting it',()=>{expect(validEmail('nicola@example.it')).toBe(true);expect(validEmail('nicola@')).toBe(false);expect(validEmail('a b@example.it')).toBe(false);});
 it('keeps phone optional',()=>{expect(leadPayload({...emptyLead,name:'Ada',email:'ada@example.it',need:'Strategia'}).phone).toBeUndefined();});
 it('sends need, notes and the required chat source with existing fields',()=>{expect(leadPayload({...emptyLead,name:' Ada ',email:' ada@example.it ',company:'ACME — CEO',need:'Bandi e rendicontazioni',notes:'Progetto 2027',phone:'123'})).toEqual({name:'Ada',email:'ada@example.it',company:'ACME — CEO',phone:'123',message:'Esigenza: Bandi e rendicontazioni\nNote: Progetto 2027\nFonte: chat sito'});});
 it('answers service questions without treating ordinary answers as questions',()=>{expect(serviceAnswer('Offrite supporto ai bandi?')).toContain('bandi e rendicontazioni');expect(serviceAnswer('Ada')).toBeNull();});
 it('includes all seven requested needs',()=>{expect(needs).toEqual(['Strategia','AI & processi','Formazione','Healthcare','Communication','Bandi e rendicontazioni','Altro']);});
 it('preserves all brands in the three spheres',()=>{expect(sectors.map(s=>s.partners.length)).toEqual([11,10,12]);expect(sectors[1].partners.map(p=>p.name)).toContain('Ministero della Salute (Progetto Vita)');expect(sectors[2].partners.map(p=>p.name)).toContain("Il futuro dell'immobiliare");});
});
