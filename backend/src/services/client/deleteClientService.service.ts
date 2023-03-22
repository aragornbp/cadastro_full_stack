import { clientRepository } from "../../repositories/clientRepository"

export const deleteClientService = async(id: any): Promise<{}> => {
  const client = await clientRepository.findOneBy({id});
  return clientRepository.remove(client!)
}