ALTER TABLE "projects"
ADD COLUMN "cost_range" int4range DEFAULT 'empty' NOT NULL;