import React, { useState } from "react";
import {
  Link,
  InputRightElement,
  ModalFooter,
  FormErrorMessage,
  FormHelperText,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  useToast,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iClientRequest, iContactRequest } from "@/types";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "@/services/api";

const ModalAddContact = ({ clientId, getData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const formSchema = yup.object().shape({
    email: yup.string().email("Must be a valide e-mail.").required(),
    name: yup.string().required(),
    phone: yup.string().required(),
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const inputError = inputEmail == "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iContactRequest>({ resolver: yupResolver(formSchema) });

  const onFormSubmit = async (FormData: iContactRequest) => {
    const newContact = { ...FormData, client: clientId };
    registerContact(newContact);
  };

  const registerContact = async (userData: iContactRequest) => {
    await api
      .post("api/client/contact", userData)
      .then((response) => {
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
              Contato cadastrado com sucesso.
            </Box>
          ),
        });
        setTimeout(() => {
          onClose();
        }, 1000);
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
              Erro ao cadastrar novo contato.
            </Box>
          ),
        });
      });
    getData();
  };

  return (
    <>
      <Flex
        p={4}
        color="white"
        borderRadius={"2xl"}
        bg={"blue.500"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginTop={"15"}
        cursor={"pointer"}
      >
        <Text>Meus Contatos:</Text>
        <Button bg={"blue.500"} onClick={onOpen}>
          <AddIcon color="white" fontSize={"2xl"} />
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Adicionar contato</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              {inputError ? (
                <FormHelperText color={"red.300"}>
                  Digite seu e-mail
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Name</FormLabel>
              <Input
                required
                type={"text"}
                {...register("name")}
                onChange={(e) => setInputName(e.target.value)}
              />
              {!inputName ? (
                <FormHelperText color={"red.300"}>
                  Digite seu nome
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Phone</FormLabel>
              <Input
                required
                type="text"
                {...register("phone")}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              {!inputPhone ? (
                <FormHelperText color={"red.300"}>
                  Digite seu telefone
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size="lg" onClick={handleSubmit(onFormSubmit)}>
              Criar
            </Button>
            <Button size="lg" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddContact;
