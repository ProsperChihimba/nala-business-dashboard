"use client";

import { useState } from "react";
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
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface PrescriptionFormData {
  file_number: string;
  prescription_date: string;
  prescription_time: string;
  prescription_details: string;
  status: string;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
}

interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  unit: string;
}

const AddPrescriptionSide: React.FC<{ onPrescriptionAdded?: () => void }> = ({ onPrescriptionAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<PrescriptionFormData>({
    file_number: '',
    prescription_date: new Date().toISOString().split('T')[0], // Today's date
    prescription_time: new Date().toTimeString().slice(0, 5), // Current time
    prescription_details: '',
    status: 'active',
    follow_up_required: false,
    follow_up_date: '',
    notes: ''
  });

  const [medications, setMedications] = useState<MedicationFormData[]>([]);
  const [currentMedication, setCurrentMedication] = useState<MedicationFormData>({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: 1,
    unit: 'tablets'
  });

  const handleInputChange = (field: keyof PrescriptionFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicationChange = (field: keyof MedicationFormData, value: string | number) => {
    setCurrentMedication(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMedication = () => {
    if (currentMedication.name.trim()) {
      setMedications(prev => [...prev, { ...currentMedication }]);
      setCurrentMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: 1,
        unit: 'tablets'
      });
    }
  };

  const removeMedication = (index: number) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  const generateFileNumber = () => {
    const timestamp = Date.now();
    return `RX${timestamp.toString().slice(-6)}`;
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
      
      // Create prescription data with medications array
      const prescriptionData = {
        patient: patientId,
        doctor: doctor.id,
        file_number: formData.file_number || generateFileNumber(),
        prescription_date: formData.prescription_date,
        prescription_time: formData.prescription_time + ':00', // Add seconds
        prescription_details: formData.prescription_details,
        status: formData.status,
        follow_up_required: formData.follow_up_required,
        follow_up_date: formData.follow_up_date || undefined,
        notes: formData.notes || undefined,
        medications: medications.map(med => ({
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
          instructions: med.instructions,
          quantity: med.quantity,
          unit: med.unit
        }))
      };

      console.log('Submitting prescription:', prescriptionData);
      const prescription = await apiService.addPrescription(prescriptionData, token);
      console.log('Prescription added successfully:', prescription);
      
      setSuccess(true);
      // Reset form
      setFormData({
        file_number: '',
        prescription_date: new Date().toISOString().split('T')[0],
        prescription_time: new Date().toTimeString().slice(0, 5),
        prescription_details: '',
        status: 'active',
        follow_up_required: false,
        follow_up_date: '',
        notes: ''
      });
      setMedications([]);
      setCurrentMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: 1,
        unit: 'tablets'
      });
      
      // Call callback to refresh prescriptions list
      if (onPrescriptionAdded) {
        setTimeout(() => {
          onPrescriptionAdded();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error adding prescription:', err);
      setError(err instanceof Error ? err.message : 'Failed to add prescription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          Add Prescription
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
            Prescription added successfully! Refreshing...
          </Alert>
        )}

        {/* File Number and Status */}
        <HStack gap={4} mb={4}>
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
              Status
            </Text>
            <Input
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
        </HStack>

        {/* Prescription Date and Time */}
        <HStack gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Prescription Date
            </Text>
            <Input
              type="date"
              value={formData.prescription_date}
              onChange={(e) => handleInputChange('prescription_date', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Prescription Time
            </Text>
            <Input
              type="time"
              value={formData.prescription_time}
              onChange={(e) => handleInputChange('prescription_time', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
        </HStack>

        {/* Prescription Details */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Prescription Details
          </Text>
          <Textarea
            placeholder="Describe the prescription details and treatment plan"
            value={formData.prescription_details}
            onChange={(e) => handleInputChange('prescription_details', e.target.value)}
            isReadOnly={isLoading}
            height="100px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
          />
        </VStack>

        {/* Medications Section */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Medications
          </Text>
          
          {/* Add Medication Form */}
          <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
            <VStack align="stretch" spacing={3}>
              <HStack gap={2}>
                <Box flex="2">
                  <Text fontSize="xs" color="gray.500" mb={1}>Medication Name</Text>
                  <Input
                    placeholder="e.g., Amoxicillin"
                    value={currentMedication.name}
                    onChange={(e) => handleMedicationChange('name', e.target.value)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                    _placeholder={{ fontSize: "xs", color: "gray.400" }}
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" color="gray.500" mb={1}>Dosage</Text>
                  <Input
                    placeholder="e.g., 500mg"
                    value={currentMedication.dosage}
                    onChange={(e) => handleMedicationChange('dosage', e.target.value)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                    _placeholder={{ fontSize: "xs", color: "gray.400" }}
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" color="gray.500" mb={1}>Frequency</Text>
                  <Input
                    placeholder="e.g., 3x daily"
                    value={currentMedication.frequency}
                    onChange={(e) => handleMedicationChange('frequency', e.target.value)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                    _placeholder={{ fontSize: "xs", color: "gray.400" }}
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" color="gray.500" mb={1}>Duration</Text>
                  <Input
                    placeholder="e.g., 7 days"
                    value={currentMedication.duration}
                    onChange={(e) => handleMedicationChange('duration', e.target.value)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                    _placeholder={{ fontSize: "xs", color: "gray.400" }}
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" color="gray.500" mb={1}>Quantity</Text>
                  <Input
                    type="number"
                    min="1"
                    value={currentMedication.quantity}
                    onChange={(e) => handleMedicationChange('quantity', parseInt(e.target.value) || 1)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" color="gray.500" mb={1}>Unit</Text>
                  <Input
                    placeholder="e.g., tablets"
                    value={currentMedication.unit}
                    onChange={(e) => handleMedicationChange('unit', e.target.value)}
                    isReadOnly={isLoading}
                    height="35px"
                    borderRadius="3xl"
                    borderColor="#DCDCDC"
                    _placeholder={{ fontSize: "xs", color: "gray.400" }}
                  />
                </Box>
                <IconButton
                  aria-label="Add medication"
                  icon={<FiPlus />}
                  onClick={addMedication}
                  isDisabled={isLoading || !currentMedication.name.trim()}
                  colorScheme="blue"
                  size="sm"
                  height="35px"
                  width="35px"
                />
              </HStack>
              
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>Instructions</Text>
                <Input
                  placeholder="e.g., Take with food, avoid alcohol"
                  value={currentMedication.instructions}
                  onChange={(e) => handleMedicationChange('instructions', e.target.value)}
                  isReadOnly={isLoading}
                  height="35px"
                  borderRadius="3xl"
                  borderColor="#DCDCDC"
                  _placeholder={{ fontSize: "xs", color: "gray.400" }}
                />
              </Box>
            </VStack>
          </Box>

          {/* Medications List */}
          {medications.length > 0 && (
            <TableContainer border="1px solid" borderColor="gray.200" borderRadius="lg">
              <Table size="sm">
                <Thead bg="gray.50">
                  <Tr>
                    <Th fontSize="xs">Medication</Th>
                    <Th fontSize="xs">Dosage</Th>
                    <Th fontSize="xs">Frequency</Th>
                    <Th fontSize="xs">Duration</Th>
                    <Th fontSize="xs">Qty</Th>
                    <Th fontSize="xs">Unit</Th>
                    <Th fontSize="xs">Instructions</Th>
                    <Th fontSize="xs">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {medications.map((med, index) => (
                    <Tr key={index}>
                      <Td fontSize="xs">{med.name}</Td>
                      <Td fontSize="xs">{med.dosage}</Td>
                      <Td fontSize="xs">{med.frequency}</Td>
                      <Td fontSize="xs">{med.duration}</Td>
                      <Td fontSize="xs">{med.quantity}</Td>
                      <Td fontSize="xs">{med.unit}</Td>
                      <Td fontSize="xs">{med.instructions}</Td>
                      <Td fontSize="xs">
                        <IconButton
                          aria-label="Remove medication"
                          icon={<FiTrash2 />}
                          onClick={() => removeMedication(index)}
                          isDisabled={isLoading}
                          colorScheme="red"
                          size="xs"
                          variant="ghost"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
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

        {/* Follow-up Date (conditional) */}
        {formData.follow_up_required && (
          <VStack align="stretch" mb={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
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
          </VStack>
        )}
      </Flex>

      {/* Footer with Save button */}
      <Box mt="auto" px={6} py={4} borderTop="1px solid" borderColor="gray.200">
        <Flex justifyContent="flex-end">
          <AppButton
            label={isLoading ? "Adding..." : "Add Prescription"}
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

export default AddPrescriptionSide;
