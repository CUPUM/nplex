CREATE TABLE IF NOT EXISTS "auth"."password_reset_tokens" (
	"id" text NOT NULL,
	"expires" bigint PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	CONSTRAINT "password_reset_tokens_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
