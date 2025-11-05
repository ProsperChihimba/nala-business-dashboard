"use client";

import { useState } from "react";
import { Box, Flex, Text, DrawerCloseButton, Input, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface BloodPressureFormData {
  systolic_pressure: number | null;
  diastolic_pressure: number | null;
  pulse_rate: number | null;
  reading_date: string;
  reading_time: string;
  notes: string;
}

interface BloodPressureSideProps {
  onBloodPressureAdded?: () => void;
}

const BloodPressureSide: React.FC<BloodPressureSideProps> = ({ onBloodPressureAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<BloodPressureFormData>({
    systolic_pressure: null,
    diastolic_pressure: null,
    pulse_rate: null,
    reading_date: new Date().toISOString().split('T')[0], // Today's date
    reading_time: new Date().toTimeString().split(' ')[0].substring(0, 5), // Current time HH:MM
    notes: '',
  });

  const handleInputChange = (field: keyof BloodPressureFormData, value: string) => {
    if (field === 'systolic_pressure' || field === 'diastolic_pressure' || field === 'pulse_rate') {
      const numValue = value === '' ? null : parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [field]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!id || !token) {
      setError('Missing patient ID or authentication token');
      return;
    }

    if (!formData.systolic_pressure || !formData.diastolic_pressure) {
      setError('Systolic and Diastolic pressure are required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const patientId = parseInt(id);
      const bloodPressureData: any = {
        patient: patientId,
        systolic_pressure: formData.systolic_pressure!,
        diastolic_pressure: formData.diastolic_pressure!,
        reading_date: formData.reading_date,
        reading_time: formData.reading_time,
        notes: formData.notes,
      };
      if (formData.pulse_rate !== null) {
        bloodPressureData.pulse_rate = formData.pulse_rate;
      }

      console.log('Submitting blood pressure reading:', bloodPressureData);
      const result = await apiService.addBloodPressureReading(bloodPressureData, token);
      console.log('Blood pressure reading added successfully:', result);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        systolic_pressure: null,
        diastolic_pressure: null,
        pulse_rate: null,
        reading_date: new Date().toISOString().split('T')[0],
        reading_time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        notes: '',
      });
      
      // Call callback to refresh blood pressure list
      if (onBloodPressureAdded) {
        setTimeout(() => {
          onBloodPressureAdded();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error adding blood pressure reading:', err);
      setError(err instanceof Error ? err.message : 'Failed to add blood pressure reading');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          Add Blood Pressure Reading
        </Text>
        <DrawerCloseButton />
      </Flex>

      {/* Content */}
      <Flex direction="column" px={6} flexGrow={1} overflowY="auto">
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Blood Pressure reading added successfully! Refreshing...
          </Alert>
        )}

        {/* Blood Pressure Section */}
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.600"
          >
            Blood Pressure Reading
          </Text>
          <Box height="0.7px" width="70%" bg="gray.300" />
        </Flex>
        
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Systolic Pressure *
            </Text>
            <Input
              placeholder="Systolic Pressure(mmHg) - (Min: 90 Max:200)"
              value={formData.systolic_pressure ?? ''}
              onChange={(e) => handleInputChange('systolic_pressure', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Diastolic Pressure *
            </Text>
            <Input
              placeholder="Diastolic Pressure(mmHg) - (Min: 60 Max:120)"
              value={formData.diastolic_pressure ?? ''}
              onChange={(e) => handleInputChange('diastolic_pressure', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="1"
            />
          </Box>
        </Flex>

        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Pulse Rate
            </Text>
            <Input
              placeholder="Pulse Rate(BPM) - (Min: 40 Max:200)"
              value={formData.pulse_rate ?? ''}
              onChange={(e) => handleInputChange('pulse_rate', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Reading Date
            </Text>
            <Input
              placeholder="Reading Date"
              value={formData.reading_date}
              onChange={(e) => handleInputChange('reading_date', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="date"
            />
          </Box>
        </Flex>

        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Reading Time
            </Text>
            <Input
              placeholder="Reading Time"
              value={formData.reading_time}
              onChange={(e) => handleInputChange('reading_time', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="time"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Notes
            </Text>
            <Input
              placeholder="Additional notes about the reading"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>
        </Flex>
      </Flex>

      {/* Footer with Save button */}
      <Box mt="auto" px={6} py={4} borderTop="1px solid" borderColor="gray.200">
        <Flex justifyContent="flex-end">
          <AppButton
            label={isLoading ? "Saving..." : "Save"}
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

export default BloodPressureSide;
