CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` text,
	`email` varchar(255),
	`password` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
