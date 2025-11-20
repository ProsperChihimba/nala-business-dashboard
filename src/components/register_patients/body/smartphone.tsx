import { Box, Text, Input, FormLabel, Button, Select, Textarea, HStack, VStack } from "@chakra-ui/react"
import { useState } from "react"
// import { useAuth } from "../../../contexts/AuthContext"
import { useToast } from "@chakra-ui/react"
import { FiArrowRight } from "react-icons/fi"

const SmartphoneRegistration = () => {
  // const { token } = useAuth()
  const toast = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    purpose: "",
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.password || !formData.confirmPassword || !formData.gender || 
        !formData.dateOfBirth || !formData.purpose || !formData.phone) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement smartphone registration API call
      // This should submit a registration form and send link via SMS/WhatsApp
      toast({
        title: "Registration Link Sent",
        description: "A registration link has been sent to the patient's phone",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dateOfBirth: "",
        purpose: "",
        phone: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
      })
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to send registration link. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box fontFamily="IBM Plex Sans, sans-serif" maxWidth="800px">
      <VStack align="stretch" spacing={6}>
        {/* Title */}
        <VStack align="flex-start" spacing={2}>
          <Text fontSize="24px" fontWeight="600" color="#000">
            Create your account
          </Text>
          <Text fontSize="14px" color="#6D6D6D">
            Please fill in your details below
          </Text>
        </VStack>

        {/* Form Fields */}
        <VStack align="stretch" spacing={4}>
          {/* First Name and Last Name */}
          <HStack spacing={4}>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                First name
              </FormLabel>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="First name"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
                isRequired
              />
            </Box>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                Last name
              </FormLabel>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Last name"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
                isRequired
              />
            </Box>
          </HStack>

          {/* Username */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Username
            </FormLabel>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Username"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              isRequired
            />
          </Box>

          {/* Password */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Password
            </FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Password"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              isRequired
            />
          </Box>

          {/* Confirm Password */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Confirm password
            </FormLabel>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Confirm password"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              isRequired
            />
          </Box>

          {/* Gender and Date of Birth */}
          <HStack spacing={4}>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                Select gender
              </FormLabel>
              <Select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                placeholder="Select gender"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                fontSize="12px"
                isRequired
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </Box>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                YYYY-MM-DD
              </FormLabel>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                placeholder="YYYY-MM-DD"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
                isRequired
              />
            </Box>
          </HStack>

          {/* Purpose */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Select purpose
            </FormLabel>
            <Select
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              placeholder="Select purpose"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              fontSize="12px"
              isRequired
            >
              <option value="medical_aid">Medical aid</option>
              <option value="consultation">Consultation</option>
            </Select>
          </Box>

          {/* Phone Number */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Phone number
            </FormLabel>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Phone number"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              isRequired
            />
          </Box>

          {/* Full Address (Optional) */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Full address <Text as="span" color="#9CA3AF" fontWeight="400">(optional)</Text>
            </FormLabel>
            <Textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Full address"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              rows={3}
            />
          </Box>

          {/* Emergency Contact Name and Phone */}
          <HStack spacing={4}>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                Emergency contact name
              </FormLabel>
              <Input
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                placeholder="Emergency contact name"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              />
            </Box>
            <Box flex={1}>
              <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
                Emergency contact phone
              </FormLabel>
              <Input
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                placeholder="Emergency contact phone"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              />
            </Box>
          </HStack>
        </VStack>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          backgroundColor="#9CA3AF"
          color="white"
          width="100%"
          height="50px"
          borderRadius="8px"
          fontSize="14px"
          fontWeight="600"
          rightIcon={<FiArrowRight />}
          isLoading={isLoading}
          loadingText="Creating Account..."
          _hover={{ backgroundColor: "#6B7280" }}
        >
          CREATE ACCOUNT
        </Button>
      </VStack>
    </Box>
  )
}

export default SmartphoneRegistration
