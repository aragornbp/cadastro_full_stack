"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
const contact_entity_1 = require("./entities/contact.entity");
const _1679332928937_InicialMigration_1 = require("./migrations/1679332928937-InicialMigration");
const port = process.env.DB_PORT;
const setDataSourceOptions = () => {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [client_entity_1.Client, contact_entity_1.Contact],
            migrations: [_1679332928937_InicialMigration_1.InicialMigration1679332928937],
        };
    }
    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [client_entity_1.Client, contact_entity_1.Contact],
        };
    }
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: port,
        username: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_DATABASE,
        logging: true,
        synchronize: false,
        entities: [client_entity_1.Client, contact_entity_1.Contact],
        migrations: [_1679332928937_InicialMigration_1.InicialMigration1679332928937],
    };
};
const dataSourceOptions = setDataSourceOptions();
exports.AppDataSource = new typeorm_1.DataSource(dataSourceOptions);
