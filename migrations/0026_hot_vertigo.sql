ALTER TABLE "auth"."users"
ADD COLUMN "legacy_password" boolean;

UPDATE "auth"."users"
SET "legacy_password" = TRUE;