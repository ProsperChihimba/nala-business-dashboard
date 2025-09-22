import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { CalendarIcon } from "@chakra-ui/icons";
import AppModal from "../../../../layout/modal";
import UpdateModel from "./update_model";
import AppButton from "../../../../layout/button";
import { useAuth } from "../../../../../contexts/AuthContext";
import { apiService, ScheduleItem, AddScheduleRequest } from "../../../../../services/api";

interface DayItem {
  day: string;
  date: number;
  dayOfWeek: number; // 0=Sunday, 1=Monday, etc.
  isSelected: boolean;
}

interface TimeSlot {
  time: string;
  value: string; // 24-hour format
  isSelected: boolean;
}

const MySchedule: React.FC = () => {
  const { token, doctor } = useAuth();
  const toast = useToast();
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay()); // Today is selected by default
  const [selectedStartTime, setSelectedStartTime] = useState<number>(0);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [existingSchedules, setExistingSchedules] = useState<ScheduleItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Generate current week's dates
  const generateCurrentWeekDates = (): DayItem[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get the start of the current week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    
    const weekDays: DayItem[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      
      weekDays.push({
        day: dayNames[i],
        date: date.getDate(),
        dayOfWeek: i,
        isSelected: i === currentDay, // Select today by default
      });
    }
    
    return weekDays;
  };

  const days = generateCurrentWeekDates();

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", value: "09:00:00", isSelected: false },
    { time: "10:00 AM", value: "10:00:00", isSelected: false },
    { time: "11:00 AM", value: "11:00:00", isSelected: false },
    { time: "12:00 PM", value: "12:00:00", isSelected: false },
    { time: "01:00 PM", value: "13:00:00", isSelected: false },
    { time: "02:00 PM", value: "14:00:00", isSelected: false },
    { time: "03:00 PM", value: "15:00:00", isSelected: false },
    { time: "04:00 PM", value: "16:00:00", isSelected: false },
    { time: "05:00 PM", value: "17:00:00", isSelected: false },
    { time: "06:00 PM", value: "18:00:00", isSelected: false },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Load existing schedules on component mount
  useEffect(() => {
    if (token && doctor?.id) {
      loadExistingSchedules();
    }
  }, [token, doctor?.id]);

  const loadExistingSchedules = async () => {
    if (!token || !doctor?.id) return;
    
    try {
      const schedules = await apiService.getDoctorSchedule(doctor.id, token);
      setExistingSchedules(schedules);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    }
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
  };

  const handleStartTimeSelect = (index: number) => {
    setSelectedStartTime(index);
    // Ensure end time is after start time
    if (index >= selectedEndTime) {
      setSelectedEndTime(index + 1);
    }
  };

  const handleEndTimeSelect = (index: number) => {
    if (index > selectedStartTime) {
      setSelectedEndTime(index);
    }
  };

  const handleUpdateSchedule = async (consultationFee: number) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to update your schedule",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // If we don't have doctor profile, we need to get it
    let doctorId = doctor?.id;
    if (!doctorId) {
      try {
        // Try to get doctor profile using the token
        // We'll need to get the username from somewhere - let's try a different approach
        toast({
          title: "Error",
          description: "Unable to identify doctor. Please log out and log in again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      } catch (error) {
        console.error('Failed to get doctor profile:', error);
        toast({
          title: "Error",
          description: "Unable to identify doctor. Please log out and log in again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const selectedDayData = days[selectedDay];
      const startTimeData = timeSlots[selectedStartTime];
      const endTimeData = timeSlots[selectedEndTime];

      const scheduleData: AddScheduleRequest = {
        day_of_week: selectedDayData.dayOfWeek,
        start_time: startTimeData.value,
        end_time: endTimeData.value,
        consultation_fee: consultationFee,
        is_available: true,
      };

      console.log('Adding schedule:', scheduleData);
      
      await apiService.addDoctorSchedule(doctorId, token, scheduleData);
      
      toast({
        title: "Success",
        description: "Schedule updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reload schedules
      await loadExistingSchedules();
      onClose();
      
    } catch (error) {
      console.error('Failed to update schedule:', error);
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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

      {/* Month and Current Date */}
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="13px" fontWeight="500" color="gray.600">
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <Text fontSize="11px" color="blue.500" fontWeight="500">
          Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </Text>
      </Flex>

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
              bg={selectedDay === index ? "blue.500" : (day.isSelected ? "green.100" : "transparent")}
              color={selectedDay === index ? "white" : (day.isSelected ? "green.700" : "gray.700")}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="14px"
              fontWeight={day.isSelected ? "600" : "500"}
              transition="all 0.2s"
              border={day.isSelected && selectedDay !== index ? "2px solid" : "none"}
              borderColor={day.isSelected && selectedDay !== index ? "green.300" : "transparent"}
              _hover={{
                bg: selectedDay === index ? "blue.600" : (day.isSelected ? "green.200" : "gray.100"),
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
          Start Time
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              size="sm"
              variant={selectedStartTime === index ? "solid" : "outline"}
              colorScheme={selectedStartTime === index ? "blue" : "gray"}
              bg={selectedStartTime === index ? "blue.500" : "transparent"}
              color={selectedStartTime === index ? "white" : "gray.600"}
              borderColor="gray.300"
              fontSize="11px"
              fontWeight="400"
              px={3}
              py={1}
              h="28px"
              borderRadius="14px"
              onClick={() => handleStartTimeSelect(index)}
              _hover={{
                bg: selectedStartTime === index ? "blue.600" : "gray.50",
              }}
            >
              {slot.time}
            </Button>
          ))}
        </HStack>

        <Text fontSize="13px" fontWeight="500" color="gray.800" mt={4}>
          End Time
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              size="sm"
              variant={selectedEndTime === index ? "solid" : "outline"}
              colorScheme={selectedEndTime === index ? "green" : "gray"}
              bg={selectedEndTime === index ? "green.500" : "transparent"}
              color={selectedEndTime === index ? "white" : "gray.600"}
              borderColor="gray.300"
              fontSize="11px"
              fontWeight="400"
              px={3}
              py={1}
              h="28px"
              borderRadius="14px"
              onClick={() => handleEndTimeSelect(index)}
              disabled={index <= selectedStartTime}
              _hover={{
                bg: selectedEndTime === index ? "green.600" : "gray.50",
              }}
            >
              {slot.time}
            </Button>
          ))}
        </HStack>
      </VStack>

      {/* Existing Schedules */}
      {existingSchedules.length > 0 && (
        <VStack align="flex-start" spacing={3} mb={6}>
          <Text fontSize="13px" fontWeight="500" color="gray.800">
            Current Schedules
          </Text>
          <Box width="100%" maxHeight="120px" overflowY="auto">
            {existingSchedules.map((schedule, index) => (
              <Box
                key={index}
                p={3}
                bg="gray.50"
                borderRadius="8px"
                mb={2}
                fontSize="12px"
              >
                <Text fontWeight="500">
                  {days.find(d => d.dayOfWeek === schedule.day_of_week)?.day} - {schedule.start_time} to {schedule.end_time}
                </Text>
                <Text color="gray.600">
                  Fee: TZS {schedule.consultation_fee} | {schedule.is_available ? 'Available' : 'Unavailable'}
                </Text>
              </Box>
            ))}
          </Box>
        </VStack>
      )}

      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        modalSize="md"
        children={<UpdateModel onClose={onClose} onUpdate={handleUpdateSchedule} isLoading={isLoading} />}
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
          disabled={isLoading}
        />
      </Flex>
    </Box>
  );
};

export default MySchedule;
