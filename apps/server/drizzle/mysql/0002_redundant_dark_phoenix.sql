CREATE TABLE `logs` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`level` varchar(16) NOT NULL,
	`event` varchar(64) NOT NULL,
	`message` text NOT NULL,
	`details_json` text,
	`created_at_ms` bigint NOT NULL,
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `messages` ADD `is_read` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` ADD `date_read_ms` bigint;--> statement-breakpoint
ALTER TABLE `messages` ADD `associated_message_guid` varchar(191);--> statement-breakpoint
ALTER TABLE `messages` ADD `associated_message_type` int;--> statement-breakpoint
CREATE INDEX `logs_created_idx` ON `logs` (`created_at_ms`);