import { Request, Response } from "express";
import { deleteClientService } from "../../services/client/deleteClientService.service";

export const deleteClientController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  await deleteClientService(id)
  return res.status(204).json()
}