import { Request } from "express";

export const deleteClient = (req: Request, res: Response) => {
  const id:String = req.params.id
  await deleteClientService(id)
  return res.status(204).json()
}