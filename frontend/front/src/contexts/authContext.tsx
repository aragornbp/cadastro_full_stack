import api from "@/services/api";
import { iLogin } from "@/types";
import { createContext, ReactNode, useContext } from "react";

export interface iProviderProps {
  children: React.ReactNode,
}

interface AuthProviderData {
  login: (userData: iLogin) => void
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData)

export const AuthProvider = ({}: iProviderProps) => {
  const login = (userData: iLogin) => {
    api.post("/api/login", userData)
    .then()
  }
}