import { Box, Flex } from '@chakra-ui/react'
import { Typography } from 'antd';

const ArticleTag = () => {

    const { Text } = Typography;
  return (
    <Flex alignItems='center' gap='10px' border='1px' rounded='3xl' paddingBottom='0px' paddingTop='0px' paddingLeft='8px' paddingRight='8px'>
        <Box boxSize='6px' bg='#F7CB73' rounded='3xl'></Box>

        {/* tag name */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#6D6D6D',
            }}
        >
            Business
        </Text>
    </Flex>
  )
}

export default ArticleTag