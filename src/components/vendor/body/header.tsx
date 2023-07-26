import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../layout/button';

const VendorsHeader = () => {

  const { Text } = Typography;
  return (
    <Flex justifyContent='space-between' alignItems='center' marginBottom='30px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#000000',
            }}
        >
            Vendors
        </Text>


        {/* account button */}
        <AppButton
            label='Add vendor'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />


    </Flex>
  )
}

export default VendorsHeader