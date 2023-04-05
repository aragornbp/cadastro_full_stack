/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { Client } from '../../entities/client.entity';
import { ClientsRepository } from '../clients.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsPrismaRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async createClient(data: CreateClientDto): Promise<Client> {
    const client = new Client();
    Object.assign(client, { ...data });
    const newClient = await this.prisma.client.create({
      data: { ...client },
      include: { contacts: true },
    });

    return plainToInstance(Client, newClient);
  }
  async listAllClients(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      include: { contacts: true },
    });
    return plainToInstance(Client, clients);
  }
  async findClient(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: { contacts: true },
    });
    return plainToInstance(Client, client);
  }
  async updateClient(id: string, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data },
      include: { contacts: true },
    });
    return plainToInstance(Client, client);
  }
  async deleteClient(id: string): Promise<void> {
    console.log('estou no prisma');
    console.log(id);

    await this.prisma.client.delete({
      where: { id: id },
    });
  }
  async findClientByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });
    return client;
  }
}
