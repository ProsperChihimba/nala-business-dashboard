import { Box, Text, Input, FormLabel, Button, Select, Textarea, HStack, VStack } from "@chakra-ui/react"
import { useState } from "react"
// import { useAuth } from "../../../contexts/AuthContext"
import { useToast } from "@chakra-ui/react"
import { FiArrowRight } from "react-icons/fi"
import { apiService } from "../../../services/api"

const NonSmartphoneRegistration = () => {
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
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",
  })
  const [accessCode, setAccessCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateCode = () => {
    // TODO: Generate access code via API
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
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.password || !formData.confirmPassword || !formData.gender || 
        !formData.dateOfBirth || !formData.purpose || !formData.phone || !accessCode) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields and generate an access code",
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
      // Map form data to API format
      const registrationData = {
        username: formData.username,
        password: formData.password,
        password_confirm: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        phone_number: formData.phone,
        address: formData.address || undefined,
        emergency_contact_name: formData.emergencyContactName || undefined,
        emergency_contact_phone: formData.emergencyContactPhone || undefined,
        blood_group: formData.bloodGroup || undefined,
        allergies: formData.allergies || undefined,
        medical_history: formData.medicalHistory || undefined,
        purpose: formData.purpose || undefined,
      }

      await apiService.registerPatient(registrationData)

      toast({
        title: "Registration Complete",
        description: `Patient account created successfully. Access Code: ${accessCode}`,
        status: "success",
        duration: 5000,
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
        bloodGroup: "",
        allergies: "",
        medicalHistory: "",
      })
      setAccessCode("")
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to complete registration. Please try again."
      toast({
        title: "Registration Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
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
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
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

          {/* Blood Group */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Blood Group <Text as="span" color="#9CA3AF" fontWeight="400">(optional)</Text>
            </FormLabel>
            <Select
              value={formData.bloodGroup}
              onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
              placeholder="Select blood group"
              height="40px"
              borderRadius="8px"
              borderColor="#DCDCDC"
              fontSize="12px"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </Box>

          {/* Allergies */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Allergies <Text as="span" color="#9CA3AF" fontWeight="400">(optional)</Text>
            </FormLabel>
            <Textarea
              value={formData.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
              placeholder="List any allergies (e.g., Peanuts, Shellfish)"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              rows={2}
            />
          </Box>

          {/* Medical History */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Medical History <Text as="span" color="#9CA3AF" fontWeight="400">(optional)</Text>
            </FormLabel>
            <Textarea
              value={formData.medicalHistory}
              onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
              placeholder="Previous medical conditions (e.g., Hypertension, Type 2 Diabetes)"
              borderRadius="8px"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
              rows={3}
            />
          </Box>

          {/* Access Code (Non-smartphone specific) */}
          <Box>
            <FormLabel fontSize="14px" fontWeight="500" color="#454545" marginBottom="8px">
              Access Code
            </FormLabel>
            <HStack spacing={2}>
              <Input
                value={accessCode}
                readOnly
                placeholder="Click Generate to create access code"
                height="40px"
                borderRadius="8px"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "12px", color: "#9CA3AF" }}
                backgroundColor="#F9FAFB"
              />
              <Button
                onClick={handleGenerateCode}
                backgroundColor="#073DFC"
                color="white"
                height="40px"
                borderRadius="8px"
                fontSize="12px"
                _hover={{ backgroundColor: "#0628C4" }}
              >
                Generate
              </Button>
            </HStack>
          </Box>
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
          isDisabled={!accessCode}
          _hover={{ backgroundColor: "#6B7280" }}
        >
          CREATE ACCOUNT
        </Button>
      </VStack>
    </Box>
  )
}

export default NonSmartphoneRegistration
