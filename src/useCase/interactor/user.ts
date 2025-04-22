import { ResultAsync } from "neverthrow";
import { IUserRepository } from "../outputPort/user";
import { IUserUseCase, UserListQuery } from "../inputPort/user";
import { UserList } from "../../domain/entity/user";
import { DBError } from "../../domain/entity/error";

export class UserInteractor implements IUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}
  list(input: UserListQuery): ResultAsync<UserList, DBError> {
    const req = {
      strategy: input.strategy,
    };
    return this.userRepo.list(req);
  }
}
