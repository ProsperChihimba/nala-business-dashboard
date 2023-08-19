import { Box } from '@chakra-ui/react'
import SideBar from '../layout/sidebar'
import ExpensesBody from './body'

const ExpensesPage = () => {
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <ExpensesBody />
    </Box>
  )
}

export default ExpensesPage