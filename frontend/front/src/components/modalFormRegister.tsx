import React, { useState } from 'react'
import {Link, InputRightElement, ModalFooter ,FormErrorMessage ,FormHelperText, ModalBody, FormControl, FormLabel, Input, InputGroup, Button, useDisclosure, Modal, ModalContent, ModalHeader} from '@chakra-ui/react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { iClientRequest } from '@/types'
import { ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

const ModalFormRegister = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const formSchema = yup.object().shape({
    email: yup.string().email('Must be a valide e-mail.').required(),
    password: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
  })

  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [inputName, setInputName] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const inputError = inputEmail == ""


  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<iClientRequest>({resolver: yupResolver(formSchema)})
  
  const onFormSubmit = (FormData: iClientRequest) =>{
    console.log(FormData)
  }
  return (
    <>
      <Button onClick={onOpen}>Register</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Crie sua conta</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>E-mail</FormLabel>
              <Input required type='email' {...register("email")} onChange={(e)=> setInputEmail(e.target.value)}/>
              {inputError ? (
                <FormHelperText color={'red.300'}>
                  Digite seu e-mail
                </FormHelperText>
              ):
              (
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
              ) 
              }
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input required type={showPassword ? "text": "password"} {...register("password")} onChange={(e) => setInputPassword(e.target.value)}/>
                <InputRightElement>
                  <Button variant={"ghost"} onClick={()=> setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon/>}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!inputPassword ? (
                <FormHelperText color={'red.300'}>
                  Digite sua senha
                </FormHelperText>
              ):
              (
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
              ) 
              }
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Name</FormLabel>
              <Input required type='text' {...register("name")} onChange={(e) => setInputName(e.target.value)}/>
              {!inputName ? (
                <FormHelperText color={'red.300'}>
                  Digite seu nome
                </FormHelperText>
              ):
              (
                <FormErrorMessage>
                  {errors.name?.message}
                </FormErrorMessage>
              )
              }
            </FormControl>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>Phone</FormLabel>
              <Input required type='text' {...register("phone")} onChange={(e) => setInputPhone(e.target.value)}/>
              {!inputPhone ? (
                <FormHelperText color={'red.300'}>
                  Digite seu telefone
                </FormHelperText>
              ):
              (
                <FormErrorMessage>
                  {errors.phone?.message}
                </FormErrorMessage>
              )
              }
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <Button size='lg' onClick={handleSubmit(onFormSubmit)}>Entrar</Button>
          <Button size='lg' onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalFormRegister