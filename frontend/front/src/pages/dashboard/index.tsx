import api from "@/services/api"
import { iClient, iContact, iToken } from "@/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import {Center, List, ListItem, Link} from '@chakra-ui/react'
import nookies from 'nookies'
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import ModalAddContact from "@/components/modalAddContact"


export interface iApiError {
  status: string;
  message?: string;
}

const Dashboard = ({token, client_id}: iToken) => {
  const router = useRouter()
  const [user, setUser] = useState<iClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([] as iContact[]);


  useEffect(()=> {
    async function loadUser() {
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
      setLoading(false);
      }
      loadUser()
  }, [])

  return (
    <>
      <Header name={user?.name} isLogged={true}/>
      <ModalAddContact clientId={client_id} token={token}/>
      <Center p={10}>
        <List spacing={3}>
          {
            contacts.map((contact, index) => (
              <ListItem key={contact.id}>
                  {contact.name}
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