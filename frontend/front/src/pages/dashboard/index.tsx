import api from "@/services/api";
import { iClient, iContact, iToken } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import {
  Center,
  List,
  ListItem,
  Link,
  Box,
  Flex,
  Button,
  useToast,
  Card,
} from "@chakra-ui/react";
import nookies from "nookies";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ModalAddContact from "@/components/modalAddContact";
import ModalUpdateContact from "@/components/modalUpdateContact";
import ModalUpdateClient from "@/components/modalUpdateClient";

export interface iApiError {
  status: string;
  message?: string;
}

const Dashboard = ({ token, client_id }: iToken) => {
  const router = useRouter();
  const [user, setUser] = useState<iClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([] as iContact[]);
  const toast = useToast();

  const getData = async () => {
    0;
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      const { data } = await api.get(`api/client/${client_id}`);
      setUser(data);
      setContacts(data.contacts);
    } catch (error) {
      const requestError = error as AxiosError<iApiError>;
      console.error(requestError.response?.data.message);
    }
  };

  useEffect(() => {
    async function loadUser() {
      getData();
      setLoading(false);
    }
    loadUser();
  }, []);

  const deletarClient = async (clientId: string) => {
    await api.delete(`api/client/${user?.id}`);
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
          Usuario deletado.
        </Box>
      ),
    });
    router.push("/");
  };

  const deletar = async (contactId: string) => {
    await api.delete(`api/client/contact/${contactId}`);
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
          Contato deletado.
        </Box>
      ),
    });
    getData();
  };

  return (
    <>
      <Header name={user?.name} isLogged={true} />
      <Box
        mt={"5"}
        bg="blue.500"
        w="100%"
        p={4}
        color="white"
        borderRadius={"2xl"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={"20"}>
          <Flex flexDirection={"column"}>
            <h1>Bem vindo {user?.name}!</h1>
            <p>Phone: {user?.phone}</p>
            <p>E-mail: {user?.email}</p>
          </Flex>
          <Flex
            alignItems={"center"}
            gap={"2"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Button variant={"default"} onClick={() => deletarClient(user!.id)}>
              Deletar
            </Button>
            <ModalUpdateClient getData={getData} user={user} />
          </Flex>
        </Flex>
      </Box>
      <ModalAddContact clientId={client_id} getData={getData} />

      {contacts.map((contact, index) => (
        <Box
          mt={"5"}
          key={contact.id}
          bg="tomato"
          w="100%"
          p={4}
          color="white"
          borderRadius={"2xl"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"20"}
          >
            <Flex maxWidth={"150"} flexDirection={"column"}>
              <p>Nome: {contact.name}</p>
              <p>Phone: {contact.phone}</p>
              <p>E-mail: {contact.email}</p>
            </Flex>
            <Flex
              alignItems={"center"}
              gap={"2"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Button onClick={() => deletar(contact.id)} variant={"default"}>
                Deletar
              </Button>
              <ModalUpdateContact getData={getData} contact={contact} />
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies["kenzie.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: cookies["kenzie.token"],
      client_id: cookies["kenzie.client_id"],
    },
  };
};

export default Dashboard;
