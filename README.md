# CheckWin — web app

App a file singolo. `index.html` contiene interfaccia, motore dei mercati e schermate.
Nessuna compilazione, nessuna dipendenza da installare.

Funziona in tre modi, scelti da sola all'avvio:

| Modo | Quando | Dove stanno i dati |
|---|---|---|
| **Supabase** | hai compilato `config.js` | sul tuo account, sincronizzati tra dispositivi |
| **Dispositivo** | `config.js` vuoto | `localStorage` di quel browser |
| **Ospite** | entri senza email | `localStorage`, massimo 3 schedine |

---

## 1. Metterla online (2 minuti)

**Netlify Drop** — il più veloce, non serve account per provare.
1. Vai su https://app.netlify.com/drop
2. Trascina dentro **la cartella `checkwin-web` intera**, non i singoli file.
3. Esce un indirizzo tipo `https://nome-a-caso.netlify.app`. È già online, in HTTPS.
4. Dal pannello colleghi il tuo dominio.

**Vercel** — consigliato se vuoi dominio e deploy automatici.
Nel pacchetto c'è già `vercel.json` con le intestazioni giuste (il service worker
non deve finire in cache, altrimenti gli aggiornamenti non arrivano mai).
1. https://vercel.com → **Add New… → Project**
2. Se hai il codice su GitHub, importa il repo. Altrimenti: `npm i -g vercel`,
   poi dalla cartella `vercel --prod` e segui le domande.
3. Framework Preset: **Other**. Build Command: lascia vuoto. Output Directory: lascia vuoto.
4. Al primo deploy esce `https://qualcosa.vercel.app`. Il dominio si attacca da
   Project → Settings → Domains.

**Cloudflare Pages**: progetto nuovo, carica la cartella, nessun comando di build,
cartella di pubblicazione la radice. C'è anche `netlify.toml` per Netlify.

**GitHub Pages**:
```bash
cd checkwin-web
git init && git add . && git commit -m "CheckWin"
gh repo create checkwin-web --public --source=. --push
```
Poi Settings → Pages → Source `main`, cartella `/ (root)`.

Serve **HTTPS**: senza, il service worker non parte e l'app non si installa.

## 2. Installarla sul telefono

- **iPhone**: apri l'indirizzo in Safari → Condividi → *Aggiungi alla schermata Home*.
- **Android**: Chrome propone *Installa app*, oppure menu → *Aggiungi a schermata Home*.

---

## 3. Account veri con Supabase

Senza questo passaggio i dati restano sul singolo dispositivo e l'accesso via email è finto.

### 3.1 Crea il progetto
https://supabase.com → **New project**. Piano gratuito.
Segnati la password del database (serve solo a te).

### 3.2 Crea le tabelle
Dashboard → **SQL Editor** → **New query** → incolla tutto `supabase/schema.sql` → **Run**.

Crea `matches`, `slips`, `history`, `settings`, accende la **Row Level Security** con la
policy `auth.uid() = user_id`, e pubblica le tabelle in realtime.
Puoi rieseguirlo senza rompere niente.

> La RLS non è un dettaglio. La chiave `anon` sta nel browser di chiunque:
> è quella policy, e solo quella, a impedire che un utente legga le schedine di un altro.

### 3.3 Accendi il link via email
Dashboard → **Authentication** → **Providers** → **Email**:
- *Enable Email provider*: acceso
- *Confirm email*: acceso
- *Secure email change*: acceso

Poi **Authentication → URL Configuration**:
- **Site URL**: l'indirizzo dove hai pubblicato l'app, per esempio `https://checkwin.netlify.app`
- **Redirect URLs**: aggiungi lo stesso indirizzo (e `http://localhost:8000` se provi in locale)

Senza questo, il link arriva ma rimanda a un indirizzo sbagliato.

### 3.4 Incolla le chiavi
Dashboard → **Project Settings** → **API**. Apri `config.js` e compila:

```js
window.CHECKWIN_CONFIG = {
  url: "https://xxxxxxxxxxxx.supabase.co",   // Project URL
  anonKey: "eyJhbGciOi..."                   // chiave "anon public"
};
```

La chiave `anon` è pubblica per progetto: sta nel browser di tutti, va benissimo
che stia qui. Quella da non pubblicare mai è la `service_role`.

Ricarica l'app: la schermata di accesso adesso manda un'email vera, il pulsante
"solo nel prototipo" sparisce da solo e i dati viaggiano con l'account.

### 3.5 Le email in produzione
Il server SMTP di cortesia di Supabase ha un limite basso e serve solo per provare.
Appena fai sul serio collega il tuo: **Project Settings → Authentication → SMTP Settings**
(Resend, Postmark, Amazon SES). Altrimenti dopo qualche decina di accessi le email smettono
di partire.

---

## Cosa c'è dentro

| File | A cosa serve |
|---|---|
| `index.html` | Tutta l'app |
| `config.js` | Le due chiavi di Supabase. Vuoto = dati sul dispositivo |
| `vendor/supabase.js` | Client Supabase 2.118.0, incluso: l'app non dipende da una CDN |
| `supabase/schema.sql` | Tabelle, policy di sicurezza, realtime |
| `manifest.webmanifest` | Nome, icona, colori, avvio a tutto schermo |
| `sw.js` | Service worker: l'app si apre anche senza rete |
| `icon-*.png` | Icone per la schermata Home |

I punti del codice che toccano i dati sono raccolti in un blocco solo,
sotto il commento `/* persistenza */`: `boot`, `wMatch`, `wCfg`, `archive`,
`delSlip`, `saveSlip`. Se cambi backend, cambi lì.

---

## Se qualcosa non torna

**L'icona non si vede quando aggiungo alla schermata Home.**
Quasi sempre è perché hai aggiunto l'indirizzo di **claude.ai**, non il sito pubblicato.
La pagina su claude.ai è un'anteprima dentro il loro sito: non può dichiarare la propria
icona, e iOS mette lo screenshot della pagina. L'icona c'è solo nel sito che pubblichi tu.
Quindi: pubblica su Vercel o Netlify, apri **quell'indirizzo** in Safari, poi Condividi →
Aggiungi alla schermata Home.
Se l'avevi già aggiunto prima, iOS tiene in cache la vecchia icona: togli l'app dalla Home,
chiudi la scheda in Safari e rifai l'operazione.

**Il link di accesso non mi fa entrare.**
Authentication → URL Configuration: **Site URL** e **Redirect URLs** devono contenere
esattamente l'indirizzo da cui apri l'app, compreso `https://`. Se pubblichi su Vercel
ricordati che ogni anteprima ha un sottodominio diverso: aggiungi quello di produzione.

**Ho aggiornato il sito ma sul telefono vedo la versione vecchia.**
È il service worker. Chiudi l'app dalla multitasking e riaprila: al secondo avvio ha la
versione nuova. `vercel.json` e `netlify.toml` servono proprio a rendere questo giro breve.

## Prima di aprirla al pubblico

- **Punteggi in tempo reale**: oggi li muovi a mano dalla scheda Live. Per il live vero
  serve un provider — API-Football per partire, Sportradar per la bassa latenza che
  rende utili le notifiche.
- **Lettura della schedina**: il pulsante della fotocamera è un segnaposto. Serve un
  modello visivo che legga righe, mercati e quote.
- **Store**: Google Play vieta esplicitamente le funzioni companion al gioco d'azzardo,
  Apple è restrittiva. Una web app installabile non passa da quel vaglio.
