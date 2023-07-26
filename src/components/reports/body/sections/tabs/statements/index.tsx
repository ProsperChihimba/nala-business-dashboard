import { Box } from '@chakra-ui/react'
import StatementsTble from './table'

const AccountStatements = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        {/* table */}
        <StatementsTble />
    </Box>
  )
}

export default AccountStatements