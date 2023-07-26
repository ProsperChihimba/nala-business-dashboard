import { Box } from "@chakra-ui/react"
import TeamHeader from "./header"
import TeamTable from "./table"

const TeamBody = () => {
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
        <TeamHeader />

        {/* table */}
        <TeamTable />
    </Box>
  )
}

export default TeamBody