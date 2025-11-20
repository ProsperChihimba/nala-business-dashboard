import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, HStack, Badge } from "@chakra-ui/react"
import { Typography } from "antd"
import { useAuth } from "../../../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../../../../services/api"
import { FiChevronRight } from "react-icons/fi"

const PatientsList = () => {
  const { Text } = Typography
  const { token, doctor } = useAuth()
  const navigate = useNavigate()
  const [patients, setPatients] = useState<any[]>([])
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [token, doctor?.id])

  const fetchPatients = async () => {
    if (!token || !doctor?.id) {
      setIsLoading(false)
      return
    }

    try {
      // Fetch appointments to get patient list
      const appointments = await apiService.getDoctorAppointments(doctor.id, token)
      
      // Extract unique patients from appointments
      const uniquePatients = appointments.reduce((acc: any[], apt: any) => {
        const existing = acc.find(p => p.id === apt.patient.id)
        if (!existing) {
          acc.push({
            id: apt.patient.id,
            name: `${apt.patient.user.first_name} ${apt.patient.user.last_name}`,
            email: apt.patient.user.email,
            phone: apt.patient.phone_number,
            dateOfRegister: apt.created_at,
            lastAppointment: apt.appointment_date,
            status: apt.status,
            diagnosis: "N/A", // TODO: Get from patient records
          })
        }
        return acc
      }, [])

      setPatients(uniquePatients)
      
      // Calculate statistics
      setStatistics({
        total: uniquePatients.length,
        active: appointments.filter((apt: any) => apt.status === 'active' || apt.status === 'confirmed').length,
        pending: appointments.filter((apt: any) => apt.status === 'pending').length,
        completed: appointments.filter((apt: any) => apt.status === 'completed').length,
      })
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'confirmed':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'completed':
        return 'blue'
      default:
        return 'gray'
    }
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
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            color: "#000",
          }}
        >
          List of Patients
        </Text>

        {/* Statistics */}
        <Flex gap={4} flexWrap="wrap">
          <Box flex="1" minWidth="120px" padding="12px" backgroundColor="#F7FAFC" borderRadius="8px">
            <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
              Total Patients
            </Text>
            <Text fontSize="20px" fontWeight="600" color="#000">
              {statistics.total}
            </Text>
          </Box>
          <Box flex="1" minWidth="120px" padding="12px" backgroundColor="#F0FDF4" borderRadius="8px">
            <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
              Active
            </Text>
            <Text fontSize="20px" fontWeight="600" color="#16A34A">
              {statistics.active}
            </Text>
          </Box>
          <Box flex="1" minWidth="120px" padding="12px" backgroundColor="#FEFCE8" borderRadius="8px">
            <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
              Pending
            </Text>
            <Text fontSize="20px" fontWeight="600" color="#CA8A04">
              {statistics.pending}
            </Text>
          </Box>
          <Box flex="1" minWidth="120px" padding="12px" backgroundColor="#EFF6FF" borderRadius="8px">
            <Text fontSize="11px" color="#6D6D6D" marginBottom="4px">
              Completed
            </Text>
            <Text fontSize="20px" fontWeight="600" color="#2563EB">
              {statistics.completed}
            </Text>
          </Box>
        </Flex>

        {/* Patients Table */}
        {isLoading ? (
          <Text fontSize="14px" color="#6D6D6D">Loading patients...</Text>
        ) : patients.length === 0 ? (
          <Text fontSize="14px" color="#6D6D6D">No patients found</Text>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Date of Register</Th>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Profile Picture</Th>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Name</Th>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Diagnosis</Th>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Status</Th>
                  <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patients.slice(0, 5).map((patient) => (
                  <Tr key={patient.id}>
                    <Td fontSize="12px">{formatDate(patient.dateOfRegister)}</Td>
                    <Td>
                      <Avatar size="sm" name={patient.name} />
                    </Td>
                    <Td fontSize="12px">{patient.name}</Td>
                    <Td fontSize="12px">{patient.diagnosis}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(patient.status)} fontSize="10px">
                        {patient.status || 'N/A'}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        variant="ghost"
                        rightIcon={<FiChevronRight />}
                        onClick={() => navigate(`/patient-details/${patient.id}`)}
                        fontSize="12px"
                      >
                        See More
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {patients.length > 5 && (
              <Flex justifyContent="flex-end" marginTop="10px">
                <Button
                  size="sm"
                  variant="link"
                  onClick={() => navigate('/patient-monitoring')}
                  fontSize="12px"
                  color="#073DFC"
                >
                  View All ({patients.length})
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default PatientsList

