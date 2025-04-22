import { ResultAsync } from "neverthrow";
import { UserList, UserListRequest } from "../../domain/entity/user";
import { DBError, ValidationError } from "../../domain/entity/error";

export interface IUserRepository {
  list(
    input: UserListRequest
  ): ResultAsync<UserList, ValidationError | DBError>;
}
