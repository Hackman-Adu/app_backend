import express from "express";
import AuthController from "../controllers/auth_controller";
import Middleware from "../helpers/middleware";

const authController: AuthController = new AuthController();

const router = express.Router();

router.post("/create", authController.createUser);

router.post("/sign-in", authController.signInUser);

router.put(
  "/change-password",
  Middleware.validateRequest,
  authController.changePassword
);

export default router;
