import { Router } from "express";
import { clientRoutes } from "./client.routes";
import { contactRoutes } from "./contact.routes";
import { loginRoutes } from "./login.routes";

export const globalRoutes = Router();

globalRoutes.use("/api/client", clientRoutes)
globalRoutes.use("/api/login", loginRoutes)
globalRoutes.use("/api/client/contact", contactRoutes)