DO $$ BEGIN
 CREATE TYPE "public"."UserRoleEnum" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Checkin" (
	"ci_user_id" uuid NOT NULL,
	"class_time" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ClassExercise" (
	"ce_class_id" uuid NOT NULL,
	"ce_exercise_id" uuid NOT NULL,
	"series" integer,
	"repetitions" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Class" (
	"class_id" uuid PRIMARY KEY NOT NULL,
	"c_category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ExerciseCategory" (
	"category_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ExerciseInfo" (
	"ei_exercise_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(100),
	"description" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Exercise" (
	"exercise_id" uuid PRIMARY KEY NOT NULL,
	"e_category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Login" (
	"username" varchar(50) PRIMARY KEY NOT NULL,
	"password" varchar(118) NOT NULL,
	"l_user_id" uuid,
	"last_login" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PersonalInfo" (
	"pi_user_id" uuid PRIMARY KEY NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"email" varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Subscription" (
	"s_user_id" uuid,
	"s_class_id" uuid NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" "UserRoleEnum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_ci_user_id_User_user_id_fk" FOREIGN KEY ("ci_user_id") REFERENCES "public"."User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassExercise" ADD CONSTRAINT "ClassExercise_ce_class_id_Class_class_id_fk" FOREIGN KEY ("ce_class_id") REFERENCES "public"."Class"("class_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassExercise" ADD CONSTRAINT "ClassExercise_ce_exercise_id_Exercise_exercise_id_fk" FOREIGN KEY ("ce_exercise_id") REFERENCES "public"."Exercise"("exercise_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Class" ADD CONSTRAINT "Class_c_category_id_ExerciseCategory_category_id_fk" FOREIGN KEY ("c_category_id") REFERENCES "public"."ExerciseCategory"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_e_category_id_ExerciseCategory_category_id_fk" FOREIGN KEY ("e_category_id") REFERENCES "public"."ExerciseCategory"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Login" ADD CONSTRAINT "Login_l_user_id_User_user_id_fk" FOREIGN KEY ("l_user_id") REFERENCES "public"."User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_pi_user_id_User_user_id_fk" FOREIGN KEY ("pi_user_id") REFERENCES "public"."User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_s_user_id_User_user_id_fk" FOREIGN KEY ("s_user_id") REFERENCES "public"."User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
