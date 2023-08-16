import { Badge, Box, DrawerHeader, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { SingleCard } from '../../wallet/body/cards/cards_list';
import { HiOutlineUserMinus } from "react-icons/hi2";
import { VscClose } from "react-icons/vsc";
import { CiMenuKebab } from 'react-icons/ci';
import AppButton from '../../layout/button';
import DepositInput from '../../layout/input';
import { FiChevronDown } from 'react-icons/fi';
import AppModal from '../../layout/modal';
import DeleteUser from './delete_user';

const { Text } = Typography;

const ViewUser = () => {

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
                        color: '#454545',
                    }}
                >
                    Proc Absa
                </Text>
                <Spacer />
                <Flex gap='40px'>
                    <Box onClick={onOpenModalOne} cursor='pointer'>
                        <HiOutlineUserMinus />
                    </Box>
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
                    Spends
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

                {/* Spends lists */}
                <UserSpends />

                {/*  */}
                <AppButton
                    label='View user expenses'
                    background='#073DFC'
                    color='#fff'
                    width='100%'
                    borderColor='#073DFC'
                />
            </Box>
        </Box>

        <Box marginX='17px' marginTop='40px'>
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
                <Flex direction='column'>
                    <DepositInput
                        title='User role'
                        value='Account  admin'
                        placeholder='Role'
                        isReadOnly={true}
                        percentage='10%'
                        marginBottom='0px'
                        marginTop='0px'
                        width='100%'
                        height='45px'
                        rightElement={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                    />
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 300,
                            color: '#9A9A9A',
                            marginTop: '0px',
                            marginLeft: '9px',
                            padding: '0px',
                        }}
                    >
                        View and manage Card, Business accounts, integrations and more.
                    </Text>


                    {/*  */}
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '15px',
                            fontWeight: 500,
                            color: '#000',
                            marginTop: '17px',
                        }}
                    >
                        Email
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '15px',
                            fontWeight: 400,
                            color: '#000',
                            marginTop: '0px',
                        }}
                    >
                        proc@user.com
                    </Text>
                    <DepositInput
                        title='Manager'
                        value=''
                        placeholder='Set account manager'
                        isReadOnly={true}
                        percentage='10%'
                        marginBottom='0px'
                        marginTop='25px'
                        width='100%'
                        height='45px'
                    />
                </Flex>
            </Box>
        </Box>

        <Box marginX='17px' marginTop='40px' marginBottom='20px'>
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
                    Cards
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

                {/* cards lists */}
                <SingleCard />
                <SingleCard />
            </Box>
        </Box>

        {/* modal */}
        <AppModal
            isOpen={isOpenModalOne}
            onClose={onCloseModalOne}
            modalSize='sm'
            children={<DeleteUser />}
        />
    </Flex>
  )
}

export default ViewUser





// 
const UserSpends = () => {
    return (
        <Flex alignItems='center' marginX='5px' marginBottom='18px'>

            {/*  */}
            <Flex direction='column' marginLeft='11px'>

                {/*  */}
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#000000',
                    }}
                >
                    Monthly limit
                </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        color: '#000000',
                    }}
                >
                    $1,000
                </Text>
            </Flex>

            {/*  */}
            <Spacer />
            <Badge
                colorScheme='green' 
                color='#00BA07' 
                fontWeight='400' 
                fontSize='7px' 
                borderRadius='2px'
                marginRight='40px'
            >
                Success
            </Badge>

            <CiMenuKebab size='15px' color='#000' />
        </Flex>
    )
}