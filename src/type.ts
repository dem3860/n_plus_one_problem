import { IUserUseCase } from "./useCase/inputPort/user";

export type Deps = {
  userUseCase: IUserUseCase;
};

export type AppType = {
  Variables: {
    deps: Deps;
  };
};
