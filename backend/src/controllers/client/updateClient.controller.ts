import { Request, Response } from "express";
import { iClient, iClientRequest } from "../../interfaces/client";

export const clientUpdateController = async(req: Request, res: Response) =>{
  const client: iClientRequest = req.body
  const id: String = req.params.id
  const data: iClient = await clientUpdateService(client, id)
  return res.status(200).json(data)
}

