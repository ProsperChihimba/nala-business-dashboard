import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AddSheetSteps from "./add_sheet_steps";
import AppButton from "../../../layout/button";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  PenIcon,
} from "lucide-react";

const SingleAccountBody = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    complaint1: "",
    complaint2: "",
    complaint3: "",
    pulseRate: "",
    oxygenSaturation: "",
    bloodPressure: "",
    temperature: "",
    weight: "",
    height: "",
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleTextareaChange = (step: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [`complaint${step}`]: value,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddSheet = () => {
    // Save form data or perform any necessary operations
    console.log("Form data:", formData);

    // Navigate back to previous page
    navigate(-1); // This is equivalent to router.goback() in Next.js
  };

  const renderToolbar = () => (
    <Flex
      border="1px solid #E2E8F0"
      borderRadius="md"
      p={2}
      mb={4}
      alignItems="center"
      gap={3}
    >
      <Button variant="ghost" size="sm">
        <Text style={{ fontWeight: "bold" }}>B</Text>
      </Button>
      <Button variant="ghost" size="sm">
        <Text style={{ fontStyle: "italic" }}>I</Text>
      </Button>
      <Button variant="ghost" size="sm">
        <Text style={{ textDecoration: "underline" }}>U</Text>
      </Button>
      <Button variant="ghost" size="sm">
        <LinkIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <PenIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <ListIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <ListOrderedIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignLeftIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignCenterIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignRightIcon size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignJustifyIcon size={16} />
      </Button>
    </Flex>
  );

  // Navigation buttons component (reused across steps)
  const renderNavigationButtons = () => (
    <Flex justifyContent="space-between" mt={4}>
      {/* Previous button - only show if not on first step */}
      {currentStep > 1 && (
        <AppButton
          label="Previous"
          background="white"
          color="#073DFC"
          width="140px"
          borderColor="#073DFC"
          onClick={handlePrevious}
        />
      )}
      <Box /> {/* Spacer when no previous button */}
      {/* Next/Add Sheet button */}
      {currentStep < 3 ? (
        <AppButton
          label="Next"
          background="#073DFC"
          color="white"
          width="140px"
          borderColor="#DCDCDC"
          onClick={handleNext}
        />
      ) : (
        <AppButton
          label="Add Sheet"
          background="#073DFC"
          color="white"
          width="140px"
          borderColor="#DCDCDC"
          onClick={handleAddSheet}
        />
      )}
    </Flex>
  );

  // Step 1: Chief Complaints
  const renderComplaintBox1 = () => (
    <Box width="100%" paddingY="40px">
      <Text marginBottom="10px" fontWeight="500">
        Chief Complaints
      </Text>
      <Box p={4} width="100%" bg="white" rounded="md" shadow="sm">
        {renderToolbar()}
        <Textarea
          placeholder="Enter Complaint Description"
          minH="300px"
          borderColor="#E2E8F0"
          _placeholder={{ color: "#A0AEC0" }}
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="14px"
          p={4}
          value={formData.complaint1}
          onChange={(e) => handleTextareaChange(1, e.target.value)}
        />
        {renderNavigationButtons()}
      </Box>
    </Box>
  );

  // Step 2: Vital Signs
  const renderComplaintBox2 = () => (
    <Box width="100%" paddingY="40px">
      <Text marginBottom="10px" fontWeight="500">
        History of presenting Illness
      </Text>
      <Box p={4} width="100%" bg="white" rounded="md" shadow="sm">
        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Pulse Rate
            </Text>
            <Input
              placeholder="Pulse Rate(B/Min) - (Min: 60 Max:100)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.pulseRate}
              onChange={(e) => handleInputChange("pulseRate", e.target.value)}
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Oxygen Saturation
            </Text>
            <Input
              placeholder="Oxygen Saturation(%) - (Min: 97 Max:99)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.oxygenSaturation}
              onChange={(e) =>
                handleInputChange("oxygenSaturation", e.target.value)
              }
            />
          </Box>
        </Flex>

        <Flex gap={4} mb={4}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Blood Pressure
            </Text>
            <Input
              placeholder="Blood Pressure(mmHg) - (e.g., 120/80)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.bloodPressure}
              onChange={(e) =>
                handleInputChange("bloodPressure", e.target.value)
              }
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Temperature
            </Text>
            <Input
              placeholder="Temperature(°C) - (Min: 36.1 Max: 37.2)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
            />
          </Box>
        </Flex>

        <Flex gap={4} mb={6}>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Weight
            </Text>
            <Input
              placeholder="Weight(kg)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Height
            </Text>
            <Input
              placeholder="Height(cm)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
            />
          </Box>
        </Flex>

        {renderNavigationButtons()}
      </Box>
    </Box>
  );

  // Step 3: Treatment Plan and Notes
  const renderComplaintBox3 = () => (
    <Box width="100%" paddingY="40px">
      <Text marginBottom="10px" fontWeight="500">
        Past Medical and Surgical History
      </Text>
      <Box p={4} width="100%" bg="white" rounded="md" shadow="sm">
        <Flex direction="column" gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="500" mb={2} color="#454545">
              Surgical History
            </Text>
            <Input
              placeholder="Enter surgical history"
              height="50px"
              borderRadius="md"
              borderColor="#E2E8F0"
              _placeholder={{ color: "#A0AEC0" }}
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="14px"
              value={formData.complaint3.split("|||")[0] || ""}
              onChange={(e) => {
                const treatmentPlan = formData.complaint3.split("|||")[1] || "";
                const additionalNotes =
                  formData.complaint3.split("|||")[2] || "";
                handleTextareaChange(
                  3,
                  `${e.target.value}|||${treatmentPlan}|||${additionalNotes}`
                );
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="500" mb={2} color="#454545">
              Admission History
            </Text>
            <Textarea
              placeholder="Enter admission history"
              height="50px"
              borderColor="#E2E8F0"
              _placeholder={{ color: "#A0AEC0" }}
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="14px"
              p={3}
              value={formData.complaint3.split("|||")[1] || ""}
              onChange={(e) => {
                const diagnosis = formData.complaint3.split("|||")[0] || "";
                const additionalNotes =
                  formData.complaint3.split("|||")[2] || "";
                handleTextareaChange(
                  3,
                  `${diagnosis}|||${e.target.value}|||${additionalNotes}`
                );
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="500" mb={2} color="#454545">
              Blood Transfusion History
            </Text>
            <Textarea
              placeholder="Enter blood history"
              height="50px"
              borderColor="#E2E8F0"
              _placeholder={{ color: "#A0AEC0" }}
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="14px"
              p={3}
              value={formData.complaint3.split("|||")[2] || ""}
              onChange={(e) => {
                const diagnosis = formData.complaint3.split("|||")[0] || "";
                const treatmentPlan = formData.complaint3.split("|||")[1] || "";
                handleTextareaChange(
                  3,
                  `${diagnosis}|||${treatmentPlan}|||${e.target.value}`
                );
              }}
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="500" mb={2} color="#454545">
              Past Surgical and Medical History
            </Text>
            <Textarea
              placeholder="Enter Surgical and medical history"
              height="50px"
              borderColor="#E2E8F0"
              _placeholder={{ color: "#A0AEC0" }}
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="14px"
              p={3}
              value={formData.complaint3.split("|||")[2] || ""}
              onChange={(e) => {
                const diagnosis = formData.complaint3.split("|||")[0] || "";
                const treatmentPlan = formData.complaint3.split("|||")[1] || "";
                handleTextareaChange(
                  3,
                  `${diagnosis}|||${treatmentPlan}|||${e.target.value}`
                );
              }}
            />
          </Box>
        </Flex>

        {renderNavigationButtons()}
      </Box>
    </Box>
  );

  return (
    <Box marginTop="7vh">
      <Flex flexDirection="column" px={4}>
        <Text fontSize="16px" fontWeight="500">
          Add New Clerk Sheet - Step {currentStep} of 3
        </Text>
      </Flex>
      <Box
        backgroundColor="#F9F9F9"
        height="90vh"
        padding="20px"
        paddingTop="15px"
        borderRadius="30px 0px 0px 30px"
      >
        <Flex justifyContent="space-between">
          <AddSheetSteps />
          <Box width="100%">
            {/* Conditional rendering with different content for each step */}
            {currentStep === 1 && renderComplaintBox1()}
            {currentStep === 2 && renderComplaintBox2()}
            {currentStep === 3 && renderComplaintBox3()}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SingleAccountBody;
