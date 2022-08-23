-- 
-- This is a manually written migration file to insert starting values into descriptors tables.
-- 

insert into public.project_category
	(title, description)
values
	('Nouvelle construction', 'Cette catégorie de projet fait référence aux nouveaux projets qui ne s’appuient pas ou s’appuient modestement sur une installation existante.'),
	('Transformation', 'Un projet de transformation consiste en une intervention sur une construction ou un aménagement existant. Cela implique des travaux de rénovation, de valorisation de restauration, etc.');


insert into public.project_type
	(title, description)
values
	('Agrandissement en hauteur de bâtiment', ''),
	('Agrandissement en aire de bâtiment', '');


insert into public.project_type_parent_category
	(type_id, category_id)
values
	(1, 2),
	(2, 2);


insert into public.project_site_ownership
	(title, description)
values
	('Particulier', ''),
	('Entreprise', ''),
	('Public', '');


insert into public.project_site_usage_category
	(title, description)
values
	('Résidentiel', 'Cette catégorie d’usage est souvent aussi appelée Habitation'),
	('Public', ''),
	('Commercial', '');


insert into public.project_site_usage
	(title, description, is_building)
values
	('Unifamiliale', '', true),
	('Duplex', '', true),
	('Triplex', '', true),
	('Quadruplex', '', true),
	('Quintuplex', '', true),
	('Sixplex', '', true),
	('Bloc d’appartements', '', true),
	('Condo(s)', '', true),
	('Habitation(s) communautaire(s)', '', true),
	('Parc de quartier', '', false),
	('Friche / terrain vacant', '', false),
	('Place publique', '', false),
	('Stationnement', '', false),
	('Voirie publique', '', false),
	('Ruelle', '', false),
	('Restaurant / bar / café', '', true),
	('Commerce de détail', '', true),
	('Commerce de gros', '', true),
	('Bureaux', '', true),
	('Bibliothèque', '', true),
	('École', '', true),
	('Local événementiel', '', true);


-- insert into public.project_site_usage_parent_category
-- 	(title, description)
-- values
-- 	('Nouvelle construction', ''),
-- 	('Transformation', '');


insert into public.project_implantation_mode
	(title, description)
values
	('Isolé', ''),
	('Jumelé', ''),
	('Contigu', '');


insert into public.project_material_origin
	(title, label, description)
values
	('Québec', 'Qc', 'Matériau produit ou transformé au Québec'),
	('Canada', 'Ca', '');


insert into public.event_type
	(title, description, durative)
values
	('Conception', 'Processus de conception du projet, s’étendant typiquement de l’idéation jusqu’à la finalisation des plans', true),
	('Remise des plans initiaux', '', false),
	('remise de plans révisés', '', false),
	('Remise des plans finaux', '', false),
	('Période de validité du permis de construction', '', true),
	('Dépôt de la demande de permis de construction', '', false),
	('Révision de la demande de permis de construction', '', false),
	('Obtention du permis de construction', '', false),
	('Renouvellement du permis de construction', '', false),
	('Échéance du permis de construction', '', false),
	('Chantier', '', true),
	('Début des travaux', '', false),
	('Fin des travaux', '', false);


insert into public.project_event_child_type
	(type_id, child_type_id)
values
	(1, 2),
	(1, 3),
	(1, 4);


insert into public.project_implantation_mode
	(title, description)
values
	('Isolé', ''),
	('Jumelé', ''),
	('Contigüe', '');