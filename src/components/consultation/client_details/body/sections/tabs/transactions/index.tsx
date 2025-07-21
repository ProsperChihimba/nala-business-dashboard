import { Box } from '@chakra-ui/react'
import SingleAccountTabs from './table'
import FilterSection from './filter_section'

const AccountTransactions = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        {/* filter section */}
        <FilterSection />
        
        {/* table */}
        <SingleAccountTabs />
    </Box>
  )
}

export default AccountTransactions