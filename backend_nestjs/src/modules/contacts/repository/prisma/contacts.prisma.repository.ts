/* eslint-disable prettier/prettier */
import { CreateContactDto } from '../../dto/create-contact.dto';
import { ContactsRepository } from '../contacts.repository';
import { Contact } from '../../entities/contact.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async findContact(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    return contact;
  }

  async createContact(data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, { ...data });
    const newContact = await this.prisma.contact.create({
      data: { ...contact },
    });
    return newContact;
  }
  async updateContact(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });
    return contact;
  }
  async deleteContact(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
