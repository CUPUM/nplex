DROP TABLE "auth"."auth_keys";--> statement-breakpoint
ALTER TABLE "auth"."auth_sessions" RENAME TO "users_sessions";--> statement-breakpoint
ALTER TABLE "auth"."users_sessions" DROP CONSTRAINT "auth_sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."email_verification_codes" ALTER COLUMN "code" SET DEFAULT "extensions"."nanoid"(6,'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_sessions" ADD CONSTRAINT "users_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
