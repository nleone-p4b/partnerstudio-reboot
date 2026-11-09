-- CheckWin — schema e regole di accesso.
--
-- COME SI USA
--   Supabase → menu a sinistra → SQL Editor → "New query"
--   Incolla TUTTO questo file nel riquadro, poi premi RUN in basso a destra
--   (oppure Ctrl+Invio, su Mac Cmd+Invio).
--   Se il pulsante Run è spento, clicca prima dentro il riquadro del testo.
--
-- È rieseguibile quante volte vuoi: non cancella dati e non dà errore la seconda volta.

create extension if not exists pgcrypto;

-- ============ tabelle ============

create table if not exists public.matches (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  home        text not null,
  away        text not null,
  hg          int  not null default 0,
  ag          int  not null default 0,
  minute      int  not null default 0,
  finished    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.slips (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  book        text,
  bm          text,
  serial      text,
  date        text,
  stake       numeric(10,2) not null default 0,
  odds        numeric(10,2) not null default 1,
  legs        jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists public.history (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  ts          bigint not null,
  d           text,
  book        text,
  bm          text,
  stake       numeric(10,2) not null default 0,
  odds        numeric(10,2) not null default 1,
  legs        jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists public.settings (
  user_id        uuid primary key default auth.uid() references auth.users on delete cascade,
  limit_month    numeric(10,2) not null default 150,
  notif_preso    boolean not null default true,
  notif_rischio  boolean not null default true,
  notif_chiusa   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create index if not exists matches_user_idx on public.matches (user_id);
create index if not exists slips_user_idx   on public.slips   (user_id);
create index if not exists history_user_idx on public.history (user_id, ts desc);

-- ============ sicurezza a livello di riga ============
-- Ogni utente vede e tocca solo le proprie righe. Senza queste policy
-- la chiave pubblica darebbe accesso a tutto: non saltarle.

alter table public.matches  enable row level security;
alter table public.slips    enable row level security;
alter table public.history  enable row level security;
alter table public.settings enable row level security;

do $$
declare t text;
begin
  foreach t in array array['matches','slips','history'] loop
    execute format('drop policy if exists "proprie righe" on public.%I', t);
    execute format(
      'create policy "proprie righe" on public.%I
         for all to authenticated
         using (auth.uid() = user_id)
         with check (auth.uid() = user_id)', t);
  end loop;
end $$;

drop policy if exists "proprie impostazioni" on public.settings;
create policy "proprie impostazioni" on public.settings
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============ aggiornamenti in tempo reale ============
-- Serve perché una schedina aperta sul telefono si aggiorni anche sul computer.

do $$
declare t text;
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  foreach t in array array['matches','slips','history'] loop
    -- se la tabella è già pubblicata, Postgres solleva un errore: lo ignoriamo
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception
      when duplicate_object then null;
      when others then null;
    end;
  end loop;
end $$;

-- Fatto. In Table Editor devi vedere matches, slips, history, settings.
