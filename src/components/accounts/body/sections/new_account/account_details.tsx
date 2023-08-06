import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import DepositInput from '../../../../layout/input';

const AccountDetails = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '19px',
                fontWeight: 500,
                color: '#000',
                width: '80%',
                marginBottom: '3px',
            }}
        >
           Account name
        </Text>

        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#000',
                width: '95%',
                marginBottom: '40px',
            }}
        >
           The name you choose will appear on your statements. You can change this any time.
        </Text>

        {/* input */}
        <DepositInput
            title='Account name'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='30px'
            marginTop='0px'
            width='100%'
            height='40px'
        />

    </Flex>
  )
}

export default AccountDetails