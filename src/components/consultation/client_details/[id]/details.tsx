"use client";

import { useState } from "react";
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
import { Divider, Typography } from "antd";
import { useParams } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiPlus, FiVideo } from "react-icons/fi";
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
  const { id } = useParams<{ id: string }>();

  // State for the "New Vital" drawer
  const {
    isOpen: isNewVitalDrawerOpen,
    onOpen: onNewVitalDrawerOpen,
    onClose: onNewVitalDrawerClose,
  } = useDisclosure();
  // State for the "View Vital" drawer
  const {
    isOpen: isViewVitalDrawerOpen,
    onOpen: onViewVitalDrawerOpen,
    onClose: onViewVitalDrawerClose,
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
    isOpen: isTreatmentModalOpen,
    onOpen: onTreatmentModalOpen,
    onClose: onTreatmentModalClose,
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

  const { Text } = Typography;
  const [tabIndex, setTabIndex] = useState(0);

  const patient = mockPatientDetails.find((p) => p.id === Number(id));

  if (!patient) {
    return <Text>Patient not found.</Text>;
  }

  return (
    <Box p={6} bg=" #F9F9F9" minH="100vh" rounded={9}>
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
          {tabIndex !== 2 && tabIndex !== 3 && (
            <>
              <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm">
                  Contact Patient
                </MenuButton>
                <MenuList>
                  <MenuItem> <FiVideo  /> <Text style={{marginLeft:"10px"}}>Video Call</Text></MenuItem>
                  <MenuItem><MdOutlineCall /><Text style={{marginLeft:"10px"}}>Audio Call</Text></MenuItem>
                  <MenuItem><MdSms /><Text style={{marginLeft:"10px"}}>SMS Chat</Text></MenuItem>
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
            <AppButton
              label="New Vital"
              background="#073DFC"
              color="white"
              icon={<FiPlus size="15px" style={{ marginRight: 8 }} />}
              width="140px"
              borderColor="#DCDCDC"
              onClick={onNewVitalDrawerOpen}
            />
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
                        fontSize: "10px",
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        To
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Amount
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Initiated by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      ></Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">Jun 20</Td>
                      <Td fontSize="10px">FACEBOOK</Td>
                      <Td fontSize="10px">$230</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">
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
                        fontSize="10px"
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">Jun 20</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="10px">
                        <Link
                          color="blue"
                          onClick={onProvisionalDetailsModalOpen}
                        >
                          {" "}
                          {/* Trigger ProvisionalDetails modal */}
                          details
                        </Link>
                      </Td>
                      <Td fontSize="10px">
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
              children={<VitalSide />}
            />
            {/* AppDrawer for viewing vital details */}
            <AppDrawer
              isOpenSide={isViewVitalDrawerOpen}
              onCloseSide={onViewVitalDrawerClose}
              modalSize="md"
              children={<ViewVitalSide />}
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">Jun 20</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="10px">
                        <Link color="blue" onClick={onViewVitalDrawerOpen}>
                          {" "}
                          details
                        </Link>
                      </Td>
                      <Td fontSize="10px">
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Time
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">20/05/2025 08:00 PM</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">PNEUMONIA</Td>
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">Jun 20</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="10px">
                        <Link
                          color="blue"
                          onClick={onProvisionalDetailsModalOpen}
                        >
                          {" "}
                          {/* Trigger ProvisionalDetails modal */}
                          details
                        </Link>
                      </Td>
                      <Td fontSize="10px">
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
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
                      Patient
                    </Th>
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
                      Name
                    </Th>
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
                      Type
                    </Th>
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
                      Status
                    </Th>
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
                      Date
                    </Th>
                    <Th fontSize="11px" color="#6D6D6D" fontWeight="500">
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
                        fontSize="10px"
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
                    fontSize: "11px",
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
                      fontSize: "10px",
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
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Date
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded by
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
                          color: "#6D6D6D",
                          fontWeight: "500",
                          fontFamily: "IBM Plex Sans, sans-serif",
                        }}
                      >
                        Recorded details
                      </Th>
                      <Th
                        style={{
                          fontSize: "10px",
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
                        fontSize: "10px",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Td fontSize="10px">Jun 20</Td>
                      <Td fontSize="10px">Prosper Absalom</Td>
                      <Td fontSize="10px">Chief Complaints, Diagnosis</Td>
                      <Td fontSize="10px">
                        <Link
                          color="blue"
                          onClick={onDefinitiveDetailsModalOpen}
                        >
                          {" "}
                          {/* Trigger DefinitiveDetails modal */}
                          details
                        </Link>
                      </Td>
                      <Td fontSize="10px">
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
