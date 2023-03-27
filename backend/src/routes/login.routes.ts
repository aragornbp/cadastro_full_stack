import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware.middleware";
import { loginMiddleware } from "../middlewares/validateLogin.middleware";
import { loginSerializer } from "../serializers/login.serializer";

export const loginRoutes = Router();

loginRoutes.post(
  "",
  validateDataMiddleware(loginSerializer),
  loginMiddleware,
  loginController
);
