import * as yup from "yup";
import { iContactRequest, iContactResponse } from "../interfaces/client";
import { responseClientSerializer } from "./client.serializer";

export const responseContactSerializer: yup.Schema<iContactResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid(),
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
    created_at: yup.date(),
    client: yup.string()
  });

export const contactSerializerRequest: yup.Schema<iContactRequest> = yup
.object()
.shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  client: yup.string().required(),
});