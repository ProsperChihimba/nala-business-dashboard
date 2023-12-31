import { Flex, useDisclosure } from '@chakra-ui/react'
import DepositHeading from '../../layout/heading'
import { Typography } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import AppButton from '../../layout/button';
import DepositInput from '../../layout/input';
import AppModal from '../../layout/modal';
import DepositProcess from './deposit_process';

const AddFunds = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { Text } = Typography;
  return (
    <Flex direction='column' marginTop='20vh'>
        {/* heading */}
        <DepositHeading title='Add funds' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#000',
            }}
        >
            Deposit of funds takes  up to <span style={{ fontWeight: '500' }}>3 business days</span>
        </Text>


        {/* inputs */}
        <DepositInput 
            title='From'
            value=''
            placeholder='Account'
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='35px'
            rightElement={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
        />

        <DepositInput
            title='To'
            value='Nala business account'
            placeholder='Account'
            isReadOnly={true}
            percentage='20%'
            marginBottom='40px'
            marginTop='20px'
            rightElement={
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#000',
                    }}
                >
                    ***** 3102
                </Text>
            }
        />

        {/* button */}
        <AppButton
            label='Next'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
            onClick={onOpen}
        />

        {/* deposit process modal */}
        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            modalSize='md'
            children={<DepositProcess onClose={onClose} />}
        />
    </Flex>
  )
}

export default AddFunds