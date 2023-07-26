import { Box, Center } from '@chakra-ui/react'
// import VendorDetails from './vendor_details'
import AccountDetails from './account_details'

const NewVendor = () => {
  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

         {/*sections  */}
         <Center>
            <AccountDetails />
         </Center>
    </Box>
  )
}

export default NewVendor