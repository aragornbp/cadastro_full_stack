import { AppError } from "../../errors/errors";
import { iClientRequest } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";

export const clientUpdateService = async (
  client: iClientRequest, id: string
): Promise<iClientRequest> => {
  const clientFound = await clientRepository.findOneBy({id});
  
  if (!clientFound) throw new AppError(404, "Client not found")

  await clientRepository.save({...clientFound, ...client })

  const updatedClient= await clientRepository.findOneBy({id});
  
  return await clientResponseSerializer.validate(updatedClient, {
    stripUnknown: true,
  });
}