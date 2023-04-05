import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repository/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactsRepository.createContact(createContactDto);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const findContact = await this.contactsRepository.findContact(id);
    if (!findContact) {
      throw new NotFoundException('contact not found');
    }
    return this.contactsRepository.updateContact(id, updateContactDto);
  }

  async remove(id: string) {
    const findContact = await this.contactsRepository.findContact(id);
    if (!findContact) {
      throw new NotFoundException('contact not found');
    }
    return this.contactsRepository.deleteContact(id);
  }
}
