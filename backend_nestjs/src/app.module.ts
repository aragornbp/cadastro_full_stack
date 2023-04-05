import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AuthModule } from './modules/auth/auth.module';
import { clientPermission } from './middlewares/validateUserPermission.middleware';
import { validateCreateContact } from './middlewares/validateCreateContact.middleware';

@Module({
  imports: [ClientsModule, ContactsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(clientPermission)
      .exclude({ path: 'api/clients', method: RequestMethod.POST })
      .forRoutes('api/clients');

    consumer
      .apply(validateCreateContact)
      .forRoutes({ path: 'api/contacts', method: RequestMethod.POST });
  }
}
