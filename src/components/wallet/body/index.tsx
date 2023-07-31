import { Box } from "@chakra-ui/react"
import WalletHeader from "./header"

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

    </Box>
  )
}

export default WalletBody