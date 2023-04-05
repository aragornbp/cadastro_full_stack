import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}
  async create(createClientDto: CreateClientDto) {
    const findClient = await this.clientsRepository.findClientByEmail(
      createClientDto.email,
    );
    if (findClient) {
      throw new ConflictException('email already exists');
    }
    const client = await this.clientsRepository.createClient(createClientDto);
    return client;
  }

  async findAll() {
    return await this.clientsRepository.listAllClients();
  }

  async findOne(id: string) {
    const findClient = await this.clientsRepository.findClient(id);
    if (!findClient) {
      throw new NotFoundException('client not found');
    }
    return findClient;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const findClient = await this.clientsRepository.findClient(id);
    if (!findClient) {
      throw new NotFoundException('client not found');
    }
    return this.clientsRepository.updateClient(id, updateClientDto);
  }

  async remove(id: string) {
    const findClient = await this.clientsRepository.findClient(id);
    if (!findClient) {
      throw new NotFoundException('client not found');
    }
    return this.clientsRepository.deleteClient(id);
  }

  async findEmail(email: string) {
    const findClient = await this.clientsRepository.findClientByEmail(email);
    if (!findClient) {
      throw new NotFoundException('client not found');
    }
    return findClient;
  }
}
