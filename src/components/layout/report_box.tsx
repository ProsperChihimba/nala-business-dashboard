import { Box, Flex, Spacer } from '@chakra-ui/react'
import { Typography } from 'antd';
import ArticleTag from '../accounts/body/sections/learn/tag';
import { FiArrowUpRight } from 'react-icons/fi';

const ReportBox = () => {

    const { Text } = Typography;
  return (
    <Flex
        borderRadius='10px'
        height='120px'
        backgroundColor='#fff'
        border='1px solid #B6B3B3'
        padding='10px'
        marginBottom='25px'
        width='20%'
        direction='column'
    >
        
        {/* name */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#616161',
                marginBottom: 5,
                textAlign: 'center'
            }}
        >
            Total
        </Text>

        {/* value */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: '#000',
                textAlign: 'center'
            }}
        >
            $1000
        </Text>

        <Spacer />

        <Flex justifyContent='space-between' paddingRight='5px' paddingLeft='5px'>
            <Box>
                <ArticleTag
                    rightElement={<FiArrowUpRight size='10px'/>}
                    text='+10%'
                />
            </Box>

            {/* date */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.40)',
                }}
            >
                vs 22/08/2022 - 22/09/2022 
            </Text>
        </Flex>
    </Flex>
  )
}

export default ReportBox