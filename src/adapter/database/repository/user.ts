// adapter/repository/user.ts
import { ResultAsync, err, fromPromise, ok } from "neverthrow";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../useCase/outputPort/user";
import { UserList, UserListRequest } from "../../../domain/entity/user";
import { DBError, ValidationError } from "../../../domain/entity/error";
import { User } from "../../schema/user";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  list(
    input: UserListRequest
  ): ResultAsync<UserList, ValidationError | DBError> {
    const where = {}; // 条件追加したい場合はここに

    const timerLabel = `🕒 Execution time (${input.strategy})`;
    console.time(timerLabel);
    // strategy: "include"
    if (input.strategy === "include") {
      return fromPromise(
        this.prisma.user.findMany({
          where,
          orderBy: { name: "asc" },
          include: { posts: true },
        }),
        () => new DBError("Failed to list users with include")
      ).andThen((users) => {
        return fromPromise(
          this.prisma.user.count({ where }),
          () => new DBError("Failed to count users")
        ).andThen((total) => {
          console.timeEnd(timerLabel);
          const parsed = User.array().safeParse(users);
          if (!parsed.success) {
            console.error(parsed.error);
            return err(new ValidationError("Failed to parse user list"));
          }
          return ok({ total, users: parsed.data });
        });
      });
    }
    // n_plus_one パターン
    return fromPromise(
      this.prisma.user.findMany({
        where,
        orderBy: { name: "asc" },
      }),
      () => new DBError("Failed to list users")
    ).andThen((users) => {
      return fromPromise(
        Promise.all(
          users.map(async (user) => ({
            ...user,
            posts: await this.prisma.post.findMany({
              where: { userId: user.id },
            }),
          }))
        ),
        () => new DBError("Failed to fetch posts for users")
      ).andThen((usersWithPosts) => {
        return fromPromise(
          this.prisma.user.count({ where }),
          () => new DBError("Failed to count users")
        ).andThen((total) => {
          console.timeEnd(timerLabel);
          const parsed = User.array().safeParse(usersWithPosts);
          if (!parsed.success) {
            console.error(parsed.error);
            return err(new ValidationError("Failed to parse user list"));
          }
          return ok({ total, users: parsed.data });
        });
      });
    });
  }
}
