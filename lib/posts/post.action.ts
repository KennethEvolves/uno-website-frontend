"use server";

import { getPosts } from "./post.service";

export const fetchMorePosts = async (page: number, pageSize: number = 6) => {
  return await getPosts(page, pageSize);
};
