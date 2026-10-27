export const needs = ['Strategia','AI & processi','Formazione','Healthcare','Communication','Bandi e rendicontazioni','Altro'];
export type Lead = { name:string; company:string; need:string; email:string; phone:string; notes:string };
export const emptyLead: Lead = {name:'',company:'',need:'',email:'',phone:'',notes:''};
export const validEmail = (value:string) => value.length<=255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function leadPayload(lead:Lead) {return {name:lead.name.trim(),email:lead.email.trim(),phone:lead.phone.trim()||undefined,company:lead.company.trim()||undefined,message:`Esigenza: ${lead.need}\nNote: ${lead.notes || 'Nessuna nota aggiuntiva'}\nFonte: chat sito`};}

const answers = {
 strategia:'Vision & strategy design, performance management con KPI su misura e supporto alle decisioni: partiamo dagli obiettivi e costruiamo il percorso operativo.',
 bandi:'Strutturiamo la partecipazione a bandi e rendicontazioni, dalla scrittura del progetto al monitoraggio degli indicatori.',
 ai:'Mappiamo i processi e li reingegnerizziamo in logica AI-enhanced: identificazione dei quick wins, effort analysis e workflow ibridi umano-AI.',
 formazione:'Progettiamo e teniamo programmi formativi per università e aziende su AI, digital transformation e management, con percorsi certificabili.',
 healthcare:'Lavoriamo su organizzazione, dati e AI per sanità e pharma: processi clinici e amministrativi, progetti per la pubblica amministrazione, patient e caregiver experience.',
 communication:'Posizionamento di marca, social media e content strategy, advertising e funnel di acquisizione, con misurazione dei risultati.',
 prezzi:'La proposta viene definita in base agli obiettivi e alle esigenze del progetto. Nicola potrà parlarne direttamente con te.',
};

export function serviceAnswer(question:string): string | null {
 if(!(/\?|^(come|cosa|quali|quanto|posso|potete|offrite|vorrei sapere|mi dici)\b/i.test(question.trim())))return null;
 const q=question.toLowerCase();
 if(/prezz|cost|quanto|tariff/.test(q))return answers.prezzi;
 if(/bandi|bando|rendicont/.test(q))return answers.bandi;
 if(/\bai\b|intelligenza|process|automa/.test(q))return answers.ai;
 if(/formaz|cors|univers|workshop|docen/.test(q))return answers.formazione;
 if(/health|sanit|pharma|clinic|ospedal/.test(q))return answers.healthcare;
 if(/marketing|communication|comunicaz|social|brand|content/.test(q))return answers.communication;
 return answers.strategia;
}
