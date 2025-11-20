import { Box, VStack } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import NavBar from '../layout/navbar'
import RegisterPatientsBody from './body'

const RegisterPatients = () => {
  return (
    <Box fontFamily='IBM Plex Sans, sans-serif'>
      <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
      >
        <SideBar />
        <VStack spacing={0} align="stretch">
          <NavBar />
          <RegisterPatientsBody />
        </VStack>
      </Box>
    </Box>
  )
}

export default RegisterPatients

