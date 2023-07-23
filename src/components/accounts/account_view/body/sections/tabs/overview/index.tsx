import { Box } from '@chakra-ui/react'
import AccountInfromation from './account_infromation'

const AccountOverview = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        
        {/* account information section */}
        <AccountInfromation />
    </Box>
  )
}

export default AccountOverview