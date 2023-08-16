import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../../layout/button';
import DepositHeading from '../../../layout/heading';
import AppModal from '../../../layout/modal';
import AccountInfromation from './account_information';

const { Text } = Typography;

const AccountDetails = () => {
  return (
    <Flex direction='column' w='100%' marginTop='23vh'>
        
        {/* header */}
        <DepositHeading title='Vendor’s payment accounts' />

        {/* new account sections */}
        <AddAccount title='ACH' marginTop='30px'/>
        <AddAccount title='International Wire' marginTop='35px' />
        <AddAccount title='Check' marginBottom='40px' marginTop='35px' />
    </Flex>
  )
}

export default AccountDetails

// props
interface AccountProps {
    title: string;
    marginTop?: string;
    marginBottom?: string;
}


// single account details
const AddAccount = ({title, marginBottom, marginTop}: AccountProps) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <Box
           border='1px solid #D9D9D9'
           backgroundColor='white'
           borderRadius='10px'
           padding='19px'
           marginTop={marginTop}
           marginBottom={marginBottom}
        >

            <Flex alignItems='center' justifyContent='space-between'>

                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#000',
                        marginBottom: '5px',
                    }}
                >
                    {title}
                </Text>

                <AppButton
                    label='Add account'
                    background='#fff'
                    color='#000'
                    width='140px'
                    borderColor='#D9D9D9'
                    onClick={onOpen}
                />
            </Flex>

            <AppModal
                isOpen={isOpen}
                onClose={onClose}
                modalSize='sm'
                children={<AccountInfromation />}
            />
        </Box>
    )
}