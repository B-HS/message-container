CREATE TABLE `api_keys` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`start` text NOT NULL,
	`key_hash` text NOT NULL,
	`created_at_ms` integer NOT NULL,
	`last_used_at_ms` integer,
	`revoked_at_ms` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_keys_key_hash_unique` ON `api_keys` (`key_hash`);--> statement-breakpoint
CREATE TABLE `auth_state` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
