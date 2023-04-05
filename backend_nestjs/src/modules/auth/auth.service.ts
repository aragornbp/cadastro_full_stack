import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async validatedUser(userEmail: string, userPassword: string) {
    const client = await this.clientService.findEmail(userEmail);
    if (client) {
      const passwordMatch = await compare(userPassword, client.password);
      if (passwordMatch) {
        return { email: client.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const findclient = await this.clientService.findEmail(email);
    if (!findclient) {
      throw new NotFoundException('email does not exist');
    }
    const payload = { email: findclient.email };
    return {
      token: this.jwtService.sign({ payload }, { subject: findclient.id }),
    };
  }
}
