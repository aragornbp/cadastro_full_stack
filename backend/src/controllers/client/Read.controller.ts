import { Request, Response } from "express";
import { iClient} from "../../interfaces/client";

export const readUpdateController = async(req: Request, res: Response) =>{
  const id:String = req.params.id
  const data:iClient = await readUpdateService(id)
  return res.status(200).json(data)
}

