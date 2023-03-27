import * as yup from "yup";
import { iLogin } from "../interfaces/login";

export const loginSerializer: yup.Schema<iLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
