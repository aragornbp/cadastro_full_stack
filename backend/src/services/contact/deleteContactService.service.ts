import { contactRepository } from "../../repositories/contactRepository";

export const deleteContactService = async (id: string) => {
  const contact = await contactRepository.findOneBy({ id });
  return contactRepository.remove(contact!);
};
