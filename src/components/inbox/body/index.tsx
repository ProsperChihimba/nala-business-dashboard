import { Box } from "@chakra-ui/react"
import InboxHeader from "./header"
import InboxTable from "./table"

const InboxBody = () => {
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
        <InboxHeader />

        {/* table */}
        <InboxTable />
    </Box>
  )
}

export default InboxBody