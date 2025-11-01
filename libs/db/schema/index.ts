import { users } from "./schemas/users.js";
import { profileSettings } from "./schemas/profileSettings.js";
import { follows } from "./schemas/follows.js";
import { posts } from "./schemas/posts.js";
import { postComments } from "./schemas/postComments.js";
import { postLikes } from "./schemas/postLikes.js";
import { blogs } from "./schemas/blogs.js";
import { blogComments } from "./schemas/blogComments.js";
import { blogLikes } from "./schemas/blogLikes.js";

import {
    userRelations,
    profileSettingsRelations,
    followRelations,
    postRelations,
    postCommentRelations,
    postLikeRelations,
    blogRelations,
    blogCommentRelations,
    blogLikeRelations,
} from "./schemas/relations.js";

import type {
    InferSelectModel,
    InferInsertModel,
} from "drizzle-orm";


export const schema = {
    users,
    profileSettings,
    follows,
    posts,
    postLikes,
    postComments,
    blogs,
    blogLikes,
    blogComments,
    userRelations,
    profileSettingsRelations,
    followRelations,
    postRelations,
    postCommentRelations,
    postLikeRelations,
    blogRelations,
    blogCommentRelations,
    blogLikeRelations,
};

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type ProfileSetting = InferSelectModel<typeof profileSettings>;
export type NewProfileSetting = InferInsertModel<typeof profileSettings>;
export type Follow = InferSelectModel<typeof follows>;
export type NewFollow = InferInsertModel<typeof follows>;
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
export type PostLike = InferSelectModel<typeof postLikes>;
export type NewPostLike = InferInsertModel<typeof postLikes>;
export type PostComment = InferSelectModel<typeof postComments>;
export type NewPostComment = InferInsertModel<typeof postComments>;
export type Blog = InferSelectModel<typeof blogs>;
export type NewBlog = InferInsertModel<typeof blogs>;
export type BlogLike = InferSelectModel<typeof blogLikes>;
export type NewBlogLike = InferInsertModel<typeof blogLikes>;
export type BlogComment = InferSelectModel<typeof blogComments>;
export type NewBlogComment = InferInsertModel<typeof blogComments>;


export {
    users,
    profileSettings,
    follows,
    posts,
    postLikes,
    postComments,
    blogs,
    blogLikes,
    blogComments,
    userRelations,
    profileSettingsRelations,
    followRelations,
    postRelations,
    postCommentRelations,
    postLikeRelations,
    blogRelations,
    blogCommentRelations,
    blogLikeRelations,
};