CREATE TABLE `community_proposal_rotation` (
	`proposal_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`version` integer NOT NULL,
	`token_digest` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`proposal_id`) REFERENCES `community_proposal`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_proposal_rotation_token_digest_unique` ON `community_proposal_rotation` (`token_digest`);--> statement-breakpoint
CREATE UNIQUE INDEX `community_proposal_rotation_operation` ON `community_proposal_rotation` (`proposal_id`,`operation_id`);--> statement-breakpoint
ALTER TABLE `community_proposal` ADD `token_version` integer DEFAULT 0 NOT NULL;