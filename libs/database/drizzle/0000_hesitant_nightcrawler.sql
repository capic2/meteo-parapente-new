CREATE TABLE `provider` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`provider_key` text PRIMARY KEY NOT NULL
);
