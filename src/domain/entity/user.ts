import { z } from "zod";

export const Post = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
});
export type Post = z.infer<typeof Post>;

export const User = z.object({
  id: z.string(),
  name: z.string(),
  posts: z.array(Post),
});

export type User = z.infer<typeof User>;

export const UserList = z.object({
  users: z.array(User),
  total: z.number(),
});
export type UserList = z.infer<typeof UserList>;

export const UserListRequest = z.object({
  strategy: z.enum(["include", "n_plus_one"]),
});
export type UserListRequest = z.infer<typeof UserListRequest>;
