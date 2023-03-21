import { NextFunction, Request, Response } from "express";
import { compare } from "bcryptjs";
import { iLogin } from "../interfaces/login";
import { clientRepository } from "../repositories/clientRepository";

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, password}: iLogin = req.body

  const client = await clientRepository.findOneBy({email: email})

  if(!client){
    return res.status(401).json({message: "Wrong email or password"})
  }

  const passwordCompare = await compare(password, client.password);

  if (!passwordCompare)
    return res.status(401).json({ message: "Wrong email or password" });

  return next()
}