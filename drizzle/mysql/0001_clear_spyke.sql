CREATE TABLE `api_keys` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`start` varchar(16) NOT NULL,
	`key_hash` varchar(64) NOT NULL,
	`created_at_ms` bigint NOT NULL,
	`last_used_at_ms` bigint,
	`revoked_at_ms` bigint,
	CONSTRAINT `api_keys_id` PRIMARY KEY(`id`),
	CONSTRAINT `api_keys_key_hash_unique` UNIQUE(`key_hash`)
);
--> statement-breakpoint
CREATE TABLE `auth_state` (
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL,
	CONSTRAINT `auth_state_key` PRIMARY KEY(`key`)
);
