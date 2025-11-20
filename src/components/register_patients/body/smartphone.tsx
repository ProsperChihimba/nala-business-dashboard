import { Box, Text, Flex, Input, FormLabel, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useToast } from "@chakra-ui/react"

const SmartphoneRegistration = () => {
  const { token } = useAuth()
  const toast = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  })

  const handleSubmit = async () => {
    // TODO: Implement smartphone registration
    // This should submit a registration form and send link via SMS/WhatsApp
    toast({
      title: "Registration Link Sent",
      description: "A registration link has been sent to the patient's phone",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Text fontSize="18px" fontWeight="500" marginBottom="20px">
        Smartphone User Registration
      </Text>
      <Flex direction="column" gap={4} maxWidth="600px">
        <Box>
          <FormLabel>First Name</FormLabel>
          <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Last Name</FormLabel>
          <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Phone Number</FormLabel>
          <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Gender</FormLabel>
          <Input value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
        </Box>
        <Box>
          <FormLabel>Address</FormLabel>
          <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
        </Box>
        <Button onClick={handleSubmit} backgroundColor="#073DFC" color="white" width="150px">
          Submit & Send Link
        </Button>
      </Flex>
    </Box>
  )
}

export default SmartphoneRegistration

