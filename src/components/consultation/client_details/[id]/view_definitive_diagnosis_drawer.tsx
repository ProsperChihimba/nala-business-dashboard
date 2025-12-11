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
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService, DoctorNoteExtended } from "../../../../services/api";

interface ViewDefinitiveDiagnosisDrawerProps {
  diagnosisId: number | null;
  patientId: number | null;
}

const ViewDefinitiveDiagnosisDrawer: React.FC<ViewDefinitiveDiagnosisDrawerProps> = ({ diagnosisId, patientId }) => {
  const { token } = useAuth();
  const [diagnosis, setDiagnosis] = useState<DoctorNoteExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnosisDetails = async () => {
      if (!patientId || !token) {
        setError('Missing patient ID or authentication token');
        setIsLoading(false);
        return;
      }

      if (!diagnosisId) {
        setError('Missing diagnosis ID');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching definitive diagnosis details:', { patientId, diagnosisId });
        const diagnoses = await apiService.getDefinitiveDiagnoses(token, patientId);
        console.log('Received diagnoses:', diagnoses);
        
        // Find the specific diagnosis by ID
        const selectedDiagnosis = diagnoses.find(d => d.id === diagnosisId);
        console.log('Selected diagnosis:', selectedDiagnosis);
        
        if (selectedDiagnosis) {
          setDiagnosis(selectedDiagnosis);
        } else {
          console.warn('Diagnosis not found in response. Available IDs:', diagnoses.map(d => d.id));
          setError(`Definitive diagnosis with ID ${diagnosisId} not found`);
        }
      } catch (err) {
        console.error('Error fetching definitive diagnosis details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch definitive diagnosis details');
      } finally {
        setIsLoading(false);
      }
    };

    if (diagnosisId && patientId) {
      fetchDiagnosisDetails();
    } else {
      setIsLoading(false);
    }
  }, [diagnosisId, patientId, token]);

  if (isLoading) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Definitive Diagnosis Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <VStack spacing={4}>
            <Spinner size="lg" />
            <Text fontSize="sm" color="gray.500">Loading diagnosis details...</Text>
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
            Definitive Diagnosis Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Box px={6} py={4}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="medium">Error loading diagnosis</Text>
              <Text fontSize="sm">{error}</Text>
            </VStack>
          </Alert>
        </Box>
      </Flex>
    );
  }

  if (!diagnosis) {
    return (
      <Flex direction="column" height="100%" minH="400px">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="medium">
            Definitive Diagnosis Details
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Center flex="1">
          <Text fontSize="sm" color="gray.500">No diagnosis details available</Text>
        </Center>
      </Flex>
    );
  }

  return (
    <Flex direction="column" height="100%" minH="400px" overflowY="auto">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontSize="xl" fontWeight="medium">
          Definitive Diagnosis Details
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Diagnosis Information */}
      <Box px={6} py={4}>
        <VStack align="stretch" spacing={4}>
          {/* Basic Info */}
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                File Number:
              </Text>
              <Text fontSize="sm" fontWeight="500">
                {diagnosis.file_number}
              </Text>
            </HStack>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Recorded By:
              </Text>
              <Text fontSize="sm">{diagnosis.recorded_by || 'N/A'}</Text>
            </HStack>
            {diagnosis.patient?.user && (
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Patient:
                </Text>
                <Text fontSize="sm">
                  {diagnosis.patient.user.first_name} {diagnosis.patient.user.last_name}
                </Text>
              </HStack>
            )}
            {diagnosis.doctor && (
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Doctor:
                </Text>
                <Text fontSize="sm">
                  {diagnosis.doctor.user?.first_name && diagnosis.doctor.user?.last_name
                    ? `Dr. ${diagnosis.doctor.user.first_name} ${diagnosis.doctor.user.last_name}`
                    : diagnosis.recorded_by || 'N/A'}
                </Text>
              </HStack>
            )}
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Created:
              </Text>
              <Text fontSize="sm">
                {new Date(diagnosis.created_at).toLocaleString()}
              </Text>
            </HStack>
          </Box>

          <Divider />

          {/* Diagnosis */}
          {diagnosis.diagnosis && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Diagnosis:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {diagnosis.diagnosis}
                </Text>
              </Box>
            </Box>
          )}

          {/* Symptoms */}
          {diagnosis.symptoms && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Symptoms:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {diagnosis.symptoms}
                </Text>
              </Box>
            </Box>
          )}

          {/* Recorded Details */}
          {diagnosis.recorded_details && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Recorded Details:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {diagnosis.recorded_details}
                </Text>
              </Box>
            </Box>
          )}

          {/* Treatment Plan */}
          {diagnosis.treatment_plan && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Treatment Plan:
              </Text>
              <Box
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {diagnosis.treatment_plan}
                </Text>
              </Box>
            </Box>
          )}

          {/* Follow-up Information */}
          {diagnosis.follow_up_required && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Follow-up Required:
              </Text>
              <HStack>
                <Badge colorScheme="orange">Yes</Badge>
                {diagnosis.follow_up_date && (
                  <Text fontSize="sm" color="gray.600">
                    Date: {new Date(diagnosis.follow_up_date).toLocaleDateString()}
                  </Text>
                )}
              </HStack>
            </Box>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default ViewDefinitiveDiagnosisDrawer;

