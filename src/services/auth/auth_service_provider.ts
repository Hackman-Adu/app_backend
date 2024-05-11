import bycrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user_model";
import AuthServiceManager from "./auth_service_manager";

class AuthServiceProvider extends AuthServiceManager {
  async changePassword(request: Request): Promise<UserModel> {
    const { new_password } = request.body;
    const user = await AuthServiceProvider.findUserById(request);
    if (!user) throw "User not found";
    user.password = await bycrypt.hash(new_password, 10);
    return await user.save();
  }

  //retrieve user from request header
  public static async findUserById(
    request: Request
  ): Promise<UserModel | null> {
    const userId = (request as any).user.user_id;
    return await UserModel.findByPk(userId);
  }
  async createUser(request: Request): Promise<UserModel> {
    try {
      const payload = new UserModel(request.body);
      const userByEmail = await UserModel.findOne({
        where: { email: payload.email },
      });
      if (userByEmail) throw "Email already taken";
      const userbyMobile = await UserModel.findOne({
        where: { mobile: payload.mobile },
      });
      if (userbyMobile) throw "Mobile alreay taken";
      const user = await UserModel.create(payload.toJSON());
      return user;
    } catch (error) {
      throw error;
    }
  }
  async signInUser(request: Request): Promise<UserModel> {
    const payload = new UserModel(request.body);
    const user = await UserModel.findOne({ where: { email: payload.email } });
    if (!user) throw "Account not found";
    const passwordValid = await bycrypt.compare(
      payload.password,
      user.password
    );
    if (!passwordValid) throw "Incorrect email or password";
    const response = user.toJSON();
    delete response.password;
    const token = jwt.sign(response, process.env.JWT_SECRET_TOKEN as string);
    response.token = token;
    return response;
  }
}

export default AuthServiceProvider;
