import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { UpdateContactController } from "../controllers/contact/updateContact.controler";
import { validateAuthTokenMiddleware } from "../middlewares/validateAuthToken.middleware";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware.middleware";
import { contactSerializerRequest } from "../serializers/contact.serializer";

export const contactRoutes = Router()

contactRoutes.post("", validateDataMiddleware(contactSerializerRequest), validateAuthTokenMiddleware, createContactController)
contactRoutes.patch("/", validateAuthTokenMiddleware, UpdateContactController)
contactRoutes.delete("/", validateAuthTokenMiddleware, deleteContactController)

