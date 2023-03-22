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
exports.deleteContactController = void 0;
const deleteContactService_service_1 = require("../../services/contact/deleteContactService.service");
const deleteContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = req.params.id;
    yield (0, deleteContactService_service_1.deleteContactService)(contactId);
    return res.status(204).json();
});
exports.deleteContactController = deleteContactController;
