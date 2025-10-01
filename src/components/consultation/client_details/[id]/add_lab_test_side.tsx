"use client";

import { useState } from "react";
import { 
  Box, 
  Flex, 
  Text, 
  DrawerCloseButton, 
  Input, 
  Select,
  Textarea,
  Checkbox,
  Alert, 
  AlertIcon, 
  Spinner,
  VStack,
  HStack
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface LabTestFormData {
  file_number: string;
  test_date: string;
  test_time: string;
  laboratory_name: string;
  test_type: string;
  status: string;
  test_takes: number;
  recorded_details: string;
  notes: string;
  follow_up_required: boolean;
  follow_up_date: string;
  follow_up_notes: string;
}

const AddLabTestSide: React.FC<{ onLabTestAdded?: () => void }> = ({ onLabTestAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<LabTestFormData>({
    file_number: '',
    test_date: new Date().toISOString().split('T')[0], // Today's date
    test_time: new Date().toTimeString().slice(0, 5), // Current time
    laboratory_name: '',
    test_type: 'blood_test',
    status: 'active',
    test_takes: 1,
    recorded_details: '',
    notes: '',
    follow_up_required: false,
    follow_up_date: '',
    follow_up_notes: ''
  });

  const handleInputChange = (field: keyof LabTestFormData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateFileNumber = () => {
    const timestamp = Date.now();
    return `LT${timestamp.toString().slice(-6)}`;
  };

  const handleSubmit = async () => {
    if (!id || !token || !doctor) {
      setError('Missing patient ID, authentication token, or doctor information');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const patientId = parseInt(id);
      const labTestData = {
        patient: patientId,
        doctor: doctor.id,
        file_number: formData.file_number || generateFileNumber(),
        test_date: formData.test_date,
        test_time: formData.test_time + ':00', // Add seconds
        laboratory_name: formData.laboratory_name,
        test_type: formData.test_type,
        status: formData.status,
        test_takes: formData.test_takes,
        recorded_details: formData.recorded_details,
        notes: formData.notes || undefined,
        follow_up_required: formData.follow_up_required,
        follow_up_date: formData.follow_up_date || undefined,
        follow_up_notes: formData.follow_up_notes || undefined,
        is_active: true
      };

      console.log('Submitting lab test:', labTestData);
      const result = await apiService.addLabTest(labTestData, token);
      console.log('Lab test added successfully:', result);
      
      setSuccess(true);
      // Reset form
      setFormData({
        file_number: '',
        test_date: new Date().toISOString().split('T')[0],
        test_time: new Date().toTimeString().slice(0, 5),
        laboratory_name: '',
        test_type: 'blood_test',
        status: 'active',
        test_takes: 1,
        recorded_details: '',
        notes: '',
        follow_up_required: false,
        follow_up_date: '',
        follow_up_notes: ''
      });
      
      // Call callback to refresh lab tests list
      if (onLabTestAdded) {
        setTimeout(() => {
          onLabTestAdded();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error adding lab test:', err);
      setError(err instanceof Error ? err.message : 'Failed to add lab test');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          Add Lab Test
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Divider */}
      <Box height="1px" width="100%" bg="gray.200" mb={4} />

      {/* Form Content */}
      <Flex direction="column" px={6} flexGrow={1} overflowY="auto">
        {/* Error/Success Messages */}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Lab test added successfully! Refreshing...
          </Alert>
        )}

        {/* File Number */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
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
        </VStack>

        {/* Test Date and Time */}
        <HStack gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Test Date
            </Text>
            <Input
              type="date"
              value={formData.test_date}
              onChange={(e) => handleInputChange('test_date', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Test Time
            </Text>
            <Input
              type="time"
              value={formData.test_time}
              onChange={(e) => handleInputChange('test_time', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
        </HStack>

        {/* Laboratory Name */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Laboratory Name
          </Text>
          <Input
            placeholder="Enter laboratory name"
            value={formData.laboratory_name}
            onChange={(e) => handleInputChange('laboratory_name', e.target.value)}
            isReadOnly={isLoading}
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
          />
        </VStack>

        {/* Test Type and Status */}
        <HStack gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Test Type
            </Text>
            <Select
              value={formData.test_type}
              onChange={(e) => handleInputChange('test_type', e.target.value)}
              isDisabled={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            >
              <option value="blood_test">Blood Test</option>
              <option value="urine_test">Urine Test</option>
              <option value="x_ray">X-Ray</option>
              <option value="ct_scan">CT Scan</option>
              <option value="mri">MRI</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="other">Other</option>
            </Select>
          </Box>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Status
            </Text>
            <Select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              isDisabled={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>
          </Box>
        </HStack>

        {/* Test Takes */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Number of Test Takes
          </Text>
          <Input
            type="number"
            min="1"
            value={formData.test_takes}
            onChange={(e) => handleInputChange('test_takes', parseInt(e.target.value) || 1)}
            isReadOnly={isLoading}
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
          />
        </VStack>

        {/* Recorded Details */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Test Details
          </Text>
          <Textarea
            placeholder="Describe the test details and what needs to be tested"
            value={formData.recorded_details}
            onChange={(e) => handleInputChange('recorded_details', e.target.value)}
            isReadOnly={isLoading}
            height="80px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
          />
        </VStack>

        {/* Notes */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Notes (Optional)
          </Text>
          <Textarea
            placeholder="Additional notes or instructions"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            isReadOnly={isLoading}
            height="60px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
          />
        </VStack>

        {/* Follow-up Required */}
        <VStack align="stretch" mb={4}>
          <Checkbox
            isChecked={formData.follow_up_required}
            onChange={(e) => handleInputChange('follow_up_required', e.target.checked)}
            isDisabled={isLoading}
            colorScheme="blue"
          >
            <Text fontSize="sm" color="gray.600">
              Follow-up required
            </Text>
          </Checkbox>
        </VStack>

        {/* Follow-up Date and Notes (conditional) */}
        {formData.follow_up_required && (
          <VStack align="stretch" mb={4}>
            <HStack gap={4}>
              <Box flex="1">
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
            </HStack>
            <Textarea
              placeholder="Follow-up notes"
              value={formData.follow_up_notes}
              onChange={(e) => handleInputChange('follow_up_notes', e.target.value)}
              isReadOnly={isLoading}
              height="60px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        )}
      </Flex>

      {/* Footer with Save button */}
      <Box mt="auto" px={6} py={4} borderTop="1px solid" borderColor="gray.200">
        <Flex justifyContent="flex-end">
          <AppButton
            label={isLoading ? "Adding..." : "Add Lab Test"}
            background="#073DFC"
            color="white"
            width="150px"
            borderColor="#073DFC"
            onClick={handleSubmit}
            disabled={isLoading}
          />
          {isLoading && <Spinner size="sm" ml={2} />}
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddLabTestSide;
