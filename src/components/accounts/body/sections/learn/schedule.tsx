import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { CalendarIcon } from "@chakra-ui/icons";
import AppModal from "../../../../layout/modal";
import UpdateModel from "./update_model";
import AppButton from "../../../../layout/button";

interface DayItem {
  day: string;
  date: number;
  isSelected: boolean;
}

interface TimeSlot {
  time: string;
  isSelected: boolean;
}

const MySchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1); // TUE 17 is selected by default
  const [selectedTime, setSelectedTime] = useState<number>(0); // 07:00 PM is selected by default
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { Text } = Typography;

  const days: DayItem[] = [
    { day: "SUN", date: 15, isSelected: false },
    { day: "TUE", date: 17, isSelected: true },
    { day: "WED", date: 18, isSelected: false },
    { day: "THU", date: 19, isSelected: false },
    { day: "MON", date: 16, isSelected: false },
    { day: "THU", date: 19, isSelected: false },
  ];

  const timeSlots: TimeSlot[] = [
    { time: "07:00 PM", isSelected: true },
    { time: "07:30 PM", isSelected: false },
    { time: "08:00 PM", isSelected: false },
    { time: "08:30 PM", isSelected: false },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
  };

  const handleTimeSelect = (index: number) => {
    setSelectedTime(index);
  };



  return (
    <Box
      width="100%"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="12px"
      p={6}
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      {/* Header */}
      <Flex alignItems="center" mb={4}>
        <Icon as={CalendarIcon} w={4} h={4} color="gray.600" mr={2} />
        <Text fontSize="14px" fontWeight="600" color="gray.800">
          My Schedule
        </Text>
        <Icon as={InfoIcon} w={5} h={5} mt={1} color="gray.800" ml={1} />
      </Flex>

      {/* Month */}
      <Text fontSize="13px" fontWeight="500" color="gray.600" mb={3}>
        May
      </Text>

      {/* Days Selection */}
      <HStack spacing={2} mb={6} justify="flex-start">
        {days.map((day, index) => (
          <VStack
            key={index}
            spacing={1}
            cursor="pointer"
            onClick={() => handleDaySelect(index)}
          >
            <Text
              fontSize="10px"
              fontWeight="500"
              color="gray.500"
              textTransform="uppercase"
            >
              {day.day}
            </Text>
            <Box
              w="32px"
              h="32px"
              borderRadius="50%"
              bg={selectedDay === index ? "blue.500" : "transparent"}
              color={selectedDay === index ? "white" : "gray.700"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="14px"
              fontWeight="500"
              transition="all 0.2s"
              _hover={{
                bg: selectedDay === index ? "blue.600" : "gray.100",
              }}
            >
              {day.date}
            </Box>
          </VStack>
        ))}
      </HStack>

      {/* Time Section */}
      <VStack align="flex-start" spacing={3} mb={6}>
        <Text fontSize="13px" fontWeight="500" color="gray.800">
          Time
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              size="sm"
              variant={selectedTime === index ? "solid" : "outline"}
              colorScheme={selectedTime === index ? "blue" : "gray"}
              bg={selectedTime === index ? "blue.500" : "transparent"}
              color={selectedTime === index ? "white" : "gray.600"}
              borderColor="gray.300"
              fontSize="11px"
              fontWeight="400"
              px={3}
              py={1}
              h="28px"
              borderRadius="14px"
              onClick={() => handleTimeSelect(index)}
              _hover={{
                bg: selectedTime === index ? "blue.600" : "gray.50",
              }}
            >
              {slot.time}
            </Button>
          ))}
        </HStack>
      </VStack>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        modalSize="md"
        children={<UpdateModel onClose={onClose} />}
      />
      {/* Update Button */}
      <Flex justify="flex-end">
        <AppButton
          label="Update"
          background="#073DFC"
          borderColor="#DCDCDC"
          color="white"
          width="140px"
          onClick={onOpen}
        />
      </Flex>
    </Box>
  );
};

export default MySchedule;
