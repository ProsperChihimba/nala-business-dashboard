import { Box, Flex, TableContainer, Tbody, Td, Th, Thead, Tr, Badge, Table, } from '@chakra-ui/react'
import {  Divider, Typography } from 'antd'
import { TbFileDownload } from 'react-icons/tb';

const StatementsTble = () => {

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
                Latest statements
            </Text>

        </Flex>

        <Divider style={{ marginTop: '0px', marginBottom: '10px' }} />

        {/* rows */}

        <TableContainer w='100%' h='100%'>
            <Table size='sm' bg='white' rounded='md' variant='unstyled' mb='20px' border='1px' >
                <Thead bg='white' rounded='3xl' style={{color: '#000000', }}>
                <Tr style={{  borderRadius: '7px', borderWidth: '1px', borderColor: 'transparent'}}>
                    <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Statement period</Th>
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
                        <Td fontSize='10px'>Jun 1 - Jun 30, 2023</Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <TbFileDownload size='20px' />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default StatementsTble