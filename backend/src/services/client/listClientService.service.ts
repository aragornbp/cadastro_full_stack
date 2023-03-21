import { AppError } from "../../errors/errors";
import { iClient } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";

export const ListClientService = async (id:string): Promise<iClient> => {
  const client = await clientRepository.findOneBy({id});
  if (!client) throw new AppError(404, "Client not found")
  const returnClient = await clientResponseSerializer.validate(newClient, {
    stripUnknown: true,
  })
  return returnClient
}