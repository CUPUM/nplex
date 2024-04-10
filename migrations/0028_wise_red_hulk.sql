ALTER TABLE "projects_t" DROP COLUMN "ts";

ALTER TABLE "projects_t"
ADD COLUMN "ts" tsvector generated always AS (
		setweight(
			to_tsvector(
				CASE
					WHEN lang = 'fr' THEN 'french'::regconfig
					WHEN lang = 'en' THEN 'english'::regconfig
				END,
				coalesce(title, '')
			),
			'A'
		) || setweight(
			to_tsvector(
				CASE
					WHEN lang = 'fr' THEN 'french'::regconfig
					WHEN lang = 'en' THEN 'english'::regconfig
				END,
				coalesce(summary, '')
			),
			'B'
		) || setweight(
			to_tsvector(
				CASE
					WHEN lang = 'fr' THEN 'french'::regconfig
					WHEN lang = 'en' THEN 'english'::regconfig
				END,
				coalesce(description, '')
			),
			'C'
		)
	) stored;