import { Box, VStack } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import NavBar from '../layout/navbar'
import PatientMonitoringBody from './body'

const PatientMonitoring = () => {
  return (
    <Box fontFamily='IBM Plex Sans, sans-serif'>
      <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
      >
        <SideBar />
        <VStack spacing={0} align="stretch">
          <NavBar />
          <PatientMonitoringBody />
        </VStack>
      </Box>
    </Box>
  )
}

export default PatientMonitoring

