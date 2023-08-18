import { Box, DrawerHeader, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { VscClose } from "react-icons/vsc";
import AppModal from '../../layout/modal';
import DeleteVendor from './delete_vendor';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FirstBoxText } from '../../send/sections/approval';
import { FiChevronDown } from 'react-icons/fi';
import AppButton from '../../layout/button';

const { Text } = Typography;

const VendorDetailsDrawer = () => {

    const { isOpen: isOpenModalOne, onOpen: onOpenModalOne, onClose: onCloseModalOne } = useDisclosure()

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
                        color: '#000',
                    }}
                >
                    PROC INC
                </Text>
                <Spacer />
                <Flex gap='40px'>
                    <Box onClick={onOpenModalOne} cursor='pointer'>
                        <RiDeleteBin6Line />
                    </Box>
                    <VscClose size='23px' />
                </Flex>
            </Flex>
        </DrawerHeader>


        {/* details */}
        <Box 
            height='1px' 
            width='100%' 
            marginTop='2.5vh' 
            backgroundColor='rgba(135, 133, 126, 0.50)' 
            marginBottom='10px'
        />


         {/* buttons */}
         <Flex gap='30px' marginX='17px' marginTop='20px'>
            <AppButton
                label='Edit'
                background='white'
                color='#000'
                width='100%'
                borderColor='#DCDCDC'
            />

            <AppButton 
                label='Send money'
                background='#073DFC'
                color='#fff'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='100%'
                borderColor='#073DFC'
            />
        </Flex>


        <Box marginX='17px' marginTop='60px'>
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
                    Details
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '15px' }} />


                {/* inputs */}
                <Flex direction='column' gap='15px'>

                    {/*  */}
                    <FirstBoxText title='Phone' text='255858884884' />

                    <FirstBoxText title='Email' text='vendor@vd.co' />

                    <FirstBoxText title='Account number' text='****** **** *** 3102' />

                    <FirstBoxText title='Address' text='Ubungo, Sinza,, Dar es salaam 16102' />

                </Flex>
            </Box>
        </Box>


        {/* modal */}
        <AppModal
            isOpen={isOpenModalOne}
            onClose={onCloseModalOne}
            modalSize='sm'
            children={<DeleteVendor />}
        />
    </Flex>
  )
}

export default VendorDetailsDrawer
