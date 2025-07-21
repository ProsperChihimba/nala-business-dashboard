
import SideBar from '../../../layout/sidebar'
import { Box } from '@chakra-ui/react'
import Details from './details'


const ClientDetails = () => {
  return (
    <Box
        display='grid' 
     
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <Box backgroundColor="white" paddingTop={12}>
        <Details />

        </Box>
    </Box>
  )
}

export default ClientDetails
