import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../../layout/button';

const TerminateCard = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column' marginY='15px'>

        {/*  */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: '#000',
                width: '100%',
                marginBottom: '5px',
            }}
        >
           Terminate account
        </Text>

        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: '#9A9A9A',
                width: '85%',
                marginBottom: '20px',
            }}
        >
           This will revoke access to this card and transactions on this cards will be declined.
        </Text>

        <Flex gap='15px'>
            <AppButton
                label='Cancel'
                background='#fff'
                color='#000'
                width='160px'
                borderColor='#D9D9D9'
            />
            <AppButton
                label='Terminate'
                background='#DB1010'
                color='#fff'
                width='160px'
                borderColor='#DB1010'
            />
        </Flex>
    </Flex>
  )
}

export default TerminateCard