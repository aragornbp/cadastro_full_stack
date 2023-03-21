export interface iContactResponse{
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  created_at?: Date;
  client_id?: string;
}

export interface iContactRequest{
  email: string;
  name: string;
  phone: string;
  client_id: string;
}
export interface iContactRUpdate{
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


