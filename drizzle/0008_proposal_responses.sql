CREATE TABLE `community_proposal_response` (
	`id` text PRIMARY KEY NOT NULL,
	`proposal_id` text NOT NULL,
	`account_id` text NOT NULL,
	`operation_id` text NOT NULL,
	`request_digest` text NOT NULL,
	`payload` text NOT NULL,
	`evidence` text NOT NULL,
	`note` text NOT NULL,
	`author` text NOT NULL,
	`link_version` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`proposal_id`) REFERENCES `community_proposal`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `community_account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_proposal_response_operation` ON `community_proposal_response` (`proposal_id`,`account_id`,`operation_id`);--> statement-breakpoint
CREATE INDEX `community_proposal_response_created` ON `community_proposal_response` (`proposal_id`,`created_at`,`id`);