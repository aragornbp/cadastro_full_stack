/* eslint-disable prettier/prettier */

import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract createContact(data: CreateContactDto): Promise<Contact>;
  abstract updateContact(id: string, data: UpdateContactDto): Promise<Contact>;
  abstract deleteContact(id: string): Promise<void>;
  abstract findContact(id: string): Promise<Contact>;
}
