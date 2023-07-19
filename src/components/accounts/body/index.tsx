import { Box } from "@chakra-ui/react"
import AccountsHeader from "./sections/header"
import AccountCardsSection from "./sections/cards"

const AccountsBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='90vh' 
        marginTop='7vh'
        padding='20px'
        borderRadius='30px 0px 0px 30px'
    >

        {/* headers */}
        <AccountsHeader />

        {/* cards sections */}
        <AccountCardsSection />
    </Box>
  )
}

export default AccountsBody