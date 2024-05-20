CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
