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
exports.deleteClientController = void 0;
const deleteClientService_service_1 = require("../../services/client/deleteClientService.service");
const deleteClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const client = yield (0, deleteClientService_service_1.deleteClientService)(id);
    return res.status(204).json(client);
});
exports.deleteClientController = deleteClientController;
