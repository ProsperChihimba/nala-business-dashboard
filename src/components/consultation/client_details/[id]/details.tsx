"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Avatar,
  Textarea,
  Input,
  VStack,
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
} from "@chakra-ui/react";
import { Divider } from "antd";

import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService, PatientVital, BloodPressureReading } from "../../../../services/api";
import {
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiVideo,
} from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { GoInfo } from "react-icons/go";
import { TbNotes } from "react-icons/tb";
import { MdCurrencyExchange, MdOutlineCall, MdSms } from "react-icons/md";
import AppButton from "../../../layout/button";
import { BsArrowRight } from "react-icons/bs";
import PatientDetails from "./patient_details";
import AppModal from "../../../layout/modal";
import FilterSection from "../body/sections/tabs/transactions/filter_section";
import DefinitiveDetails from "./definitive_model";
import ProvisionalDetails from "./provisional_model";
import AppDrawer from "../../../layout/drawer";
import VitalSide from "./add_vital_side";
import ViewVitalSide from "./view_vital_side";
import AddLabTestSide from "./add_lab_test_side";
import ClerkSheetForm from "./clerk_sheet_form";
import AddPrescriptionSide from "./add_prescription_side";
import BloodPressureSide from "./blood_pressure_side";
import {
  LinkIcon,
  PenIcon,
  ListIcon,
  ListOrderedIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from "lucide-react";
import TreatmentModal from "./treatment_model";
import PatientTransfer from "./patient_transfer_model";
import InvestigationSteps from "../investigation_steps";
import InvestigationModal from "./investigation_modal";
import { IoMdNotificationsOutline } from "react-icons/io";
import SendNotification from "./send_notification_modal";
import ClerkDrawer from "./clerk_drawer";

// Patient details interface
interface PatientDetails {
  id: number;
  name: string;
  patientNumber: string;
  amountPaid: string;
  consultationDescription: string;
  assignedHospital: string;
  assignedDoctor: string;
  reportPeriod: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

interface TestItem {
  id: string;
  name: string;
  isSelected: boolean;
  category?: string;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { token, isAuthenticated } = useAuth();
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [vitals, setVitals] = useState<PatientVital[]>([]);
  const [selectedVital, setSelectedVital] = useState<PatientVital | null>(null);
  const [bloodPressureReadings, setBloodPressureReadings] = useState<BloodPressureReading[]>([]);
  const [selectedBloodPressureReading, setSelectedBloodPressureReading] = useState<BloodPressureReading | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVitalsLoading, setIsVitalsLoading] = useState(true);
  const [isBloodPressureLoading, setIsBloodPressureLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('PatientDetails - Component loaded with id:', id, 'isAuthenticated:', isAuthenticated, 'token:', token ? 'Present' : 'Missing');
  
  const [tests, setTests] = useState<TestItem[]>([
    { id: "1", name: "HAEMOGLOBIN (POC)", isSelected: false },
    { id: "2", name: "HELICOBACTER PYLORI AG. TEST (POC)", isSelected: true },
    { id: "3", name: "FAST BLOOD GLUCOSE", isSelected: false },
    { id: "4", name: "URINE PREGNANCY TEST", isSelected: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State for the "New Vital" drawer
  const {
    isOpen: isNewVitalDrawerOpen,
    onOpen: onNewVitalDrawerOpen,
    onClose: onNewVitalDrawerClose,
  } = useDisclosure();


   const {
    isOpen: isClerkDrawerOpen,
    onOpen: onClerkDrawerOpen,
    onClose: onClerkDrawerClose,
  } = useDisclosure();
  // State for the "View Vital" drawer
  const {
    isOpen: isViewVitalDrawerOpen,
    onOpen: onViewVitalDrawerOpen,
    onClose: onViewVitalDrawerClose,
  } = useDisclosure();

  // State for the "Add Lab Test" drawer
  const {
    isOpen: isAddLabTestDrawerOpen,
    onOpen: onAddLabTestDrawerOpen,
    onClose: onAddLabTestDrawerClose,
  } = useDisclosure();

  // State for the "Clerk Sheet" drawer
  const {
    isOpen: isClerkSheetDrawerOpen,
    onOpen: onClerkSheetDrawerOpen,
    onClose: onClerkSheetDrawerClose,
  } = useDisclosure();

  // State for the "Add Prescription" drawer
  const {
    isOpen: isAddPrescriptionDrawerOpen,
    onOpen: onAddPrescriptionDrawerOpen,
    onClose: onAddPrescriptionDrawerClose,
  } = useDisclosure();

  // Separate states for each modal type
  const {
    isOpen: isPatientDetailsModalOpen,
    onOpen: onPatientDetailsModalOpen,
    onClose: onPatientDetailsModalClose,
  } = useDisclosure();

  const {
    isOpen: isPatientTransferModalOpen,
    onOpen: onPatientTransferModalOpen,
    onClose: onPatientTransferModalClose,
  } = useDisclosure();

  const {
    isOpen: isNotificationModalOpen,
    onOpen: onNotificationModalOpen,
    onClose: onNotificationModalClose,
  } = useDisclosure();
  const {
    isOpen: isTreatmentModalOpen,
    onOpen: onTreatmentModalOpen,
    onClose: onTreatmentModalClose,
  } = useDisclosure();

  const {
    isOpen: isInvestigationModalOpen,
    onOpen: onInvestigationModalOpen,
    onClose: onInvestigationModalClose,
  } = useDisclosure();

  const {
    isOpen: isProvisionalDetailsModalOpen,
    onOpen: onProvisionalDetailsModalOpen,
    onClose: onProvisionalDetailsModalClose,
  } = useDisclosure();
  const {
    isOpen: isDefinitiveDetailsModalOpen,
    onOpen: onDefinitiveDetailsModalOpen,
    onClose: onDefinitiveDetailsModalClose,
  } = useDisclosure();

  // State for the "New Blood Pressure" drawer
  const {
    isOpen: isNewBloodPressureDrawerOpen,
    onOpen: onNewBloodPressureDrawerOpen,
    onClose: onNewBloodPressureDrawerClose,
  } = useDisclosure();

  // State for the "View Blood Pressure" drawer
  const {
    isOpen: isViewBloodPressureDrawerOpen,
    onOpen: onViewBloodPressureDrawerOpen,
    onClose: onViewBloodPressureDrawerClose,
  } = useDisclosure();

  const [tabIndex, setTabIndex] = useState(0);

  const toggleTest = (testId: string) => {
    setTests(
      tests.map((test) =>
        test.id === testId ? { ...test, isSelected: !test.isSelected } : test
      )
    );
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id || !token) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const patientId = parseInt(id);
        const patientData = await apiService.getPatient(patientId, token);
        
        // Transform API data to match UI structure
        const transformedPatient: PatientDetails = {
          id: patientData.id,
          name: `${patientData.user.first_name} ${patientData.user.last_name}`,
          patientNumber: `**** ${patientData.id.toString().padStart(4, '0')}`,
          amountPaid: "TZS 100,000.00", // This would come from appointment data
          consultationDescription: "Patient consultation details will be displayed here.",
          assignedHospital: "Muhimbili Hospital", // This would come from appointment data
          assignedDoctor: "Dr. Current Doctor", // This would come from appointment data
          reportPeriod: "Current Period", // This would come from appointment data
          email: patientData.user.email,
          phone: patientData.phone_number,
          address: patientData.address,
          dateOfBirth: patientData.date_of_birth,
          gender: patientData.gender,
        };
        
        setPatient(transformedPatient);
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch patient data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [id, token]);

  // Fetch patient vitals function
  const fetchVitalsData = async () => {
    if (!id || !token) return;
    
    try {
      setIsVitalsLoading(true);
      const patientId = parseInt(id);
      const vitalsResponse = await apiService.getPatientVitals(patientId, token);
      setVitals(vitalsResponse.results);
      console.log('Fetched vitals:', vitalsResponse.results);
    } catch (err) {
      console.error('Error fetching vitals data:', err);
      // Don't set error for vitals as it's not critical
    } finally {
      setIsVitalsLoading(false);
    }
  };

  // Function to refresh lab tests data
  const fetchLabTestsData = async () => {
    if (!id || !token) return;
    
    try {
      // For now, we'll just show a success message
      // In the future, we can fetch and display lab tests
      console.log('Lab tests data refreshed');
    } catch (error) {
      console.error('Error fetching lab tests:', error);
    }
  };

  // Function to refresh clerk sheets data
  const fetchClerkSheetsData = async () => {
    if (!id || !token) return;
    
    try {
      // For now, we'll just show a success message
      // In the future, we can fetch and display clerk sheets
      console.log('Clerk sheets data refreshed');
    } catch (error) {
      console.error('Error fetching clerk sheets:', error);
    }
  };

  // Function to refresh prescriptions data
  const fetchPrescriptionsData = async () => {
    if (!id || !token) return;
    
    try {
      // For now, we'll just show a success message
      // In the future, we can fetch and display prescriptions
      console.log('Prescriptions data refreshed');
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  // Fetch patient vitals on mount
  useEffect(() => {
    fetchVitalsData();
  }, [id, token]);

  // Fetch blood pressure readings function
  const fetchBloodPressureData = async () => {
    if (!id || !token) return;
    
    try {
      setIsBloodPressureLoading(true);
      const patientId = parseInt(id);
      const bloodPressureResponse = await apiService.getPatientBloodPressureReadings(patientId, token);
      setBloodPressureReadings(bloodPressureResponse);
      console.log('Fetched blood pressure readings:', bloodPressureResponse);
    } catch (err) {
      console.error('Error fetching blood pressure data:', err);
    } finally {
      setIsBloodPressureLoading(false);
    }
  };

  // Fetch blood pressure readings on mount
  useEffect(() => {
    fetchBloodPressureData();
  }, [id, token]);

  // Filter tests based on search query
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleViewVital = (vital: PatientVital) => {
    setSelectedVital(vital);
    onViewVitalDrawerOpen();
  };

  const handleCloseViewVital = () => {
    setSelectedVital(null);
    onViewVitalDrawerClose();
  };

  // Show loading state
  if (isLoading) {
    return (
      <Box p={6} bg="#F9F9F9" minH="100vh" rounded={9}>
        <Center h="50vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text>Loading patient details...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box p={6} bg="#F9F9F9" minH="100vh" rounded={9}>
        <Center h="50vh">
          <Alert status="error" maxW="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Error loading patient details</Text>
              <Text fontSize="sm">{error}</Text>
            </Box>
          </Alert>
        </Center>
      </Box>
    );
  }

  // Show not found state
  if (!patient) {
    return (
      <Box p={6} bg="#F9F9F9" minH="100vh" rounded={9}>
        <Center h="50vh">
          <Text>Patient not found</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box p={6} bg=" #F9F9F9" minH="100vh" rounded={9}>
      <Box paddingLeft={2}>
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "#000000",
            marginBottom: 10,
          }}
        >
          Consultation {`>`}{" "}
          <span style={{ color: "#6D6D6D" }}>Client Details</span>
        </Text>
      </Box>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            color: "black",
            marginLeft: "8px",
            marginRight: "5px",
          }}
        >
          {patient.name} - Sinza C
        </Text>
        <HStack spacing={4}>
          {tabIndex !== 2 && tabIndex !== 3 && tabIndex !== 1 && (
            <>
              <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm">
                  Contact Patient
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    {" "}
                    <FiVideo />{" "}
                    <Text style={{ marginLeft: "10px" }}>Video Call</Text>
                  </MenuItem>
                  <MenuItem>
                    <MdOutlineCall />
                    <Text style={{ marginLeft: "10px" }}>Audio Call</Text>
                  </MenuItem>
                  <MenuItem>
                    <MdSms />
                    <Text style={{ marginLeft: "10px" }}>SMS Chat</Text>
                  </MenuItem>
                  <MenuItem onClick={onNotificationModalOpen}>
                    <IoMdNotificationsOutline />
                    <Text style={{ marginLeft: "10px" }}>
                      Send Notification
                    </Text>
                    <AppModal
                      isOpen={isNotificationModalOpen} // Use specific state
                      onClose={onNotificationModalClose} // Use specific state
                      modalSize="md"
                      children={
                        <SendNotification onClose={onNotificationModalClose} />
                      }
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FiChevronDown />}
                  size="sm"
                  color="white"
                  background="#073DFC"
                >
                  Change status
                </MenuButton>
                <MenuList>
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Pending</MenuItem>
                  <MenuItem>Rejected</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
          {tabIndex === 2 && (
            <>
              <AppButton
                label="New Vital"
                background="#073DFC"
                color="white"
                icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
                width="140px"
                borderColor="#DCDCDC"
                onClick={onNewVitalDrawerOpen}
              />
              <AppButton
                label="Add Lab Test"
                background="#28a745"
                color="white"
                icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
                width="150px"
                borderColor="#28a745"
                onClick={onAddLabTestDrawerOpen}
              />
            </>
          )}
          {tabIndex === 3 && (
            <AppButton
              label="Add Diagnosis"
              background="#073DFC"
              borderColor="#DCDCDC"
              color="white"
              icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
              width="140px"
              onClick={onProvisionalDetailsModalOpen} // Trigger ProvisionalDetails modal
            />
          )}

          {tabIndex === 1 && (
            <AppButton
              label="Add Clerk Sheet"
              background="#073DFC"
              borderColor="#DCDCDC"
              color="white"
              icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
              width="140px"
              onClick={onClerkSheetDrawerOpen}
            />
          )}
          {tabIndex === 6 && (
            <AppButton
              label="Add Prescription"
              background="#28a745"
              borderColor="#28a745"
              color="white"
              icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
              width="150px"
              onClick={onAddPrescriptionDrawerOpen}
            />
          )}
        </HStack>
      </Flex>
      {/* Tabs for Patient Details */}
      <Tabs
        variant="enclosed"
        colorScheme="gray"
        onChange={(index) => setTabIndex(index)}
      >
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
            Blood Pressure
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
            Prescription
          </Tab>
        </TabList>
        <TabPanels>
          {/* About Tab Content */}
          <TabPanel p={0}>
            <Flex
              padding="20px"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="20px"
              gap="20px"
            >
              {/* first section */}
              <Flex direction="column" width="35%">
                <Flex direction="column" marginBottom="80px">
                  <Flex alignItems="center" marginBottom="5px">
                    <Text
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#454545",
                        marginLeft: "8px",
                        marginRight: "5px",
                      }}
                    >
                      Available balance
                    </Text>
                    <GoInfo size="11px" color="#000000" />
                  </Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "22px",
                      fontWeight: 500,
                      color: "#454545",
                      marginLeft: "8px",
                      marginRight: "5px",
                    }}
                  >
                    $100,000.00
                  </Text>
                </Flex>
                <Divider />
                {/* */}
                <Flex alignItems="center">
                  <MdCurrencyExchange size="20px" color="#000000" />
                  {/* Flex */}
                  <Flex direction="column" marginLeft="7px">
                    <Flex alignItems="center">
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#073DFC",
                          marginLeft: "8px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        // onClick={onPatientDetailsModalOpen}
                      >
                        patient consultation description
                      </Text>
                      <BsArrowRight size="16px" color="#073DFC" />
                    </Flex>
                    <Text
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#454545",
                        marginLeft: "8px",
                        marginRight: "5px",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Divider type="vertical" style={{ height: "300px" }} />
              {/* second section */}
              <Flex w="60%" direction="column">
                {/* */}
                {/* */}
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom="20px"
                >
                  <Flex direction="column">
                    <Text
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#454545",
                        marginBottom: "22px",
                      }}
                    >
                      Account information
                    </Text>
                    {/* account info */}
                    <Flex gap="100px" mb="12px">
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Routing number
                      </Text>
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        100320001
                      </Text>
                    </Flex>
                    <Flex gap="100px" mb="15px">
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Account number
                      </Text>
                      <Flex alignItems="center" gap="5px">
                        <Text
                          style={{
                            fontFamily: "IBM Plex Sans, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#000",
                          }}
                        >
                          **** * 3102
                        </Text>
                        <AiOutlineEye size="11px" color="#000000" />
                      </Flex>
                    </Flex>
                  </Flex>
                  <AppButton
                    label="View details"
                    background="white"
                    color="#000"
                    icon={
                      <TbNotes
                        size="15px"
                        style={{ marginLeft: 8 }}
                        color="#000000"
                      />
                    }
                    width="140px"
                    borderColor="#DCDCDC"
                    onClick={onPatientDetailsModalOpen} // Trigger PatientDetails modal
                  />

                  <AppModal
                    isOpen={isPatientDetailsModalOpen} // Use specific state
                    onClose={onPatientDetailsModalClose} // Use specific state
                    modalSize="md"
                    children={
                      <PatientDetails onClose={onPatientDetailsModalClose} />
                    }
                  />
                </Flex>
                <Divider style={{ margin: 0 }} />
                {/* */}
                {/* */}
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  marginTop="30px"
                >
                  <Flex direction="column">
                    <Text
                      style={{
                        fontFamily: "IBM Plex Sans, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#454545",
                        marginBottom: "22px",
                      }}
                    >
                      Allocation
                    </Text>
                    {/* account info */}
                    <Flex gap="100px" mb="12px">
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        FDIC-insured funds
                      </Text>
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        $100,000.00
                      </Text>
                    </Flex>
                    <Flex gap="100px" mb="15px">
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Money-market funds
                      </Text>
                      <Text
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        $0.00
                      </Text>
                    </Flex>
                  </Flex>
                  <AppButton
                    label="Manage"
                    background="white"
                    color="#000"
                    width="140px"
                    borderColor="#DCDCDC"
                    onClick={onPatientTransferModalOpen} // Trigger PatientDetails modal
                  />
                </Flex>
              </Flex>
              {/* account details modal */}
              <AppModal
                isOpen={isPatientTransferModalOpen} // Use specific state
                onClose={onPatientTransferModalClose} // Use specific state
                modalSize="md"
                children={
                  <PatientTransfer onClose={onPatientTransferModalClose} />
                }
              />
            </Flex>
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Patient Documents
                </Text>
                <Flex cursor="pointer">
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <FiChevronRight
                    size="15px"
                    style={{ marginLeft: 8 }}
                    color="#073DFC"
                  />
                </Flex>
              </Flex>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              {/* rows */}
              <TableContainer w="100%" h="100%">
                <Table
                  size="sm"
                  bg="transparent"
                  rounded="md"
                  variant="unstyled"
                  mb="20px"
                  border="1px"
                >
                  <Thead
                    bg="transparent"
                    rounded="3xl"
                    style={{ color: "#000000" }}
                  >
                    <Tr
                      style={{
                        borderRadius: "7px",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                    >
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        To
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Amount
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Initiated by
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      ></Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      ></Th>
                    </Tr>
                  </Thead>
                  <Tbody
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Tr
                      mb="5px"
                      style={{
                        borderRadius: "40px",
                        borderColor: "transparent",
                        fontSize: "14px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="14px">Jun 20</Td>
                      <Td fontSize="14px">FACEBOOK</Td>
                      <Td fontSize="14px">$230</Td>
                      <Td fontSize="14px">Prosper Absalom</Td>
                      <Td fontSize="14px">
                        <Badge
                          colorScheme="green"
                          color="#00BA07"
                          fontWeight="400"
                          fontSize="7px"
                          borderRadius="2px"
                        >
                          Success
                        </Badge>
                      </Td>
                      <Td
                        fontSize="14px"
                        onClick={onPatientDetailsModalOpen}
                        cursor="pointer"
                      >
                        {" "}
                        {/* Trigger PatientDetails modal */}
                        <FiChevronRight
                          size="15px"
                          style={{ marginLeft: 8 }}
                          color="#000"
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Clerk Sheet Tab Content (Placeholder) */}
          <TabPanel>
            <FilterSection />
            <AppModal
              isOpen={isProvisionalDetailsModalOpen} // Use specific state
              onClose={onProvisionalDetailsModalClose} // Use specific state
              modalSize="md"
              children={
                <ProvisionalDetails onClose={onProvisionalDetailsModalClose} />
              }
            />
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Recent
                </Text>
                <Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <FiChevronRight
                    size="15px"
                    style={{ marginLeft: 8 }}
                    color="#073DFC"
                  />
                </Flex>
              </Flex>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              {/* rows */}
              <TableContainer w="100%" h="100%">
                <Table
                  size="sm"
                  bg="transparent"
                  rounded="md"
                  variant="unstyled"
                  mb="20px"
                  border="1px"
                >
                  <Thead
                    bg="transparent"
                    rounded="3xl"
                    style={{ color: "#000000" }}
                  >
                    <Tr
                      style={{
                        borderRadius: "7px",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                    >
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Tr
                      mb="5px"
                      style={{
                        borderRadius: "40px",
                        borderColor: "transparent",
                        fontSize: "14px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="14px">Jun 20</Td>
                      <Td fontSize="14px">Prosper Absalom</Td>
                      <Td fontSize="14px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="14px">
                        <Link
                          color="blue"
                          onClick={onClerkDrawerOpen}
                        >
                        
                          details
                        </Link>
                      </Td>
                      <Td fontSize="14px">
                        <FiChevronRight
                          size="15px"
                          style={{ marginLeft: 8 }}
                          color="#000"
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Vitals Tab Content */}
          <TabPanel>
            {/* AppDrawer for adding new vital */}
            <AppDrawer
              isOpenSide={isNewVitalDrawerOpen}
              onCloseSide={onNewVitalDrawerClose}
              modalSize="md"
              children={<VitalSide onVitalAdded={fetchVitalsData} />}
            />
            {/* AppDrawer for viewing vital details */}
            <AppDrawer
              isOpenSide={isViewVitalDrawerOpen}
              onCloseSide={handleCloseViewVital}
              modalSize="md"
              children={<ViewVitalSide vital={selectedVital} />}
            />
            {/* AppDrawer for adding lab test */}
            <AppDrawer
              isOpenSide={isAddLabTestDrawerOpen}
              onCloseSide={onAddLabTestDrawerClose}
              modalSize="lg"
              children={<AddLabTestSide onLabTestAdded={fetchLabTestsData} />}
            />
            {/* AppDrawer for clerk sheet */}
            <AppDrawer
              isOpenSide={isClerkSheetDrawerOpen}
              onCloseSide={onClerkSheetDrawerClose}
              modalSize="xl"
              children={<ClerkSheetForm onClerkSheetAdded={fetchClerkSheetsData} />}
            />
            {/* AppDrawer for prescription */}
            <AppDrawer
              isOpenSide={isAddPrescriptionDrawerOpen}
              onCloseSide={onAddPrescriptionDrawerClose}
              modalSize="xl"
              children={<AddPrescriptionSide onPrescriptionAdded={fetchPrescriptionsData} />}
            />

             <AppDrawer
              isOpenSide={isClerkDrawerOpen}
              onCloseSide={onClerkDrawerClose}
              modalSize="md"
              children={<ClerkDrawer />}
            />
            <FilterSection />
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Recent
                </Text>
                <Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <FiChevronRight
                    size="15px"
                    style={{ marginLeft: 8 }}
                    color="#073DFC"
                  />
                </Flex>
              </Flex>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              {/* rows */}
              <TableContainer w="100%" h="100%">
                <Table
                  size="sm"
                  bg="transparent"
                  rounded="md"
                  variant="unstyled"
                  mb="20px"
                  border="1px"
                >
                  <Thead
                    bg="transparent"
                    rounded="3xl"
                    style={{ color: "#000000" }}
                  >
                    <Tr
                      style={{
                        borderRadius: "7px",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                    >
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {isVitalsLoading ? (
                      <Tr>
                        <Td colSpan={4} textAlign="center" py={4}>
                          <Spinner size="sm" color="blue.500" />
                          <Text fontSize="14px" mt={2}>Loading vitals...</Text>
                        </Td>
                      </Tr>
                    ) : vitals.length === 0 ? (
                      <Tr>
                        <Td colSpan={4} textAlign="center" py={4}>
                          <Text fontSize="14px" color="gray.500">No vitals recorded yet</Text>
                        </Td>
                      </Tr>
                    ) : (
                      vitals.map((vital) => {
                        // Format date from API format (2025-09-23T06:19:30.306282Z) to UI format (Sep 23)
                        const formatDate = (dateString: string) => {
                          const date = new Date(dateString);
                          const month = date.toLocaleDateString('en-US', { month: 'short' });
                          const day = date.getDate();
                          return `${month} ${day}`;
                        };

                        // Create vital summary
                        const vitalSummary = `HR: ${vital.pulse_rate}, Temp: ${vital.temperature}°F, SpO2: ${vital.oxygen_saturation}%`;

                        return (
                          <Tr
                            key={vital.id}
                            mb="5px"
                            style={{
                              borderRadius: "40px",
                              borderColor: "transparent",
                              fontSize: "14px",
                              borderWidth: "1px",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Td fontSize="14px">{formatDate(vital.created_at)}</Td>
                            <Td fontSize="14px">{patient?.name || 'Doctor'}</Td>
                            <Td fontSize="14px">{vitalSummary}</Td>
                            <Td fontSize="14px">
                              <Link color="blue" onClick={() => handleViewVital(vital)}>
                                details
                              </Link>
                            </Td>
                            <Td fontSize="14px">
                              <FiChevronRight
                                size="15px"
                                style={{ marginLeft: 8 }}
                                color="#000"
                              />
                            </Td>
                          </Tr>
                        );
                      })
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Blood Pressure Tab Content */}
          <TabPanel>
            <AppDrawer
              isOpenSide={isNewBloodPressureDrawerOpen}
              onCloseSide={onNewBloodPressureDrawerClose}
              side="right"
              size="md"
              children={<BloodPressureSide onBloodPressureAdded={fetchBloodPressureData} />}
            />
            <FilterSection />
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Blood Pressure Readings
                </Text>
                <Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <Button
                    size="sm"
                    backgroundColor="#073DFC"
                    color="white"
                    borderRadius="20px"
                    fontSize="14px"
                    fontWeight="400"
                    height="25px"
                    width="80px"
                    marginLeft="10px"
                    onClick={onNewBloodPressureDrawerOpen}
                  >
                    Add New
                  </Button>
                </Flex>
              </Flex>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Time
                      </Th>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Blood Pressure
                      </Th>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Pulse Rate
                      </Th>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Notes
                      </Th>
                      <Th
                        style={{
                          fontFamily: "IBM Plex Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#454545",
                        }}
                      >
                        Actions
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isBloodPressureLoading ? (
                      <Tr>
                        <Td colSpan={6} textAlign="center" py={8}>
                          <Spinner size="sm" />
                          <Text ml={2}>Loading blood pressure readings...</Text>
                        </Td>
                      </Tr>
                    ) : bloodPressureReadings.length === 0 ? (
                      <Tr>
                        <Td colSpan={6} textAlign="center" py={8}>
                          <Text color="gray.500">No blood pressure readings found</Text>
                        </Td>
                      </Tr>
                    ) : (
                      bloodPressureReadings.map((reading) => {
                        const date = new Date(reading.reading_date);
                        const time = reading.reading_time || 'N/A';
                        const formattedDate = date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });

                        return (
                          <Tr
                            key={reading.id}
                            mb="5px"
                            style={{
                              borderBottom: "1px solid #F0F0F0",
                            }}
                          >
                            <Td
                              style={{
                                fontFamily: "IBM Plex Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#454545",
                              }}
                            >
                              {formattedDate}
                            </Td>
                            <Td
                              style={{
                                fontFamily: "IBM Plex Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#454545",
                              }}
                            >
                              {time}
                            </Td>
                            <Td
                              style={{
                                fontFamily: "IBM Plex Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#454545",
                              }}
                            >
                              {reading.systolic_pressure}/{reading.diastolic_pressure} mmHg
                            </Td>
                            <Td
                              style={{
                                fontFamily: "IBM Plex Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#454545",
                              }}
                            >
                              {reading.pulse_rate ? `${reading.pulse_rate} BPM` : 'N/A'}
                            </Td>
                            <Td
                              style={{
                                fontFamily: "IBM Plex Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#454545",
                              }}
                            >
                              {reading.notes || 'N/A'}
                            </Td>
                            <Td>
                              <Flex gap={2}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  fontSize="8px"
                                  height="20px"
                                  width="50px"
                                  onClick={() => {
                                    setSelectedBloodPressureReading(reading);
                                    onViewBloodPressureDrawerOpen();
                                  }}
                                >
                                  View
                                </Button>
                              </Flex>
                            </Td>
                          </Tr>
                        );
                      })
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Provisional Diagnosis Tab Content (Placeholder) */}
          <TabPanel>
            <AppModal
              isOpen={isProvisionalDetailsModalOpen} // Use specific state
              onClose={onProvisionalDetailsModalClose} // Use specific state
              modalSize="md"
              children={
                <ProvisionalDetails onClose={onProvisionalDetailsModalClose} />
              }
            />
            <FilterSection />
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Recent
                </Text>
                <Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <FiChevronRight
                    size="15px"
                    style={{ marginLeft: 8 }}
                    color="#073DFC"
                  />
                </Flex>
              </Flex>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              {/* rows */}
              <TableContainer w="100%" h="100%">
                <Table
                  size="sm"
                  bg="transparent"
                  rounded="md"
                  variant="unstyled"
                  mb="20px"
                  border="1px"
                >
                  <Thead
                    bg="transparent"
                    rounded="3xl"
                    style={{ color: "#000000" }}
                  >
                    <Tr
                      style={{
                        borderRadius: "7px",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                    >
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Time
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Previous Diagnosis
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Tr
                      mb="5px"
                      style={{
                        borderRadius: "40px",
                        borderColor: "transparent",
                        fontSize: "14px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="14px">20/05/2025 08:00 PM</Td>
                      <Td fontSize="14px">Prosper Absalom</Td>
                      <Td fontSize="14px">PNEUMONIA</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Investigations Tab Content (Placeholder) */}
          <TabPanel>
            <AppModal
              isOpen={isProvisionalDetailsModalOpen} // Assuming ProvisionalDetails is used here too
              onClose={onProvisionalDetailsModalClose}
              modalSize="md"
              children={
                <ProvisionalDetails onClose={onProvisionalDetailsModalClose} />
              }
            />

            <Flex
              width="100%"
              justifyContent="space-between"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
              gap={5}
            >
              <InvestigationSteps />
              <Box
                width="100%"
                // bg="white"
                // border="1px solid"
                // borderColor="gray.200"
                borderRadius="12px"
                fontFamily="IBM Plex Sans, sans-serif"
                overflow="visible"
                ref={dropdownRef}
                position="relative"
              >
                <Box p={4}>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "19px",
                      fontWeight: 500,
                      color: "#211f1fff",
                      marginBottom: "10px",
                    }}
                  >
                    {/* fontSize="lg" fontWeight="600" color="gray.700" */}
                    Haematology
                  </Text>
                </Box>
                {/* Header */}
                <Box p={4} borderBottom="1px solid" borderColor="gray.200">
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#454545",
                      marginBottom: "20px",
                    }}
                  >
                    {/* fontSize="lg" fontWeight="600" color="gray.700" */}
                    Select Test
                  </Text>
                </Box>

                {/* Search Input */}
                <Box p={4} position="relative">
                  <Input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    placeholder="Search for tests..."
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="8px"
                    fontSize="sm"
                    color="gray.600"
                    _placeholder={{ color: "gray.400" }}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px #63B3ED",
                    }}
                  />

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      right="0"
                      bg="white"
                      paddingX={3}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="8px"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                      zIndex="1000"
                      mt={1}
                      maxHeight="300px"
                      overflowY="auto"
                    >
                      <VStack spacing={0} align="stretch">
                        {filteredTests.length > 0 ? (
                          filteredTests.map((test, index) => (
                            <HStack
                              key={test.id}
                              p={3}
                              spacing={3}
                              borderBottom={
                                index < filteredTests.length - 1
                                  ? "1px solid"
                                  : "none"
                              }
                              borderColor="gray.100"
                              cursor="pointer"
                              _hover={{ bg: "gray.50" }}
                              onClick={() => toggleTest(test.id)}
                            >
                              <Flex justifyContent="space-between" width="100%">
                                <Text
                                // fontSize="sm"
                                // color="gray.700"
                                // flex="1"
                                // fontWeight="500"
                                >
                                  {test.name}
                                </Text>

                                <Box
                                  width="20px"
                                  height="20px"
                                  borderRadius="4px"
                                  border="2px solid"
                                  borderColor={
                                    test.isSelected ? "blue.500" : "gray.300"
                                  }
                                  bg={
                                    test.isSelected ? "blue.500" : "transparent"
                                  }
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  transition="all 0.2s"
                                >
                                  {test.isSelected ? (
                                    <FiCheck color="white" size={12} />
                                  ) : (
                                    <FiPlus color="#CBD5E0" size={12} />
                                  )}
                                </Box>
                              </Flex>
                            </HStack>
                          ))
                        ) : (
                          <Box p={4} textAlign="center">
                            <Text>
                              {/* fontSize="sm" color="gray.500" */}
                              No tests found
                            </Text>
                          </Box>
                        )}
                      </VStack>
                    </Box>
                  )}
                </Box>
                <AppModal
                  isOpen={isInvestigationModalOpen} // Use specific state
                  onClose={onInvestigationModalClose} // Use specific state
                  modalSize="md"
                  children={
                    <InvestigationModal onClose={onInvestigationModalClose} />
                  }
                />
                {/* Footer with Share Button */}
                <Flex p={4} justifyContent="flex-end">
                  <AppButton
                    label="Share"
                    background="#073DFC"
                    color="white"
                    width="140px"
                    borderColor="#DCDCDC"
                    onClick={onInvestigationModalOpen}
                  />
                </Flex>
              </Box>
            </Flex>
          </TabPanel>
          {/* Investigation Result Tab Content (Placeholder) */}
          <TabPanel>
            <FilterSection />
            <Box
              overflowX="auto"
              mb={4}
              pt={5}
              background="white"
              mt={3}
              px={2}
              rounded="3"
            >
              <Text
                style={{ marginBottom: "40px", paddingLeft: "14px" }}
                color="#6D6D6D"
              >
                Recent
              </Text>
              <Table variant="simple" style={{ marginTop: "30px" }} size="sm">
                <Thead>
                  <Tr>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      Patient
                    </Th>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      Name
                    </Th>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      Type
                    </Th>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      Status
                    </Th>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      Date
                    </Th>
                    <Th fontSize="15px" color="#6D6D6D" fontWeight="500">
                      ACTIONS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Avatar src="/placeholder-user.jpg" size="sm" />
                    </Td>
                    <Td fontSize="12px" color="#000">
                      eliakim shasha
                    </Td>
                    <Td fontSize="12px" color="#000">
                      cash
                    </Td>
                    <Td>
                      <Badge
                        fontSize="14px"
                        px={2}
                        py={1}
                        width="70px"
                        textAlign="center"
                        borderRadius="4px"
                      >
                        pending
                      </Badge>
                    </Td>
                    <Td fontSize="12px" color="#000">
                      17/8/2025
                    </Td>
                    <Td>
                      <Text>Details</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          {/* Definitive diagnosis Tab Content (Placeholder) */}
          <TabPanel>
            <AppModal
              isOpen={isDefinitiveDetailsModalOpen} // Use specific state
              onClose={onDefinitiveDetailsModalClose} // Use specific state
              modalSize="md"
              children={
                <DefinitiveDetails onClose={onDefinitiveDetailsModalClose} />
              }
            />
            <FilterSection />
            <Box
              width="100%"
              fontFamily="IBM Plex Sans, sans-serif"
              border="1px solid #D9D9D9"
              borderRadius="10px"
              marginTop="30px"
            >
              {/* table title */}
              <Flex
                padding="10px 20px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  style={{
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#454545",
                  }}
                >
                  Recent
                </Text>
                <Flex>
                  <Text
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#073DFC",
                    }}
                  >
                    View All
                  </Text>
                  <FiChevronRight
                    size="15px"
                    style={{ marginLeft: 8 }}
                    color="#073DFC"
                  />
                </Flex>
              </Flex>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              {/* rows */}
              <TableContainer w="100%" h="100%">
                <Table
                  size="sm"
                  bg="transparent"
                  rounded="md"
                  variant="unstyled"
                  mb="20px"
                  border="1px"
                >
                  <Thead
                    bg="transparent"
                    rounded="3xl"
                    style={{ color: "#000000" }}
                  >
                    <Tr
                      style={{
                        borderRadius: "7px",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                    >
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "14px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Tr
                      mb="5px"
                      style={{
                        borderRadius: "40px",
                        borderColor: "transparent",
                        fontSize: "14px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="14px">Jun 20</Td>
                      <Td fontSize="14px">Prosper Absalom</Td>
                      <Td fontSize="14px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="14px">
                        <Link
                          color="blue"
                          onClick={onDefinitiveDetailsModalOpen}
                        >
                          {" "}
                          {/* Trigger DefinitiveDetails modal */}
                          details
                        </Link>
                      </Td>
                      <Td fontSize="14px">
                        <FiChevronRight
                          size="15px"
                          style={{ marginLeft: 8 }}
                          color="#000"
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          {/* Treatment Tab Content (Placeholder) */}
          <TabPanel>
            <AppModal
              isOpen={isTreatmentModalOpen} // Use specific state
              onClose={onTreatmentModalClose} // Use specific state
              modalSize="md"
              children={<TreatmentModal onClose={onTreatmentModalClose} />}
            />
            <Box p={4} bg="white" rounded="md" shadow="sm">
              <Text
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "black",
                }}
              >
                Create E-Prescription
              </Text>
              <Flex
                border="1px solid #E2E8F0"
                mt={10}
                borderRadius="md"
                p={2}
                mb={4}
                alignItems="center"
                gap={3}
              >
                <Button variant="ghost" size="sm">
                  <Text style={{ fontWeight: "bold" }}>B</Text>
                </Button>
                <Button variant="ghost" size="sm">
                  <Text style={{ fontStyle: "italic" }}>I</Text>
                </Button>
                <Button variant="ghost" size="sm">
                  <Text style={{ textDecoration: "underline" }}>U</Text>
                </Button>
                <Button variant="ghost" size="sm">
                  <LinkIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <PenIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <ListIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <ListOrderedIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignLeftIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignCenterIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignRightIcon size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignJustifyIcon size={16} />
                </Button>
              </Flex>
              <Textarea
                placeholder="Enter Complaint Description"
                minH="300px"
                borderColor="#E2E8F0"
                _placeholder={{ color: "#A0AEC0" }}
                fontFamily="IBM Plex Sans, sans-serif"
                fontSize="14px"
                p={4}
              />
              <Flex justifyContent="flex-end" mt={4}>
                <AppButton
                  label="Next"
                  background="#073DFC"
                  color="white"
                  width="140px"
                  borderColor="#DCDCDC"
                  onClick={onTreatmentModalOpen}
                />
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Details;
