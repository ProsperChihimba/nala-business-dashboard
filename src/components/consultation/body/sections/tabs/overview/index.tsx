import { Box } from '@chakra-ui/react'
import AccountInfromation from './account_infromation'
import TransactionsTable from './transactions_table'
// import StatementsTable from './statements_table'

const AccountOverview = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        
        {/* account information section */}
        <AccountInfromation />

        {/* transactions table */}
        <TransactionsTable />

        {/* statements tabke */}
        {/* <StatementsTable /> */}
    </Box>
  )
}

export default AccountOverview