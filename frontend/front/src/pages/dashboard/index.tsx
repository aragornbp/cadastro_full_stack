import api from "@/services/api"
import { iClient, iContact, iToken } from "@/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import {Center, List, ListItem, Link, Box, Flex, Button, useToast} from '@chakra-ui/react'
import nookies from 'nookies'
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import ModalAddContact from "@/components/modalAddContact"
import ModalUpdateContact from "@/components/modalUpdateContact"


export interface iApiError {
  status: string;
  message?: string;
}

const Dashboard = ({token, client_id}: iToken) => {
  const router = useRouter()
  const [user, setUser] = useState<iClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([] as iContact[]);
  const toast = useToast()

  const getData = async () => {0
    try {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      const {data} = await api.get(`api/client/${client_id}`)
      setUser(data)
      setContacts(data.contacts)
    }
    catch(error){
      const requestError = error as AxiosError<iApiError>;
      console.error(requestError.response?.data.message);
    }
  }

  useEffect(()=> {
    async function loadUser() {
      getData()
      setLoading(false);
      }
      loadUser()
  }, [])

  const deletar = async(contactId: string) => {
    await api.delete(`api/client/contact/${contactId}`)
    toast({
      title: 'sucess',
      variant: 'solid',
      position: "top-right",
      isClosable: true,
      render: () => (
        <Box color='gray.50' p={3} bg='green.600' fontWeight={'bold'} borderRadius={'md'}>
          Contato deletado.
        </Box>
      ),
    })
    getData()
  }

  return (
    <>
      <Header name={user?.name} isLogged={true}/>
      <ModalAddContact clientId={client_id} getData={getData}/>
      <Center p={10}>
        <List spacing={3}>
          {
            contacts.map((contact, index) => (
              <ListItem key={contact.id}>
                  <Box bg='tomato' w='100%' p={4} color='white' borderRadius={'2xl'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}   gap={'20'}>
                      <Flex>
                        Nome: {contact.name}
                        <br></br>
                        Phone: {contact.phone}
                        <br></br>
                        E-mail: {contact.email}
                        
                      </Flex>
                      <Flex alignItems={'center'} gap={'2'} justifyContent={'space-between'} flexDirection={'column'}>
                        <Button onClick={()=> deletar(contact.id)} textColor={'blackAlpha.600'}>del</Button>
                        <ModalUpdateContact getData={getData} contact={contact}/>
                      </Flex>
                    </Flex>
                  </Box>
              </ListItem>
            ))
          }
        </List>
      </Center>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const cookies = nookies.get(ctx)
  
  if(!cookies["kenzie.token"]){
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  
  return {
    props: {token: cookies["kenzie.token"], client_id: cookies["kenzie.client_id"]}
  }
}

export default Dashboard