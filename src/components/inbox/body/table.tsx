import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Divider, Input, Typography } from "antd"
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import AppDrawer from "../../layout/drawer";
import ViewPayment from "./view_payment";
import ArticleTag from "../../accounts/body/sections/learn/tag";
import AppButton from "../../layout/button";

const InboxTable = () => {

    const { isOpen: isOpenModalOne, onOpen: onOpenModalOne, onClose: onCloseModalOne } = useDisclosure()

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        
        <Flex justifyContent='space-between'>
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

            {/* button */}
            <AppButton
                label='Status'
                background='#fff'
                color='#000'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#000' />}
                width='160px'
                borderColor='#D9D9D9'
            />
        </Flex>

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
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>From</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Method</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Amount</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Initiated by</Th>
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
                            <Td fontSize='10px'>Jun 20</Td>
                            <Td fontSize='10px'>PaysCheck</Td>
                            <Td fontSize='10px'>ACH</Td>
                            <Td fontSize='10px'>$230</Td>
                            <Td fontSize='10px'>Prosper Absalom</Td>
                            <Td fontSize='10px' width='100px'>
                                <ArticleTag
                                    rightElement={<Box boxSize='6px' bg='#F7CB73' rounded='3xl'></Box>}
                                    text='Pending'
                                />
                            </Td>
                            <Td fontSize='10px' onClick={onOpenModalOne} cursor='pointer'>
                               <FiChevronRight size='18px' />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>


        {/* drawer */}
        <AppDrawer
            isOpenSide={isOpenModalOne}
            onCloseSide={onCloseModalOne}
            modalSize='md'
            children={<ViewPayment />}

           
        />
    </Flex>
  )
}

export default InboxTable