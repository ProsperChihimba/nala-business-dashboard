import { Box, Flex } from '@chakra-ui/react'
import SignupForms from './forms'
import SignupSteps from './steps'

const SignupPage = () => {
  return (
    <Flex fontFamily='IBM Plex Sans, sans-serif'>
        
        {/* forms */}
        <Box width='60%'>
            <SignupForms />
        </Box>

        {/* steps */}
        <SignupSteps />
    </Flex>
  )
}

export default SignupPage