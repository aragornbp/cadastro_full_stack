import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsPrismaRepository } from './repository/prisma/contacts.prisma.repository';
import { ContactsService } from './contacts.service';
import { ContactsRepository } from './repository/contacts.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    {
      provide: ContactsRepository,
      useClass: ContactsPrismaRepository,
    },
  ],
})
export class ContactsModule {}
