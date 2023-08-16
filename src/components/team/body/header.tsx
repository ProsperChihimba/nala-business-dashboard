import { Flex, useDisclosure } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../layout/button';
import NewUser from './new_user';
import AppModal from '../../layout/modal';

const TeamHeader = () => {

    const {isOpen, onOpen, onClose} = useDisclosure()

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
            Team
        </Text>


        {/* account button */}
        <AppButton
            label='Add user'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
            onClick={onOpen}
        />

        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            modalSize='md'
            children={<NewUser />}
        />
    </Flex>
  )
}

export default TeamHeader