import { Flex, useDisclosure } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { GoInfo } from 'react-icons/go';
import { TbNotes } from "react-icons/tb";
import { MdCurrencyExchange } from "react-icons/md";
import AppButton from '../../../../../../layout/button';
import { BsArrowRight } from 'react-icons/bs';
import AppModal from '../../../../../../layout/modal';
import AccountDetails from './account_details';

const AccountInfromation = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { Text } = Typography;
  return (
        <Flex
            padding='20px'
            fontFamily='IBM Plex Sans, sans-serif'
            border='1px solid #D9D9D9'
            borderRadius='20px'
            gap='20px'
        >

            {/* first section */}
            <Flex direction='column' width='35%'>

                <Flex
                    direction='column'
                    marginBottom='80px'
                >
                    <Flex alignItems='center' marginBottom='5px'>
                        <Text
                            style={{
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#454545',
                                marginLeft: '8px',
                                marginRight: '5px'
                            }}
                        >
                            Available balance
                        </Text>

                        <GoInfo size='11px' color='#000000' />
                    </Flex>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '22px',
                            fontWeight: 500,
                            color: '#454545',
                            marginLeft: '8px',
                            marginRight: '5px'
                        }}
                    >
                        $100,000.00
                    </Text>
                </Flex>
                <Divider />

                {/*  */}
                <Flex alignItems='center'>
                    <MdCurrencyExchange size='20px' color='#000000' />

                    {/* Flex */}
                    <Flex  direction='column' marginLeft='7px'>
                        <Flex alignItems='center'>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: '#073DFC',
                                    marginLeft: '8px',
                                    marginRight: '5px',
                                    cursor: 'pointer'
                                }}
                                onClick={onOpen}
                            >
                                Set up minimum balance 
                            </Text>
                            <BsArrowRight size='16px' color='#073DFC' />
                        </Flex>
                        <Text
                            style={{
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontSize: '10px',
                                fontWeight: 400,
                                color: '#454545',
                                marginLeft: '8px',
                                marginRight: '5px'
                            }}
                        >
                            Ensure your Just Tap App balance always has the funds you need.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Divider type='vertical' />

            {/* second section */}
            <Flex  w='60%' direction='column' >

                {/*  */}
                <Flex alignItems='center' justifyContent='space-between' marginBottom='20px'>
                    <Flex direction='column'>
                        <Text
                            style={{
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: '#454545',
                                marginBottom: '22px'
                            }}
                        >
                        Account information
                        </Text>

                        {/* account info */}
                        <Flex gap='100px' mb='12px'>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#454545',
                                }}
                            >
                                Routing number
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: '#000',
                                }}
                            >
                                100320001
                            </Text>
                        </Flex>

                        <Flex gap='100px' mb='15px'>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#454545',
                                }}
                            >
                                Account number
                            </Text>
                            <Flex alignItems='center' gap='5px'>
                                <Text
                                    style={{
                                        fontFamily: 'IBM Plex Sans, sans-serif',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#000',
                                    }}
                                >
                                    **** * 3102
                                </Text>
                                <AiOutlineEye size='11px' color='#000000' />
                            </Flex>
                        </Flex>
                    </Flex>

                    <AppButton
                        label='View details'
                        background='white'
                        color='#000'
                        icon={<TbNotes size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                        width='140px'
                        borderColor='#DCDCDC'
                        onClick={onOpen}
                    />
                </Flex>

                <Divider style={{margin: 0}} />

                {/*  */}
                {/*  */}
                <Flex alignItems='center' justifyContent='space-between'  marginTop='30px'>
                    <Flex direction='column'>
                        <Text
                            style={{
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: '#454545',
                                marginBottom: '22px'
                            }}
                        >
                         Allocation
                        </Text>

                        {/* account info */}
                        <Flex gap='100px' mb='12px'>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#454545',
                                }}
                            >
                                FDIC-insured funds
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: '#000',
                                }}
                            >
                                $100,000.00
                            </Text>
                        </Flex>

                        <Flex gap='100px' mb='15px'>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#454545',
                                }}
                            >
                                Money-market funds
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: '#000',
                                }}
                            >
                                $0.00
                            </Text>
                        </Flex>
                    </Flex>

                    <AppButton
                        label='Manage'
                        background='white'
                        color='#000'
                        width='140px'
                        borderColor='#DCDCDC'
                        onClick={onOpen}
                    />
                </Flex>
            </Flex>

            {/* account details modal */}
            <AppModal
                isOpen={isOpen}
                onClose={onClose}
                modalSize='md'
                children={<AccountDetails onClose={onClose} />}
            />

        </Flex>
  )
}

export default AccountInfromation