"use client"

import { Box, Flex, Text, DrawerCloseButton, Image, Spinner, Center } from "@chakra-ui/react"
import { PatientVital } from "../../../../services/api"
import image1 from '../../../../assets/p1 (1).png'
import image2 from '../../../../assets/p1 (2).png'
import image3 from '../../../../assets/p1 (3).png'
import image4 from '../../../../assets/p1 (4).png'
import image6 from '../../../../assets/p1 (6).png'
import image7 from '../../../../assets/p1 (7).png'
import image8 from '../../../../assets/p1 (8).png'
import image9 from '../../../../assets/p1 (9).png'
import image10 from '../../../../assets/p1 (10).png'

interface ViewVitalSideProps {
  vital?: PatientVital | null;
}

const ViewVitalSide: React.FC<ViewVitalSideProps> = ({ vital }) => {
  // Calculate BMI
  const calculateBMI = (weight: number, height: number) => {
    if (height === 0) return 0;
    const heightInMeters = height / 100; // Convert cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  if (!vital) {
    return (
      <Flex direction="column" height="100%" bg="white">
        <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
          <Text fontSize="xl" fontWeight="medium">
            View Vitals
          </Text>
          <DrawerCloseButton />
        </Flex>
        <Box height="1px" width="100%" bg="gray.200" mb={4} />
        <Center flexGrow={1}>
          <Text color="gray.500">No vital selected</Text>
        </Center>
      </Flex>
    );
  }

  const bmi = calculateBMI(vital.weight, vital.height);
  const bmiStatus = getBMIStatus(parseFloat(bmi));

  // Real data from API
  const vitalsData = {
    systolicPressure: { value: vital.systolic_pressure.toString(), unit: "mmHg", image: image4 },
    diastolicPressure: { value: vital.diastolic_pressure.toString(), unit: "mmHg", image: image10 },
    randomBloodGlucose: { value: vital.random_blood_glucose.toString(), unit: "Mmol/L", image: image9 },
    pulseRate: { value: vital.pulse_rate.toString(), unit: "BPM", image: image8 },
    oxygenSaturation: { value: vital.oxygen_saturation.toString(), unit: "%", image: image7 },
    temperature: { value: vital.temperature.toString(), unit: "°F", image: image6 },
    respiratoryRate: { value: vital.respiratory_rate.toString(), unit: "Breaths/Min", image: image4 },
    weight: { value: vital.weight.toString(), unit: "kg", image: image3 },
    height: { value: vital.height.toString(), unit: "cm", image: image2 },
    bmi: { value: bmi, status: bmiStatus, illustration: image1 },
  }

  const VitalDisplayItem = ({
    label,
    value,
    unit,
    imageSrc,
  }: { label: string; value: string; unit: string; imageSrc: string }) => (
    <Flex alignItems="center" mb={2}>
      <Image src={imageSrc} alt={`${label} icon`} boxSize="16px" mr={2} />
      <Flex direction="column">
        <Text fontSize="xs" fontWeight="medium" color="gray.600">
          {label}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="black">
          {value} {unit}
        </Text>
      </Flex>
    </Flex>
  )

  return (
    <Flex direction="column" height="100%" bg="white">
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" px={6} py={4}>
        <Box>
          <Text fontSize="xl" fontWeight="medium">
            View Vitals
          </Text>
          <Text fontSize="sm" color="gray.600">
            Recorded on {new Date(vital.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </Box>
        <DrawerCloseButton />
      </Flex>

      {/* Divider */}
      <Box height="1px" width="100%" bg="gray.200" mb={4} />

      {/* Content Area */}
      <Flex direction="column" px={6} flexGrow={1} overflowY="auto">
        {/* Blood Pressure Section */}
        <Flex alignItems="center" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mr={2} whiteSpace="nowrap">
            Blood Pressure
          </Text>
          <Box height="0.7px" width="100%" bg="gray.300" />
        </Flex>
        <Box p={4} mb={6} borderRadius="lg" border="1px solid" borderColor="gray.200" bg="white">
          <VitalDisplayItem
            label="Systolic Pressure"
            value={vitalsData.systolicPressure.value}
            unit={vitalsData.systolicPressure.unit}
            imageSrc={vitalsData.systolicPressure.image}
          />
          <VitalDisplayItem
            label="Diastolic Pressure"
            value={vitalsData.diastolicPressure.value}
            unit={vitalsData.diastolicPressure.unit}
            imageSrc={vitalsData.diastolicPressure.image}
          />
          <VitalDisplayItem
            label="Random Blood Glucose"
            value={vitalsData.randomBloodGlucose.value}
            unit={vitalsData.randomBloodGlucose.unit}
            imageSrc={vitalsData.randomBloodGlucose.image}
          />
        </Box>

        {/* Others Section */}
        <Flex alignItems="center" mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mr={2} whiteSpace="nowrap">
            Others
          </Text>
          <Box height="0.7px" width="100%" bg="gray.300" />
        </Flex>
        <Box p={4} mb={6} borderRadius="lg" border="1px solid" borderColor="gray.200" bg="white">
          <Flex wrap="wrap" gap={4}>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Pulse Rate"
                value={vitalsData.pulseRate.value}
                unit={vitalsData.pulseRate.unit}
                imageSrc={vitalsData.pulseRate.image}
              />
            </Box>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Oxygen Saturation"
                value={vitalsData.oxygenSaturation.value}
                unit={vitalsData.oxygenSaturation.unit}
                imageSrc={vitalsData.oxygenSaturation.image}
              />
            </Box>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Temperature"
                value={vitalsData.temperature.value}
                unit={vitalsData.temperature.unit}
                imageSrc={vitalsData.temperature.image}
              />
            </Box>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Respiratory Rate"
                value={vitalsData.respiratoryRate.value}
                unit={vitalsData.respiratoryRate.unit}
                imageSrc={vitalsData.respiratoryRate.image}
              />
            </Box>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Weight"
                value={vitalsData.weight.value}
                unit={vitalsData.weight.unit}
                imageSrc={vitalsData.weight.image}
              />
            </Box>
            <Box flexBasis="calc(50% - 8px)">
              <VitalDisplayItem
                label="Height"
                value={vitalsData.height.value}
                unit={vitalsData.height.unit}
                imageSrc={vitalsData.height.image}
              />
            </Box>
          </Flex>
        </Box>

        {/* BMI Illustration */}
        <Flex direction="column" alignItems="center" mb={6}>
          <Image
            src={vitalsData.bmi.illustration}
            alt="BMI Illustration"
            boxSize="100px"
            objectFit="contain"
            mb={2}
          />
          <Text fontSize="sm" fontWeight="medium" color="black">
            BMI = {vitalsData.bmi.value} - {vitalsData.bmi.status}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ViewVitalSide