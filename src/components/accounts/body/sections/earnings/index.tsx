import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/react"
import { useAuth } from "../../../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { apiService } from "../../../../../services/api"
import { AiOutlineDollar } from "react-icons/ai"

const DoctorEarnings = () => {
  const { token, doctor } = useAuth()
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    thisMonth: 0,
    thisWeek: 0,
    totalPatients: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEarnings()
  }, [token, doctor?.id])

  const fetchEarnings = async () => {
    if (!token || !doctor?.id) {
      setIsLoading(false)
      return
    }

    try {
      // TODO: Replace with actual earnings API endpoint
      // For now, using placeholder data
      // const earningsData = await apiService.getDoctorEarnings(doctor.id, token)
      
      // Calculate from appointments
      const appointments = await apiService.getDoctorAppointments(doctor.id, token)
      
      // Calculate earnings (assuming consultation_fee from schedule)
      const now = new Date()
      const thisMonth = appointments.filter(apt => {
        const aptDate = new Date(apt.appointment_date)
        return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear()
      })
      
      const thisWeek = appointments.filter(apt => {
        const aptDate = new Date(apt.appointment_date)
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return aptDate >= weekAgo
      })

      // TODO: Get actual consultation fees from schedules
      const avgConsultationFee = 50000 // Placeholder
      
      setEarnings({
        totalEarnings: appointments.length * avgConsultationFee,
        thisMonth: thisMonth.length * avgConsultationFee,
        thisWeek: thisWeek.length * avgConsultationFee,
        totalPatients: appointments.length,
      })
    } catch (error) {
      console.error('Error fetching earnings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Box
      fontFamily="IBM Plex Sans, sans-serif"
      marginTop="23px"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      padding="20px"
      backgroundColor="white"
    >
      <Flex direction="column" gap={4}>
        <HStack alignItems="center" gap={2}>
          <AiOutlineDollar size={24} color="#073DFC" />
          <Text
            fontSize="20px"
            fontWeight="500"
            color="#000"
            fontFamily="IBM Plex Sans, sans-serif"
          >
            Doctor's Earnings from Patients
          </Text>
        </HStack>

        {isLoading ? (
          <Text fontSize="14px" color="#6D6D6D">Loading earnings...</Text>
        ) : (
          <VStack align="stretch" gap={3}>
            <Box
              padding="16px"
              backgroundColor="#F7FAFC"
              borderRadius="8px"
            >
              <Text fontSize="12px" color="#6D6D6D" marginBottom="4px">
                Total Earnings
              </Text>
              <Text fontSize="24px" fontWeight="600" color="#000">
                {formatCurrency(earnings.totalEarnings)}
              </Text>
            </Box>

            <Flex gap={4}>
              <Box flex={1} padding="12px" backgroundColor="#F7FAFC" borderRadius="8px">
                <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
                  This Month
                </Text>
                <Text fontSize="18px" fontWeight="600" color="#073DFC">
                  {formatCurrency(earnings.thisMonth)}
                </Text>
              </Box>

              <Box flex={1} padding="12px" backgroundColor="#F7FAFC" borderRadius="8px">
                <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
                  This Week
                </Text>
                <Text fontSize="18px" fontWeight="600" color="#073DFC">
                  {formatCurrency(earnings.thisWeek)}
                </Text>
              </Box>
            </Flex>

            <Box
              padding="12px"
              backgroundColor="#E6F3FF"
              borderRadius="8px"
              border="1px solid #073DFC"
            >
              <Text fontSize="12px" color="#073DFC" fontWeight="500">
                Total Patients: {earnings.totalPatients}
              </Text>
            </Box>
          </VStack>
        )}
      </Flex>
    </Box>
  )
}

export default DoctorEarnings

