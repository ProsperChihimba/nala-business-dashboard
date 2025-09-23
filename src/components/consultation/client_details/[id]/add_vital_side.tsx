"use client";

import { useState } from "react";
import { Box, Flex, Text, DrawerCloseButton, Input, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface VitalFormData {
  systolic_pressure: number;
  diastolic_pressure: number;
  random_blood_glucose: number;
  pulse_rate: number;
  oxygen_saturation: number;
  temperature: number;
  respiratory_rate: number;
  height: number;
  weight: number;
}

interface VitalSideProps {
  onVitalAdded?: () => void;
}

const VitalSide: React.FC<VitalSideProps> = ({ onVitalAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<VitalFormData>({
    systolic_pressure: 0,
    diastolic_pressure: 0,
    random_blood_glucose: 0,
    pulse_rate: 0,
    oxygen_saturation: 0,
    temperature: 0,
    respiratory_rate: 0,
    height: 0,
    weight: 0,
  });

  const handleInputChange = (field: keyof VitalFormData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSubmit = async () => {
    if (!id || !token) {
      setError('Missing patient ID or authentication token');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const patientId = parseInt(id);
      const vitalData = {
        patient: patientId,
        ...formData
      };

      console.log('Submitting vitals:', vitalData);
      const result = await apiService.addPatientVital(vitalData, token);
      console.log('Vitals added successfully:', result);
      
      setSuccess(true);
      // Reset form
      setFormData({
        systolic_pressure: 0,
        diastolic_pressure: 0,
        random_blood_glucose: 0,
        pulse_rate: 0,
        oxygen_saturation: 0,
        temperature: 0,
        respiratory_rate: 0,
        height: 0,
        weight: 0,
      });
      
      // Call callback to refresh vitals list
      if (onVitalAdded) {
        setTimeout(() => {
          onVitalAdded();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error adding vitals:', err);
      setError(err instanceof Error ? err.message : 'Failed to add vitals');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          New Vitals
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
            Vitals added successfully! Refreshing...
          </Alert>
        )}
        {/* Blood Pressure Section */}
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            fontSize="sm"
            fontWeight="medium"
            
            mb={4}
            color="gray.600"
          >
            Blood Pressure
          </Text>
          <Box height="0.7px" width="70%" bg="gray.300" mb={4} />
        </Flex>
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Systolic Pressure
            </Text>
            <Input
              placeholder="Systolic Pressure(mmHg) - (Min: 90 Max:120)"
              value={formData.systolic_pressure || ''}
              onChange={(e) => handleInputChange('systolic_pressure', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Diastolic Pressure
            </Text>
            <Input
              placeholder="Diastolic Pressure(mmHg) - (Min: 60 Max:80)"
              value={formData.diastolic_pressure || ''}
              onChange={(e) => handleInputChange('diastolic_pressure', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
        </Flex>

        {/* Random Blood Glucose Section */}
        <Text fontSize="sm" fontWeight="medium" mb={4} color="gray.600">
          Random Blood Glucose
        </Text>
        <Box mb={4}>
          <Input
            placeholder="Random Blood Glucose(Mmol/D) - (Min: 3.9 Max:11.1)"
            value={formData.random_blood_glucose || ''}
            onChange={(e) => handleInputChange('random_blood_glucose', e.target.value)}
            isReadOnly={isLoading}
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
            type="number"
            step="0.1"
          />
        </Box>

        {/* Others Section */}
         <Flex alignItems="center" justifyContent="space-between">
          <Text
            fontSize="sm"
            fontWeight="medium"
            
            mb={4}
            color="gray.600"
          >
           Others
          </Text>
          <Box height="0.7px" width="70%" bg="gray.300" mb={4} />
        </Flex>
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Pulse Rate
            </Text>
            <Input
              placeholder="Pulse Rate(B/Min) - (Min: 60 Max:100)"
              value={formData.pulse_rate || ''}
              onChange={(e) => handleInputChange('pulse_rate', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Oxygen Saturation
            </Text>
            <Input
              placeholder="Oxygen Saturation(%) - (Min: 97 Max:99)"
              value={formData.oxygen_saturation || ''}
              onChange={(e) => handleInputChange('oxygen_saturation', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
        </Flex>
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Temperature
            </Text>
            <Input
              placeholder="Temperature (°C) - (Min: 36.7 Max:37.5)"
              value={formData.temperature || ''}
              onChange={(e) => handleInputChange('temperature', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Respiratory Rate
            </Text>
            <Input
              placeholder="Respiratory Rate(Breaths/Min) - (Min: 12 Max:20)"
              value={formData.respiratory_rate || ''}
              onChange={(e) => handleInputChange('respiratory_rate', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
        </Flex>
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Weight
            </Text>
            <Input
              placeholder="Weight(Kg) - (Min: 0 Max:250)"
              value={formData.weight || ''}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Height
            </Text>
            <Input
              placeholder="Height(Cm) - (Min: 1 Max:250)"
              value={formData.height || ''}
              onChange={(e) => handleInputChange('height', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              type="number"
              step="0.1"
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

export default VitalSide;
