ALTER TABLE "auth"."users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "github_username" text;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_github_username_unique" UNIQUE("github_username");