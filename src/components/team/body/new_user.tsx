import { Flex } from '@chakra-ui/react'
import DepositInput from '../../layout/input'
import { Divider, Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import AppButton from '../../layout/button';

const NewUser = () => {

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
           Add new user
        </Text>

        {/* input */}
        <DepositInput
            title='Type'
            value='Admin'
            placeholder=''
            isReadOnly={false}
            marginBottom='20px'
            marginTop='0px'
            width='100%'
            height='40px'
            rightElement={<FiChevronDown size='15px' color='#000000' />}
            elementPadding='5px'
        />


        {/*  */}
        <Flex alignItems='center' gap='20px'>
            <DepositInput
                title='Name'
                value=''
                placeholder=''
                isReadOnly={false}
                marginBottom='0px'
                marginTop='0px'
                width='100%'
                height='40px'
            />
            <DepositInput
                title='&nbsp;'
                value=''
                placeholder=''
                isReadOnly={false}
                marginBottom='0px'
                marginTop='0px'
                width='100%'
                height='40px'
            />
        </Flex>

        <DepositInput
            title='Email Address'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
        />

        <DepositInput
            title='Account limit'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='0px'
            marginTop='20px'
            width='100%'
            height='40px'
        />

        <DepositInput
            title='Manager'
            value='No'
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

export default NewUser