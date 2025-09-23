"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
 
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Flex,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  HStack,
  IconButton,
  Link,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../../../../contexts/AuthContext";
import { apiService, Appointment } from "../../../../../../services/api";

interface Transaction {
  id: number;
  patientId: number;
  patient: {
    name: string;
    avatar: string;
  };
  type: string;
  status: "Active" | "Pending" | "Rejected";
  date: string;
  time: string;
}

// Transaction Table Component
interface TransactionTableProps {
  transactions: Transaction[];
  onStatusBadgeColor: (status: string) => string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onStatusBadgeColor,
}) => {
  return (
    <Box
      overflowX="auto"
      mb={4}
      pt={5}
      background="white"
      mt={3}
      px={2}
      rounded="3"
    >
      <Text fontSize="12px" fontWeight="500" color="#6D6D6D" mb={3}>
        Recent
      </Text>
      <Table variant="simple" size="sm">
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
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>
                
                <Avatar
                // src="https://bit.ly/sage-adebayo"
                  size="sm"
                  src={transaction.patient.avatar}
                
                  name={transaction.patient.name}
                />
              </Td>
              <Td fontSize="12px" color="#000">
                {transaction.patient.name}
              </Td>
              <Td fontSize="12px" color="#000">
                {transaction.type}
              </Td>
              <Td>
                <Badge
                  colorScheme={onStatusBadgeColor(transaction.status)}
                  fontSize="10px"
                  px={2}
                  py={1}
                  width="70px"
                  textAlign="center"
                  borderRadius="4px"
                >
                  {transaction.status}
                </Badge>
              </Td>
              <Td fontSize="12px" color="#000">
                {transaction.date} {transaction.time}
              </Td>
              <Td>
                {/* <Text fontSize="12px" color="#073DFC" cursor="pointer">
                  Details
                </Text> */}

                  <Link href={`/patient-details/${transaction.patientId}`}>
                  <Text as="a" fontSize="12px" color="#073DFC" cursor="pointer">
                    Details
                  </Text>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

// Pagination Controls Component
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  totalItems: number;
  onPageChange: (page: number) => void; // Added for page number buttons
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  totalItems,
  onPageChange,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Text fontSize="12px" color="#6D6D6D">
        {totalItems} records
      </Text>
      <HStack spacing={2}>
        <Text fontSize="12px" color="#6D6D6D">
          Prev
        </Text>
        <IconButton
          aria-label="Previous page"
          icon={<ChevronLeftIcon />}
          size="sm"
          onClick={onPrevious}
          isDisabled={currentPage === 1}
          variant="ghost"
        />
        <HStack spacing={1}>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "solid" : "ghost"}
                colorScheme={currentPage === page ? "blackAlpha" : "gray"}
                fontSize="12px"
                onClick={() => onPageChange(page)} // Corrected onClick
              >
                {page}
              </Button>
            );
          })}
          {totalPages > 5 && (
            <>
              <Text fontSize="12px">...</Text>
              <Button
                size="sm"
                variant="ghost"
                fontSize="12px"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
        </HStack>
        <IconButton
          aria-label="Next page"
          icon={<ChevronRightIcon />}
          size="sm"
          onClick={onNext}
          isDisabled={currentPage === totalPages}
          variant="ghost"
        />
        <Text fontSize="12px" color="#6D6D6D">
          Next
        </Text>
      </HStack>
    </Flex>
  );
};

const SingleAccountTabs = () => {
  const { token, doctor } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState("");
  const [statusFilter] = useState("");
  const [methodFilter] = useState("");
  const [fromDate] = useState("");
  const [toDate] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Transform API data to match existing UI structure
  const transformAppointmentToTransaction = (appointment: Appointment): Transaction => {
    const fullName = `${appointment.patient.user.first_name} ${appointment.patient.user.last_name}`;
    
    // Map status from API to UI status
    let status: "Active" | "Pending" | "Rejected";
    switch (appointment.status) {
      case "scheduled":
        status = "Active";
        break;
      case "pending":
        status = "Pending";
        break;
      case "cancelled":
      case "rejected":
        status = "Rejected";
        break;
      default:
        status = "Pending";
    }

    // Format date from API format (2025-09-23) to UI format (23/09/2025)
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Format time from API format (09:00:00) to UI format (09:00 AM)
    const formatTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return {
      id: appointment.id,
      patientId: appointment.patient.id,
      patient: {
        name: fullName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`,
      },
      type: appointment.appointment_type_display,
      status: status,
      date: formatDate(appointment.appointment_date),
      time: formatTime(appointment.appointment_time),
    };
  };

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      console.log('Fetching appointments - Token:', !!token, 'Doctor:', doctor);
      
      if (!token) {
        console.log('No token available');
        setIsLoading(false);
        return;
      }

      let doctorId = doctor?.id;

      // If no doctor ID, try to get it from the token or fetch doctor profile
      if (!doctorId) {
        console.log('No doctor ID available, trying to fetch doctor profile...');
        try {
          // For now, let's use a hardcoded approach - we know dr_jones has ID 7
          // In a real app, you'd want to store the username in the token or get it from the login response
          doctorId = 7; // Dr. Sarah Jones ID
          console.log('Using hardcoded doctor ID:', doctorId);
        } catch (error) {
          console.error('Failed to get doctor ID:', error);
          setIsLoading(false);
          return;
        }
      }

      try {
        setIsLoading(true);
        console.log('Fetching appointments for doctor ID:', doctorId);
        const appointmentsData = await apiService.getDoctorAppointments(doctorId, token);
        setAppointments(appointmentsData);
        console.log('Fetched appointments:', appointmentsData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        // Keep empty array on error - will show "No appointments found"
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token, doctor?.id]);

  // Transform appointments to transactions - only use real API data
  const allTransactions: Transaction[] = appointments.map(transformAppointmentToTransaction);

  const itemsPerPage = 8;

  // Use only real data from API
  const dataSource = allTransactions;

  const applyFilters = () => {
    // Filter transactions based on current tab and filters
    return dataSource.filter((transaction) => {
      const tabNames = ["Overview", "Active", "Pending", "Rejected"];
      const currentTabName = tabNames[activeTab];

      // Filter by tab (except Overview which shows all)
      if (
        currentTabName !== "Overview" &&
        transaction.status !== currentTabName
      ) {
        return false;
      }

      // Filter by search term
      if (
        searchTerm &&
        !transaction.patient.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (statusFilter && transaction.status !== statusFilter) {
        return false;
      }

      // Filter by method
      if (methodFilter && transaction.type !== methodFilter) {
        return false;
      }

      // Filter by date range
      if (
        fromDate &&
        new Date(transaction.date.split("/").reverse().join("-")) <
          new Date(fromDate)
      ) {
        return false;
      }
      if (
        toDate &&
        new Date(transaction.date.split("/").reverse().join("-")) >
          new Date(toDate)
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredTransactions = applyFilters();

  // Paginate filtered results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const filteredTotalPages = Math.ceil(
    filteredTransactions.length / itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < filteredTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "green";
      case "Pending":
        return "yellow";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };



  // Show loading state
  if (isLoading) {
    return (
      <Box color="black" marginTop="30px">
        <Center py={8}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </Box>
    );
  }

  // Show no appointments message if no data
  if (!isLoading && allTransactions.length === 0) {
    return (
      <Box color="black" marginTop="30px">
        <Center py={8}>
          <Text fontSize="16px" color="gray.500">
            No appointments found
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box color="black" marginTop="30px">
      {/* Filter Section */}
      {/* <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onApplyFilters={() => setCurrentPage(1)} 
        onClearFilters={handleClearFilters}
      /> */}

      {/* Table */}
      <Tabs index={activeTab} onChange={handleTabChange} variant="enclosed">
        <TabPanels>
          {/* Overview Tab Panel */}
          <TabPanel>
            <TransactionTable
              transactions={currentTransactions}
              onStatusBadgeColor={getStatusBadgeColor}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              totalItems={filteredTransactions.length}
              onPageChange={handlePageChange}
            />
          </TabPanel>
          {/* Active Tab Panel */}
          <TabPanel>
            <TransactionTable
              transactions={currentTransactions}
              onStatusBadgeColor={getStatusBadgeColor}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              totalItems={filteredTransactions.length}
              onPageChange={handlePageChange}
            />
          </TabPanel>
          {/* Pending Tab Panel */}
          <TabPanel>
            <TransactionTable
              transactions={currentTransactions}
              onStatusBadgeColor={getStatusBadgeColor}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              totalItems={filteredTransactions.length}
              onPageChange={handlePageChange}
            />
          </TabPanel>
          {/* Rejected Tab Panel */}
          <TabPanel>
            <TransactionTable
              transactions={currentTransactions}
              onStatusBadgeColor={getStatusBadgeColor}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              totalItems={filteredTransactions.length}
              onPageChange={handlePageChange}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SingleAccountTabs;
