import { Badge, Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Divider, Input, Typography } from "antd"
import { FiChevronRight } from "react-icons/fi";
import { TbFileDownload } from "react-icons/tb";

const TeamTable = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        
        {/* search input */}
        <Box width='35%'>
            <Input
                placeholder='Search'
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px'
                }}
            />
        </Box>

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
                    Users
                </Text>
            </Flex>

            <Divider style={{ marginTop: '0px', marginBottom: '10px' }} />

            {/* rows */}

            <TableContainer w='100%' h='100%'>
                <Table size='sm' bg='white' rounded='md' variant='unstyled' mb='20px' border='1px' >
                    <Thead bg='white' rounded='3xl' style={{color: '#000000', }}>
                    <Tr style={{  borderRadius: '7px', borderWidth: '1px', borderColor: 'transparent'}}>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Name</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Status</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Rule</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Last Activity</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Spends</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}></Th>
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
                            <Td fontSize='10px'>John Haule</Td>
                            <Td fontSize='10px'>
                                <Badge
                                    colorScheme='green' 
                                    color='#00BA07' 
                                    fontWeight='400' 
                                    fontSize='7px' 
                                    borderRadius='2px'
                                >
                                    Active
                                </Badge>
                            </Td>
                            <Td fontSize='10px'>Admin</Td>
                            <Td fontSize='10px'>June 20, 2023</Td>
                            <Td fontSize='10px'>$300</Td>
                            <Td fontSize='10px'>
                                <TbFileDownload size='20px' />
                            </Td>
                            <Td fontSize='10px'>
                               <FiChevronRight size='18px' />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    </Flex>
  )
}

export default TeamTable