import { Flex } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import AppButton from '../../../layout/button';
import DepositInput from '../../../layout/input';

const AccountInfromation = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#000',
                width: '100%',
                marginBottom: '25px',
            }}
        >
          Account details
        </Text>

        {/* input */}
        <DepositInput
            title='Payment type'
            value='ACH'
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='0px'
            width='100%'
            height='40px'
            rightElement={<FiChevronDown size='15px' color='#000000' />}
            elementPadding='5px'
        />

        <DepositInput
            title='Beneficiary name'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
        />

        <DepositInput
            title='Account number'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
        />

        <DepositInput
            title='Routing number'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
            elementPadding='5px'
        />

        <DepositInput
            title='Account type'
            value='Business'
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
            rightElement={<FiChevronDown size='15px' color='#000000' />}
            elementPadding='5px'
        />


        {/* footer */}
        <Divider style={{marginTop: '35px', marginBottom: '15px'}} />
        {/* button */}
        <Flex justifyContent='flex-end' marginBottom='10px'>
            <AppButton
                label="Done"
                background='#073DFC'
                color='#fff'
                width='150px'
                borderColor='#073DFC'
            />
        </Flex>
    </Flex>
  )
}

export default AccountInfromation