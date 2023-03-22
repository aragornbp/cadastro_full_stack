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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const clientRepository_1 = require("../../repositories/clientRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield clientRepository_1.clientRepository.findOneBy({ email });
    const token = jsonwebtoken_1.default.sign({}, process.env.SECRET_KEY, { expiresIn: "24h", subject: String(client === null || client === void 0 ? void 0 : client.id) });
    return { token: token };
});
exports.loginService = loginService;
