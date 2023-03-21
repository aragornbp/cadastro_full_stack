import { Router } from "express";

export const loginRoutes = Router();

loginRoutes.post(
  "",
  validateDataMiddleware(loginSerializer),
  loginMiddleware,
  loginController
);