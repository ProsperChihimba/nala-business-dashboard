import { Box, Flex } from '@chakra-ui/react'
import { Image } from 'antd'

// assets
import logo from '../../../assets/Logo.svg';

const SignupSteps = () => {
  return (
    <Box
        backgroundColor='#F9F9F9' 
        height='91vh' 
        marginTop='4.5vh'
        padding='40px'
        w='40%'
        borderRadius='40px 0px 0px 40px'
    >

      {/* logo */}
      <Flex justifyContent='flex-end'>
        <Image
            src={logo}
            style={{
                paddingLeft: 10,
                marginBottom: 30,
            }}
            preview={false}
        />
      </Flex>
    </Box>
  )
}

export default SignupSteps