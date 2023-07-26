import { Box } from '@chakra-ui/react'
import TransactionsTable from './transactions_table'
import ReportChart from './report_chart'
import ChartFilter from './filters'

const ReportOverview = () => {
  return (
    <Box
        color='black'
        marginTop='30px'
    >
        {/* filters */}
        <ChartFilter />
        
        {/* report chart section */}
        <ReportChart />

        {/* transactions table */}
        <TransactionsTable />

    </Box>
  )
}

export default ReportOverview