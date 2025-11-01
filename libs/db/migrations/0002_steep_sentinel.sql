CREATE TABLE "BlogComments" (
	"CommentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"BlogId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"Comment" text NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "BlogLikes" (
	"UserId" uuid NOT NULL,
	"BlogId" uuid NOT NULL,
	CONSTRAINT "BlogLikes_UserId_BlogId_pk" PRIMARY KEY("UserId","BlogId")
);
--> statement-breakpoint
CREATE TABLE "Blogs" (
	"BlogId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"Content" jsonb NOT NULL,
	"Likes" integer DEFAULT 0,
	"Comments" integer DEFAULT 0,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Follows" (
	"FollowerId" uuid NOT NULL,
	"FollowingId" uuid NOT NULL,
	CONSTRAINT "Follows_FollowerId_FollowingId_pk" PRIMARY KEY("FollowerId","FollowingId")
);
--> statement-breakpoint
CREATE TABLE "PostComments" (
	"CommentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"PostId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"Comment" text NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "PostLikes" (
	"UserId" uuid NOT NULL,
	"PostId" uuid NOT NULL,
	CONSTRAINT "PostLikes_UserId_PostId_pk" PRIMARY KEY("UserId","PostId")
);
--> statement-breakpoint
CREATE TABLE "Posts" (
	"PostId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"Content" text NOT NULL,
	"Description" text DEFAULT '',
	"Likes" integer DEFAULT 0,
	"Comments" integer DEFAULT 0,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ProfileSettings" (
	"ProfileId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"Bio" text DEFAULT '',
	"BirthDate" date,
	"Private" boolean DEFAULT true,
	"Country" text DEFAULT 'India',
	"Language" text DEFAULT 'english'
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"UserId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" text NOT NULL,
	"UserName" text NOT NULL,
	"Email" text NOT NULL,
	"Password" text NOT NULL,
	"ProfilePicture" jsonb DEFAULT '{"secure_url":"","public_id":""}'::jsonb,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Users_UserName_unique" UNIQUE("UserName"),
	CONSTRAINT "Users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
DROP TABLE "follows" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "BlogComments" ADD CONSTRAINT "BlogComments_BlogId_Blogs_BlogId_fk" FOREIGN KEY ("BlogId") REFERENCES "public"."Blogs"("BlogId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BlogComments" ADD CONSTRAINT "BlogComments_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_BlogId_Users_UserId_fk" FOREIGN KEY ("BlogId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowerId_Users_UserId_fk" FOREIGN KEY ("FollowerId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowingId_Users_UserId_fk" FOREIGN KEY ("FollowingId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_PostId_Posts_PostId_fk" FOREIGN KEY ("PostId") REFERENCES "public"."Posts"("PostId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_PostId_Users_UserId_fk" FOREIGN KEY ("PostId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProfileSettings" ADD CONSTRAINT "ProfileSettings_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "follower_idx" ON "Follows" USING btree ("FollowerId");--> statement-breakpoint
CREATE INDEX "following_idx" ON "Follows" USING btree ("FollowingId");