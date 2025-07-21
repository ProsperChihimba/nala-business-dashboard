import { Flex } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { Typography } from 'antd';
import AppButton from '../../../../layout/button';

const SingleAccountHeader = () => {

  const { Text } = Typography;
  return (
    <Flex justifyContent='space-between' alignItems='center' marginBottom='10px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Flex direction='column'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#000000',
                    marginBottom: 10
                }}
            >
                Accounts {`>`} <span style={{ color: '#6D6D6D' }}>Primary business account</span>
            </Text>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#000000',
                }}
            >
                Primary business account
            </Text>
        </Flex>


        {/* account button */}
        <Flex>
            {/* <AppButton
                label='Manage accounts'
                background='white'
                color='#000'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                width='160px'
                borderColor='#DCDCDC'
            /> */}
            <AppButton 
                label='Bulk Notifications'
                background='#073DFC'
                color='#fff'
                // icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='160px'
                borderColor='#073DFC'
            />
        </Flex>


    </Flex>
  )
}

export default SingleAccountHeader