import { Box } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import AccountsBody from './body'

const Accounts = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <AccountsBody />
    </Box>
  )
}

export default Accounts