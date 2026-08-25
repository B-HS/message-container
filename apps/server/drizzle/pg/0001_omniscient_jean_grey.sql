CREATE TABLE "api_keys" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"start" text NOT NULL,
	"key_hash" text NOT NULL,
	"created_at_ms" bigint NOT NULL,
	"last_used_at_ms" bigint,
	"revoked_at_ms" bigint,
	CONSTRAINT "api_keys_key_hash_unique" UNIQUE("key_hash")
);
--> statement-breakpoint
CREATE TABLE "auth_state" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
