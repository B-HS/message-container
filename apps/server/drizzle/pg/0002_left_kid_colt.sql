CREATE TABLE "logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"level" text NOT NULL,
	"event" text NOT NULL,
	"message" text NOT NULL,
	"details_json" text,
	"created_at_ms" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "is_read" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "date_read_ms" bigint;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "associated_message_guid" text;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "associated_message_type" integer;--> statement-breakpoint
CREATE INDEX "logs_created_idx" ON "logs" USING btree ("created_at_ms");