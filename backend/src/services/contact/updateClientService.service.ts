import { AppError } from "../../errors/errors";
import { iContactResponse, iContactUpdate } from "../../interfaces/client";
import { contactRepository } from "../../repositories/contactRepository";
import { responseContactSerializer } from "../../serializers/contact.serializer";

export const updateContactService = async (
  payload: iContactUpdate,
  id: string
): Promise<iContactResponse> => {
  const contactFound = await contactRepository.findOneBy({ id });

  if (!contactFound) throw new AppError(404, "Contact not found");

  const updateContact = await contactRepository.save({
    ...contactFound,
    ...payload,
  });

  return await responseContactSerializer.validate(updateContact, {
    stripUnknown: true,
  });
};
