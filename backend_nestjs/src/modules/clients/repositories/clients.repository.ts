/* eslint-disable prettier/prettier */
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export abstract class ClientsRepository {
  abstract createClient(data: CreateClientDto): Promise<Client> | Client;
  abstract listAllClients(): Promise<Client[]> | Client[];
  abstract findClient(id: string): Promise<Client> | Client;
  abstract updateClient(
    id: string,
    data: UpdateClientDto,
  ): Promise<Client> | Client;
  abstract deleteClient(id: string): Promise<void> | void;
  abstract findClientByEmail(email: string): Promise<Client> | Client;
}
