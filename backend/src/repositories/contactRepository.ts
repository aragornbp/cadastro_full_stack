import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";

export const contactRepository = AppDataSource.getRepository(Contact);
