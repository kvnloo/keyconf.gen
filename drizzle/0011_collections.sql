CREATE TABLE `community_collection` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`request_digest` text NOT NULL,
	`metadata` text NOT NULL,
	`author` text NOT NULL,
	`created_at` text NOT NULL,
	`withdrawn_at` text,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_collection_account_operation` ON `community_collection` (`account_id`,`operation_id`);--> statement-breakpoint
CREATE INDEX `community_collection_account_created` ON `community_collection` (`account_id`,`created_at`,`id`);--> statement-breakpoint
CREATE TABLE `community_collection_item` (
	`collection_id` text NOT NULL,
	`publication_id` text NOT NULL,
	`position` integer NOT NULL,
	PRIMARY KEY(`collection_id`,`publication_id`),
	FOREIGN KEY (`collection_id`) REFERENCES `community_collection`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`publication_id`) REFERENCES `community_publication`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_collection_item_order` ON `community_collection_item` (`collection_id`,`position`);
