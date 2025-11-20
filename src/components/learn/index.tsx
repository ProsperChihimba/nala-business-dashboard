import SideBar from '../layout/sidebar'
import NavBar from '../layout/navbar'
import { Box, VStack } from '@chakra-ui/react'
import LearnBody from './body'

const Learn = () => {
  return (
    <Box fontFamily='IBM Plex Sans, sans-serif'>
      <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
      >
        <SideBar />

        {/* content */}
        <VStack spacing={0} align="stretch">
          <NavBar />
          <Box>
            <LearnBody />
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}

export default Learn

