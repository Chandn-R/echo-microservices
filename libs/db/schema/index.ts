import { users } from "./users.js";
import { profileSettings } from "./profileSettings.js";
import { follows } from "./follows.js";
import { posts } from "./posts.js";
import { postComments } from "./postComments.js";
import { postLikes } from "./postLikes.js";
import { blogs } from "./blogs.js";
import { blogComments } from "./blogComments.js";
import { blogLikes } from "./blogLikes.js";

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
} from "./relations.js";

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