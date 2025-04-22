import { ResultAsync } from "neverthrow";
import { UserList } from "../../domain/entity/user";
import { DBError } from "../../domain/entity/error";
import { z } from "zod";

export const UserListQuery = z.object({
  strategy: z.enum(["include", "n_plus_one"]),
});
export type UserListQuery = z.infer<typeof UserListQuery>;

export interface IUserUseCase {
  list(input: UserListQuery): ResultAsync<UserList, DBError>;
}
