import "express-async-errors";
import { AppError } from "../../errors/errors";
import { iClient } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";
import { responseClientSerializer } from "../../serializers/client.serializer";

export const updateClientService = async (
  client: iClient,
  id: any
): Promise<iClient> => {
  const clientFound = await clientRepository.findOneBy({ id });

  if (!clientFound) throw new AppError(404, "Client not found");

  const updateClient = clientRepository.create({ ...clientFound, ...client });
  await clientRepository.save(updateClient);

  return await responseClientSerializer.validate(updateClient, {
    stripUnknown: true,
  });
};
