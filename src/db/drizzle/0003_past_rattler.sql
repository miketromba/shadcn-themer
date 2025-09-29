ALTER TABLE "profiles" DROP CONSTRAINT "profiles_username_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_username_lower_unique" ON "profiles" USING btree (lower("username"));