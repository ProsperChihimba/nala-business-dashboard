import { Box } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'

const Accounts = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '15rem auto', md: '15rem auto', xl: '16rem auto' }}
    >
        <SideBar />

        {/* content */}
        <Box bg='black' h='90vh' mt='7vh'>
        </Box>
    </Box>
  )
}

export default Accounts