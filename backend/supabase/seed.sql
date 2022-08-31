-- 
-- Register default 'nplex' user.
-- 

insert into auth.users (
    id,
    instance_id,
    role,
    aud,
    email,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    encrypted_password,
    created_at,
    updated_at,
    last_sign_in_at,
    email_confirmed_at,
    confirmation_sent_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
values (
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'default@nplex.design',
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    '',
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );


-- 
-- Setup storage buckets and folders structure with appropriate starter policies.
-- 

-- insert into storage.buckets (id, name)
-- values ('avatars', 'avatars');

-- create policy "Avatar images are publicly accessible."
--   on storage.objects for select
--   using ( bucket_id = 'avatars' );

-- create policy "Anyone can upload an avatar."
--   on storage.objects for insert
--   with check ( bucket_id = 'avatars' );

-- 
-- Insert initial lists values.
-- 

-- insert into public.project_category
-- 	(title, description)
-- values
-- 	('Nouvelle construction', 'Cette catégorie de projet fait référence aux nouveaux projets qui ne s’appuient pas ou s’appuient modestement sur une installation existante.'),
-- 	('Transformation', 'Un projet de transformation consiste en une intervention sur une construction ou un aménagement existant. Cela implique des travaux de rénovation, de valorisation de restauration, etc.');


-- insert into public.project_type
-- 	(title, description)
-- values
-- 	('Agrandissement en hauteur de bâtiment', ''),
-- 	('Agrandissement en aire de bâtiment', '');


-- insert into public.project_type_parent_category
-- 	(type_id, category_id)
-- values
-- 	((select id from public.project_type where ));


-- insert into public.project_site_ownership
-- 	(title, description)
-- values
-- 	('Particulier', ''),
-- 	('Entreprise', ''),
-- 	('Public', '');


-- insert into public.project_site_usage_category
-- 	(title, description)
-- values
-- 	('Résidentiel', 'Cette catégorie d’usage est souvent aussi appelée Habitation'),
-- 	('Public', ''),
-- 	('Commercial', '');


-- insert into public.project_site_usage
-- 	(title, description, is_building)
-- values
-- 	('Unifamiliale', '', true),
-- 	('Duplex', '', true),
-- 	('Triplex', '', true),
-- 	('Quadruplex', '', true),
-- 	('Quintuplex', '', true),
-- 	('Sixplex', '', true),
-- 	('Bloc d’appartements', '', true),
-- 	('Condo(s)', '', true),
-- 	('Habitation(s) communautaire(s)', '', true),
-- 	('Parc de quartier', '', false),
-- 	('Friche / terrain vacant', '', false),
-- 	('Place publique', '', false),
-- 	('Stationnement', '', false),
-- 	('Voirie publique', '', false),
-- 	('Ruelle', '', false),
-- 	('Restaurant / bar / café', '', true),
-- 	('Commerce de détail', '', true),
-- 	('Commerce de gros', '', true),
-- 	('Bureaux', '', true),
-- 	('Bibliothèque', '', true),
-- 	('École', '', true),
-- 	('Local événementiel', '', true);


-- insert into public.project_site_usage_parent_category
-- 	(title, description)
-- values
-- 	('Nouvelle construction', ''),
-- 	('Transformation', '');


-- insert into public.project_implantation_mode
-- 	(title, description)
-- values
-- 	('Isolé', ''),
-- 	('Jumelé', ''),
-- 	('Contigu', '');


-- insert into public.project_material_origin
-- 	(title, label, description)
-- values
-- 	('Québec', 'Qc', 'Matériau produit ou transformé au Québec'),
-- 	('Canada', 'Ca', '');


-- insert into public.event_type
-- 	(title, description, durative)
-- values
-- 	('Conception', 'Processus de conception du projet, s’étendant typiquement de l’idéation jusqu’à la finalisation des plans', true),
-- 	('Remise des plans initiaux', '', false),
-- 	('Remise de plans révisés', '', false),
-- 	('Remise des plans finaux', '', false),
-- 	('Période de validité du permis de construction', '', true),
-- 	('Dépôt de la demande de permis de construction', '', false),
-- 	('Révision de la demande de permis de construction', '', false),
-- 	('Obtention du permis de construction', '', false),
-- 	('Renouvellement du permis de construction', '', false),
-- 	('Échéance du permis de construction', '', false),
-- 	('Chantier', '', true),
-- 	('Début des travaux', '', false),
-- 	('Fin des travaux', '', false);


-- insert into public.project_event_child_type
-- 	(type_id, child_type_id)
-- values
-- 	(1, 2),
-- 	(1, 3),
-- 	(1, 4);