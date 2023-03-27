import { Request, Response } from "express";
import { iClient, iClientUpdate } from "../../interfaces/client";
import { updateClientService } from "../../services/client/updateClientService.service";

export const updateClientController = async (req: Request, res: Response) => {
  const client: iClientUpdate = req.body;
  const id: string = req.params.id;
  const data: iClient = await updateClientService(client, id);
  return res.status(200).json(data);
};
