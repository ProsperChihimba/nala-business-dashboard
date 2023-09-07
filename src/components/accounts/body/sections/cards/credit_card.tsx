import { Badge, Box, Flex, Slider, SliderFilledTrack, SliderTrack, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Divider, Typography } from "antd";
import { CiCreditCard1 } from "react-icons/ci"
import { GoInfo } from "react-icons/go";
import { VscChevronRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const CreditCardBox = () => {

    const { Text } = Typography;
    const navigate = useNavigate();
  return (
    <Box
        width='48%'
        fontFamily='IBM Plex Sans, sans-serif'
        border='1px solid #D9D9D9'
        borderRadius='20px'
    >
        
        {/* header section */}
        <Flex paddingTop='20px' paddingRight='20px' paddingLeft='20px' alignItems='center' mb='20px'>
            {/* title */}
            <CiCreditCard1 size='22px' color='#000000' />

            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#454545',
                    marginLeft: '8px',
                    marginRight: '5px'
                }}
            >
                Credit Card
            </Text>

            <GoInfo size='11px' color='#000000' />

            <Spacer />

            {/* view section */}
            <Flex
                cursor='pointer'
                onClick={()=> navigate('/wallet')}
            >
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#073DFC',
                        marginRight: '3px'
                        
                    }}
                >
                    View All
                </Text>
                <VscChevronRight size='20px' color='#073DFC' />
            </Flex>
        </Flex>


        {/* card details */}
        <Flex padding='0px 20px' alignItems='center'>

            {/* balance */}
            <Flex direction='column'>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    Credit Balance
                </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '25px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    $5,000
                </Text>
            </Flex>

            {/* card limit chart */}
            <Spacer />
            <Divider type='vertical' style={{ height: '50px' }} />

            {/* limit usage slider */}
            <Flex direction='column' width='45%'>
                <Flex alignItems='center' marginBottom='5px'>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#454545',
                        }}
                    >
                        Limit Usage
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

                <Flex justifyContent='flex-end' mt='5px'>
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
                </Flex>
            </Flex>
        </Flex>

        <Divider style={{ marginTop: '20px', marginBottom: '5px' }} />

        {/* recent transactions */}

        <Box paddingRight='20px' paddingLeft='20px' >
            {/* title */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#454545',
                }}
            >
                Spends
            </Text>

            {/* table */}
            <Box
                width='100%'
                fontFamily='IBM Plex Sans, sans-serif'
                border='1px solid #D9D9D9'
                borderRadius='10px'
                marginTop='8px'
                marginBottom='15px'
            >
                {/* table title */}
                <Flex padding='5px 10px' justifyContent='space-between' alignItems='center'>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: '#454545',
                        }}
                    >
                        Latest transactions
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            color: '#073DFC',
                            cursor: 'pointer'
                        }}
                        onClick={()=> navigate('/wallet')}
                    >
                        View All
                    </Text>
                </Flex>

                <Divider style={{ marginTop: '0px', marginBottom: '10px' }} />

                {/* rows */}

                <TableContainer w='100%' h='100%'>
                    <Table size='sm' bg='transparent' rounded='md' variant='unstyled' mb='20px' border='1px' >
                        <Thead bg='transparent' rounded='3xl' style={{color: '#000000', }}>
                        <Tr style={{  borderRadius: '7px', borderWidth: '1px', borderColor: 'transparent'}}>
                            <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Date</Th>
                            <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>To</Th>
                            <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Amount</Th>
                            <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Initiated by</Th>
                            <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}></Th>
                        </Tr>
                        </Thead>
                        <Tbody 
                            overflow='auto'
                            sx={{
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }} 
                        >
                            <Tr mb='5px' style={{borderRadius: '40px', borderColor: 'transparent', fontSize: '10px', borderWidth: '1px', backgroundColor:'transparent'}}>
                                <Td fontSize='10px'>Jun 20</Td>
                                <Td fontSize='10px'>FACEBOOK</Td>
                                <Td fontSize='10px'>$230</Td>
                                <Td fontSize='10px'>Prosper Absalom</Td>
                                <Td fontSize='10px'>
                                    <Badge 
                                        colorScheme='green' 
                                        color='#00BA07' 
                                        fontWeight='400' 
                                        fontSize='7px' 
                                        borderRadius='2px'
                                    >
                                        Success
                                    </Badge>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>

    </Box>
  )
}

export default CreditCardBox