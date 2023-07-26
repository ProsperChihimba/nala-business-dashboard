import { Box } from "@chakra-ui/react"
import ReportTabs from "./sections/tabs"
import ReportHeader from "./sections/header"

const ReportBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='90vh' 
        marginTop='7vh'
        padding='20px'
        // overflow='auto'
        borderRadius='30px 0px 0px 30px'
    >

        {/*  */}
        <ReportHeader />

        {/*  */}
        <ReportTabs />
    </Box>
  )
}

export default ReportBody