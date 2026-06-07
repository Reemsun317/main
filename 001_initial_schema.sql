create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'buyer' check (role in ('buyer', 'vendor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  category_id uuid references public.categories(id) on delete set null,
  description text,
  address text,
  city text,
  state text,
  latitude numeric,
  longitude numeric,
  whatsapp_number text,
  phone_number text,
  logo_url text,
  cover_image_url text,
  opening_hours text,
  is_verified boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  description text,
  price numeric not null check (price >= 0),
  image_url text,
  availability_status text not null default 'available' check (availability_status in ('available', 'out_of_stock', 'limited_stock')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, slug)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  business_id uuid references public.businesses(id) on delete cascade,
  buyer_name text,
  buyer_phone text,
  source text not null default 'whatsapp_click',
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists businesses_touch_updated_at on public.businesses;
create trigger businesses_touch_updated_at
before update on public.businesses
for each row execute function public.touch_updated_at();

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.products enable row level security;
alter table public.leads enable row level security;

create policy "profiles can view their own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "users can update their own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "categories are public readable"
on public.categories for select
using (true);

create policy "admins manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "approved businesses are public readable"
on public.businesses for select
using (status = 'approved' or owner_id = auth.uid() or public.is_admin());

create policy "vendors insert their businesses"
on public.businesses for insert
with check (owner_id = auth.uid());

create policy "vendors update their businesses"
on public.businesses for update
using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

create policy "admins delete businesses"
on public.businesses for delete
using (public.is_admin());

create policy "approved business products are public readable"
on public.products for select
using (
  exists (
    select 1 from public.businesses
    where businesses.id = products.business_id
    and (businesses.status = 'approved' or businesses.owner_id = auth.uid() or public.is_admin())
  )
);

create policy "vendors manage own products"
on public.products for all
using (
  exists (
    select 1 from public.businesses
    where businesses.id = products.business_id
    and (businesses.owner_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1 from public.businesses
    where businesses.id = products.business_id
    and (businesses.owner_id = auth.uid() or public.is_admin())
  )
);

create policy "lead inserts are allowed"
on public.leads for insert
with check (true);

create policy "vendors view own leads"
on public.leads for select
using (
  public.is_admin()
  or exists (
    select 1 from public.businesses
    where businesses.id = leads.business_id
    and businesses.owner_id = auth.uid()
  )
);

insert into storage.buckets (id, name, public)
values
  ('business-images', 'business-images', true),
  ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "business images are publicly readable"
on storage.objects for select
using (bucket_id = 'business-images');

create policy "product images are publicly readable"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "authenticated users upload business images"
on storage.objects for insert
with check (bucket_id = 'business-images' and auth.role() = 'authenticated');

create policy "authenticated users upload product images"
on storage.objects for insert
with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
