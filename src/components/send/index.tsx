import { Box, Center } from '@chakra-ui/react'
import RecipientDetails from './sections/recipient'

const SendTransaction = () => {
  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

        {/*sections  */}
        <Center>
            <RecipientDetails />
        </Center>
    </Box>
  )
}

export default SendTransaction