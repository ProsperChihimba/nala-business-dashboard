import { Box, Center } from '@chakra-ui/react'
import AddFunds from './sections/add_funds'

const DepositPage = () => {
  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

         {/*sections  */}
         <Center>
            <AddFunds />
         </Center>
    </Box>
  )
}

export default DepositPage