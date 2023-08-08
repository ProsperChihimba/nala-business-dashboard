import { Flex, useDisclosure } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../layout/button';
import AppModal from '../../layout/modal';
import NewCard from './new_card';

const WalletHeader = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  const { Text } = Typography;
  return (
    <Flex justifyContent='space-between' alignItems='center' marginBottom='30px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#000000',
            }}
        >
            Wallet
        </Text>


        {/* account button */}
        <AppButton
            label='Request new card'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
            onClick={onOpen}
        />

        {/* new card modal */}
        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            modalSize='sm'
            children={<NewCard />}
        />
    </Flex>
  )
}

export default WalletHeader