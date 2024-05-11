import { Request } from "express";
import UserModel from "../../models/user_model";

abstract class AuthServiceManager {
  abstract createUser(request: Request): Promise<UserModel>;

  abstract signInUser(request: Request): Promise<UserModel>;

  abstract changePassword(request: Request): Promise<UserModel>;
}

export default AuthServiceManager;
