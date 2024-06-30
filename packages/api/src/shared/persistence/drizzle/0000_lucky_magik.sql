-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Journal" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DBHealth" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);

*/