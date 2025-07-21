"use client";

import type React from "react";
import { useState } from "react";
import {
  Tab,
  TabList,
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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface Transaction {
  id: number;
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

                  <Link href={`/patient-details/${transaction.id}`}>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - replace with your actual data
  const allTransactions: Transaction[] = [
    {
      id: 1,
      patient: {
        name: "Neema Adam",
        avatar: "https://bit.ly/dan-abramov",
      },
      type: "Clinic Visit",
      status: "Active",
      date: "20/05/2025",
      time: "08:00 PM",
    },
    {
      id: 2,
      patient: {
        name: "Mohamed Ngatama",
        avatar: "https://bit.ly/sage-adebayo",
      },
      type: "Clinic Visit",
      status: "Pending",
      date: "20/05/2025",
      time: "08:00 PM",
    },
    {
      id: 3,
      patient: {
        name: "Neema Adam",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      },
      type: "Clinic Visit",
      status: "Rejected",
      date: "20/05/2025",
      time: "08:00 PM",
    },
    {
      id: 4,
      patient: {
        name: "Aisha Said",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Online Consultation",
      status: "Active",
      date: "19/05/2025",
      time: "10:00 AM",
    },
    {
      id: 5,
      patient: {
        name: "Juma Hassan",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Lab Test",
      status: "Pending",
      date: "18/05/2025",
      time: "02:30 PM",
    },
    {
      id: 6,
      patient: {
        name: "Fatma Ali",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Clinic Visit",
      status: "Active",
      date: "17/05/2025",
      time: "09:00 AM",
    },
    {
      id: 7,
      patient: {
        name: "Hamisi Omar",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Online Consultation",
      status: "Rejected",
      date: "16/05/2025",
      time: "04:00 PM",
    },
    {
      id: 8,
      patient: {
        name: "Zainab Kassim",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Lab Test",
      status: "Pending",
      date: "15/05/2025",
      time: "11:00 AM",
    },
    {
      id: 9,
      patient: {
        name: "Said Abdallah",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      type: "Clinic Visit",
      status: "Active",
      date: "14/05/2025",
      time: "01:00 PM",
    },
  ];

  const itemsPerPage = 8;

  const applyFilters = () => {
    // Filter transactions based on current tab and filters
    return allTransactions.filter((transaction) => {
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

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setMethodFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

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
