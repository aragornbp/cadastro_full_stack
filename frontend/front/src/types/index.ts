import { ReactNode } from "react";

export interface iContact{
  id: string,
  email: string,
  name: string,
  phone: string,
  created_at: Date,
}

export interface iContactRequest{
  email: string,
  name: string,
  phone: string,
  client: string,
}

export interface iClient {
  id: string,
  name: string,
  email: string,
  phone: string,
  created_at: Date,
  contacts: iContact[],
}

export interface iClientRequest {
  name: string,
  email: string,
  password: string,
  phone: string,
}

export interface iLogin {
  email: string,
  password: string,
}

export interface iToken {
  token: string,
  client_id: string,
  data: iClient
}
