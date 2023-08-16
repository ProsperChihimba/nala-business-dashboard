import { Badge, Box, DrawerCloseButton, Flex, Spacer } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import { CiCreditCard1, CiMenuKebab } from 'react-icons/ci';

const { Text } = Typography;

const CardsLists = () => {
  return (
    <Flex direction='column' >
        
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
                    Cards
                </Text>
                <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

                {/* cards lists */}
                <SingleCard />
                <SingleCard />
            </Box>
        </Box>
    </Flex>
  )
}

export default CardsLists


// 
export const SingleCard = () => {
    return (
        <Flex alignItems='center' marginX='5px' marginBottom='18px'>

            {/*  */}
            <CiCreditCard1 size='22px' color='#000000' />

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
                    Sponsored Ads
                </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#000000',
                    }}
                >
                    **** **** **** 89
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