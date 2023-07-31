import { Flex, Slider, SliderFilledTrack, SliderTrack, Spacer } from '@chakra-ui/react'
import CreditCard from './card'
import AppButton from '../../../layout/button'
import { Divider, Typography } from 'antd'
import { GoInfo } from 'react-icons/go'
import { CiMenuKebab } from 'react-icons/ci'
import { TbNotes } from 'react-icons/tb'
import { MdShowChart } from 'react-icons/md'

const WalletCard = () => {

    const { Text } = Typography;
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
                    <CiMenuKebab size='10px' color='#6D6D6D' />
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
                    />
                    <AppButton
                        label='Request card limit'
                        background='white'
                        color='#000'
                        leftIcon={<MdShowChart size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                        width='200px'
                        borderColor='#DCDCDC'
                    />
                </Flex>
            </Flex>
    </Flex>
  )
}

export default WalletCard