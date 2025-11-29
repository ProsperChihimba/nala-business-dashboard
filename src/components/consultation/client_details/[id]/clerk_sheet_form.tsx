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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AppButton from "../../../layout/button";
import { useAuth } from "../../../../contexts/AuthContext";
import { apiService } from "../../../../services/api";

interface ClerkSheetFormData {
  date_of_clerkship: string;
  recorded_by: string;
  recorded_details: string;
  treatment_plan: string;
  follow_up_required: boolean;
  follow_up_date: string;
  follow_up_notes: string;
  // Tab-specific data
  chief_complaints: string;
  history_presenting_illness: string;
  review_systems: string;
  past_medical_history: string;
  family_social_history: string;
}

const ClerkSheetForm: React.FC<{ onClerkSheetAdded?: () => void }> = ({ onClerkSheetAdded }) => {
  const { id } = useParams<{ id: string }>();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const [formData, setFormData] = useState<ClerkSheetFormData>({
    date_of_clerkship: new Date().toISOString().split('T')[0], // Today's date as default
    recorded_by: doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : '',
    recorded_details: '',
    treatment_plan: '',
    follow_up_required: false,
    follow_up_date: '',
    follow_up_notes: '',
    chief_complaints: '',
    history_presenting_illness: '',
    review_systems: '',
    past_medical_history: '',
    family_social_history: ''
  });

  const handleInputChange = (field: keyof ClerkSheetFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateFileNumber = () => {
    const timestamp = Date.now();
    return `CS${timestamp.toString().slice(-6)}`;
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
      
      // Combine all tab data into recorded_details
      const combinedDetails = `
CHIEF COMPLAINTS:
${formData.chief_complaints}

HISTORY OF PRESENTING ILLNESS:
${formData.history_presenting_illness}

REVIEW OF SYSTEMS:
${formData.review_systems}

PAST MEDICAL AND SURGICAL HISTORY:
${formData.past_medical_history}

FAMILY AND SOCIAL HISTORY:
${formData.family_social_history}

ADDITIONAL NOTES:
${formData.recorded_details}
      `.trim();

      const clerkSheetData = {
        patient: patientId,
        doctor: doctor.id,
        file_number: generateFileNumber(),
        note_type: 'clerk_sheet',
        recorded_by: formData.recorded_by,
        recorded_details: combinedDetails,
        date_of_clerkship: formData.date_of_clerkship,
        treatment_plan: formData.treatment_plan || undefined,
        follow_up_required: formData.follow_up_required,
        follow_up_date: formData.follow_up_date || undefined,
        follow_up_notes: formData.follow_up_notes || undefined,
        is_active: true
      };

      console.log('Submitting clerk sheet:', clerkSheetData);
      const result = await apiService.addDoctorNote(clerkSheetData, token);
      console.log('Clerk sheet added successfully:', result);
      
      setSuccess(true);
      // Reset form
      setFormData({
        date_of_clerkship: new Date().toISOString().split('T')[0],
        recorded_by: doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : '',
        recorded_details: '',
        treatment_plan: '',
        follow_up_required: false,
        follow_up_date: '',
        follow_up_notes: '',
        chief_complaints: '',
        history_presenting_illness: '',
        review_systems: '',
        past_medical_history: '',
        family_social_history: ''
      });
      
      // Call callback to refresh clerk sheets list
      if (onClerkSheetAdded) {
        setTimeout(() => {
          onClerkSheetAdded();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Error adding clerk sheet:', err);
      setError(err instanceof Error ? err.message : 'Failed to add clerk sheet');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Chief Complaints
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Chief Complaints
            </Text>
            <Textarea
              placeholder="Enter the patient's main complaints and symptoms"
              value={formData.chief_complaints}
              onChange={(e) => handleInputChange('chief_complaints', e.target.value)}
              isReadOnly={isLoading}
              height="200px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        );
      case 1: // HPI
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              History of Presenting Illness
            </Text>
            <Textarea
              placeholder="Describe the history and progression of the current illness"
              value={formData.history_presenting_illness}
              onChange={(e) => handleInputChange('history_presenting_illness', e.target.value)}
              isReadOnly={isLoading}
              height="200px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        );
      case 2: // ROS
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Review of Systems
            </Text>
            <Textarea
              placeholder="Systematic review of all body systems"
              value={formData.review_systems}
              onChange={(e) => handleInputChange('review_systems', e.target.value)}
              isReadOnly={isLoading}
              height="200px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        );
      case 3: // PMHx
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Past Medical and Surgical History
            </Text>
            <Textarea
              placeholder="Previous medical conditions, surgeries, hospitalizations"
              value={formData.past_medical_history}
              onChange={(e) => handleInputChange('past_medical_history', e.target.value)}
              isReadOnly={isLoading}
              height="200px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        );
      case 4: // FSHx
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Family and Social History
            </Text>
            <Textarea
              placeholder="Family medical history, social factors, lifestyle"
              value={formData.family_social_history}
              onChange={(e) => handleInputChange('family_social_history', e.target.value)}
              isReadOnly={isLoading}
              height="200px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Text fontSize="xl" fontWeight="medium">
          Clerk Sheet
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
            Clerk sheet added successfully! Refreshing...
          </Alert>
        )}

        {/* Date of Clerkship and Recorded By */}
        <HStack gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Date of Clerkship
            </Text>
            <Input
              type="date"
              value={formData.date_of_clerkship}
              onChange={(e) => handleInputChange('date_of_clerkship', e.target.value)}
              isReadOnly={isLoading}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
            />
          </Box>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Recorded By
            </Text>
            <Input
              placeholder="Doctor name"
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

        {/* Tabs */}
        <Tabs fontFamily="IBM Plex Sans, sans-serif" color="#6D6D6D" index={activeTab} onChange={setActiveTab}>
          <TabList display="flex" justifyContent="space-between" mb={4}>
            <Tab fontWeight="500" fontSize="13px" isDisabled={isLoading}>
              Complaints
            </Tab>
            <Tab fontWeight="500" fontSize="13px" isDisabled={isLoading}>
              HPI
            </Tab>
            <Tab fontWeight="500" fontSize="13px" isDisabled={isLoading}>
              ROS
            </Tab>
            <Tab fontWeight="500" fontSize="13px" isDisabled={isLoading}>
              PMHx
            </Tab>
            <Tab fontWeight="500" fontSize="13px" isDisabled={isLoading}>
              FSHx
            </Tab>
          </TabList>

          <TabPanels>
            {[0, 1, 2, 3, 4].map((tabIndex) => (
              <TabPanel key={tabIndex} padding="0px">
                {renderTabContent()}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        {/* Additional Notes */}
        <VStack align="stretch" mb={4} mt={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Additional Notes
          </Text>
          <Textarea
            placeholder="Any additional notes or observations"
            value={formData.recorded_details}
            onChange={(e) => handleInputChange('recorded_details', e.target.value)}
            isReadOnly={isLoading}
            height="80px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
          />
        </VStack>

        {/* Treatment Plan */}
        <VStack align="stretch" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Treatment Plan
          </Text>
          <Textarea
            placeholder="Initial treatment plan and recommendations"
            value={formData.treatment_plan}
            onChange={(e) => handleInputChange('treatment_plan', e.target.value)}
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
            label={isLoading ? "Submitting..." : "Submit Button"}
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

export default ClerkSheetForm;

