ALTER TABLE "Class" ALTER COLUMN "class_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "ExerciseCategory" ALTER COLUMN "category_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "Exercise" ALTER COLUMN "exercise_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT gen_random_uuid();