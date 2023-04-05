/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const validateCreateContact = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientId = req.body.clientId;
  const token = req.headers.authorization.split(' ')[1];

  const decoded: any = jwt_decode(token);

  const idToken = decoded.sub;

  if (clientId !== idToken) {
    throw new UnauthorizedException('Unauthorized');
  }

  next();
};
