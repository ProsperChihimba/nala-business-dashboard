"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService, DoctorNoteExtended } from "../../../../services/api";

// Error boundary component
const ErrorDisplay = ({ error }: { error: string }) => (
  <Flex direction="column" height="100%" minH="400px" p={6}>
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      <VStack align="start" spacing={1}>
        <Text fontWeight="medium">Error</Text>
        <Text fontSize="sm">{error}</Text>
      </VStack>
    </Alert>
  </Flex>
);

interface ClerkDrawerProps {
  clerkSheetId: number | null;
  patientId: number | null;
}

const ClerkDrawer: React.FC<ClerkDrawerProps> = ({ clerkSheetId, patientId }) => {
  const { token } = useAuth();
  const [clerkSheetDetails, setClerkSheetDetails] = useState<DoctorNoteExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('ClerkDrawer rendered with:', { clerkSheetId, patientId, hasToken: !!token });

  useEffect(() => {
    const fetchClerkSheetDetails = async () => {
      if (!patientId || !token) {
        console.error('Missing patient ID or token:', { patientId, hasToken: !!token });
        setError('Missing patient ID or authentication token');
        setIsLoading(false);
        return;
      }

      if (!clerkSheetId) {
        console.error('Missing clerk sheet ID');
        setError('Missing clerk sheet ID');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching clerk sheet details:', { patientId, clerkSheetId });
        const notes = await apiService.getPatientNotesDetails(patientId, token);
        console.log('Received notes:', notes);
        
        // Find the specific clerk sheet by ID
        const selectedNote = notes.find(note => note.id === clerkSheetId);
        console.log('Selected note:', selectedNote);
        
        if (selectedNote) {
          setClerkSheetDetails(selectedNote);
        } else {
          console.warn('Clerk sheet not found in response. Available IDs:', notes.map(n => n.id));
          setError(`Clerk sheet with ID ${clerkSheetId} not found`);
        }
      } catch (err) {
        console.error('Error fetching clerk sheet details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch clerk sheet details');
      } finally {
        setIsLoading(false);
      }
    };

    if (clerkSheetId && patientId) {
      fetchClerkSheetDetails();
    } else {
      setIsLoading(false);
    }
  }, [clerkSheetId, patientId, token]);

  // Parse recorded_details to extract sections
  const parseRecordedDetails = (details: string) => {
    const sections: Record<string, string> = {
      'CHIEF COMPLAINTS': '',
      'HISTORY OF PRESENTING ILLNESS': '',
      'REVIEW OF SYSTEMS': '',
      'PAST MEDICAL AND SURGICAL HISTORY': '',
      'FAMILY AND SOCIAL HISTORY': '',
      'ADDITIONAL NOTES': '',
    };

    if (!details) return sections;

    const lines = details.split('\n');
    let currentSection = '';
    let currentContent: string[] = [];

    for (const line of lines) {
      const upperLine = line.trim().toUpperCase();
      if (sections.hasOwnProperty(upperLine)) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n').trim();
        }
        currentSection = upperLine;
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    }

    if (currentSection) {
      sections[currentSection] = currentContent.join('\n').trim();
    }

    return sections;
  };

  // Show loading state
  if (isLoading) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Clerk Sheet Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <VStack spacing={4}>
            <Spinner size="lg" />
            <Text fontSize="sm" color="gray.500">Loading clerk sheet details...</Text>
          </VStack>
        </Center>
      </Flex>
    );
  }

  // Show error state
  if (error) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Clerk Sheet Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Box px={6} py={4}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="medium">Error loading clerk sheet</Text>
              <Text fontSize="sm">{error}</Text>
            </VStack>
          </Alert>
        </Box>
      </Flex>
    );
  }

  // Show empty state
  if (!clerkSheetDetails) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Clerk Sheet Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <Text fontSize="sm" color="gray.500">No clerk sheet details available</Text>
        </Center>
      </Flex>
    );
  }

  // Safely parse recorded_details
  let parsedDetails: Record<string, string>;
  try {
    parsedDetails = parseRecordedDetails(clerkSheetDetails.recorded_details || '');
  } catch (err) {
    console.error('Error parsing recorded details:', err);
    parsedDetails = {
      'CHIEF COMPLAINTS': '',
      'HISTORY OF PRESENTING ILLNESS': '',
      'REVIEW OF SYSTEMS': '',
      'PAST MEDICAL AND SURGICAL HISTORY': '',
      'FAMILY AND SOCIAL HISTORY': '',
      'ADDITIONAL NOTES': '',
    };
  }

  return (
    <Flex direction="column" height="100%" minH="400px">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontSize="xl" fontWeight="medium">
          Clerk Sheet Details
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Patient and Doctor Info */}
      <Box px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Patient:
            </Text>
            <Text fontSize="sm">
              {clerkSheetDetails.patient?.user?.first_name && clerkSheetDetails.patient?.user?.last_name
                ? `${clerkSheetDetails.patient.user.first_name} ${clerkSheetDetails.patient.user.last_name}`
                : 'N/A'}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Doctor:
            </Text>
            <Text fontSize="sm">
              {clerkSheetDetails.doctor?.user?.first_name && clerkSheetDetails.doctor?.user?.last_name
                ? `Dr. ${clerkSheetDetails.doctor.user.first_name} ${clerkSheetDetails.doctor.user.last_name}`
                : 'N/A'}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              File Number:
            </Text>
            <Text fontSize="sm">{clerkSheetDetails.file_number || 'N/A'}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Recorded By:
            </Text>
            <Text fontSize="sm">{clerkSheetDetails.recorded_by || 'N/A'}</Text>
          </HStack>
          {clerkSheetDetails.date_of_clerkship && (
            <HStack justify="space-between">
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Date of Clerkship:
              </Text>
              <Text fontSize="sm">
                {new Date(clerkSheetDetails.date_of_clerkship).toLocaleDateString()}
              </Text>
            </HStack>
          )}
        </VStack>
      </Box>

      {/* Tabs */}
      <Tabs fontFamily="IBM Plex Sans, sans-serif" color="#6D6D6D" flex="1" display="flex" flexDirection="column">
        <TabList display="flex" justifyContent="space-between" px={6} pt={4}>
          <Tab fontWeight="500" fontSize="13px">Complaints</Tab>
          <Tab fontWeight="500" fontSize="13px">HPI</Tab>
          <Tab fontWeight="500" fontSize="13px">ROS</Tab>
          <Tab fontWeight="500" fontSize="13px">PMHx</Tab>
          <Tab fontWeight="500" fontSize="13px">FSHx</Tab>
      </TabList>

        <TabPanels flex="1" overflowY="auto" px={6} py={4}>
          {/* Complaints Tab */}
        <TabPanel padding="0px">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Chief Complaints
              </Text>
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
                minH="100px"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {parsedDetails['CHIEF COMPLAINTS'] || 'No complaints recorded'}
                </Text>
              </Box>

              {/* Additional Notes */}
              {parsedDetails['ADDITIONAL NOTES'] && (
                <>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600" mt={4}>
                    Additional Notes
                  </Text>
                  <Box
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    bg="gray.50"
                    minH="80px"
                  >
                    <Text fontSize="sm" whiteSpace="pre-wrap">
                      {parsedDetails['ADDITIONAL NOTES']}
                    </Text>
                  </Box>
                </>
              )}

              {/* Treatment Plan */}
              {clerkSheetDetails.treatment_plan && (
                <>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600" mt={4}>
                    Treatment Plan
                  </Text>
                  <Box
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    bg="gray.50"
                    minH="60px"
                  >
                    <Text fontSize="sm" whiteSpace="pre-wrap">
                      {clerkSheetDetails.treatment_plan}
                    </Text>
                  </Box>
                </>
              )}

              {/* Follow-up Information */}
              {clerkSheetDetails.follow_up_required && (
                <VStack align="stretch" spacing={2} mt={4}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    Follow-up Information
                  </Text>
                  {clerkSheetDetails.follow_up_date && (
                    <HStack>
                      <Text fontSize="sm" fontWeight="medium" color="gray.600">
                        Follow-up Date:
                      </Text>
                      <Text fontSize="sm">
                        {new Date(clerkSheetDetails.follow_up_date).toLocaleDateString()}
                      </Text>
                    </HStack>
                  )}
                  {clerkSheetDetails.follow_up_notes && (
                    <Box
                      p={4}
                      borderRadius="md"
                      border="1px solid"
                      borderColor="gray.200"
                      bg="gray.50"
                      minH="60px"
                    >
                      <Text fontSize="sm" whiteSpace="pre-wrap">
                        {clerkSheetDetails.follow_up_notes}
                      </Text>
                    </Box>
                  )}
                </VStack>
              )}
            </VStack>
        </TabPanel>

          {/* HPI Tab */}
        <TabPanel padding="0px">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                History of Presenting Illness
              </Text>
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
                minH="200px"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {parsedDetails['HISTORY OF PRESENTING ILLNESS'] || 'No history recorded'}
                </Text>
              </Box>
            </VStack>
        </TabPanel>

          {/* ROS Tab */}
        <TabPanel padding="0px">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Review of Systems
              </Text>
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
                minH="200px"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {parsedDetails['REVIEW OF SYSTEMS'] || 'No review recorded'}
                </Text>
              </Box>
            </VStack>
        </TabPanel>

          {/* PMHx Tab */}
        <TabPanel padding="0px">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Past Medical and Surgical History
              </Text>
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
                minH="200px"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {parsedDetails['PAST MEDICAL AND SURGICAL HISTORY'] || 'No history recorded'}
                </Text>
              </Box>
            </VStack>
        </TabPanel>

          {/* FSHx Tab */}
        <TabPanel padding="0px">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Family and Social History
              </Text>
              <Box
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
                minH="200px"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {parsedDetails['FAMILY AND SOCIAL HISTORY'] || 'No history recorded'}
                </Text>
              </Box>
            </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Flex>
  );
};

export default ClerkDrawer;
