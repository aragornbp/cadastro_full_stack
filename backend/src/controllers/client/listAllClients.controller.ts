import { Request, Response } from "express";
import { iClient } from "../../interfaces/client";

export const listAllClientsController = async(req: Request, res: Response) =>{
  const data:iClient[] = await listAllClientsService();
  return res.status(200).json(data)
}