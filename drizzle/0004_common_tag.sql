CREATE TABLE `community_favorite` (
	`account_id` text NOT NULL,
	`publication_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`publication_id`) REFERENCES `community_publication`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_favorite_account_publication` ON `community_favorite` (`account_id`,`publication_id`);--> statement-breakpoint
CREATE INDEX `community_favorite_account_created` ON `community_favorite` (`account_id`,`created_at`,`publication_id`);