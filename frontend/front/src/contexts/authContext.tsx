import api from "@/services/api";
import { iLogin } from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";

export interface iProviderProps {
  children: React.ReactNode;
}

interface AuthProviderData {
  login: (userData: iLogin) => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: iProviderProps) => {
  const toast = useToast();
  const router = useRouter();
  const login = async (userData: iLogin) => {
    await api
      .post("/api/login", userData)
      .then((response) => {
        setCookie(null, "kenzie.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        setCookie(null, "kenzie.client_id", response.data.client_id, {
          maxAge: 60 * 30,
          path: "/",
        });
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color="gray.50"
              p={3}
              bg="green.600"
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Login realizado com sucesso
            </Box>
          ),
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color="gray.50"
              p={3}
              bg="red.600"
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao logar, verifique seus dados.
            </Box>
          ),
        });
      });
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
