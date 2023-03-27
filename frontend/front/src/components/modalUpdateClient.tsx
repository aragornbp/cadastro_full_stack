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
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iClient, iClientUpdate } from "@/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "@/services/api";

const ModalUpdateClient = ({ user, getData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const formSchema = yup.object().shape({
    email: yup.string().email("Must be a valide e-mail."),
    password: yup.string(),
    name: yup.string(),
    phone: yup.string(),
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputError = inputEmail == "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iClientUpdate>({ resolver: yupResolver(formSchema) });

  const onFormSubmit = async (FormData: iClientUpdate) => {
    if (FormData.email == "") {
      FormData.email = user.email;
    }
    if (FormData.name == "") {
      FormData.name = user.name;
    }
    if (FormData.phone == "") {
      FormData.phone = user.phone;
    }
    if (FormData.password == "") {
      const data = {
        email: FormData.email,
        name: FormData.name,
        phone: FormData.phone,
      };
      updateUser(data);
    } else {
      updateUser(FormData);
    }
  };

  const updateUser = async (userData: iClientUpdate) => {
    await api
      .patch(`api/client/${user.id}`, userData)
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
              Cadastro atualizado com sucesso.
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
              Erro ao atualizar cadastro.
            </Box>
          ),
        });
      });
    getData();
  };

  return (
    <>
      <Button variant={"default"} onClick={onOpen}>
        Atualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Atualize sua conta</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder={user?.email}
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
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder={user?.password}
                  required
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!inputPassword ? (
                <FormHelperText color={"red.300"}>
                  Digite sua senha
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder={user?.name}
                required
                type="text"
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
                placeholder={user?.phone}
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
              Entrar
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

export default ModalUpdateClient;
