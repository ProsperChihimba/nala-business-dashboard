"use client"

import { Box, Flex, Text, DrawerCloseButton, Image } from "@chakra-ui/react"
import image1 from '../../../../assets/p1 (1).png'
import image2 from '../../../../assets/p1 (2).png'
import image3 from '../../../../assets/p1 (3).png'
import image4 from '../../../../assets/p1 (4).png'
import image5 from '../../../../assets/p1 (5).png'
import image6 from '../../../../assets/p1 (6).png'
import image7 from '../../../../assets/p1 (7).png'
import image8 from '../../../../assets/p1 (8).png'
import image9 from '../../../../assets/p1 (9).png'
import image10 from '../../../../assets/p1 (10).png'
import image11 from '../../../../assets/p1 (11).png'

const ViewVitalSide = () => {
  // Mock data for vitals display
  const vitalsData = {
    systolicPressure: { value: "30", unit: "Mmhg", image: image4 },
    diastolicPressure: { value: "80", unit: "Mmhg", image: image10 },
    randomBloodGlucose: { value: "5", unit: "Mmol/L", image: image9 },
    pulseRate: { value: "30", unit: "Mmhg", image: image8 },
    oxygenSaturation: { value: "30", unit: "%", image: image7 },
    temperature: { value: "80", unit: "Mmhg", image: image6 },
    respiratoryRate: { value: "80", unit: "Mmhg", image: image4 },
    weight: { value: "5", unit: "Mmol/L", image: image3 },
    height: { value: "5", unit: "Mmol/L", image: image2 },
    bmi: { value: "52.08", status: "Obesity", illustration: image1 },
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
        <Text fontSize="xl" fontWeight="medium">
          View Vitals
        </Text>
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