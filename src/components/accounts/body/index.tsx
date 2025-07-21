import { Box } from "@chakra-ui/react"
import AccountsHeader from "./sections/header"
import AccountCardsSection from "./sections/cards"
import AccountsLearn from "./sections/learn"

const AccountsBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='fit' 
        marginTop='7vh'
        padding='20px'
        // overflow='auto'
        borderRadius='30px 0px 0px 30px'
    >

        {/* headers */}
        <AccountsHeader />

        {/* cards sections */}
        <AccountCardsSection />

        {/* learn */}
        <AccountsLearn />
    </Box>
  )
}

export default AccountsBody