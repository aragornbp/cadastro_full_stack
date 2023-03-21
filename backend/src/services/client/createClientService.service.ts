import { AppError } from "../../errors/errors";
import { iClient, iClientRequest } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";

export const createClientService = async (
  data: iClientRequest
): Promise<iClient> =>{
  const {...rest} = data
  const findClient = await clientRepository.findOneBy({email: data.email})
  
  if (findClient) throw new AppError(409, "Client already exists")

  const newClient = clientRepository.create({...rest})

  await clientRepository.save(newClient)

  const returnNewClient = await clientResponseSerializer.validate(newClient, {
    stripUnknown: true,
  })

  return returnNewClient
}