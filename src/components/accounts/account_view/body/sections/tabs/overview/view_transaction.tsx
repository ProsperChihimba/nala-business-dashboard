import { Avatar, Box, Center, DrawerCloseButton, Flex } from "@chakra-ui/react"
import { Divider, Typography } from "antd";
import { FirstBoxText } from "../../../../../../send/sections/approval";
import DepositInput from "../../../../../../layout/input";
import AppButton from "../../../../../../layout/button";


const ViewTransaction = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>

        {/* close */}
        <DrawerCloseButton />

        {/*  */}
        <Box 
            height='1px' 
            width='100%' 
            marginTop='5.7vh' 
            backgroundColor='rgba(135, 133, 126, 0.50)' 
            marginBottom='10px'
        />

        {/*  */}
        <Box marginX='17px' marginTop='20px'>
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='20px'
                bg='white'
                p='10px'
                backgroundColor='rgba(217, 217, 217, 0.15)'
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



        {/* memo */}
        <Box marginX='17px' marginTop='25px'>
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='20px'
                bg='white'
                p='10px'
            >

                {/*  */}
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    Memo
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

                {/* input */}
                <DepositInput
                    value='Salary'
                    placeholder='Enter memo'
                    isReadOnly={false}
                    marginBottom='10px'
                    marginTop='0px'
                    width="100%"
                />
            </Box>
        </Box>


        {/* details */}
        <Box marginBottom='25px' marginX='17px'>
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
        <Center mb='35px'>
            <AppButton
                label='Download'
                background='#073DFC'
                color='#fff'
                width='70%'
                borderColor='#073DFC'
            />
        </Center>
    </Flex>
  )
}

export default ViewTransaction