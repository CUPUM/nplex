-- -- Register default 'nplex' user.

-- insert into auth.users (
--         id,
--         instance_id,
--         role,
--         aud,
--         email,
--         raw_app_meta_data,
--         raw_user_meta_data,
--         is_super_admin,
--         encrypted_password,
--         created_at,
--         updated_at,
--         last_sign_in_at,
--         email_confirmed_at,
--         confirmation_sent_at,
--         confirmation_token,
--         recovery_token,
--         email_change_token_new,
--         email_change
--     )
-- values (
--         extensions.uuid_generate_v4(),
--         '00000000-0000-0000-0000-000000000000',
--         'authenticated',
--         'authenticated',
--         'default@nplex.design',
--         '{"provider":"email","providers":["email"]}',
--         '{}',
--         false,
--         '',
--         NOW(),
--         NOW(),
--         NOW(),
--         NOW(),
--         NOW(),
--         '',
--         '',
--         '',
--         ''
--     );


-- -- Populate role_details

-- insert into public.role_details
--     (role, title, description)
-- values
--     ('nplex', 'Nplex', 'Utilisateur par défaut.'),
--     ('admin', 'Administrateur', 'Administrateur avec accès et permissions permettant de gérer les droits des éditeurs et visiteurs.'),
--     ('editor', 'Éditeur', 'Collaborateur ayant les droits de base pour la gestion et la publication de contenu.'),
--     ('visitor', 'Visiteur', 'Utilisateurs sans droits particuliers de publication.');


-- -- Insert sample lists values.

-- insert into public.project_type
--     (id, title, description)
-- values
--     (1, 'Nouvelle construction', 'Cette catégorie de projet fait référence aux nouveaux projets qui ne s’appuient pas ou s’appuient modestement sur une installation existante.'),
--     (2, 'Transformation', 'Un projet de transformation consiste en une intervention sur une construction ou un aménagement existant. Cela implique des travaux de rénovation, de valorisation de restauration, etc.');

-- select setval(pg_get_serial_sequence('public.project_type', 'id'), max(id)) from public.project_type;

-- insert into public.project_work_category
--     (title, label, description)
-- values
--     ('Travaux d’intérieur', 'Intérieur', ''),
--     ('Travaux d’extérieur', 'Extérieur', ''),
--     ('Travaux de fondation ou de structure', 'Fondation / structure', '');

-- select setval(pg_get_serial_sequence('public.project_type', 'id'), max(id)) from public.project_type;


-- insert into public.project_work
--     (id, title, category_id, description)
-- values
--     (1, 'Construction de nouveau bâtiment', 1, ''),
--     (2, 'Installation de placottoir', 1, ''),
--     (3, 'Aménagement de parc', 1, ''),
--     (4, 'Travaux de chaussée de ruelle', 1, ''),
--     (5, 'Intervention de végétalisation', 1, ''),
--     (6, 'Agrandissement en hauteur de bâtiment', 1, ''),
--     (7, 'Agrandissement en aire de bâtiment', 1, ''),
--     (8, 'Agrandissement en aire de plancher', 1, ''),
--     (9, 'Création ou modification d’une aire communicante', 1, ''),
--     (10, 'Création ou modification d’une mezzanine', 1, ''),
--     (11, 'Changement en bâtiment de grande hauteur', 1, ''),
--     (12, 'Modification des mesures de lutte contre l’incendie', 1, ''),
--     (13, 'Aménagement de cour arrière', 1, ''),
--     (14, 'Aménagement de cour avant', 1, ''),
--     (15, 'Changement d’usage principal', 1, ''),
--     (16, 'Réfection de façade avant', 1, ''),
--     (17, 'Réfection de façade arrière', 1, ''),
--     (18, 'Ajout ou modification d’une construction hors-toit', 1, ''),
--     (19, 'Ajout ou changement d’escalier extérieur', 1, ''),
--     (20, 'Ajout ou rénovation d’escalier intérieur', 1, ''),
--     (21, 'Ajout ou changement de balcon extérieur', 1, ''),
--     (22, 'Ajout ou rénovation de patio arrière', 1, ''),
--     (23, 'Aménagement de terrasse', 1, ''),
--     (24, 'Installation de mobilier urbain', 1, ''),
--     (25, 'Fusion de logements', 1, ''),
--     (26, 'Division de logements', 1, '');

-- select setval(pg_get_serial_sequence('public.project_work', 'id'), max(id)) from public.project_work;


-- insert into public.project_type_work
--     (type_id, work_id)
-- values
--     (1, 1),
--     (1, 2),
--     (1, 3),
--     (1, 5),
--     (1, 9),
--     (1, 10),
--     (1, 18),
--     (1, 19),
--     (1, 20),
--     (1, 21),
--     (1, 22),
--     (1, 23),
--     (2, 3),
--     (2, 4),
--     (2, 5),
--     (2, 6),
--     (2, 7),
--     (2, 8),
--     (2, 9),
--     (2, 10),
--     (2, 11),
--     (2, 12),
--     (2, 13),
--     (2, 14),
--     (2, 15),
--     (2, 16),
--     (2, 17),
--     (2, 18),
--     (2, 19),
--     (2, 20),
--     (2, 21),
--     (2, 22),
--     (2, 23),
--     (2, 24),
--     (2, 25),
--     (2, 26);

-- insert into public.project_site_ownership
--     (title, description)
-- values
--     ('Particulier', ''),
--     ('Commercial', ''),
--     ('Communautaire', ''),
--     ('Gouvernemental / institutionnel', '');

-- -- select setval(pg_get_serial_sequence('project_ownership', 'id'), max(id)) from public.project_ownership;


-- insert into public.project_site_usage_category
--     (id, title, description)
-- values
--     (1, 'Résidentiel', 'Cette catégorie d’usage est souvent aussi appelée _Habitation_'),
--     (2, 'Public & communautaire', ''),
--     (3, 'Commercial & industriel', '');

-- select setval(pg_get_serial_sequence('public.project_site_usage_category', 'id'), max(id)) from public.project_site_usage_category;


-- insert into public.project_site_usage
--     (id, title, description, is_building)
-- values
--     (1, 'Unifamiliale', '', true),
--     (2, 'Duplex', '', true),
--     (3, 'Triplex', '', true),
--     (4, 'Quadruplex ou plus', '', true),
--     (5, 'Logement', '', true),
--     (6, 'Bloc d’appartements', '', true),
--     (7, 'Condo', '', true),
--     (8, 'Habitation communautaire', '', true),
--     (9, 'Parc de voisinage', '', false),
--     (10, 'Parc de quartier', '', false),
--     (11, 'Parc municipal', '', false),
--     (12, 'Place publique', '', false),
--     (13, 'Immeuble public', '', true),
--     (14, 'Terrain vacant', 'Friche', false),
--     (15, 'Terrain de stationnement', '', false),
--     (16, 'Stationnement intérieur', '', true),
--     (17, 'Artère principale', '', false),
--     (18, 'Rue résidentielle', '', false),
--     (19, 'Rue commerciale', '', false),
--     (20, 'Ruelle', '', false),
--     (21, 'Restaurant / bar / café', '', true),
--     (22, 'Commerce de détail', '', true),
--     (23, 'Commerce de gros', '', true),
--     (24, 'Immeuble à bureaux', '', true),
--     (25, 'Local de bureaux', '', true),
--     (26, 'Bibliothèque', '', true),
--     (27, 'École', '', true),
--     (28, 'Établissement religieux', '', true),
--     (29, 'Établissement événementiel', '', true);

-- select setval(pg_get_serial_sequence('public.project_site_usage', 'id'), max(id)) from public.project_site_usage;


-- insert into public.project_site_usage_site_usage_category
--     (category_id, usage_id)
-- values
--     (1, 1),
--     (1, 2),
--     (1, 3),
--     (1, 4),
--     (1, 5),
--     (1, 6),
--     (1, 7),
--     (1, 8),
--     (2, 9),
--     (2, 10),
--     (2, 11),
--     (2, 12),
--     (2, 13),
--     (2, 14),
--     (2, 15),
--     (2, 16),
--     (2, 17),
--     (2, 18),
--     (2, 19),
--     (2, 20),
--     (2, 24),
--     (2, 25),
--     (2, 26),
--     (2, 27),
--     (2, 28),
--     (3, 14),
--     (3, 15),
--     (3, 16),
--     (3, 21),
--     (3, 22),
--     (3, 23),
--     (3, 24),
--     (3, 25),
--     (3, 29);


-- insert into public.project_implantation_mode
--     (title, description)
-- values
--     ('Isolé', ''),
--     ('Jumelé', ''),
--     ('Contigüe', '');


-- insert into public.project_material_origin
--     (title, label, description)
-- values
--     ('Québec', 'Qc', 'Matériau produit ou transformé au Québec'),
--     ('Canada', 'Ca', 'Matériau produit ou transformé au Canada');


-- insert into public.project_material_type
--     (title, description, combustible)
-- values
--     ('Bois de charpente', '', true),
--     ('Bois d’ingénierie', '', true),
--     ('Bois franc', '', true),
--     ('Brique', '', false),
--     ('Pierre', '', false),
--     ('Béton', '', false),
--     ('Céramique', '', false),
--     ('Fer', '', false),
--     ('Aluminium', '', false),
--     ('Acier', '', false),
--     ('Léton', '', false),
--     ('Cuivre', '', false),
--     ('Liège', '', false),
--     ('Nylon', '', true),
--     ('Coton', '', true);


-- insert into public.project_material_use
--     (title, description)
-- values
--     ('Cadre de porte et fenêtre', ''),
--     ('Plancher', 'Intérieur'),
--     ('Recouvrement de sol', 'Extérieur'),
--     ('Charpente et structure', ''),
--     ('Finition extérieure', ''),
--     ('Finition intérieure', ''),
--     ('Mobilier', '');


-- insert into public.project_event_type
--     (id, title, description, durative)
-- values
--     (1, 'Conception', 'Processus de conception du projet, s’étendant typiquement de l’idéation jusqu’à la finalisation des plans', true),
--     (2, 'Remise de plans initiaux', '', false),
--     (3, 'Révision de plans', '', true),
--     (4, 'Remise de plans finaux', '', false),
--     (5, 'Période de validité du permis de construction', '', true),
--     (6, 'Dépôt de demande de permis de construction', '', false),
--     (7, 'Révision de demande de permis de construction', '', false),
--     (8, 'Obtention de permis de construction', '', false),
--     (9, 'Renouvellement de permis de construction', '', false),
--     (10, 'Demande d’opération cadastrale', '', true),
--     (11, 'Certificat d’autorisation', '', true),
--     (12, 'Chantier', '', true),
--     (13, 'Début des travaux', '', false),
--     (14, 'Fin des travaux', '', false);

-- select setval(pg_get_serial_sequence('public.project_event_type', 'id'), max(id)) from public.project_event_type;


-- insert into public.project_event_type_subevent_type
--     (event_type_id, subevent_type_id)
-- values
--     (1, 2),
--     (1, 3),
--     (1, 4);


-- insert into public.project_exemplarity_indicator_category
--     (id, title, label, description)
-- values
--     (1, 'Résilience', 'Résilience', ''),
--     (2, 'Environnement', 'Environnement', ''),
--     (3, 'Économie', 'Économie', ''),
--     (4, 'Culture', 'Culture', ''),
--     (5, 'Équité, diversité et inclusion', 'Équité, diversité & inclusion', ''),
--     (6, 'Santé et bien-être', 'Santé & bien-être', '');

-- select setval(pg_get_serial_sequence('public.project_exemplarity_indicator_category', 'id'), max(id)) from public.project_exemplarity_indicator_category;


-- insert into public.project_exemplarity_indicator
--     (category_id, title, label, description)
-- values
--     (1, 'Matériaux écologiques', 'Matériaux écologiques', ''),
--     (1, 'Construction durable', 'Construction durable', ''),
--     (1, 'Recyclage ou réutilisation de matériaux', 'Recyclage ou réutilisation de matériaux', ''),
--     (2, 'Processus participatif', 'Processus participatif', ''),
--     (2, 'Consultation du voisinage', 'Consultation du voisinage', ''),
--     (2, 'Recherche historique', 'Recherche historique', ''),
--     (3, 'Innovation', 'Innovation', ''),
--     (3, 'Intégration contextuelle', 'Intégration contextuelle', ''),
--     (4, 'Réduction du bruit', 'Réduction du bruit', ''),
--     (4, 'Amélioration de la sécurité', 'Amélioration de la sécurité', ''),
--     (4, 'Saines habitudes de vie', 'Saines habitudes de vie', ''),
--     (5, 'Ilôt de fraîcheur', 'Ilôt de fraîcheur', ''),
--     (5, 'Gestion des eaux de pluie', 'Gestion des eaux de pluie', ''),
--     (5, 'Biodiversité', 'Biodiversité', ''),
--     (5, 'Efficacité thermique', 'Efficacité thermique', '');