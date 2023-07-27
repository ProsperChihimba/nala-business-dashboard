import { Box } from '@chakra-ui/react'
import TransactionsTable from './table'
import FilterSection from './filter_section'
import ReportBox from '../../../../../layout/report_box'

const TransactionsReport = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        {/*  */}
        <ReportBox />
        
        {/* filter section */}
        <FilterSection />
        
        {/* table */}
        <TransactionsTable />
    </Box>
  )
}

export default TransactionsReport