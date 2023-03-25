import React, { useContext, useState } from 'react'
import {Link, InputRightElement, ModalFooter ,FormErrorMessage ,FormHelperText, ModalBody, FormControl, FormLabel, Input, InputGroup, Button, useDisclosure, Modal, ModalContent, ModalHeader} from '@chakra-ui/react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { iLogin } from '@/types'
import { ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import { AuthContext } from '@/contexts/authContext'


const ModalFormLogin = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {login} = useContext(AuthContext)

  const formSchema = yup.object().shape({
    email: yup.string().email('Must be a valide e-mail.').required(),
    password: yup.string().required()
  })

  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const emailError = inputEmail == ""

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<iLogin>({resolver: yupResolver(formSchema)})
  
  const onFormSubmit = (FormData: iLogin) =>{
    login(FormData)
  }
  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Entre na sua conta</ModalHeader>
          <ModalBody>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input required type='email' {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
              {emailError ? (
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
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input required type={showPassword ? "text": "password"} {...register("password")} onChange={(e)=> setInputPassword(e.target.value)}/>
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
                  {errors.password?.message}
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

export default ModalFormLogin