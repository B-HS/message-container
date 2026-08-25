CREATE TABLE `attachments` (
	`source_row_id` bigint NOT NULL,
	`message_source_row_id` bigint NOT NULL,
	`guid` varchar(191),
	`transfer_name` text,
	`mime_type` varchar(255),
	`total_bytes` bigint,
	`source_path` text,
	CONSTRAINT `attachments_source_row_id` PRIMARY KEY(`source_row_id`)
);
--> statement-breakpoint
CREATE TABLE `chat_handles` (
	`chat_source_row_id` bigint NOT NULL,
	`handle_source_row_id` bigint NOT NULL,
	CONSTRAINT `chat_handles_chat_source_row_id_handle_source_row_id_pk` PRIMARY KEY(`chat_source_row_id`,`handle_source_row_id`)
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`source_row_id` bigint NOT NULL,
	`guid` varchar(191) NOT NULL,
	`identifier` varchar(255),
	`service_name` varchar(64),
	`display_name` text,
	`is_group` boolean NOT NULL DEFAULT false,
	`synced_at_ms` bigint NOT NULL,
	CONSTRAINT `chats_source_row_id` PRIMARY KEY(`source_row_id`),
	CONSTRAINT `chats_guid_unique` UNIQUE(`guid`)
);
--> statement-breakpoint
CREATE TABLE `handles` (
	`source_row_id` bigint NOT NULL,
	`address` varchar(255) NOT NULL,
	`service` varchar(64),
	`synced_at_ms` bigint NOT NULL,
	CONSTRAINT `handles_source_row_id` PRIMARY KEY(`source_row_id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`source_row_id` bigint NOT NULL,
	`guid` varchar(191) NOT NULL,
	`chat_source_row_id` bigint,
	`handle_source_row_id` bigint,
	`is_from_me` boolean NOT NULL,
	`text` text,
	`service` varchar(64),
	`sent_at_ms` bigint NOT NULL,
	`has_attachments` boolean NOT NULL DEFAULT false,
	`synced_at_ms` bigint NOT NULL,
	CONSTRAINT `messages_source_row_id` PRIMARY KEY(`source_row_id`),
	CONSTRAINT `messages_guid_unique` UNIQUE(`guid`)
);
--> statement-breakpoint
CREATE TABLE `sync_state` (
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL,
	CONSTRAINT `sync_state_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE INDEX `attachments_message_idx` ON `attachments` (`message_source_row_id`);--> statement-breakpoint
CREATE INDEX `messages_chat_sent_idx` ON `messages` (`chat_source_row_id`,`sent_at_ms`);--> statement-breakpoint
CREATE INDEX `messages_sent_idx` ON `messages` (`sent_at_ms`);