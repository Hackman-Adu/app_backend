import { Request } from "express";
import UserModel from "../../models/user_model";
import AuthServiceManager from "./auth_service_manager";

class AuthService<T extends AuthServiceManager> extends AuthServiceManager {
  changePassword(request: Request): Promise<UserModel> {
    return this.provider.changePassword(request);
  }
  constructor(private provider: T) {
    super();
  }

  createUser(request: Request): Promise<UserModel> {
    return this.provider.createUser(request);
  }
  signInUser(request: Request): Promise<UserModel> {
    return this.provider.signInUser(request);
  }
}

export default AuthService;
