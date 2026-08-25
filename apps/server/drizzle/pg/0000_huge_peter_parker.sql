CREATE TABLE "attachments" (
	"source_row_id" bigint PRIMARY KEY NOT NULL,
	"message_source_row_id" bigint NOT NULL,
	"guid" text,
	"transfer_name" text,
	"mime_type" text,
	"total_bytes" bigint,
	"source_path" text
);
--> statement-breakpoint
CREATE TABLE "chat_handles" (
	"chat_source_row_id" bigint NOT NULL,
	"handle_source_row_id" bigint NOT NULL,
	CONSTRAINT "chat_handles_chat_source_row_id_handle_source_row_id_pk" PRIMARY KEY("chat_source_row_id","handle_source_row_id")
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"source_row_id" bigint PRIMARY KEY NOT NULL,
	"guid" text NOT NULL,
	"identifier" text,
	"service_name" text,
	"display_name" text,
	"is_group" boolean DEFAULT false NOT NULL,
	"synced_at_ms" bigint NOT NULL,
	CONSTRAINT "chats_guid_unique" UNIQUE("guid")
);
--> statement-breakpoint
CREATE TABLE "handles" (
	"source_row_id" bigint PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"service" text,
	"synced_at_ms" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"source_row_id" bigint PRIMARY KEY NOT NULL,
	"guid" text NOT NULL,
	"chat_source_row_id" bigint,
	"handle_source_row_id" bigint,
	"is_from_me" boolean NOT NULL,
	"text" text,
	"service" text,
	"sent_at_ms" bigint NOT NULL,
	"has_attachments" boolean DEFAULT false NOT NULL,
	"synced_at_ms" bigint NOT NULL,
	CONSTRAINT "messages_guid_unique" UNIQUE("guid")
);
--> statement-breakpoint
CREATE TABLE "sync_state" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "attachments_message_idx" ON "attachments" USING btree ("message_source_row_id");--> statement-breakpoint
CREATE INDEX "messages_chat_sent_idx" ON "messages" USING btree ("chat_source_row_id","sent_at_ms");--> statement-breakpoint
CREATE INDEX "messages_sent_idx" ON "messages" USING btree ("sent_at_ms");