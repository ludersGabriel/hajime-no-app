ALTER TABLE "ClassExercise" ADD CONSTRAINT "ClassExercise_ce_class_id_ce_exercise_id_pk" PRIMARY KEY("ce_class_id","ce_exercise_id");--> statement-breakpoint
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_cpf_unique" UNIQUE("cpf");--> statement-breakpoint
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_email_unique" UNIQUE("email");