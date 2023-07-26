import { Box, Flex } from '@chakra-ui/react'
import { Image, Typography } from 'antd'
import learn1 from '../../../../../assets/learn1.svg'
import ArticleTag from './tag';

const LearnArticle = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column' fontFamily='IBM Plex Sans, sans-serif' marginTop='15px' w='20%'>

        {/* image */}
        <Image
            src={learn1}
            preview={false}
        />

        {/* author*/}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#073DFC',
                marginTop: 10,
            }}
        >
            Amani John . 20 Jul 2023
        </Text>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: '#000',
                marginBottom: 0,
            }}
        >
            How to increase account limit
        </Text>

        {/* desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: '#6D6D6D',
            }}
        >
            This is the most request feature from most of the business owner and at NALA we mostly work on 
        </Text>

        {/* tags */}
        <Flex gap='10px' marginTop='10px'>
            <ArticleTag 
                rightElement={<Box boxSize='6px' bg='#F7CB73' rounded='3xl'></Box>}
                text='Business'
            />
        </Flex>
    </Flex>
  )
}

export default LearnArticle