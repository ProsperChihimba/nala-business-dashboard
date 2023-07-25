import { Flex } from '@chakra-ui/react'
import DepositHeading from '../../layout/heading'
import AppButton from '../../layout/button';
import DepositInput from '../../layout/input';

const RecipientDetails = () => {
  return (
    <Flex direction='column'>
        {/* heading */}
        <DepositHeading title='Who are you sending money to?' />

        {/* inputs */}
        <DepositInput 
            title='Recipient'
            value=''
            placeholder='Recipient name'
            isReadOnly={false}
            percentage='10%'
            marginBottom='0px'
            marginTop='35px'
        />

        <DepositInput
            title='Recipient Email'
            value=''
            placeholder='Email address'
            isReadOnly={false}
            percentage='20%'
            marginBottom='40px'
            marginTop='20px'
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

export default RecipientDetails
