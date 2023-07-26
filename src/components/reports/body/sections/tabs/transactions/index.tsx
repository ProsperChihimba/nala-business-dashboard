import { Box } from '@chakra-ui/react'
import TransactionsTable from './table'
import FilterSection from './filter_section'

const TransactionsReport = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        {/* filter section */}
        <FilterSection />
        
        {/* table */}
        <TransactionsTable />
    </Box>
  )
}

export default TransactionsReport