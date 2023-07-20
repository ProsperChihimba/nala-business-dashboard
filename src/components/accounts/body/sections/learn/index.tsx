import { Box, Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import LearnArticle from './article';

const AccountsLearn = () => {

    const { Text } = Typography;
  return (
    <Box fontFamily='IBM Plex Sans, sans-serif' marginTop='23px'>
        
       <Flex direction='column'>
            {/* header */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#000',
                    marginBottom: 0,
                }}
            >
                Learn
            </Text>

            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#000',
                }}
            >
                Learn about NALA business account
            </Text>
       </Flex>

       {/* learn articles */}
       <LearnArticle />
    </Box>
  )
}

export default AccountsLearn