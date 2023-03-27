import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { globalRoutes } from "./routes";
import { errorHandler } from "./errors/errors";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(globalRoutes);

app.use(errorHandler);

export default app;
