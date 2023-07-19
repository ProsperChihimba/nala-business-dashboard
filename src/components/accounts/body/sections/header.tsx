import { Flex, Text } from '@chakra-ui/react'
import AppButton from '../../../layout/button'
import { FiChevronDown } from 'react-icons/fi'

const AccountsHeader = () => {
  return (
    <Flex justifyContent='space-between' alignItems='center'>

        {/* title */}
        <Text
            fontSize='24px'
            color='#000'
            fontWeight='600'
        >
            Accounts
        </Text>


        {/* account button */}
        <Flex gap='30px'>
            <AppButton
                label='Manage accounts'
                background='white'
                color='#000'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                width='160px'
                borderColor='#DCDCDC'
            />
            <AppButton 
                label='Move money'
                background='#073DFC'
                color='#fff'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='160px'
                borderColor='#073DFC'
            />
        </Flex>


    </Flex>
  )
}

export default AccountsHeader