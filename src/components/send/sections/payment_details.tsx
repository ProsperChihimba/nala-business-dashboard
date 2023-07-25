import { Flex } from '@chakra-ui/react'
import DepositHeading from '../../layout/heading'
import AppButton from '../../layout/button';
import DepositInput from '../../layout/input';
import { FiChevronDown } from 'react-icons/fi';

const PaymentDetals = () => {
  return (
    <Flex direction='column'>
        {/* heading */}
        <DepositHeading title='How much are you paying?' />

        {/* inputs */}
        <DepositInput 
            title='Payment method'
            value='ACH'
            placeholder='Recipient name'
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='35px'
            rightElement={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
        />

        <DepositInput
            title='Beneficiary name'
            value=''
            placeholder=''
            isReadOnly={false}
            percentage='20%'
            marginBottom='0px'
            marginTop='30px'
        />

        <DepositInput
            title='Account number'
            value=''
            placeholder=''
            isReadOnly={false}
            percentage='20%'
            marginBottom='0px'
            marginTop='30px'
        />
        
        <DepositInput 
            title='Account type'
            value='Business account'
            placeholder='Recipient name'
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='30px'
            rightElement={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
        />

        <DepositInput
            title='Amount'
            value=''
            placeholder=''
            isReadOnly={false}
            percentage='20%'
            marginBottom='35px'
            marginTop='30px'
        />

        {/* button */}
        <AppButton
            label='Next'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />
    </Flex>
  )
}

export default PaymentDetals
