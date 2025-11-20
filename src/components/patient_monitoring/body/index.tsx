import { Box, Text, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useAuth } from "../../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../../services/api"

const PatientMonitoringBody = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [myPatients, setMyPatients] = useState<any[]>([])
  const [consultationSchedule, setConsultationSchedule] = useState<any[]>([])

  useEffect(() => {
    // TODO: Fetch patient data from API
    // For now, using placeholder data with IDs
    setMyPatients([
      { id: 1, dateOfRegister: "2024-01-15", name: "John Doe", diagnosis: "Hypertension", hasConsultation: true },
      { id: 2, dateOfRegister: "2024-01-20", name: "Jane Smith", diagnosis: "Diabetes", hasConsultation: false },
    ])
    setConsultationSchedule([
      { id: 1, dateOfRegister: "2024-01-15", name: "John Doe", diagnosis: "Hypertension", hasConsultation: true },
    ])
  }, [token])

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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date of Register</Th>
                  <Th>Profile Picture</Th>
                  <Th>Name</Th>
                  <Th>Diagnosis</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {myPatients.map((patient) => (
                  <Tr key={patient.id}>
                    <Td>{patient.dateOfRegister}</Td>
                    <Td><Avatar size="sm" name={patient.name} /></Td>
                    <Td>{patient.name}</Td>
                    <Td>{patient.diagnosis}</Td>
                    <Td>
                      <Flex gap={2}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/patient-details/${patient.id}`)}
                        >
                          See More
                        </Button>
                        <Menu>
                          <MenuButton as={Button} size="sm">More Actions</MenuButton>
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
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date of Register</Th>
                  <Th>Profile Picture</Th>
                  <Th>Name</Th>
                  <Th>Diagnosis</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {consultationSchedule.map((patient) => (
                  <Tr key={patient.id}>
                    <Td>{patient.dateOfRegister}</Td>
                    <Td><Avatar size="sm" name={patient.name} /></Td>
                    <Td>{patient.name}</Td>
                    <Td>{patient.diagnosis}</Td>
                    <Td>
                      <Flex gap={2}>
                        {patient.hasConsultation && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/patient-details/${patient.id}`)}
                          >
                            See More
                          </Button>
                        )}
                        <Menu>
                          <MenuButton as={Button} size="sm">More Actions</MenuButton>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default PatientMonitoringBody

