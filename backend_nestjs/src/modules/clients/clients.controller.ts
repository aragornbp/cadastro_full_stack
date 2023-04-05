import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('clients')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createClientDto: CreateClientDto) {
    console.log(createClientDto);
    return this.clientsService.create(createClientDto);
  }

  @Get('all/clients')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('clients/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    console.log(`id = ${id}`);
    return this.clientsService.findOne(id);
  }

  @Patch('clients/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete('clients/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    console.log('estou no constructor');
    console.log(id);
    return this.clientsService.remove(id);
  }
}
