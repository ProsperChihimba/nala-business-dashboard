import { Box, Text, Flex, Input, FormLabel, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useToast } from "@chakra-ui/react"

const NonSmartphoneRegistration = () => {
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
  const [accessCode, setAccessCode] = useState("")

  const handleGenerateCode = () => {
    // TODO: Generate access code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setAccessCode(code)
    toast({
      title: "Access Code Generated",
      description: `Access Code: ${code}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  const handleSubmit = async () => {
    // TODO: Implement non-smartphone registration with access code
    toast({
      title: "Registration Complete",
      description: "Patient can now use the access code to access Main Manual tree",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Text fontSize="18px" fontWeight="500" marginBottom="20px">
        Non-Smartphone User Registration
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
        <Box>
          <FormLabel>Access Code</FormLabel>
          <Flex gap={2}>
            <Input value={accessCode} readOnly placeholder="Click Generate to create access code" />
            <Button onClick={handleGenerateCode} backgroundColor="#073DFC" color="white">
              Generate
            </Button>
          </Flex>
        </Box>
        <Button onClick={handleSubmit} backgroundColor="#073DFC" color="white" width="150px" isDisabled={!accessCode}>
          Complete Registration
        </Button>
      </Flex>
    </Box>
  )
}

export default NonSmartphoneRegistration

