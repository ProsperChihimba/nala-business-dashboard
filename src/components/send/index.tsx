import { Box, Center } from '@chakra-ui/react'
// import RecipientDetails from './sections/recipient'
// import PaymentDetals from './sections/payment_details'
import PaymentApproval from './sections/approval'

const SendTransaction = () => {
  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

        {/*sections  */}
        <Center>
            <PaymentApproval />
        </Center>
    </Box>
  )
}

export default SendTransaction