import { iClient } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";

export const listAllClientsService = async(): Promise<iClient[]> =>{
  const clients = await clientRepository.find({
    relations: {
      contacts: true
    }
  })

  const validatedClients = await ListClientService.validade(clients, {stripUnknown: true})

  return validatedClients
}

