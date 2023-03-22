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
exports.createContactService = void 0;
const errors_1 = require("../../errors/errors");
const contactRepository_1 = require("../../repositories/contactRepository");
const contact_serializer_1 = require("../../serializers/contact.serializer");
const createContactService = (payload, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    payload.client = clientId;
    const findContact = yield contactRepository_1.contactRepository.findOneBy({ email: payload.email });
    if (findContact)
        throw new errors_1.AppError(409, "Contact already exists");
    const findPhone = yield contactRepository_1.contactRepository.findOneBy({ phone: payload.phone });
    if (findPhone)
        throw new errors_1.AppError(409, "Phone already exists");
    const newContact = contactRepository_1.contactRepository.create(Object.assign({}, payload));
    yield contactRepository_1.contactRepository.save(newContact);
    const returnNewContact = yield contact_serializer_1.responseContactSerializer.validate(newContact, { stripUnknown: true });
    return returnNewContact;
});
exports.createContactService = createContactService;
