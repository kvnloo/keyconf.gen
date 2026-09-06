CREATE TABLE `community_account` (
	`id` text PRIMARY KEY NOT NULL,
	`subject` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_account_subject_unique` ON `community_account` (`subject`);--> statement-breakpoint
CREATE TABLE `community_build` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`request_digest` text NOT NULL,
	`name` text NOT NULL,
	`payload` text NOT NULL,
	`evidence` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_build_account_operation` ON `community_build` (`account_id`,`operation_id`);--> statement-breakpoint
CREATE INDEX `community_build_account_created` ON `community_build` (`account_id`,`created_at`,`id`);--> statement-breakpoint
CREATE TABLE `community_profile` (
	`account_id` text PRIMARY KEY NOT NULL,
	`handle` text NOT NULL,
	`display_name` text NOT NULL,
	`bio` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_profile_handle_unique` ON `community_profile` (`handle`);