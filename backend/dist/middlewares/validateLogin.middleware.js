"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = void 0;
const bcryptjs_1 = require("bcryptjs");
const clientRepository_1 = require("../repositories/clientRepository");
const loginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const client = yield clientRepository_1.clientRepository.findOneBy({ email: email });
    if (!client) {
        return res.status(401).json({ message: "Wrong email or password" });
    }
    const passwordCompare = yield (0, bcryptjs_1.compare)(password, client.password);
    if (!passwordCompare)
        return res.status(401).json({ message: "Wrong email or password" });
    return next();
});
exports.loginMiddleware = loginMiddleware;
