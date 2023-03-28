import "express-async-errors";
import { AppError } from "../../errors/errors";
import { iClient } from "../../interfaces/client";
import { clientRepository } from "../../repositories/clientRepository";
import { responseClientSerializer } from "../../serializers/client.serializer";

export const ReadClientService = async (id: any): Promise<iClient> => {
  const client = await clientRepository.findOne({
    relations: { contacts: true },
    where: { id: id },
  });
  if (!client) throw new AppError(404, "Client not found");

  const returnClient = await responseClientSerializer.validate(client, {
    stripUnknown: true,
  });
  return returnClient;
};
