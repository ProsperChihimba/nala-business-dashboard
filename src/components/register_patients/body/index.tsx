import { Box, Text, Flex } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import SmartphoneRegistration from "./smartphone"
import NonSmartphoneRegistration from "./non_smartphone"

const RegisterPatientsBody = () => {
  const { type } = useParams<{ type: string }>()
  
  return (
    <Box 
      backgroundColor='#F9F9F9' 
      height='fit' 
      marginTop='7vh'
      padding='20px'
      borderRadius='30px 0px 0px 30px'
    >
      <Text fontSize="24px" fontWeight="600" marginBottom="20px">
        Register My Patients
      </Text>
      
      {type === 'smartphone' ? (
        <SmartphoneRegistration />
      ) : type === 'non-smartphone' ? (
        <NonSmartphoneRegistration />
      ) : (
        <Flex direction="column" gap={4}>
          <Text>Please select a registration type from the sidebar menu.</Text>
        </Flex>
      )}
    </Box>
  )
}

export default RegisterPatientsBody

