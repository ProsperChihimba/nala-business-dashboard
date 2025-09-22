import { Box, Flex, Text, Link } from '@chakra-ui/react'
import SignupForms from './forms'
import SignupSteps from './steps'
import { RegistrationProvider } from '../../../contexts/RegistrationContext'
import { Link as RouterLink } from 'react-router-dom'

const SignupPage = () => {
  return (
    <RegistrationProvider>
      <Flex fontFamily='IBM Plex Sans, sans-serif'>
          
          {/* forms */}
          <Box width='60%'>
              <SignupForms />
          </Box>

          {/* steps */}
          <SignupSteps />
      </Flex>
      
      {/* Login link */}
      <Flex justify="center" mt="20px">
        <Text fontFamily="IBM Plex Sans, sans-serif" fontSize="14px" color="#9A9A9A">
          Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="#073DFC" textDecoration="underline">
            Sign in here
          </Link>
        </Text>
      </Flex>
    </RegistrationProvider>
  )
}

export default SignupPage