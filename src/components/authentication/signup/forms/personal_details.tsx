import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import DepositHeading from '../../../layout/heading';
import DepositInput from '../../../layout/input';

const PersonalDetails = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column' marginTop='80px'>
        {/* heading */}
        <DepositHeading title='Welcome Nala for businesses' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#9A9A9A',
            }}
        >
            Few details about your business
        </Text>


        {/* inputs */}
        <Flex width='100%' gap='10%'>
            <Box width='100%'>
                <DepositInput 
                    title='First name'
                    value=''
                    placeholder=''
                    isReadOnly={false}
                    marginBottom='0px'
                    marginTop='35px'
                    width='100%'
                />
            </Box>
            <Box width='100%'>
                <DepositInput 
                    title='Last name'
                    value=''
                    placeholder=''
                    isReadOnly={false}
                    marginBottom='0px'
                    marginTop='35px'
                    width='100%'
                />
            </Box>
        </Flex>

        <DepositInput 
            title='Work email'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
        />

        <DepositInput
            title='Company name'
            value=''
            placeholder=''
            isReadOnly={false}
            percentage='20%'
            marginBottom='0px'
            marginTop='20px'
        />

        <Flex
            direction='column'
            marginBottom='80px'
            marginTop='20px'
        >

            {/* input title */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#000',
                    marginBottom: '5px',
                }}
            >
                Phone number
            </Text>
            <Flex gap='20px'>
                <InputGroup width='90px'>
                    <Input
                        paddingRight='5px'
                        height='50px'
                        borderColor='#D9D9D9'
                        background='white'
                        focusBorderColor='#073DFC'
                        borderRadius='10px'
                        fontFamily='IBM Plex Sans, sans-serif'
                        fontSize='15px'
                        fontWeight= '500'
                        color='#000'
                        value='UK'
                        _placeholder={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            color: '#9A9A9A',
                            fontSize: '15px',
                        }}
                    />
                    <InputRightElement pt='12px'>
                        <FiChevronDown size='15px' color='#000000' />
                    </InputRightElement>
                </InputGroup>
                <Input
                    pl='25px'
                    height='50px'
                    borderColor='#D9D9D9'
                    background='white'
                    focusBorderColor='#073DFC'
                    borderRadius='10px'
                    fontFamily='IBM Plex Sans, sans-serif'
                    fontSize='15px'
                    fontWeight= '400'
                    color='#000'
                    _placeholder={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        color: '#9A9A9A',
                        fontSize: '15px',
                    }}
                />
            </Flex>
            
        </Flex>
    </Flex>
  )
}

export default PersonalDetails