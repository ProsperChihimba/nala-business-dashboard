import { Box, DrawerFooter, DrawerHeader, Flex, Spacer } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { VscClose } from "react-icons/vsc";
import AppButton from '../../layout/button';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const { Text } = Typography;

const ViewPayment = () => {

  return (
    <Flex direction='column' >
        
        {/* close */}
        <DrawerHeader paddingBottom='0px'>
            <Flex>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#454545',
                    }}
                >
                    Prosper Absalom
                </Text>
                <Spacer />
                <Flex gap='40px'>
                    <VscClose size='23px' />
                </Flex>
            </Flex>
        </DrawerHeader>


        {/* spends */}
        <Box 
            height='1px' 
            width='100%' 
            marginTop='2.5vh' 
            backgroundColor='rgba(135, 133, 126, 0.50)' 
            marginBottom='10px'
        />

        <Box marginX='17px' marginTop='25px'>
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='20px'
                bg='white'
                p='15px'
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
                    Approval
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

                {/* Spends lists */}
                <UserSpends 
                    header='Submitted for approval'
                    description='Jun 26, 2023'
                />

                <UserSpends 
                    header='Approved by Mohamed Ngarama'
                    description='Jun 26, 2023'
                />

            </Box>
        </Box>
        
        <DrawerFooter marginTop='53vh'>
            {/*  */}
            <AppButton
                    label='Approve payment'
                    background='#073DFC'
                    color='#fff'
                    width='100%'
                    borderColor='#073DFC'
            />
        </DrawerFooter>
    </Flex>
  )
}

export default ViewPayment





// 
const UserSpends = ({header, description} : {header: string, description: string}) => {
    return (
        <Flex alignItems='center' marginX='5px' marginBottom='18px'>

            <BsFillCheckCircleFill size='20px' />

            {/*  */}
            <Flex direction='column' marginLeft='11px'>

                {/*  */}
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#000000',
                    }}
                >
                    {header}
                </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        color: '#9A9A9A',
                    }}
                >
                    {description}
                </Text>
            </Flex>
        </Flex>
    )
}