import { AppError } from "../../errors/errors";
import { iContactResponse, iContactUpdate} from "../../interfaces/client";
import { contactRepository } from "../../repositories/contactRepository";
import { responseContactSerializer } from "../../serializers/contact.serializer";

export const updateContactService = async (
  payload: iContactUpdate, id: string
): Promise<iContactResponse> => {
  const contactFound = await contactRepository.findOneBy({id});
  
  if (!contactFound) throw new AppError(404, "Contact not found")

  const findContact = await contactRepository.findOneBy({email: payload.email})
  if (findContact) throw new AppError(409, "Email already exists")

  const findPhone = await contactRepository.findOneBy({phone: payload.phone})
  if (findPhone) throw new AppError(409, "Phone already exists")

  const updateContact = contactRepository.create({...contactFound, ...payload })
  await contactRepository.save(updateContact)

  return await responseContactSerializer.validate(updateContact, {
    stripUnknown: true,
  });
}