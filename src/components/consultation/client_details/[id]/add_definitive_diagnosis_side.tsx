"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  DrawerCloseButton,
  Input,
  Textarea,
  Checkbox,
  Alert,
  AlertIcon,
  Spinner,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface DefinitiveDiagnosisFormData {
  file_number: string;
  recorded_by: string;
  recorded_details: string;
  diagnosis: string;
  symptoms: string;
  treatment_plan: string;
  follow_up_required: boolean;
  follow_up_date: string;
}

const AddDefinitiveDiagnosisSide: React.FC<{ onDiagnosisAdded?: () => void }> = ({ onDiagnosisAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const getDoctorName = () => {
    if (!doctor) return '';
    // DoctorResponse has first_name and last_name as direct properties
    if (doctor.first_name && doctor.last_name) {
      return `Dr. ${doctor.first_name} ${doctor.last_name}`;
    }
    // Fallback to user object if available
    if (doctor.user?.first_name && doctor.user?.last_name) {
      return `Dr. ${doctor.user.first_name} ${doctor.user.last_name}`;
    }
    return '';
  };

  const [formData, setFormData] = useState<DefinitiveDiagnosisFormData>({
    file_number: '',
    recorded_by: '',
    recorded_details: '',
    diagnosis: '',
    symptoms: '',
    treatment_plan: '',
    follow_up_required: false,
    follow_up_date: '',
  });

  // Update recorded_by when doctor loads
  useEffect(() => {
    if (doctor) {
      const doctorName = getDoctorName();
      if (doctorName) {
        setFormData(prev => ({
          ...prev,
          recorded_by: doctorName
        }));
      }
    }
  }, [doctor]);

  const handleInputChange = (field: keyof DefinitiveDiagnosisFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateFileNumber = () => {
    const timestamp = Date.now();
    return `DD${timestamp.toString().slice(-6)}`;
  };

  const handleSubmit = async () => {
    if (!id || !token || !doctor) {
      setError('Missing patient ID, authentication token, or doctor information');
      return;
    }

    if (!formData.diagnosis.trim()) {
      setError('Diagnosis is required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const patientId = parseInt(id);

      const diagnosisData = {
        patient: patientId,
        doctor: doctor.id,
        file_number: formData.file_number || generateFileNumber(),
        recorded_by: formData.recorded_by || getDoctorName(),
        recorded_details: formData.recorded_details || '',
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms || undefined,
        treatment_plan: formData.treatment_plan || undefined,
        follow_up_required: formData.follow_up_required,
        follow_up_date: formData.follow_up_date || undefined,
      };

      console.log('Submitting definitive diagnosis:', diagnosisData);
      await apiService.addDefinitiveDiagnosis(diagnosisData, token);
      console.log('Definitive diagnosis added successfully');

      setSuccess(true);
      // Reset form
      setFormData({
        file_number: '',
        recorded_by: getDoctorName(),
        recorded_details: '',
        diagnosis: '',
        symptoms: '',
        treatment_plan: '',
        follow_up_required: false,
        follow_up_date: '',
      });

      // Call callback to refresh diagnoses list
      if (onDiagnosisAdded) {
        setTimeout(() => {
          onDiagnosisAdded();
        }, 1000);
      }
    } catch (err) {
      console.error('Error adding definitive diagnosis:', err);
      setError(err instanceof Error ? err.message : 'Failed to add definitive diagnosis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          Add Definitive Diagnosis
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Divider */}
      <Box height="1px" width="100%" bg="gray.200" mb={4} />

      {/* Form Content */}
      <Flex direction="column" px={6} flexGrow={1} overflowY="auto">
        {/* Error/Success Messages */}
        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4} borderRadius="md">
            <AlertIcon />
            Definitive diagnosis added successfully! Refreshing...
          </Alert>
        )}

        <VStack align="stretch" spacing={4}>
          {/* File Number and Recorded By */}
          <HStack gap={4}>
            <Box flex="1">
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                File Number
              </Text>
              <Input
                placeholder="Auto-generated if empty"
                value={formData.file_number}
                onChange={(e) => handleInputChange('file_number', e.target.value)}
                isReadOnly={isLoading}
                height="40px"
                borderRadius="3xl"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "xs", color: "gray.400" }}
              />
            </Box>
            <Box flex="1">
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Recorded By
              </Text>
              <Input
                placeholder="Dr. Name"
                value={formData.recorded_by}
                onChange={(e) => handleInputChange('recorded_by', e.target.value)}
                isReadOnly={isLoading}
                height="40px"
                borderRadius="3xl"
                borderColor="#DCDCDC"
                _placeholder={{ fontSize: "xs", color: "gray.400" }}
              />
            </Box>
          </HStack>

          {/* Diagnosis (Required) */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Diagnosis <Text as="span" color="red.500">*</Text>
            </Text>
            <Textarea
              placeholder="Enter diagnosis (e.g., Hypertension, Type 2 Diabetes Mellitus)"
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
              isReadOnly={isLoading}
              minH="100px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>

          {/* Symptoms */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Symptoms
            </Text>
            <Textarea
              placeholder="Enter symptoms (e.g., Chest pain, shortness of breath, frequent urination)"
              value={formData.symptoms}
              onChange={(e) => handleInputChange('symptoms', e.target.value)}
              isReadOnly={isLoading}
              minH="80px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>

          {/* Recorded Details */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Recorded Details
            </Text>
            <Textarea
              placeholder="Patient examination and assessment details"
              value={formData.recorded_details}
              onChange={(e) => handleInputChange('recorded_details', e.target.value)}
              isReadOnly={isLoading}
              minH="100px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>

          {/* Treatment Plan */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Treatment Plan
            </Text>
            <Textarea
              placeholder="Enter treatment plan (e.g., Blood pressure management, diabetes control, lifestyle modifications)"
              value={formData.treatment_plan}
              onChange={(e) => handleInputChange('treatment_plan', e.target.value)}
              isReadOnly={isLoading}
              minH="100px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>

          {/* Follow-up Required */}
          <Box>
            <Checkbox
              isChecked={formData.follow_up_required}
              onChange={(e) => handleInputChange('follow_up_required', e.target.checked)}
              isDisabled={isLoading}
              colorScheme="blue"
            >
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Follow-up Required
              </Text>
            </Checkbox>
          </Box>

          {/* Follow-up Date */}
          {formData.follow_up_required && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                Follow-up Date
              </Text>
              <Input
                type="date"
                value={formData.follow_up_date}
                onChange={(e) => handleInputChange('follow_up_date', e.target.value)}
                isReadOnly={isLoading}
                height="40px"
                borderRadius="3xl"
                borderColor="#DCDCDC"
              />
            </Box>
          )}
        </VStack>

        {/* Submit Button */}
        <Flex justifyContent="flex-end" mt={6} mb={4}>
          <AppButton
            label={isLoading ? "Submitting..." : "Submit"}
            background="#073DFC"
            color="white"
            width="150px"
            borderColor="#073DFC"
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddDefinitiveDiagnosisSide;

