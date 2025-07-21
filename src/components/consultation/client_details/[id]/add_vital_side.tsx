"use client";

import { Box, Flex, Text, DrawerCloseButton, Input } from "@chakra-ui/react";
import AppButton from "../../../layout/button"; // Assuming this is the custom button component

const VitalSide = () => {
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
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Diastolic Pressure
            </Text>
            <Input
              placeholder="Diastolic Pressure(mmHg) - (Min: 60 Max:80)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
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
            isReadOnly={false}
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "xs", color: "gray.400" }}
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
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
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
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Respiratory Rate
            </Text>
            <Input
              placeholder="Respiratory Rate(Breaths/Min) - (Min: 12 Max:20)"
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
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
              isReadOnly={false}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "xs", color: "gray.400" }}
            />
          </Box>
          <Box flex="1">
            <Text fontSize="xs" fontWeight="medium" mb={1} color="#454545">
              Height
            </Text>
            <Input
              placeholder="Height(Cm) - (Min: 1 Max:250)"
              isReadOnly={false}
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
            label="Save"
            background="#073DFC"
            color="white"
            width="150px"
            borderColor="#073DFC"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default VitalSide;
