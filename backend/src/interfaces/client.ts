export interface iContactResponse {
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  created_at?: Date;
  client?: string;
}

export interface iContactRequest {
  email: string;
  name: string;
  phone: string;
  client: string;
}

export interface iContactUpdate {
  email?: string;
  name?: string;
  phone?: string;
}

export interface iContactUpdate {
  email?: string;
  name?: string;
  phone?: string;
}

export interface iClientRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface iClient {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  created_at?: Date;
}

export interface iClientUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}
