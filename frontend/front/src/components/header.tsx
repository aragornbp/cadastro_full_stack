import React, { ReactNode } from 'react'
import ModalFormRegister from './modalFormRegister'
import ModalFormLogin from './modalFormLogin'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react'




interface IHeaderProps {
  name?:string,
  isLogged?: boolean
}

const Header = ({name, isLogged = false}: IHeaderProps) => {
  const router = useRouter()
  const logout = () => {
    destroyCookie(null, 'kenzie.token')
    destroyCookie(null, 'kenzie.client_id')
    router.push('/')
  }


  return (
    <>
      <Box bg={'blue.600'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} gap={'2'}>
            <Text zIndex={'overlay'} color={'whiteAlpha.900'} fontSize={'1xl'}>
              KENZIE CONTACTS
            </Text>
          <Flex alignItems={'center'} gap={'2'}>
            {
              isLogged ? 
              (
                <>
                    <Menu >
                      <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Text color={'white'} paddingRight={2}>
                          {name}
                        </Text>
                      </MenuButton>
                      <MenuList bg={'blue.600'}>
                        <MenuItem 
                            bg={'blue.600'} 
                            color={"white"} 
                            onClick={() => logout()}>
                              Sair
                        </MenuItem>
                      </MenuList>
                    </Menu>
            </>
              )   
            : (
              <>
                <ModalFormLogin/>
                <Spacer />
                <ModalFormRegister />
                
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Header
