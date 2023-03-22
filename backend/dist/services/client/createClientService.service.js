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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientService = void 0;
const errors_1 = require("../../errors/errors");
const clientRepository_1 = require("../../repositories/clientRepository");
const client_serializer_1 = require("../../serializers/client.serializer");
const createClientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const rest = __rest(data, []);
    const findClient = yield clientRepository_1.clientRepository.findOneBy({ email: data.email });
    if (findClient)
        throw new errors_1.AppError(409, "Client already exists");
    const newClient = clientRepository_1.clientRepository.create(Object.assign({}, rest));
    yield clientRepository_1.clientRepository.save(newClient);
    const returnNewClient = yield client_serializer_1.responseClientSerializer.validate(newClient, {
        stripUnknown: true,
    });
    return returnNewClient;
});
exports.createClientService = createClientService;
