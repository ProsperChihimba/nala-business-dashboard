import { Box, Center, Flex, Input } from '@chakra-ui/react'
import { Typography } from 'antd';
import { BiLinkAlt } from 'react-icons/bi';
import { BsDownload, BsUpload } from 'react-icons/bs';
import AppButton from '../../layout/button';

const MultipleUpload = () => {

    const { Text } = Typography;
  return (
        <Flex
            mt='10px'
            paddingBottom='20px'
            direction='column'
        >
            <Text
                style={{
                    fontSize: '20px',
                    fontWeight: 500,
                    marginBottom: '10px'
                }}
            >
                Multiple vendors
            </Text>

            <Text
                style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    marginBottom: '5px'
                }}
            >
                Download - Fill details - Upload
            </Text>

            {/* desc */}
            <Box
                backgroundColor='#F4F9FF'
                paddingTop='30px'
                paddingRight='20px'
                paddingLeft='20px'
                borderRadius='10px'
                paddingBottom='20px'
                marginBottom='40px'
            >
                <Center>
                    <Text
                        style={{
                            fontSize: '12px',
                            color: '#7C7C7C',
                            paddingBottom: '30px',
                            paddingRight: '5px',
                            paddingLeft: '5px'
                        }}
                    >
                        In order to upload multiple vendors to your Just Tap App account download the our Excel template that will guide you how to fill in vendors details
                        <br /> <br />
                        Fill in the Excel file with your vendors details and save that file in your computer
                        <br /> <br />
                        Then upload Excel file by clicking the Upload button with the light blue colour below,
                        <br /> <br />
                        Then click save button to upload vendors details to your Just Tap App account, this process will take only few seconds, and you will see your vendor details in your account.
                    </Text>
                </Center>

                {/*  */}
                <Box 
                    bg='#000000'
                    color='#fff'
                    fontSize='12px'
                    w='100%'
                    borderRadius='5px'
                    p='12px 30px'
                    fontWeight='500'
                    cursor='pointer'
                >
                    <Flex justifyContent='space-between' alignItems='center'>
                        <BiLinkAlt size='15px' />

                        <Text
                            style={{
                                color: '#fff',
                                fontSize: '12px'
                            }}
                        >
                            DOWNLOAD
                        </Text>

                        <BsDownload size='15px' />
                    </Flex>
                </Box>
            </Box>


            {/* upload */}
            {/*  */}
            <Text
                style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    marginBottom: '10px'
                }}
            >
                Upload
            </Text>

            {/* upload multiple product */}
            <label htmlFor="imageInput">
                <Input type="file" accept=".xls,.xlsx" id="imageInput" display="none" />
                <Box 
                    cursor='pointer'
                    bg='#E5F1FF'
                    color='#073DFC'
                    fontSize='12px'
                    w='100%'
                    borderRadius='5px'
                    p='12px 30px'
                    fontWeight='500'
                    mb='30px'
                >
                    <Flex justifyContent='space-between' alignItems='center'>
                        <BiLinkAlt size='15px' />

                        <Text
                            style={{
                                color: 'black',
                                fontSize: '12px'
                            }}
                        >
                            CHOOSE FILE
                        </Text>

                        <BsUpload size='15px' />
                    </Flex>
                </Box>
            </label>


            {/*  */}
            {/* button */}
            <AppButton
                label='Save'
                background='#073DFC'
                color='#fff'
                width='100%'
                borderColor='#073DFC'
                height='35px'
            />
        </Flex>
  )
}

export default MultipleUpload