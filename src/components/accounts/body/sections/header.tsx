import { Flex } from '@chakra-ui/react'
import AppButton from '../../../layout/button'
import { FiChevronDown } from 'react-icons/fi'
import { Typography } from 'antd';

const AccountsHeader = () => {

  const { Text } = Typography;
  return (
    <Flex justifyContent='space-between' alignItems='center' marginBottom='50px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#000000',
            }}
        >
            Accounts
        </Text>


        {/* account button */}
        <Flex gap='30px'>
            <AppButton
                label='Manage accounts'
                background='white'
                color='#000'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                width='160px'
                borderColor='#DCDCDC'
            />
            <AppButton 
                label='Move money'
                background='#073DFC'
                color='#fff'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='160px'
                borderColor='#073DFC'
            />
        </Flex>


    </Flex>
  )
}

export default AccountsHeader