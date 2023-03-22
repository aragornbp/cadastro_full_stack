import { Request, Response } from "express"
import { iContactResponse, iContactUpdate } from "../../interfaces/client"
import { updateContactService } from "../../services/contact/updateClientService.service"

export const UpdateContactController = async(req: Request, res: Response) => {
  const contact: iContactUpdate = req.body
  const id: string = req.params.id
  const data: iContactResponse = await updateContactService(contact, id)
  return res.status(200).json(data)
}