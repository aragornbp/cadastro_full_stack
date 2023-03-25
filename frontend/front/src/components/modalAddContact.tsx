import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {iContactRequest } from '@/types'
import { AddIcon } from '@chakra-ui/icons'
import api from '@/services/api'
import { AxiosError } from 'axios'
import { iApiError } from '@/pages/dashboard'

const ModalAddContact = ({clientID, token}:any) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [inputEmail, setInputEmail] = useState("")
  const [inputName, setInputName] = useState("")
  const [inputPhone, setInputPhone] = useState("")
  const [inputClient, setInputClient] = useState("clientID")
  
  const inputError = inputEmail == ""

  const formSchema = yup.object().shape({
    email: yup.string().email('Must be a valide e-mail.').required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    client: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<iContactRequest>({resolver: yupResolver(formSchema)})


  const onFormSubmit = (FormData: iContactRequest) => {
    console.log('oi estou no form submit')
    const newContact = {...FormData, client: clientID}
    console.log(newContact)
    addContact(FormData)
  }


  const addContact = async (contactData: iContactRequest) => {
    try{
      console.log('oi estou no try')
      api.defaults.headers.common.authorization = `Bearer ${token}`
      await api.post("api/client/contact", contactData)
    }
    catch(error){
      console.log('oi estou no eerr')
      const requestError = error as AxiosError<iApiError>;
      console.error(requestError.response?.data.message);
    }
  }


  return (
    <>
      <Flex border={'1px'} borderRadius={'2xl'} justifyContent={'center'} gap={'2'} alignItems={'center'} width={'50%'} margin={'auto'} marginTop={"15"} cursor={'pointer'}>
        <Text fontSize={'2xl'}>Adicionar Contato</Text>
        <Button onClick={onOpen}><AddIcon/></Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Criar novo Contato.</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={inputError}>
              <FormLabel>E-mail</FormLabel>
              <Input required type='email' {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
              {!inputEmail ? (
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
              <FormLabel>Name</FormLabel>
              <Input required type={"text"} {...register("name")} onChange={(e)=> setInputName(e.target.value)}/>
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
              <Input required type={"text"} {...register("phone")} onChange={(e)=> setInputPhone(e.target.value)}/>
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
            <Button size='lg' onClick={handleSubmit(onFormSubmit)}>Criar</Button>
            <Button size='lg' onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalAddContact