import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  name: string;
  email: string;
  phone: string;

  readonly created_at: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
