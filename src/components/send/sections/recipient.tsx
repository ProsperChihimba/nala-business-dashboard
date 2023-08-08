import { Flex } from '@chakra-ui/react'
import DepositHeading from '../../layout/heading'
import DepositInput from '../../layout/input';

const RecipientDetails = () => {
  return (
    <Flex direction='column' marginTop='23vh'>
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
    </Flex>
  )
}

export default RecipientDetails
