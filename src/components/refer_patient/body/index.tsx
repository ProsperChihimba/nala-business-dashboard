import { Box, Text, Flex, Select, Button, useToast, useDisclosure } from "@chakra-ui/react"
import { useAuth } from "../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { apiService } from "../../../services/api"
import AppModal from "../../layout/modal"
import SearchDoctorModal from "../../consultation/client_details/[id]/search_doctor_modal"

const ReferPatientBody = () => {
  const { token, doctor } = useAuth()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState("")

  useEffect(() => {
    // TODO: Fetch patient list from API
    // For now, using placeholder data
    setPatients([
      { id: "1", name: "Patient 1" },
      { id: "2", name: "Patient 2" },
    ])
  }, [token])

  const handleTransfer = (doctorId: string) => {
    if (!selectedPatient) {
      toast({
        title: "Patient Required",
        description: "Please select a patient first",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // TODO: Implement referral API call
    toast({
      title: "Referral Sent",
      description: "Patient referral has been sent. The doctor will receive a notification to accept or reject.",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    
    // Reset selection
    setSelectedPatient("")
  }

  return (
    <Box 
      backgroundColor='#F9F9F9' 
      height='fit' 
      marginTop='7vh'
      padding='20px'
      borderRadius='30px 0px 0px 30px'
    >
      <Text fontSize="24px" fontWeight="600" marginBottom="20px">
        Refer Patient
      </Text>

      <Flex direction="column" gap={6} maxWidth="800px">
        <Box>
          <Text fontSize="16px" fontWeight="500" marginBottom="10px">
            Select Patient
          </Text>
          <Select 
            placeholder="Choose a patient"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            height="40px"
            borderRadius="8px"
            borderColor="#DCDCDC"
          >
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </Select>
        </Box>

        <Button 
          onClick={onOpen}
          backgroundColor="#073DFC"
          color="white"
          width="200px"
          isDisabled={!selectedPatient}
        >
          Search for Doctor
        </Button>
      </Flex>

      {/* Search Doctor Modal */}
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        modalSize="lg"
      >
        <SearchDoctorModal onClose={onClose} onTransfer={handleTransfer} />
      </AppModal>
    </Box>
  )
}

export default ReferPatientBody
