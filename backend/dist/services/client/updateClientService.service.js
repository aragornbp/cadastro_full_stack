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
exports.updateClientService = void 0;
const errors_1 = require("../../errors/errors");
const clientRepository_1 = require("../../repositories/clientRepository");
const client_serializer_1 = require("../../serializers/client.serializer");
const updateClientService = (client, id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientFound = yield clientRepository_1.clientRepository.findOneBy({ id });
    if (!clientFound)
        throw new errors_1.AppError(404, "Client not found");
    const updateClient = clientRepository_1.clientRepository.create(Object.assign(Object.assign({}, clientFound), client));
    yield clientRepository_1.clientRepository.save(updateClient);
    return yield client_serializer_1.responseClientSerializer.validate(updateClient, {
        stripUnknown: true,
    });
});
exports.updateClientService = updateClientService;
