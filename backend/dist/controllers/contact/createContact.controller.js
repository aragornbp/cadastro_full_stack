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
exports.createContactController = void 0;
const createContactService_service_1 = require("../../services/contact/createContactService.service");
const createContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const clientID = req.client.id;
    const data = yield (0, createContactService_service_1.createContactService)(payload, clientID);
    return res.status(201).json(data);
});
exports.createContactController = createContactController;
