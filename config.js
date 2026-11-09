/* CheckWin — configurazione.
   Lascia i valori vuoti e l'app salva sul dispositivo (localStorage).
   Incolla URL e chiave del tuo progetto Supabase e l'app usa account veri,
   accesso via email e dati sincronizzati tra i dispositivi.

   Dove si trovano: https://supabase.com/dashboard -> il tuo progetto ->
   Settings -> API Keys

     url      = "Project URL"  (https://xxxxxxxx.supabase.co)
     anonKey  = la chiave PUBBLICA. A seconda di quanto e' recente il progetto
                si chiama "Publishable key" e inizia per  sb_publishable_...
                oppure "anon / public" e inizia per  eyJ...
                Vanno bene entrambe: e' pubblica, finisce nel browser di chi apre
                il sito, puo' stare qui dentro.

   NON mettere mai qui la chiave "secret" / "service_role": bypassa le regole di
   sicurezza e deve restare solo sul server. */
window.CHECKWIN_CONFIG = {
  url: "https://ucknrqjirtedunfujtnr.supabase.co",
  anonKey: "sb_publishable_trwIkj5L9yqxg_TPrlNd1g_dubwZXv4"
};
