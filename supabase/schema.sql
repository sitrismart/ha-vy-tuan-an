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

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

-- "Automatically expose new tables" is off, so the anon role needs explicit
-- table-level grants; RLS policies alone are not enough for PostgREST access.
grant select, insert on public.rsvps to anon;
grant select, insert on public.wishes to anon;

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
