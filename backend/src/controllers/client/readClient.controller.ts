import { Request, Response } from "express";
import { iClient} from "../../interfaces/client";
import { ReadClientService } from "../../services/client/readClientService.service";

export const readClientController = async(req: Request, res: Response) =>{
  const id: string = req.params.id
  const data:iClient = await ReadClientService(id)
  return res.status(200).json(data)
}

