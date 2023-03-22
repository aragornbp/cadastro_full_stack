"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const data_source_1 = require("../data-source");
const client_entity_1 = require("../entities/client.entity");
exports.clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
