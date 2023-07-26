import { Avatar, Box, Flex } from '@chakra-ui/react'
import DepositHeading from '../../layout/heading'
import { Divider, Typography } from 'antd';
import AppButton from '../../layout/button';

const { Text } = Typography;

const PaymentApproval = () => {
  return (
    <Flex direction='column' w='45%'>
        {/* heading */}
        <DepositHeading title='Submit for approval' />

        {/* first box */}
        <Box>
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='10px'
                marginTop='30px'
                bg='white'
                p='10px'
            >
                {/* table title */}
                <Flex justifyContent='space-between' alignItems='center' mb='10px'>
                    <Flex alignItems='center' gap='10px'>
                        <Avatar name='Proc Inc' src='' size='sm' bg='#EBF2FA' color='black' />
                        <Text
                            style={{
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: '#454545',
                            }}
                        >
                            PROC INC
                        </Text>
                    </Flex>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '15px',
                            fontWeight: 500,
                            color: '#454545',
                        }}
                    >
                        $100.00
                    </Text>
                </Flex>

                <Divider style={{ marginTop: '0px', marginBottom: '0px' }} />

                {/*  */}
                <Flex gap='30%' padding='10px' paddingBottom='0px'>
                    <Flex direction='column' gap='20px'>
                        <FirstBoxText title='Payment date' text='20 May, 2023' />
                        <FirstBoxText title='Account' text='Primary business account' />
                    </Flex>
                    <FirstBoxText title='Method' text='International wire' />
                </Flex>
            </Box>
        </Box>

        {/* second box */}
        <Box marginBottom='40px'>
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='10px'
                marginTop='30px'
                bg='white'
                p='10px'
            >
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    Details
                </Text>

                <Divider style={{ marginTop: '10px', marginBottom: '0px' }} />

                {/*  */}
                <Flex gap='30%' padding='10px' paddingBottom='0px'>
                    <Flex direction='column' gap='20px'>
                        <FirstBoxText title='Account number' text='International wire' />
                        <FirstBoxText title='Country' text='Tanzania' />
                        <FirstBoxText title='SWIFT / BIC code' text='UNAFTZTZ' />
                        <FirstBoxText title='Wire instructions / purpose of payment' text='Payment from Proc to INC' />
                    </Flex>
                    <Flex direction='column' gap='20px'>
                        <FirstBoxText title='Account number' text='****** **** *** 3102' />
                        <FirstBoxText title='Address' text='Ubungo, Sinza,, Dar es salaam 16102' />
                    </Flex>
                </Flex>
            </Box>
        </Box>

        {/* button */}
        <AppButton
            label='Submit for approval'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />
    </Flex>
  )
}

export default PaymentApproval

// props
interface FirstBoxProps {
    title: string;
    text: string;
}

// first box texts
const FirstBoxText = ({title, text}: FirstBoxProps) => {
    
    return (
        <Flex direction='column'>
           <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#000',
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#000',
                }}
            >
                {text}
            </Text>
        </Flex>
    )
}