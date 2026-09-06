CREATE TABLE `community_proposal` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`build_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`request_digest` text NOT NULL,
	`title` text NOT NULL,
	`brief` text NOT NULL,
	`author` text NOT NULL,
	`token_digest` text NOT NULL,
	`created_at` text NOT NULL,
	`closed_at` text,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`build_id`) REFERENCES `community_build`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_proposal_token_digest_unique` ON `community_proposal` (`token_digest`);--> statement-breakpoint
CREATE UNIQUE INDEX `community_proposal_account_operation` ON `community_proposal` (`account_id`,`operation_id`);