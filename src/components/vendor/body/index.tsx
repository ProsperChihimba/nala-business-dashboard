import { Box } from "@chakra-ui/react"
import VendorsHeader from "./header"
import VendorTable from "./table"

const VendorsBody = () => {
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
        <VendorsHeader />

        {/* table */}
        <VendorTable />
    </Box>
  )
}

export default VendorsBody