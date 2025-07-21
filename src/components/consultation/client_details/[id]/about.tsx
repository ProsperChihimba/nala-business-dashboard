"use client";
import {
  Box,
  Flex,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  HStack,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Link,

} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FiInfo, FiDownload, FiChevronDown } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";

// Mock data for a single patient
const mockPatientDetails = [
  {
    id: 1,
    name: "Mohamed Ngarama",
    patientNumber: "**** 3102",
    amountPaid: "TZS 100,000.00",
    consultationDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus ante id sapien congue, sed congue tortor euismod. Suspendisse sed velit ac mauris malesuada rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus ante id sapien congue...",
    assignedHospital: "Muhimbili Hospital",
    assignedDoctor: "Dr. Bege",
    reportPeriod: "Jun 1 - Jun 30, 2023",
  },
  {
    id: 2,
    name: "Kim Ngarama",
    patientNumber: "**** 3102",
    amountPaid: "TZS 100,000.00",
    consultationDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus ante id sapien congue, sed congue tortor euismod. Suspendisse sed velit ac mauris malesuada rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus ante id sapien congue...",
    assignedHospital: "Muhimbili Hospital",
    assignedDoctor: "Dr. Bege",
    reportPeriod: "Jun 1 - Jun 30, 2023",
  },
];

const Details = () => {
  const { id } = useParams<{ id: string }>(); // Using react-router-dom with proper typing
  // In a real app, you would fetch patient details based on patientId
  // For now, we'll use mock data.
  const patient = mockPatientDetails.find((p) => p.id === Number(id)); // FIX: Find the patient by ID

  if (!patient) {
    return <Text>Patient not found.</Text>;
  }

  return (
    <Box p={6} bg="gray.50" minH="100vh" rounded={9}>
     
      {/* Tabs for Patient Details */}
      <Tabs variant="enclosed" colorScheme="gray">
        <TabList paddingBottom="18px">
          <Tab fontWeight="500" fontSize="13px">
            About
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Clerk Sheet
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Vitals
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Provisional Diagnosis
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Investigations
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Investigation Result
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Definitive diagnosis
          </Tab>
          <Tab fontWeight="500" fontSize="13px">
            Treatment
          </Tab>
        </TabList>
        <TabPanels>
          {/* About Tab Content */}
          <TabPanel p={0}>
            <Box bg="white" p={6} borderRadius="md" shadow="sm">
              <Flex gap={6} wrap="wrap">
                {/* Amount Paid Card */}
                <Card
                  flex="1 1 300px"
                  minW="280px"
                  shadow="none"
                  border="1px solid #E2E8F0"
                >
                  <CardHeader pb={0}>
                    <HStack>
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">
                        Amount paid
                      </Text>
                      <Icon as={FiInfo} color="gray.500" boxSize={3} />
                    </HStack>
                  </CardHeader>
                  <CardBody pt={2}>
                    <Text fontSize="3xl" fontWeight="bold">
                      {patient.amountPaid}
                    </Text>
                  </CardBody>
                </Card>
                {/* Patient Information & Allocation */}
                <Box flex="2 1 400px" minW="350px">
                  <Box mb={6}>
                    <Text fontSize="md" fontWeight="semibold" mb={3}>
                      Patient information
                    </Text>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Text fontSize="sm" color="gray.600">
                        Full name
                      </Text>
                      <HStack>
                        <Text fontSize="sm" fontWeight="medium">
                          {patient.name}
                        </Text>
                        <Button
                          variant="outline"
                          size="xs"
                          leftIcon={<Icon as={IoEyeOutline} />}
                        >
                          View details
                        </Button>
                      </HStack>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.600">
                        Patient number
                      </Text>
                      <HStack>
                        <Text fontSize="sm" fontWeight="medium">
                          {patient.patientNumber}
                        </Text>
                        <Icon as={IoEyeOutline} color="gray.500" boxSize={3} />
                      </HStack>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontSize="md" fontWeight="semibold" mb={3}>
                      Allocation
                    </Text>
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Text fontSize="sm" color="gray.600">
                        Assigned hospital
                      </Text>
                      <Text fontSize="sm" fontWeight="medium">
                        {patient.assignedHospital}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="gray.600">
                        Assigned doctor
                      </Text>
                      <HStack>
                        <Text fontSize="sm" fontWeight="medium">
                          {patient.assignedDoctor}
                        </Text>
                        <Button variant="outline" size="xs">
                          Manage
                        </Button>
                      </HStack>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
              {/* Patient Consultation Description */}
              <Card mt={6} shadow="none" border="1px solid #E2E8F0">
                <CardBody>
                  <HStack mb={2}>
                    <Icon
                      as={MdOutlineAttachMoney}
                      color="blue.500"
                      boxSize={5}
                    />
                    <Link
                      href="#"
                      color="blue.500"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      Patient consultation description
                    </Link>
                    <Icon
                      as={FiChevronDown}
                      transform="rotate(-90deg)"
                      color="blue.500"
                      boxSize={4}
                    />
                  </HStack>
                  <Text fontSize="sm" color="gray.700">
                    {patient.consultationDescription}
                  </Text>
                </CardBody>
              </Card>
              {/* Patient Documents */}
              <Box mt={6}>
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Text fontSize="md" fontWeight="semibold">
                    Patient documents
                  </Text>
                  <Link
                    href="#"
                    color="blue.500"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    View all{" "}
                    <Icon
                      as={FiChevronDown}
                      transform="rotate(-90deg)"
                      boxSize={3}
                    />
                  </Link>
                </Flex>
                <Card shadow="none" border="1px solid #E2E8F0">
                  <CardBody>
                    <Flex justifyContent="space-between" alignItems="center">
                      <HStack>
                        <Icon as={LuFileText} color="gray.500" boxSize={5} />
                        <Text fontSize="sm" fontWeight="medium">
                          Report period
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="sm" color="gray.600">
                          {patient.reportPeriod}
                        </Text>
                        <Icon
                          as={FiDownload}
                          color="gray.500"
                          boxSize={4}
                          cursor="pointer"
                        />
                      </HStack>
                    </Flex>
                  </CardBody>
                </Card>
              </Box>
            </Box>
          </TabPanel>
          {/* Other Tab Panels (placeholders) */}
        
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Details;
