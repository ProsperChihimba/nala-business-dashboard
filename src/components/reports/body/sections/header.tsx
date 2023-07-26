import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';

const ReportHeader = () => {

  const { Text } = Typography;
  return (
    <Flex marginBottom='20px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#000000',
            }}
        >
            Reports
        </Text>

    </Flex>
  )
}

export default ReportHeader