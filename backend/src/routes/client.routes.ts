import { Router } from "express";
import { createClientController } from "../controllers/client/createClient.controller";
import { deleteClientController } from "../controllers/client/deleteClient.controller";
import { listAllClientsController } from "../controllers/client/listAllClients.controller";
import { readClientController } from "../controllers/client/readClient.controller";
import { updateClientController } from "../controllers/client/updateClient.controller";

export const clientRoutes = Router()

clientRoutes.post("", createClientController)
clientRoutes.get("/all", listAllClientsController)
clientRoutes.get("/:id", readClientController)
clientRoutes.patch("/:id", updateClientController)
clientRoutes.delete("/:id", deleteClientController)

