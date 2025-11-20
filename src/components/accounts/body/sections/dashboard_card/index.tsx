import { Box, Flex, Text, HStack, VStack, Badge, Button, Progress } from "@chakra-ui/react"
import { Typography } from "antd"
import { useAuth } from "../../../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../../../../services/api"
import { FiFileText, FiChevronRight } from "react-icons/fi"

const DashboardCard = () => {
  const { Text: AntdText } = Typography
  const { token, doctor } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalEarnings: 0,
    availableBalance: 0,
    totalPatients: 0,
    activeAppointments: 0,
    completedAppointments: 0,
    totalAppointments: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [token, doctor?.id])

  const fetchDashboardStats = async () => {
    if (!token || !doctor?.id) {
      setIsLoading(false)
      return
    }

    try {
      const appointments = await apiService.getDoctorAppointments(doctor.id, token)
      const avgConsultationFee = 50000 // Placeholder - get from schedule
      
      const now = new Date()
      const thisMonth = appointments.filter(apt => {
        const aptDate = new Date(apt.appointment_date)
        return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear()
      })

      const totalEarnings = appointments.length * avgConsultationFee
      const thisMonthEarnings = thisMonth.length * avgConsultationFee

      setStats({
        totalEarnings,
        availableBalance: thisMonthEarnings,
        totalPatients: appointments.length,
        activeAppointments: appointments.filter(apt => apt.status === 'active' || apt.status === 'confirmed').length,
        completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
        totalAppointments: appointments.length,
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
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

  const doctorId = doctor?.id ? `DR${String(doctor.id).padStart(6, '0')}` : 'DR000000'
  const executionPercentage = stats.totalAppointments > 0
    ? Math.round((stats.completedAppointments / stats.totalAppointments) * 100)
    : 0

  // Calculate progress bar values (normalized to 100%)
  const maxValue = Math.max(
    stats.availableBalance,
    stats.totalEarnings,
    stats.totalPatients * 10000,
    stats.totalAppointments * 10000
  )

  return (
    <Box
      fontFamily="IBM Plex Sans, sans-serif"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      padding="24px"
      backgroundColor="white"
      marginTop="23px"
    >
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Left Section */}
        <Flex flex={1} direction="column" gap={4}>
          {/* Doctor ID */}
          <AntdText
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#6D6D6D",
            }}
          >
            Doctor Number
          </AntdText>
          <AntdText
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            {doctorId}
          </AntdText>

          {/* Doctor's Earnings */}
          <VStack align="flex-start" spacing={1}>
            <AntdText
              style={{
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#6D6D6D",
              }}
            >
              Doctor's Earnings from Patients
            </AntdText>
            {isLoading ? (
              <Text fontSize="14px" color="#6D6D6D">Loading...</Text>
            ) : (
              <>
                <AntdText
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  {formatCurrency(stats.availableBalance)}
                </AntdText>
                <AntdText
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#6D6D6D",
                  }}
                >
                  out of {formatCurrency(stats.totalEarnings)} Total Earnings
                </AntdText>
              </>
            )}
          </VStack>

          {/* Execution Tag */}
          <HStack>
            <Badge
              backgroundColor="#FFE5B4"
              color="#B8860B"
              padding="6px 12px"
              borderRadius="20px"
              fontSize="12px"
              fontWeight="500"
            >
              {executionPercentage}% executed
            </Badge>
          </HStack>

          {/* Categories */}
          <HStack spacing={3} alignItems="center">
            <Box
              backgroundColor="#F7FAFC"
              padding="8px"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiFileText size={20} color="#073DFC" />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <AntdText
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Earnings Categories
              </AntdText>
              <AntdText
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#6D6D6D",
                }}
              >
                {stats.totalPatients} Patients
              </AntdText>
            </VStack>
          </HStack>
        </Flex>

        {/* Right Section */}
        <Flex flex={1} direction="column" gap={4}>
          <Flex justifyContent="flex-end">
            <Button
              size="sm"
              variant="outline"
              rightIcon={<FiChevronRight />}
              onClick={() => navigate('/doctors-earnings')}
              borderColor="#DCDCDC"
              color="#000"
              fontSize="12px"
              _hover={{ borderColor: "#073DFC", color: "#073DFC" }}
            >
              View details
            </Button>
          </Flex>

          {/* Progress Bars */}
          <VStack align="stretch" spacing={4}>
            {/* This Month Earnings */}
            <Box>
              <Flex justifyContent="space-between" marginBottom="4px">
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  This Month Earnings
                </Text>
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  {formatCurrency(stats.availableBalance)}
                </Text>
              </Flex>
              <Progress
                value={(stats.availableBalance / maxValue) * 100}
                colorScheme="purple"
                size="sm"
                borderRadius="4px"
                backgroundColor="#E2E8F0"
              />
            </Box>

            {/* Total Earnings */}
            <Box>
              <Flex justifyContent="space-between" marginBottom="4px">
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  Total Earnings
                </Text>
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  {formatCurrency(stats.totalEarnings)}
                </Text>
              </Flex>
              <Progress
                value={(stats.totalEarnings / maxValue) * 100}
                colorScheme="purple"
                size="sm"
                borderRadius="4px"
                backgroundColor="#E2E8F0"
              />
            </Box>

            {/* Earnings from Patients */}
            <Box>
              <Flex justifyContent="space-between" marginBottom="4px">
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  Earnings from Patients
                </Text>
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  {stats.totalPatients} Patients
                </Text>
              </Flex>
              <Progress
                value={(stats.totalPatients / Math.max(stats.totalPatients, 1)) * 100}
                colorScheme="purple"
                size="sm"
                borderRadius="4px"
                backgroundColor="#E2E8F0"
              />
            </Box>

            {/* Consultation Earnings */}
            <Box>
              <Flex justifyContent="space-between" marginBottom="4px">
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  Consultation Earnings
                </Text>
                <Text fontSize="12px" color="#6D6D6D" fontWeight="500">
                  {stats.totalAppointments} Consultations
                </Text>
              </Flex>
              <Progress
                value={(stats.totalAppointments / Math.max(stats.totalAppointments, 1)) * 100}
                colorScheme="purple"
                size="sm"
                borderRadius="4px"
                backgroundColor="#E2E8F0"
              />
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default DashboardCard

