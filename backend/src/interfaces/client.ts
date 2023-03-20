export interface iContact{
  email: string;
  name: string;
  phone: string
  created_at: Date
  client: iClient
}

export interface iClientRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  created_at: Date;
}

export interface iClient {
  name: string;
  email: string;
  password: string;
  phone: string;
  created_at: Date;
  contacts? : iContact[]
}