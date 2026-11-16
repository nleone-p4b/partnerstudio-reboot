export const needs = ['Workshop GEO: Come ti vedono le AI','Workshop KM: Dove vive la vostra conoscenza','Workshop App: Dal problema all\'app','GEO','Knowledge Management','App verticali','Formazione','Altro'];
export type Lead = { name:string; company:string; need:string; email:string; phone:string; notes:string };
export const emptyLead: Lead = {name:'',company:'',need:'',email:'',phone:'',notes:''};
export const validEmail = (value:string) => value.length<=255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function leadPayload(lead:Lead) {return {name:lead.name.trim(),email:lead.email.trim(),phone:lead.phone.trim()||undefined,company:lead.company.trim()||undefined,message:`Esigenza: ${lead.need}\nNote: ${lead.notes || 'Nessuna nota aggiuntiva'}\nFonte: chat sito`};}

const answers = {
 geo:'La GEO serve a farti citare da ChatGPT, Perplexity, Gemini e dalle AI Overviews. Partiamo dal workshop "Come ti vedono le AI": interroghiamo le AI sulla tua azienda e sui competitor e misuriamo il gap.',
 km:'Costruiamo sistemi di knowledge management: dove vive la conoscenza, chi la mantiene, come si condivide, AI interna compresa. Si parte dal workshop "Dove vive la vostra conoscenza".',
 app:'Sviluppiamo app solo in ambiti che conosciamo da dentro, come travel & lifestyle. Il workshop "Dal problema all\'app" porta da un problema operativo a un\'idea validata.',
 workshop:'Ogni linea parte da un discovery workshop di mezza giornata con il tuo team. Ne esce una diagnosi scritta, che resta tua anche se ti fermi lì.',
 formazione:'Teniamo docenze e workshop per università, business school e aziende su AI, GEO, innovazione e management.',
 prezzi:'Il costo dipende dal workshop e dal perimetro. Nicola te lo dice direttamente: lasciaci i tuoi contatti.',
 generale:'Lavoriamo su tre linee: GEO per farti citare dalle AI, Knowledge Management per non perdere quello che la tua azienda sa, app verticali dove conosciamo il terreno. Si parte sempre da un workshop.',
};

export function serviceAnswer(question:string): string | null {
 if(!(/\?|^(come|cosa|quali|quanto|posso|potete|offrite|vorrei sapere|mi dici)\b/i.test(question.trim())))return null;
 const q=question.toLowerCase();
 if(/prezz|cost|quanto|tariff/.test(q))return answers.prezzi;
 if(/\bgeo\b|chatgpt|perplexity|gemini|citat|visibil|seo|motor/.test(q))return answers.geo;
 if(/knowledge|conoscenz|sapere|know-how|document|condivi/.test(q))return answers.km;
 if(/\bapp\b|applicativ|software|sviluppo|piattaform/.test(q))return answers.app;
 if(/workshop|discovery|inizi|partire|comincia/.test(q))return answers.workshop;
 if(/formaz|cors|univers|docen/.test(q))return answers.formazione;
 return answers.generale;
}
