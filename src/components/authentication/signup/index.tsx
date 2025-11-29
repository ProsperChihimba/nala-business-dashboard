import { Box, Flex, Text, Link, Image } from '@chakra-ui/react'
import SignupForms from './forms'
import { RegistrationProvider } from '../../../contexts/RegistrationContext'
import { Link as RouterLink } from 'react-router-dom'
import logo2 from '../../../assets/logo2.png'

const SignupPage = () => {
  return (
    <RegistrationProvider>
      <Flex fontFamily='IBM Plex Sans, sans-serif' direction='column' alignItems='center'>
          {/* Logo */}
          <Box mb='60px' mt='40px'>
            <Image src={logo2} alt='careLink Logo' height='150px' width='auto' />
          </Box>
          
          {/* forms */}
          <Box width='100%' maxWidth='800px' display='flex' justifyContent='center' alignItems='center'>
              <SignupForms />
          </Box>
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