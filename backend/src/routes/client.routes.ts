import { Router } from "express";
import { createClientController } from "../controllers/client/createClient.controller";
import { deleteClientController } from "../controllers/client/deleteClient.controller";
import { listAllClientsController } from "../controllers/client/listAllClients.controller";
import { readClientController } from "../controllers/client/readClient.controller";
import { updateClientController } from "../controllers/client/updateClient.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validateAuthToken.middleware";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware.middleware";
import { createClientSerializer, updateClientSerializer } from "../serializers/client.serializer";

export const clientRoutes = Router()

clientRoutes.post("", validateDataMiddleware(createClientSerializer), createClientController)
clientRoutes.get("/all", validateAuthTokenMiddleware, listAllClientsController)
clientRoutes.get("/:id", validateAuthTokenMiddleware, readClientController)
clientRoutes.patch("/:id", validateDataMiddleware(updateClientSerializer), validateAuthTokenMiddleware, updateClientController)
clientRoutes.delete("/:id", validateAuthTokenMiddleware, deleteClientController)

