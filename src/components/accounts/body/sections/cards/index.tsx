import { Flex } from '@chakra-ui/react'
import CreditCardBox from './credit_card'
import BusinessCardBox from './business_card'

const AccountCardsSection = () => {
  return (
    <Flex justifyContent='space-between' fontFamily='IBM Plex Sans, sans-serif'>

        {/* credit card */}
        <CreditCardBox />

        {/* business card */}
        <BusinessCardBox />
    </Flex>
  )
}

export default AccountCardsSection