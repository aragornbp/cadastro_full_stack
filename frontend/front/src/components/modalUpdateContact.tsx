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
import api from "@/services/api";

const ModalUpdateContact = ({ getData, contact }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const formSchema = yup.object().shape({
    email: yup.string().email("Must be a valide e-mail."),
    name: yup.string(),
    phone: yup.string(),
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iContactRequest>({ resolver: yupResolver(formSchema) });

  const onFormSubmit = async (FormData: iContactRequest) => {
    if (FormData.email == "") {
      FormData.email = contact.email;
    }
    if (FormData.name == "") {
      FormData.name = contact.name;
    }
    if (FormData.phone == "") {
      FormData.phone = contact.phone;
    }
    console.log(FormData);
    updateContact(FormData);
  };

  const updateContact = async (userData: iContactRequest) => {
    await api
      .patch(`api/client/contact/${contact.id}`, userData)
      .then(() => {
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
              Contato atualizado com sucesso.
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
              Erro ao atualizar o contato.
            </Box>
          ),
        });
      });
    getData();
  };

  return (
    <>
      <Button variant={"default"} onClick={onOpen}>
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>ATualizar contato</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder={contact.email}
                required
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              {inputEmail ? (
                <FormHelperText color={"red.300"}>
                  Digite seu e-mail
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder={contact.name}
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
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder={contact.phone}
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
              Update
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

export default ModalUpdateContact;
