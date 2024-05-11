import { Request, Response } from "express";
import AuthService from "../services/auth/auth_service";
import AuthServiceProvider from "../services/auth/auth_service_provider";

const authService = new AuthService(new AuthServiceProvider());

class AuthController {
  public async createUser(req: Request, res: Response) {
    try {
      const user = await authService.createUser(req);
      const response = user.toJSON();
      delete response.password;
      res.status(200).json({ message: "Successful", data: response });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  public async changePassword(req: Request, res: Response) {
    try {
      await authService.changePassword(req);
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }

  public async signInUser(req: Request, res: Response) {
    try {
      const user = await authService.signInUser(req);
      res.status(200).json({ message: "Successful", data: user });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default AuthController;
