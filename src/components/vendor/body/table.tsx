import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { Divider, Input, Typography } from "antd"
import { FiChevronRight } from "react-icons/fi";
import { TbFileDownload } from "react-icons/tb";
import AppModal from "../../layout/modal";
import MultipleUpload from "./multiple_upload";
import AppDrawer from "../../layout/drawer";
import VendorDetailsDrawer from "./vendor_details";

const VendorTable = () => {

    const { Text } = Typography;

    const {isOpen: isOpenModalOne, onOpen: onOpenModalOne, onClose: onCloseModalOne} = useDisclosure()
    const {isOpen: isOpenModalTwo, onOpen: onOpenModalTwo, onClose: onCloseModalTwo} = useDisclosure()
  return (
    <Flex direction='column'>
        
        {/* search input */}
        <Box width='35%'>
            <Input
                placeholder='Vendor number, #account'
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
                    Recent
                </Text>

                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        color: '#073DFC',
                        cursor: 'pointer',
                    }}
                    onClick={onOpenModalOne}
                >
                    Add multiple vendors via Excel 
                </Text>
            </Flex>

            <Divider style={{ marginTop: '0px', marginBottom: '10px' }} />

            {/* rows */}

            <TableContainer w='100%' h='100%'>
                <Table size='sm' bg='white' rounded='md' variant='unstyled' mb='20px' border='1px' >
                    <Thead bg='white' rounded='3xl' style={{color: '#000000', }}>
                    <Tr style={{  borderRadius: '7px', borderWidth: '1px', borderColor: 'transparent'}}>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Date added</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Method</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Total Transactions</Th>
                        <Th style={{fontSize: '10px', color: '#6D6D6D', fontWeight: '500',  fontFamily:'IBM Plex Sans, sans-serif' }}>Next Payment</Th>
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
                            <Td fontSize='10px'>ACH</Td>
                            <Td fontSize='10px'>$230</Td>
                            <Td fontSize='10px'>June 20, 2023</Td>
                            <Td fontSize='10px'>
                                <TbFileDownload size='20px' />
                            </Td>
                            <Td fontSize='10px' cursor='pointer' onClick={onOpenModalTwo}>
                               <FiChevronRight size='18px' />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>


        {/* modal */}
        <AppModal
            isOpen={isOpenModalOne}
            onClose={onCloseModalOne}
            modalSize='md'
            children={<MultipleUpload />}
        />

        {/* drawer */}
        <AppDrawer
            isOpen={isOpenModalTwo}
            onClose={onCloseModalTwo}
            modalSize='md'
            children={<VendorDetailsDrawer />}
        />
    </Flex>
  )
}

export default VendorTable