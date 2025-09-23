import { Flex, ModalCloseButton } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import DepositProcessTabs from './deposit_tabs';
import AppButton from '../../layout/button';

const { Text } = Typography;

const DepositProcess = ({onClose}: {onClose: () => void}) => {
  return (
    <Flex direction='column' marginBottom='10px'>
        
        {/* close button */}
        <ModalCloseButton />
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#000',
                width: '90%',
                marginBottom: '20px',
                marginTop: '15px'
            }}
        >
            Manually add funds to your account
        </Text>

        {/* instructions */}
        <Instruction no='1' title=': Sign in to your bank account.' />
        <Instruction no='2' title=": Navigate to your bank's page for making transfers." />
        <Instruction no='3' title=': Enter the following account details to send money to your Just Tap App account.' />

        {/* tabs */}
        <DepositProcessTabs />

        {/* footer */}
        <Divider style={{marginTop: '10px', marginBottom: '15px'}} />
        {/* button */}
        <Flex justifyContent='flex-end'>
            <AppButton
                label="Done"
                background='#073DFC'
                color='#fff'
                width='150px'
                borderColor='#073DFC'
                onClick={onClose}
            />
        </Flex>
    </Flex>
  )
}

export default DepositProcess


// single instruction
const Instruction = ({ title, no }: { title: string, no: string }) => {

    return (
        <Flex alignItems='start' marginLeft='8px'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#6D6D6D',
                    marginBottom: '7px',
                }}
            >
                {no}
            </Text>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#6D6D6D',
                    marginBottom: '7px',
                }}
            >
                {title}
            </Text>
        </Flex>
    )
}