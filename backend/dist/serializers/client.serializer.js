"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSerializer = exports.responseListClientsSerializer = exports.responseClientSerializer = exports.createClientSerializer = void 0;
const yup = __importStar(require("yup"));
const contact_serializer_1 = require("./contact.serializer");
exports.createClientSerializer = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
});
exports.responseClientSerializer = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    created_at: yup.date(),
    phone: yup.string(),
    contacts: yup.array(contact_serializer_1.responseContactSerializer),
});
exports.responseListClientsSerializer = yup.array(exports.responseClientSerializer);
exports.updateClientSerializer = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    phone: yup.string(),
});
