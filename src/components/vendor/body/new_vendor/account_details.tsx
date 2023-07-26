import { Box, Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../../layout/button';
import DepositHeading from '../../../layout/heading';

const { Text } = Typography;

const AccountDetails = () => {
  return (
    <Flex direction='column' w='40%'>
        
        {/* header */}
        <DepositHeading title='Vendor’s payment accounts' />

        {/* new account sections */}
        <AddAccount title='ACH' marginTop='30px'/>
        <AddAccount title='International Wire' marginTop='35px' />
        <AddAccount title='Check' marginBottom='40px' marginTop='35px' />

        {/* button */}
        <AppButton
            label='Done'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />
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
    return (
        <Box
           border='1px solid #D9D9D9'
           backgroundColor='white'
           borderRadius='10px'
           padding='18px'
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
                    width='160px'
                    borderColor='#D9D9D9'
                />
            </Flex>
        </Box>
    )
}