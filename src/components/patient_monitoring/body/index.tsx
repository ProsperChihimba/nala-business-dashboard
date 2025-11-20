import { Box, Text, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, Spinner, Center } from "@chakra-ui/react"
import { useAuth } from "../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../../services/api"

const PatientMonitoringBody = () => {
  const { token, doctor } = useAuth()
  const navigate = useNavigate()
  const [myPatients, setMyPatients] = useState<any[]>([])
  const [consultationSchedule, setConsultationSchedule] = useState<any[]>([])
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
      setIsLoading(true)
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
            hasConsultation: apt.status === 'active' || apt.status === 'confirmed' || apt.status === 'pending',
          })
        }
        return acc
      }, [])

      setMyPatients(uniquePatients)
      
      // Consultation schedule: patients with active/confirmed/pending appointments
      const scheduledPatients = appointments
        .filter((apt: any) => apt.status === 'active' || apt.status === 'confirmed' || apt.status === 'pending')
        .map((apt: any) => {
          const patient = uniquePatients.find(p => p.id === apt.patient.id)
          return patient ? {
            ...patient,
            appointmentDate: apt.appointment_date,
            appointmentTime: apt.appointment_time || 'N/A',
            appointmentId: apt.id,
          } : null
        })
        .filter((p: any) => p !== null)

      setConsultationSchedule(scheduledPatients)
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

  return (
    <Box 
      backgroundColor='#F9F9F9' 
      height='fit' 
      marginTop='7vh'
      padding='20px'
      borderRadius='30px 0px 0px 30px'
    >
      <Text fontSize="24px" fontWeight="600" marginBottom="20px">
        Patient Monitoring
      </Text>

      <Tabs>
        <TabList>
          <Tab>My Patients</Tab>
          <Tab>Consultation Schedule</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {isLoading ? (
              <Center py={8}>
                <Spinner size="lg" color="blue.500" />
              </Center>
            ) : myPatients.length === 0 ? (
              <Text fontSize="14px" color="#6D6D6D" textAlign="center" py={8}>
                No patients found
              </Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Date of Register</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Profile Picture</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Name</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Diagnosis</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myPatients.map((patient) => (
                    <Tr key={patient.id}>
                      <Td fontSize="12px">{formatDate(patient.dateOfRegister)}</Td>
                      <Td><Avatar size="sm" name={patient.name} /></Td>
                      <Td fontSize="12px">{patient.name}</Td>
                      <Td fontSize="12px">{patient.diagnosis}</Td>
                      <Td>
                        <Flex gap={2}>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/patient-details/${patient.id}`)}
                            fontSize="12px"
                          >
                            See More
                          </Button>
                          <Menu>
                            <MenuButton as={Button} size="sm" fontSize="12px">More Actions</MenuButton>
                            <MenuList>
                              <MenuItem>Video Call</MenuItem>
                              <MenuItem>Audio Call</MenuItem>
                              <MenuItem>SMS Chat</MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>

          <TabPanel>
            {isLoading ? (
              <Center py={8}>
                <Spinner size="lg" color="blue.500" />
              </Center>
            ) : consultationSchedule.length === 0 ? (
              <Text fontSize="14px" color="#6D6D6D" textAlign="center" py={8}>
                No scheduled consultations
              </Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Date of Register</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Profile Picture</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Name</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Diagnosis</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Appointment Date</Th>
                    <Th fontSize="12px" color="#6D6D6D" fontWeight="500">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {consultationSchedule.map((patient) => (
                    <Tr key={patient.id}>
                      <Td fontSize="12px">{formatDate(patient.dateOfRegister)}</Td>
                      <Td><Avatar size="sm" name={patient.name} /></Td>
                      <Td fontSize="12px">{patient.name}</Td>
                      <Td fontSize="12px">{patient.diagnosis}</Td>
                      <Td fontSize="12px">{patient.appointmentDate ? formatDate(patient.appointmentDate) : 'N/A'}</Td>
                      <Td>
                        <Flex gap={2}>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/patient-details/${patient.id}`)}
                            fontSize="12px"
                          >
                            See More
                          </Button>
                          <Menu>
                            <MenuButton as={Button} size="sm" fontSize="12px">More Actions</MenuButton>
                            <MenuList>
                              <MenuItem>Video Call</MenuItem>
                              <MenuItem>Audio Call</MenuItem>
                              <MenuItem>SMS Chat</MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default PatientMonitoringBody

