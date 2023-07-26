import { Box } from '@chakra-ui/react'
import ReportBody from './body'
import SideBar from '../layout/sidebar'

const ReportsPage = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <ReportBody />
    </Box>
  )
}

export default ReportsPage