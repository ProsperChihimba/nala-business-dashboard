import { Flex } from '@chakra-ui/react';
import { Typography } from 'antd';

const { Text } = Typography;

const SingleTab = () => {
  return (
    <Flex direction='column' marginTop='15px'>

        {/*  */}
        <Instruction 
            title='Account number' 
            descritpion='3102001838838838838' 
        />
        <Instruction 
            title='Account type' 
            descritpion='Business account' 
        />
        <Instruction 
            title='Recipient / beneficiary information' 
            descritpion='Swahilies INC
            Ubungo, Dar es salaam, Tanzania, Dar 
            es Salaam, TZ, Dar es Salam, 16102' 
        />
        <Instruction 
            title='Bank information' 
            descritpion='Column NA - NALA
            1110 Gorgas Ave, Suite A4-700, San Francisco, 
            CA, 94129' 
        />
    </Flex>
  )
}

export default SingleTab


// single instruction
const Instruction = ({ title, descritpion }: { title: string, descritpion: string }) => {
    return (
        <Flex flexDirection='column' marginBottom='18px' width='70%'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#6D6D6D',
                    marginBottom: '0px',
                }}
            >
                {title}
            </Text>

            {/* desc */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#000',
                }}
            >
                {descritpion}
            </Text>
        </Flex>
    )
}