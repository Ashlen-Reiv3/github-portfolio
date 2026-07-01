-- Portfolio view counter.
-- Run once in your Supabase project (SQL editor, or `supabase db push`).
-- The site calls the two RPCs below with the public anon key; Row-Level Security
-- keeps the table itself private, so all access goes through these SECURITY DEFINER
-- functions.

create table if not exists public.page_views (
  slug  text primary key,
  count bigint not null default 0
);

alter table public.page_views enable row level security;
-- (no policies added on purpose: anon cannot read/write the table directly)

-- Atomically increment a page's count and return the new value.
create or replace function public.increment_view(page_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.page_views (slug, count)
  values (page_slug, 1)
  on conflict (slug) do update set count = public.page_views.count + 1
  returning count;
$$;

-- Read a page's current count without incrementing.
create or replace function public.get_view(page_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  select coalesce((select count from public.page_views where slug = page_slug), 0);
$$;

-- Let the public (anon) key call both functions.
grant execute on function public.increment_view(text) to anon;
grant execute on function public.get_view(text)       to anon;

-- Seed the home row (leaves an existing count untouched).
insert into public.page_views (slug, count) values ('home', 0)
  on conflict (slug) do nothing;

-- ── Reset at launch ─────────────────────────────────────────────────────────
-- Run this one line right before you go live to start the public count at zero:
--   update public.page_views set count = 0 where slug = 'home';
