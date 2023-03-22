import { AppError } from "../../errors/errors";
import { iContactResponse, iContactUpdate} from "../../interfaces/client";
import { contactRepository } from "../../repositories/contactRepository";
import { responseContactSerializer } from "../../serializers/contact.serializer";

export const updateContactService = async (
  contact: iContactUpdate, id: any
): Promise<iContactResponse> => {
  const contactFound = await contactRepository.findOneBy({id});
  
  if (!contactFound) throw new AppError(404, "Contact not found")

  const updateContact = contactRepository.create({...contactFound, ...contact })
  await contactRepository.save(updateContact)

  return await responseContactSerializer.validate(updateContact, {
    stripUnknown: true,
  });
}