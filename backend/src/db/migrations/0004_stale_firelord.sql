ALTER TABLE "Subscription" ALTER COLUMN "s_user_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_s_class_id_Class_class_id_fk" FOREIGN KEY ("s_class_id") REFERENCES "public"."Class"("class_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
