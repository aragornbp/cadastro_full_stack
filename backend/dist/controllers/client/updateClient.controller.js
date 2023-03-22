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
exports.updateClientController = void 0;
const updateClientService_service_1 = require("../../services/client/updateClientService.service");
const updateClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.body;
    const id = req.params.id;
    const data = yield (0, updateClientService_service_1.updateClientService)(client, id);
    return res.status(200).json(data);
});
exports.updateClientController = updateClientController;
