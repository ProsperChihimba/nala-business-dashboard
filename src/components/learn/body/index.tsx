import { Box } from "@chakra-ui/react"
import LearnContent from "./sections/learn"

const LearnBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='90vh' 
        marginTop='2vh'
        padding='20px'
        borderRadius='30px 0px 0px 30px'
    >
        <LearnContent />
    </Box>
  )
}

export default LearnBody

