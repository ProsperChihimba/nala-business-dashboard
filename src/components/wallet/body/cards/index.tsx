import { Box, Flex, Slider, SliderFilledTrack, SliderTrack, Spacer, useDisclosure } from '@chakra-ui/react'
import CreditCard from './card'
import AppButton from '../../../layout/button'
import { Divider, Dropdown, MenuProps, Typography } from 'antd'
import { GoInfo } from 'react-icons/go'
import { CiMenuKebab } from 'react-icons/ci'
import { TbNotes } from 'react-icons/tb'
import { MdShowChart } from 'react-icons/md'
import { BiLockAlt } from 'react-icons/bi'
import { RxLoop } from "react-icons/rx";
import { PiTerminalDuotone } from 'react-icons/pi'
import AppModal from '../../../layout/modal'
import TerminateCard from './terminate_card'
import AppDrawer from '../../../layout/drawer'
import CardsLists from './cards_list'

const { Text } = Typography;

const WalletCard = () => {

    const { isOpen: isOpenModalOne, onOpen: onOpenModalOne, onClose: onCloseModalOne } = useDisclosure()
    const { isOpen: isOpenModalTwo, onOpen: onOpenModalTwo, onClose: onCloseModalTwo } = useDisclosure()

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <CardActionMenu
                    label='Lock'
                    icon={<BiLockAlt size='15px' style={{ marginRight: 8 }} color='#000000' />}
                    onOpen={onOpenModalOne}
                />
            ),
            style: {
                marginTop: '4px',
                marginLeft: '4px',
                marginRight: '4px',
                marginBottom: '5px',
            },
        },
        {
            key: '2',
            label: (
                <CardActionMenu
                    label='Replace'
                    icon={<RxLoop size='15px' style={{ marginRight: 8 }} color='#000000' />}
                />
            ),
            style: {
                marginLeft: '4px',
                marginRight: '4px',
                marginBottom: '5px',
            }
        },
        {
            key: '3',
            label: (
                <CardActionMenu
                    label='Terminate'
                    icon={<PiTerminalDuotone size='15px' style={{ marginRight: 8 }} color='#000000' />}
                />
            ),
            style: {
                marginBottom: '4px',
                marginLeft: '4px',
                marginRight: '4px',
            }
        },
  ];


  return (
    <Flex
        width='100%'
        fontFamily='IBM Plex Sans, sans-serif'
        border='1px solid #D9D9D9'
        borderRadius='20px'
        padding='40px 50px'
        background='white'
        marginBottom='60px'
    >

        <Flex direction='column' gap='30px'>
            {/* card */}
            <CreditCard />

            {/*  */}
            <AppButton
                label='View all cards'
                background='white'
                color='#000'
                width='250px'
                borderColor='#DCDCDC'
                onClick={onOpenModalTwo}
            />
        </Flex>

        <Spacer />

        <Divider type='vertical' style={{ height: '250px', marginRight: '3%' }} />

            {/* limit usage slider */}
            <Flex direction='column' width='58%'>

                {/*  */}
                <Flex alignItems='center' marginBottom='50px'>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#454545',
                        }}
                    >
                        Prosper Absalom
                    </Text>

                    <Spacer />
                    <Dropdown
                        menu={{ items }}
                    >
                        <Box
                            cursor='pointer'
                        >
                            <CiMenuKebab size='15px' color='#000' />
                        </Box>
                    </Dropdown>
                </Flex>

                <Flex alignItems='center' marginBottom='5px'>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '20px',
                            fontWeight: 500,
                            color: '#454545',
                            marginRight: '3px'
                        }}
                    >
                        $130.00
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#454545',
                        }}
                    >
                        Spent
                    </Text>
                </Flex>

                {/* slider */}
                <Slider
                    aria-label='slider-ex-3' 
                    defaultValue={40} 
                    isReadOnly={true}
                    width='100%'
                >
                    <SliderTrack h='7px' rounded='xl'>
                        <SliderFilledTrack rounded='xl' bg='#073DFC' />
                    </SliderTrack>
                </Slider>

                <Flex mt='5px'>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#6D6D6D',
                            marginRight: '3px'
                            
                        }}
                    >
                        $5,000 available
                    </Text>
                    <Spacer />
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#6D6D6D',
                            marginRight: '3px'
                        }}
                    >
                        $1,000 limit
                    </Text>
                    <GoInfo size='10px' color='#6D6D6D' />
                </Flex>


                {/* buttons */}
                <Flex marginTop='50px' gap='50px'>
                    <AppButton
                        label='View card restrictions'
                        background='white'
                        color='#000'
                        leftIcon={<TbNotes size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                        width='200px'
                        borderColor='#DCDCDC'
                        onClick={onOpenModalTwo}
                    />
                    <AppButton
                        label='Request card limit'
                        background='white'
                        color='#000'
                        leftIcon={<MdShowChart size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                        width='200px'
                        borderColor='#DCDCDC'
                        onClick={onOpenModalTwo}
                    />
                </Flex>
            </Flex>

            <AppModal
                isOpen={isOpenModalOne}
                onClose={onCloseModalOne}
                modalSize='sm'
                children={<TerminateCard />}
            />


            {/* drawer */}
            <AppDrawer
                isOpenSide={isOpenModalTwo}
                onCloseSide={onCloseModalTwo}
                modalSize='md'
                children={<CardsLists />}
            />
    </Flex> 
  )
}

export default WalletCard


const CardActionMenu = ({label, icon, onOpen}: {label: string, icon: React.ReactNode, onOpen?: () => void}) => {
    return (
        <Flex onClick={onOpen}> 
            {icon}

            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#000',
                    marginBottom: '4px',
                }}
            >
                {label}
            </Text>
        </Flex>
    )
}