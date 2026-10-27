import { services } from './data';
export const needs = ['Strategia','AI & processi','Formazione','Healthcare','Communication','Bandi e rendicontazioni','Altro'];
export type Lead = { name:string; company:string; need:string; email:string; phone:string; notes:string };
export const emptyLead: Lead = {name:'',company:'',need:'',email:'',phone:'',notes:''};
export const validEmail = (value:string) => value.length<=255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function leadPayload(lead:Lead) {return {name:lead.name.trim(),email:lead.email.trim(),phone:lead.phone.trim()||undefined,company:lead.company.trim()||undefined,message:`Esigenza: ${lead.need}\nNote: ${lead.notes || 'Nessuna nota aggiuntiva'}\nFonte: chat sito`};}
export function serviceAnswer(question:string): string | null {
 if(!(/\?|^(come|cosa|quali|quanto|posso|potete|offrite|vorrei sapere|mi dici)\b/i.test(question.trim())))return null;
 const q=question.toLowerCase();
 if(/prezz|cost|quanto|tariff/.test(q))return 'La proposta viene definita in base agli obiettivi e alle esigenze del progetto. Nicola potrà parlarne direttamente con te.';
 let index=1;
 if(/bandi|bando|rendicont/.test(q))index=1;
  else if(/\bai\b|intelligenza|process/.test(q))index=0;
 else if(/formaz|cors|univers|workshop/.test(q))index=4;
 else if(/marketing|communication|comunicaz|social/.test(q))index=5;
 else if(/ricerca|mercato/.test(q))index=6;
 else if(/progett/.test(q))index=7;
 else if(/knowledge|conoscenza/.test(q))index=3;
 return services[index].description;
}
