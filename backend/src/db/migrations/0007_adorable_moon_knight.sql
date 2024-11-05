DO $$ BEGIN
 CREATE TYPE "public"."FileFormatEnum" AS ENUM('mp4', 'png', 'jpg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Content" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Content" ALTER COLUMN "storage_path" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "Content" ADD COLUMN "size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Content" ADD COLUMN "format" "FileFormatEnum" NOT NULL;