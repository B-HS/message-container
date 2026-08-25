CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` text NOT NULL,
	`event` text NOT NULL,
	`message` text NOT NULL,
	`details_json` text,
	`created_at_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `logs_created_idx` ON `logs` (`created_at_ms`);--> statement-breakpoint
ALTER TABLE `messages` ADD `is_read` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` ADD `date_read_ms` integer;--> statement-breakpoint
ALTER TABLE `messages` ADD `associated_message_guid` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `associated_message_type` integer;