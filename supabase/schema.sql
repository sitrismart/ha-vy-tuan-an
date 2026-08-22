create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  wishes text,
  attendance text not null check (attendance in ('yes', 'no', 'maybe')),
  companions text,
  invited_by text not null check (invited_by in ('groom', 'bride', 'both')),
  created_at timestamptz not null default now()
);

create table public.wishes (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  side text not null check (side in ('groom', 'bride', 'both')),
  message text not null,
  created_at timestamptz not null default now()
);

create table public.invite_links (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;
alter table public.invite_links enable row level security;

-- "Automatically expose new tables" is off, so the anon role needs explicit
-- table-level grants; RLS policies alone are not enough for PostgREST access.
grant select, insert on public.rsvps to anon;
grant select, insert on public.wishes to anon;
grant select, insert, delete on public.invite_links to anon;

create policy "Allow public insert on rsvps"
  on public.rsvps for insert
  to anon
  with check (true);

-- No auth on /admin: RSVP list is readable by anyone who knows the API,
-- protected only by the /admin URL not being linked publicly.
create policy "Allow public read on rsvps"
  on public.rsvps for select
  to anon
  using (true);

create policy "Allow public insert on wishes"
  on public.wishes for insert
  to anon
  with check (true);

create policy "Allow public read on wishes"
  on public.wishes for select
  to anon
  using (true);

-- Public insert/read on invite_links too: creation happens from the /admin
-- page (only UI-gated, no server-side auth), and the slug must be readable
-- by anyone opening a personalized invite link to prefill their name.
create policy "Allow public insert on invite_links"
  on public.invite_links for insert
  to anon
  with check (true);

create policy "Allow public read on invite_links"
  on public.invite_links for select
  to anon
  using (true);

create policy "Allow public delete on invite_links"
  on public.invite_links for delete
  to anon
  using (true);
