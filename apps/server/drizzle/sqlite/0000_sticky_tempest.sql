CREATE TABLE `attachments` (
	`source_row_id` integer PRIMARY KEY NOT NULL,
	`message_source_row_id` integer NOT NULL,
	`guid` text,
	`transfer_name` text,
	`mime_type` text,
	`total_bytes` integer,
	`source_path` text
);
--> statement-breakpoint
CREATE INDEX `attachments_message_idx` ON `attachments` (`message_source_row_id`);--> statement-breakpoint
CREATE TABLE `chat_handles` (
	`chat_source_row_id` integer NOT NULL,
	`handle_source_row_id` integer NOT NULL,
	PRIMARY KEY(`chat_source_row_id`, `handle_source_row_id`)
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`source_row_id` integer PRIMARY KEY NOT NULL,
	`guid` text NOT NULL,
	`identifier` text,
	`service_name` text,
	`display_name` text,
	`is_group` integer DEFAULT false NOT NULL,
	`synced_at_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chats_guid_unique` ON `chats` (`guid`);--> statement-breakpoint
CREATE TABLE `handles` (
	`source_row_id` integer PRIMARY KEY NOT NULL,
	`address` text NOT NULL,
	`service` text,
	`synced_at_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`source_row_id` integer PRIMARY KEY NOT NULL,
	`guid` text NOT NULL,
	`chat_source_row_id` integer,
	`handle_source_row_id` integer,
	`is_from_me` integer NOT NULL,
	`text` text,
	`service` text,
	`sent_at_ms` integer NOT NULL,
	`has_attachments` integer DEFAULT false NOT NULL,
	`synced_at_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `messages_guid_unique` ON `messages` (`guid`);--> statement-breakpoint
CREATE INDEX `messages_chat_sent_idx` ON `messages` (`chat_source_row_id`,`sent_at_ms`);--> statement-breakpoint
CREATE INDEX `messages_sent_idx` ON `messages` (`sent_at_ms`);--> statement-breakpoint
CREATE TABLE `sync_state` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
