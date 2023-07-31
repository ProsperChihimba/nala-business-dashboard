import { Box } from "@chakra-ui/react"
import WalletHeader from "./header"
import WalletCard from "./cards"
import TransactionsTable from "../../reports/body/sections/tabs/overview/transactions_table"

const WalletBody = () => {
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
        <WalletHeader />

        {/* body */}
        <WalletCard />

        {/* table */}
        <TransactionsTable />

    </Box>
  )
}

export default WalletBody