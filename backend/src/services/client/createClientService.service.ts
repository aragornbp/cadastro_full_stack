import { AppError } from "../../errors/errors";
import { iClient, iClientRequest } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";
import { responseClientSerializer } from "../../serializers/client.serializer";

export const createClientService = async (
  data: iClientRequest
): Promise<iClient> => {
  const findClient = await clientRepository.findOneBy({ email: data.email });

  if (findClient) throw new AppError(409, "Client already exists");

  const newClient = clientRepository.create({ ...data });

  await clientRepository.save(newClient);

  const returnNewClient = await responseClientSerializer.validate(newClient, {
    stripUnknown: true,
  });

  return returnNewClient;
};
