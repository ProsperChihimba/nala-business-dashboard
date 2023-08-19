import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';

const ExpensesHeader = () => {

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
            Expenses
        </Text>
    </Flex>
  )
}

export default ExpensesHeader