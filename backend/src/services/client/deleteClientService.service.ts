import { clientRepository } from "../../repositories/clientRepository"

export const deleteService = async(id: string): Promise<void> => {
  const client = await clientRepository.findOneBy({id});
  return clientRepository.remove(client)
}