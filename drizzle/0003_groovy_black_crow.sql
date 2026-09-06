CREATE TABLE `community_publication` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`build_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`request_digest` text NOT NULL,
	`metadata` text NOT NULL,
	`author` text NOT NULL,
	`published_at` text NOT NULL,
	`withdrawn_at` text,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`build_id`) REFERENCES `community_build`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_publication_account_operation` ON `community_publication` (`account_id`,`operation_id`);--> statement-breakpoint
CREATE INDEX `community_publication_account_published` ON `community_publication` (`account_id`,`published_at`,`id`);