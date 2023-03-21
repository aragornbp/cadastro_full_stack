import { Request, Response } from "express";
import { iClient } from "../../interfaces/client";
import { listAllClientsService } from "../../services/client/listAllClients.service";

export const listAllClientsController = async(req: Request, res: Response) =>{
  const data:iClient[] = await listAllClientsService();
  return res.status(200).json(data)
}