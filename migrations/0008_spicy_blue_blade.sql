ALTER TABLE "projects"
ADD COLUMN "cost_range" "int4range" DEFAULT '[0,0]' NOT NULL;