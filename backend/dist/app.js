"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const errors_1 = require("./errors/errors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.globalRoutes);
app.use(errors_1.errorHandler);
exports.default = app;
