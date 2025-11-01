import { relations } from "drizzle-orm";
import { users } from "./users.js";
import { profileSettings } from "./profileSettings.js";
import { follows } from "./follows.js";
import { posts } from "./posts.js";
import { postComments } from "./postComments.js";
import { postLikes } from "./postLikes.js";
import { blogs } from "./blogs.js";
import { blogComments } from "./blogComments.js";
import { blogLikes } from "./blogLikes.js";


export const userRelations = relations(users, ({ one, many }) => ({

    profile: one(profileSettings, {
        fields: [users.userId],
        references: [profileSettings.userId],
    }),

    followers: many(follows, {
        relationName: "is_following"
    }),

    following: many(follows, {
        relationName: "has_followers"
    }),

    posts: many(posts),

    postComments: many(postComments),

    postLikes: many(postLikes),

    blogs: many(blogs),

    blogComments: many(blogComments),

    blogLikes: many(blogLikes),

}));


export const profileSettingsRelations = relations(profileSettings, ({ one }) => ({

    user: one(users, {
        fields: [profileSettings.userId],
        references: [users.userId],
    }),
}));


export const followRelations = relations(follows, ({ one }) => ({

    follower: one(users, {
        fields: [follows.followerId],
        references: [users.userId],
        relationName: 'is_following',
    }),

    following: one(users, {
        fields: [follows.followingId],
        references: [users.userId],
        relationName: 'has_followers',
    }),

}));


export const postRelations = relations(posts, ({ one, many }) => ({

    user: one(users, {
        fields: [posts.userId],
        references: [users.userId],
    }),

    comments: many(postComments),

    likes: many(postLikes),

}));


export const postCommentRelations = relations(postComments, ({ one }) => ({

    user: one(users, {
        fields: [postComments.userId],
        references: [users.userId],
    }),

    post: one(posts, {
        fields: [postComments.postId],
        references: [posts.postId],
    }),

}));


export const postLikeRelations = relations(postLikes, ({ one }) => ({

    user: one(users, {
        fields: [postLikes.userId],
        references: [users.userId],
    }),

    post: one(posts, {
        fields: [postLikes.postId],
        references: [posts.postId],
    }),

}));


export const blogRelations = relations(blogs, ({ one, many }) => ({

    user: one(users, {
        fields: [blogs.userId],
        references: [users.userId],
    }),

    comments: many(blogComments),

    likes: many(blogLikes),

}));


export const blogCommentRelations = relations(blogComments, ({ one }) => ({

    user: one(users, {
        fields: [blogComments.userId],
        references: [users.userId],
    }),

    blog: one(blogs, {
        fields: [blogComments.blogId],
        references: [blogs.blogId],
    }),

}));


export const blogLikeRelations = relations(blogLikes, ({ one }) => ({

    user: one(users, {
        fields: [blogLikes.userId],
        references: [users.userId],
    }),

    blog: one(blogs, {
        fields: [blogLikes.blogId],
        references: [blogs.blogId],
    }),

}));
