import { Box, Flex, TableContainer, Tbody, Td, Th, Thead, Tr, Badge, Table, } from '@chakra-ui/react'
import {  Divider, Typography } from 'antd'

const TransactionsTable = () => {

    const { Text } = Typography;
  return (
    <Box
        width='100%'
        fontFamily='IBM Plex Sans, sans-serif'
        border='1px solid #D9D9D9'
        borderRadius='10px'
        marginTop='30px'
        bg='white'
    >
        {/* table title */}
        <Flex padding='10px 20px' justifyContent='space-between' alignItems='center'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#454545',
                }}
            >
                Recent
            </Text>

        </Flex>

        <Divider style={{ marginTop: '0px', marginBottom: '10px' }} />

        {/* rows */}

        <TableContainer w='100%' h='100%'>
            <Table size='sm' bg='white' rounded='md' variant='unstyled' mb='20px' border='1px' >
                <Thead bg='white' rounded='3xl' style={{color: '#000000', }}>
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
  )
}

export default TransactionsTable