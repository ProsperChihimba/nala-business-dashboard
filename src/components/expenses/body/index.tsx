import { Box } from "@chakra-ui/react"
import ExpensesHeader from "./header"
import FilterSection from "../../reports/body/sections/tabs/transactions/filter_section"
import ReportBox from "../../layout/report_box"
import TransactionsTable from "../../reports/body/sections/tabs/overview/transactions_table"

const ExpensesBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='90vh' 
        marginTop='7vh'
        padding='20px'
        // overflow='auto'
        borderRadius='30px 0px 0px 30px'
    >

        {/* header */}
        <ExpensesHeader />

        <ReportBox />

        {/* filter section */}
        <FilterSection />

        {/* table */}
        <TransactionsTable />
    </Box>
  )
}

export default ExpensesBody