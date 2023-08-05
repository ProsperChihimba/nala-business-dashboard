import { Flex } from '@chakra-ui/react'
import DepositHeading from '../../../layout/heading';
import { Radio, Typography } from 'antd';

const { Text } = Typography;

const CompanySize = () => {
    
  return (
    <Flex direction='column' marginTop='10vh'>
        {/* heading */}
        <DepositHeading title='What’s the company size' />

        <SingleInput
            title='1 - 10'
            marginBottom='15px'
            marginTop='40px'
        />

        <SingleInput
            title='5 - 20'
            marginBottom='15px'
            marginTop='20px'
        />

        <SingleInput
            title='21 - 50'
            marginBottom='15px'
            marginTop='20px'
        />

        <SingleInput
            title='51 - 100'
            marginBottom='100px'
            marginTop='20px'
        />
    </Flex>
  )
}

export default CompanySize


// 
interface InputProps  {
    title: string;
    marginBottom: string,
    marginTop: string,
}

const SingleInput = ({title, marginBottom, marginTop}: InputProps) => {
    return (
        <Flex
            paddingTop='12px'
            paddingBottom='12px'
            paddingLeft='20px'
            borderRadius='10px'
            border='1px solid #D9D9D9'
            width='600px'
            gap='20px'
            marginBottom={marginBottom}
            marginTop={marginTop}
        >
            <Radio />
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#000',
                    marginBottom: '5px',
                }}
            >
                {title}
            </Text>
    </Flex>
    )
}