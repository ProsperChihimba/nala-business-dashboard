import { Box } from "@chakra-ui/react"
import SingleAccountHeader from "./sections/header"
import SingleAccountTabs from "./sections/tabs"

const SingleAccountBody = () => {
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
        <SingleAccountHeader />

        {/*  */}
        <SingleAccountTabs />
    </Box>
  )
}

export default SingleAccountBody