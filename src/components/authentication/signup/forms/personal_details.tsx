import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import DepositHeading from '../../../layout/heading';
import DepositInput from '../../../layout/input';
import { useRegistration } from '../../../../contexts/RegistrationContext';
import { useState } from 'react';

const PersonalDetails = () => {
    const { formData, updateFormData } = useRegistration();
    const { Text } = Typography;
    
    const [firstName, setFirstName] = useState(formData.user?.first_name || '');
    const [lastName, setLastName] = useState(formData.user?.last_name || '');
    const [hospitalName, setHospitalName] = useState('');
    const [email, setEmail] = useState(formData.user?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(formData.phone_number || '');

    const handleFirstNameChange = (value: string) => {
        setFirstName(value);
        updateFormData({
            user: {
                first_name: value,
            }
        });
    };

    const handleLastNameChange = (value: string) => {
        setLastName(value);
        updateFormData({
            user: {
                last_name: value,
            }
        });
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        updateFormData({
            user: {
                email: value,
            }
        });
    };

    const handlePhoneChange = (value: string) => {
        setPhoneNumber(value);
        // Ensure phone number has proper format (add + if not present)
        const formattedPhone = value.startsWith('+') ? value : `+${value}`;
        updateFormData({
            phone_number: formattedPhone,
        });
    };
  return (
    <Flex direction='column' marginTop='80px'>
        {/* heading */}
        <DepositHeading title='Welcome Care_Link' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#9A9A9A',
            }}
        >
           Few details about you
        </Text>


        {/* inputs */}
        <Flex width='100%' gap='10%'>
            <Box width='100%'>
                <DepositInput 
                    title='First name'
                    value={firstName}
                    placeholder='Enter your first name'
                    isReadOnly={false}
                    marginBottom='0px'
                    marginTop='35px'
                    width='100%'
                    onChange={(e) => handleFirstNameChange(e.target.value)}
                />
            </Box>
            <Box width='100%'>
                <DepositInput 
                    title='Last name'
                    value={lastName}
                    placeholder='Enter your last name'
                    isReadOnly={false}
                    marginBottom='0px'
                    marginTop='35px'
                    width='100%'
                    onChange={(e) => handleLastNameChange(e.target.value)}
                />
            </Box>
        </Flex>

       

        <DepositInput
            title='Hospital name'
            value={hospitalName}
            placeholder='Enter your hospital name'
            isReadOnly={false}
            percentage='20%'
            marginBottom='0px'
            marginTop='20px'
            onChange={(e) => setHospitalName(e.target.value)}
        />

         <DepositInput 
            title='Work email'
            value={email}
            placeholder='Enter your work email'
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            onChange={(e) => handleEmailChange(e.target.value)}
        />

        <Flex
            direction='column'
            marginBottom='20px'
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
                        value='TZ'
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
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder='+1234567890'
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