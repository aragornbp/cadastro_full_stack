import * as yup from "yup";
import { iClient, iClientRequest, iClientUpdate } from "../interfaces/client";
import { responseContactSerializer } from "./contact.serializer";

export const createClientSerializer: yup.Schema<iClientRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
  });

export const responseClientSerializer: yup.Schema<iClient> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    created_at: yup.date(),
    phone: yup.string(),
    contacts: yup.array(responseContactSerializer),
  });

export const responseListClientsSerializer = yup.array(
  responseClientSerializer
);

export const updateClientSerializer: yup.Schema<iClientUpdate> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    phone: yup.string(),
  });
