import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import { ReactElement } from 'react';

interface ArticleProps {
    rightElement: ReactElement;
    text: string;

}

const ArticleTag = ({rightElement, text}: ArticleProps) => {

    const { Text } = Typography;
  return (
    <Flex alignItems='center' gap='8px' border='1px' rounded='3xl' paddingBottom='0px' paddingTop='0px' paddingLeft='5px' paddingRight='5px'>
        {rightElement}

        {/* tag name */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                color: '#6D6D6D',
            }}
        >
            {text}
        </Text>
    </Flex>
  )
}

export default ArticleTag