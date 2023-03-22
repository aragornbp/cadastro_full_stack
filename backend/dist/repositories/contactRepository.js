"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRepository = void 0;
const data_source_1 = require("../data-source");
const contact_entity_1 = require("../entities/contact.entity");
exports.contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
