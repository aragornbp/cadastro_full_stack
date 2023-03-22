import { iClient } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";
import { responseListClientsSerializer } from "../../serializers/client.serializer";

export const listAllClientsService = async() =>{
  const clients = await clientRepository.find({
    relations: {
      contacts: true
    }
  })

  const validateClients = await responseListClientsSerializer.validate(clients, {
    stripUnknown: true,
  });
  
  return validateClients
}

