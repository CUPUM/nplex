ALTER TABLE "organization_duties_t" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_duties_t" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_expertises_t" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_expertises_t" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations_t" ALTER COLUMN "name" DROP NOT NULL;