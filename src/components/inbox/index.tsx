import { Box } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import InboxBody from './body'

const InboxPage = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <InboxBody />
    </Box>
  )
}

export default InboxPage