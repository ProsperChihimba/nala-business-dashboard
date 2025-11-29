import { Box, Flex, Text, Link } from '@chakra-ui/react'
import SignupForms from './forms'
import { RegistrationProvider } from '../../../contexts/RegistrationContext'
import { Link as RouterLink } from 'react-router-dom'

const SignupPage = () => {

  return (
    <RegistrationProvider>
      <Flex 
        fontFamily='IBM Plex Sans, sans-serif'
        direction="column"
        minHeight="100vh"
        backgroundColor="#F9F9F9"
        padding="40px"
      >
        {/* Logo and Home Link */}
        <Flex justifyContent="space-between" alignItems="center" marginBottom="40px">
          <Link 
            as={RouterLink} 
            to="/" 
            display="flex" 
            alignItems="center" 
            gap="10px"
            _hover={{ textDecoration: "none" }}
          >
            <Text
              fontSize="24px"
              fontWeight="600"
              color="#073DFC"
              fontFamily="IBM Plex Sans, sans-serif"
            >
              CareLink
            </Text>
            <Text fontSize="14px" color="#6D6D6D">(Home)</Text>
          </Link>
          
          {/* Login link - Top Right */}
          <Text fontFamily="IBM Plex Sans, sans-serif" fontSize="14px" color="#9A9A9A">
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="#073DFC" textDecoration="underline" fontWeight="500">
              Log In Here
            </Link>
          </Text>
        </Flex>

        {/* Main Content - Centered */}
        <Flex direction="column" alignItems="center" flex="1">
          {/* CareLink Description Section with Mobile App Screenshots */}
          <Box 
            width="100%" 
            maxWidth="800px" 
            marginBottom="40px"
            textAlign="center"
          >
            <Text
              fontSize="32px"
              fontWeight="600"
              color="#000"
              marginBottom="20px"
              fontFamily="IBM Plex Sans, sans-serif"
            >
              Welcome to CareLink
            </Text>
            <Text
              fontSize="16px"
              color="#6D6D6D"
              marginBottom="30px"
              fontFamily="IBM Plex Sans, sans-serif"
              lineHeight="1.6"
            >
              Your comprehensive healthcare management platform. Connect with patients, 
              manage consultations, and streamline your medical practice all in one place.
            </Text>
            
            {/* Mobile App Screenshots Placeholder */}
            <Flex justifyContent="center" gap="20px" marginTop="30px" flexWrap="wrap">
              <Box
                width="200px"
                height="400px"
                backgroundColor="#E2E8F0"
                borderRadius="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px dashed #CBD5E0"
              >
                <Text fontSize="14px" color="#9A9A9A">Mobile App Screenshot 1</Text>
              </Box>
              <Box
                width="200px"
                height="400px"
                backgroundColor="#E2E8F0"
                borderRadius="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px dashed #CBD5E0"
              >
                <Text fontSize="14px" color="#9A9A9A">Mobile App Screenshot 2</Text>
              </Box>
              <Box
                width="200px"
                height="400px"
                backgroundColor="#E2E8F0"
                borderRadius="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px dashed #CBD5E0"
              >
                <Text fontSize="14px" color="#9A9A9A">Mobile App Screenshot 3</Text>
              </Box>
            </Flex>
          </Box>

          {/* Registration Form - Centered */}
          <Box 
            width="100%" 
            maxWidth="600px"
            backgroundColor="white"
            borderRadius="20px"
            padding="40px"
            boxShadow="0px 4px 20px rgba(0, 0, 0, 0.05)"
          >
              <SignupForms />
          </Box>
      </Flex>
      </Flex>
    </RegistrationProvider>
  )
}

export default SignupPage