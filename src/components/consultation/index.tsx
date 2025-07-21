import SideBar from '../layout/sidebar'
import { Avatar, Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import ConsultationBody from './body'
import { RxDividerVertical } from 'react-icons/rx'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AppModal from '../layout/modal'
import ProfileModal from './profile_modal'

const Consultation = () => {
    const {
      isOpen: isPatientDetailsModalOpen,
      onOpen: onPatientDetailsModalOpen,
      onClose: onPatientDetailsModalClose,
    } = useDisclosure();
  return (
    <Box
        display='grid' 
        gridTemplateColumns={{ base: '13rem auto', md: '13rem auto', xl: '13rem auto' }}
        fontFamily='IBM Plex Sans, sans-serif'
    >
        <SideBar />

        {/* content */}
        <Box>
          <Flex justifyContent="end" pr={6} pt={3} mt={4}>
             <AppModal
                isOpen={isPatientDetailsModalOpen} // Use specific state
                onClose={onPatientDetailsModalClose} // Use specific state
                modalSize="md"
                children={
                  <ProfileModal onClose={onPatientDetailsModalClose} />
                }
              />
            <Flex alignItems="center">
              <Text>Suport</Text>
              <RxDividerVertical />
              <Flex>
                <Avatar
                size="sm"
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
                onClick={onPatientDetailsModalOpen}
                />
              <Flex flexDirection="column" px={4}>
                <Text fontSize="16px">Ninsiima Dispensary</Text>
                <Text fontSize="10px">Hospital</Text>
              </Flex>
              <Flex  alignItems="center" ml={2} ><ChevronDownIcon/></Flex>
              </Flex>
            </Flex>
          </Flex>
          <ConsultationBody />
        </Box>
    </Box>
  )
}

export default Consultation