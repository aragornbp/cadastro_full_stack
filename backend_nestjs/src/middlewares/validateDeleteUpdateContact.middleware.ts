/* eslint-disable prettier/prettier */
// import { Request, Response, NextFunction } from 'express';
// import { UnauthorizedException } from '@nestjs/common';
// import jwt_decode from 'jwt-decode';
// import { ContactsPrismaRepository } from 'src/modules/contacts/repository/prisma/contacts.prisma.repository';

// export const validateDeleteUpdateContact = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const contactRepository = new ContactsPrismaRepository(private prisma: PrismaService);
//   const contactId = req.params.id;
//   const findContact = await contactRepository.findContact(id);

//   const token = req.headers.authorization.split(' ')[1];
//   const decoded: any = jwt_decode(token);
//   const idToken = decoded.sub;
// };
