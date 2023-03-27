import { Request, Response } from "express";
import { iContactRequest, iContactResponse } from "../../interfaces/client";
import { createContactService } from "../../services/contact/createContactService.service";

export const createContactController = async (req: Request, res: Response) => {
  const payload: iContactRequest = req.body;
  const clientID: string = req.client.id;
  const data: iContactResponse = await createContactService(payload, clientID);
  return res.status(201).json(data);
};
