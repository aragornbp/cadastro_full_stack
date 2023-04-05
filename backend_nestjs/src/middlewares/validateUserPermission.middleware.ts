/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const clientPermission = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idParam = req.url.slice(1);

  const token = req.headers.authorization.split(' ')[1];

  const decoded: any = jwt_decode(token);

  const idToken = decoded.sub;

  if (idParam !== idToken) {
    throw new UnauthorizedException('Unauthorized');
  }

  next();
};
