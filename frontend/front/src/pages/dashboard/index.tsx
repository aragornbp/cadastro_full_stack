import api from "@/services/api"
import { iClient } from "@/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import {Center, List, ListItem, Link} from '@chakra-ui/react'


interface Props {
  client: iClient
}

const Dashboard: NextPage<Props> = ({client}) => {
  const router = useRouter()
  return (
    <>
      <h1>Dashboard</h1>
      <Center p={10}>
        <List spacing={3}>
          {
            client.contacts.map((contact, index) => (
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

export const getServerSideProps: GetServerSideProps<Props> = async () =>{
  // id vem do cookies após login
  const id = "229ac975-b67f-4933-a415-7e7a9f8ba5dd"
  const response = await api.get(`/api/client/${id}`)
  const client: iClient = response.data

  return {props: {client}}
}

export default Dashboard