import { Flex } from '@chakra-ui/react'
import DepositHeading from './utils/heading'
import { Typography } from 'antd';

const AddFunds = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        {/* heading */}
        <DepositHeading title='Add funds' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#000',
            }}
        >
            Deposit of funds takes  up to <span style={{ fontWeight: '500' }}>3 business days</span>
        </Text>
    </Flex>
  )
}

export default AddFunds