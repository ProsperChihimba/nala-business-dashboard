"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  DrawerCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService, Prescription } from "../../../../services/api";

interface ViewPrescriptionDrawerProps {
  prescriptionId: number | null;
}

const ViewPrescriptionDrawer: React.FC<ViewPrescriptionDrawerProps> = ({ prescriptionId }) => {
  const { token } = useAuth();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      if (!prescriptionId || !token) {
        setError('Missing prescription ID or authentication token');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching prescription details:', prescriptionId);
        const prescriptionData = await apiService.getPrescriptionById(prescriptionId, token);
        console.log('Received prescription:', prescriptionData);
        setPrescription(prescriptionData);
      } catch (err) {
        console.error('Error fetching prescription details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch prescription details');
      } finally {
        setIsLoading(false);
      }
    };

    if (prescriptionId) {
      fetchPrescriptionDetails();
    }
  }, [prescriptionId, token]);

  if (isLoading) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Prescription Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <VStack spacing={4}>
            <Spinner size="lg" />
            <Text fontSize="sm" color="gray.500">Loading prescription details...</Text>
          </VStack>
        </Center>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Prescription Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Box px={6} py={4}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="medium">Error loading prescription</Text>
              <Text fontSize="sm">{error}</Text>
            </VStack>
          </Alert>
        </Box>
      </Flex>
    );
  }

  if (!prescription) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Prescription Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <Text fontSize="sm" color="gray.500">No prescription details available</Text>
        </Center>
      </Flex>
    );
  }

  return (
    <Flex direction="column" height="100%" minH="400px" overflowY="auto">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontSize="xl" fontWeight="medium">
          Prescription Details
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Prescription Information */}
      <Box px={6} py={4}>
        <VStack align="stretch" spacing={4}>
          {/* Basic Info */}
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                File Number:
              </Text>
              <Text fontSize="sm" fontWeight="500">
                {prescription.file_number}
              </Text>
            </HStack>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Date:
              </Text>
              <Text fontSize="sm">
                {new Date(prescription.prescription_date).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Time:
              </Text>
              <Text fontSize="sm">
                {prescription.prescription_time?.slice(0, 5) || 'N/A'}
              </Text>
            </HStack>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Status:
              </Text>
              <Badge
                px={2}
                py={1}
                borderRadius="md"
                fontSize="11px"
                fontWeight="500"
                bg={
                  prescription.status === 'active'
                    ? 'green.100'
                    : prescription.status === 'completed'
                    ? 'blue.100'
                    : 'gray.100'
                }
                color={
                  prescription.status === 'active'
                    ? 'green.800'
                    : prescription.status === 'completed'
                    ? 'blue.800'
                    : 'gray.800'
                }
              >
                {prescription.status_display || prescription.status}
              </Badge>
            </HStack>
            {prescription.doctor_name && (
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Doctor:
                </Text>
                <Text fontSize="sm">{prescription.doctor_name}</Text>
              </HStack>
            )}
            {prescription.patient_name && (
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Patient:
                </Text>
                <Text fontSize="sm">{prescription.patient_name}</Text>
              </HStack>
            )}
          </Box>

          <Divider />

          {/* Prescription Details */}
          {prescription.prescription_details && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Prescription Details:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {prescription.prescription_details}
                </Text>
              </Box>
            </Box>
          )}

          {/* Medications */}
          {prescription.medications && prescription.medications.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
                Medications:
              </Text>
              <TableContainer border="1px solid" borderColor="gray.200" borderRadius="md">
                <Table variant="simple" size="sm">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th fontSize="11px" fontWeight="600">Name</Th>
                      <Th fontSize="11px" fontWeight="600">Dosage</Th>
                      <Th fontSize="11px" fontWeight="600">Frequency</Th>
                      <Th fontSize="11px" fontWeight="600">Duration</Th>
                      <Th fontSize="11px" fontWeight="600">Quantity</Th>
                      <Th fontSize="11px" fontWeight="600">Unit</Th>
                      <Th fontSize="11px" fontWeight="600">Instructions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {prescription.medications.map((med, index) => (
                      <Tr key={index}>
                        <Td fontSize="12px">{med.name}</Td>
                        <Td fontSize="12px">{med.dosage}</Td>
                        <Td fontSize="12px">{med.frequency}</Td>
                        <Td fontSize="12px">{med.duration}</Td>
                        <Td fontSize="12px">{med.quantity}</Td>
                        <Td fontSize="12px">{med.unit}</Td>
                        <Td fontSize="12px">{med.instructions || 'N/A'}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Follow-up Information */}
          {prescription.follow_up_required && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Follow-up Required:
              </Text>
              <HStack>
                <Badge colorScheme="orange">Yes</Badge>
                {prescription.follow_up_date && (
                  <Text fontSize="sm" color="gray.600">
                    Date: {new Date(prescription.follow_up_date).toLocaleDateString()}
                  </Text>
                )}
              </HStack>
            </Box>
          )}

          {/* Notes */}
          {prescription.notes && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Notes:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {prescription.notes}
                </Text>
              </Box>
            </Box>
          )}

          {/* Created/Updated Info */}
          <Divider />
          <Box>
            <Text fontSize="xs" color="gray.500">
              Created: {new Date(prescription.created_at).toLocaleString()}
            </Text>
            {prescription.updated_at && (
              <Text fontSize="xs" color="gray.500">
                Updated: {new Date(prescription.updated_at).toLocaleString()}
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ViewPrescriptionDrawer;

