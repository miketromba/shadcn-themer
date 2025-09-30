ALTER TABLE "themes" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "themes" ADD COLUMN "screenshot_version" integer DEFAULT 0 NOT NULL;