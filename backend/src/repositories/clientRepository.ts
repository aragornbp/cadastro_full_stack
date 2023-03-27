import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";

export const clientRepository = AppDataSource.getRepository(Client);
