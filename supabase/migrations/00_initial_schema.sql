-- Extensiones
create extension if not exists "uuid-ossp";

-- 1. Profiles (extiende auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text not null check (role in ('superadmin', 'facilitator', 'participant')) default 'participant',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en perfiles
alter table profiles enable row level security;
create policy "Usuarios pueden ver su propio perfil" on profiles for select using (auth.uid() = id);
create policy "Usuarios pueden actualizar su propio perfil" on profiles for update using (auth.uid() = id);

-- 2. Workshops (Talleres)
create table workshops (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  facilitator_id uuid references profiles(id) on delete cascade not null,
  status text not null check (status in ('active', 'closed')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table workshops enable row level security;
create policy "Facilitadores pueden ver y gestionar sus talleres" on workshops for all using (auth.uid() = facilitator_id);
create policy "Participantes pueden ver el taller en el que están" on workshops for select using (
  exists (select 1 from participants where workshop_id = workshops.id and user_id = auth.uid())
);

-- 3. Participants (Participantes y perfil del negocio)
create table participants (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  workshop_id uuid references workshops(id) on delete cascade not null,
  business_name text,
  sector text,
  target_client text,
  client_problems text,
  client_aspirations text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table participants enable row level security;
create policy "Participantes pueden ver y editar sus datos" on participants for all using (auth.uid() = user_id);
create policy "Facilitadores pueden ver a sus participantes" on participants for select using (
  exists (select 1 from workshops where id = workshop_id and facilitator_id = auth.uid())
);

-- 4. Products (Inventario y Evaluación)
create table products (
  id uuid default uuid_generate_v4() primary key,
  participant_id uuid references participants(id) on delete cascade not null,
  name text not null,
  description text,
  price numeric,
  status text,
  pan_scores jsonb default '{}'::jsonb,
  torta_scores jsonb default '{}'::jsonb,
  strategic_category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table products enable row level security;
create policy "Participantes gestionan sus productos" on products for all using (
  exists (select 1 from participants where id = participant_id and user_id = auth.uid())
);
create policy "Facilitadores ven productos de sus participantes" on products for select using (
  exists (
    select 1 from participants p 
    join workshops w on p.workshop_id = w.id 
    where p.id = participant_id and w.facilitator_id = auth.uid()
  )
);

-- 5. Journeys
create table journeys (
  id uuid default uuid_generate_v4() primary key,
  participant_id uuid references participants(id) on delete cascade not null,
  from_product_id uuid references products(id) on delete set null,
  to_product_id uuid references products(id) on delete set null,
  motivation text,
  barrier text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table journeys enable row level security;
create policy "Participantes gestionan sus journeys" on journeys for all using (
  exists (select 1 from participants where id = participant_id and user_id = auth.uid())
);
create policy "Facilitadores ven journeys de sus participantes" on journeys for select using (
  exists (
    select 1 from participants p 
    join workshops w on p.workshop_id = w.id 
    where p.id = participant_id and w.facilitator_id = auth.uid()
  )
);

-- 6. Opportunities
create table opportunities (
  id uuid default uuid_generate_v4() primary key,
  participant_id uuid references participants(id) on delete cascade not null,
  title text not null,
  attractiveness integer default 0,
  ease integer default 0,
  hypothesis text,
  experiment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table opportunities enable row level security;
create policy "Participantes gestionan sus oportunidades" on opportunities for all using (
  exists (select 1 from participants where id = participant_id and user_id = auth.uid())
);
create policy "Facilitadores ven oportunidades de sus participantes" on opportunities for select using (
  exists (
    select 1 from participants p 
    join workshops w on p.workshop_id = w.id 
    where p.id = participant_id and w.facilitator_id = auth.uid()
  )
);

-- 7. Action Plans
create table action_plans (
  id uuid default uuid_generate_v4() primary key,
  participant_id uuid references participants(id) on delete cascade not null,
  action_title text not null,
  timeframe text check (timeframe in ('7', '30', '60', '90')),
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table action_plans enable row level security;
create policy "Participantes gestionan sus planes" on action_plans for all using (
  exists (select 1 from participants where id = participant_id and user_id = auth.uid())
);
create policy "Facilitadores ven planes de sus participantes" on action_plans for select using (
  exists (
    select 1 from participants p 
    join workshops w on p.workshop_id = w.id 
    where p.id = participant_id and w.facilitator_id = auth.uid()
  )
);
