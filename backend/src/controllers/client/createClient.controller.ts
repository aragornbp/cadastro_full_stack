import { Response, Request } from "express";
import { iClient, iClientRequest } from "../../interfaces/client";

export const createClientController = async(req: Request, res: Response) =>{
  const client: iClientRequest = req.body
  const data: iClient  = await createClientService(client)
  return res.status(201).json(data)
}