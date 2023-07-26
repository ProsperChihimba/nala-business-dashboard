import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import DepositHeading from '../../../layout/heading';
import DepositInput from '../../../layout/input';
import AppButton from '../../../layout/button';

const VendorDetails = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        {/* heading */}
        <DepositHeading title='Add Vendor' />

        {/* inputs */}
        <DepositInput
            title='Name'
            value=''
            placeholder=''
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='35px'
        />

        <DepositInput
            title='Email'
            value=''
            placeholder=''
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='20px'
        />

        <Flex
            direction='column'
            marginBottom='35px'
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

        {/* button */}
        <AppButton
            label='Next'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />
    </Flex>
  )
}

export default VendorDetails