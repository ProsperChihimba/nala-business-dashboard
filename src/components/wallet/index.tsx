import { Box } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import WalletBody from './body'

const Vendors = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
       <WalletBody />
    </Box>
  )
}

export default Vendors