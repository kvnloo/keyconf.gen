CREATE TABLE `catalog_publication` (
	`source` text PRIMARY KEY NOT NULL,
	`snapshot_id` text NOT NULL,
	FOREIGN KEY (`snapshot_id`) REFERENCES `catalog_snapshot`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `catalog_snapshot` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`payload` text NOT NULL,
	`published_at` text NOT NULL
);
