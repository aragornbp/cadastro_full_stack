import { AppError } from "../../errors/errors";
import { iContactRequest, iContactResponse } from "../../interfaces/client";
import { contactRepository } from "../../repositories/contactRepository";
import { responseContactSerializer } from "../../serializers/contact.serializer";

export const createContactService = async(payload: iContactRequest, clientId: string): Promise<iContactResponse> => {
  payload.client = clientId
  
  const findContact = await contactRepository.findOneBy({email: payload.email})
  if (findContact) throw new AppError(409, "Contact already exists")

  const findPhone = await contactRepository.findOneBy({phone: payload.phone})
  if (findPhone) throw new AppError(409, "Phone already exists")

  const newContact = contactRepository.create({...payload })

  await contactRepository.save(newContact)

  const returnNewContact = await responseContactSerializer.validate(newContact, {stripUnknown: true})

  return returnNewContact
}