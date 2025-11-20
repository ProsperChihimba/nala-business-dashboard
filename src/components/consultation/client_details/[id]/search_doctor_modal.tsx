"use client"

import {
  Flex,
  ModalCloseButton,
  Checkbox,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Text,
  Input,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"

interface SearchDoctorModalProps {
  onClose: () => void;
  onTransfer?: (doctorId: string) => void;
}

const SearchDoctorModal = ({ onClose, onTransfer }: SearchDoctorModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  // Sample doctor data - replace with actual API call
  const doctors = [
    { id: "1", name: "Kaites proc tche", profile: "General Practitioner", location: "Sinza C", hospital: "Muhimbili" },
    { id: "2", name: "Kaites proc tche", profile: "General Practitioner", location: "Sinza C", hospital: "Muhimbili" },
    { id: "3", name: "Kaites proc tche", profile: "General Practitioner", location: "Sinza C", hospital: "Muhimbili" },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransfer = () => {
    if (selectedDoctor && onTransfer) {
      onTransfer(selectedDoctor);
    }
    onClose();
  };

  return (
    <Flex direction="column" p={4}>
      <ModalCloseButton />
      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "20px",
          fontWeight: 500,
          color: "#000",
          marginBottom: "20px",
        }}
      >
        Search for a doctor to transfer patient
      </Text>

      {/* Search Bar */}
      <Box marginBottom="20px">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          height="40px"
          borderRadius="8px"
          borderColor="#DCDCDC"
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="14px"
          _placeholder={{ color: "#6D6D6D" }}
        />
      </Box>

      <TableContainer
        w="100%"
        fontFamily="IBM Plex Sans, sans-serif"
        border="1px solid #D9D9D9"
        borderRadius="10px"
        mt={4}
      >
        <Table size="sm" bg="transparent" rounded="md" variant="unstyled" mb="20px">
          <Thead bg="#F0F2F5" rounded="3xl" style={{ color: "#000000" }}>
            <Tr
              style={{
                borderRadius: "7px",
                borderWidth: "1px",
                borderColor: "transparent",
              }}
            >
              <Th></Th> {/* Checkbox column header */}
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Doctor
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Profile
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Location
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Hospital
              </Th>
            </Tr>
          </Thead>
          <Tbody
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {filteredDoctors.map((doctor) => (
              <Tr
                key={doctor.id}
                mb="5px"
                style={{
                  borderRadius: "40px",
                  borderColor: "transparent",
                  fontSize: "10px",
                  borderWidth: "1px",
                  backgroundColor: "transparent",
                }}
              >
                <Td>
                  <Checkbox
                    isChecked={selectedDoctor === doctor.id}
                    onChange={() => setSelectedDoctor(doctor.id)}
                  />
                </Td>
                <Td fontSize="12px">{doctor.name}</Td>
                <Td fontSize="12px">{doctor.profile}</Td>
                <Td fontSize="12px">{doctor.location}</Td>
                <Td fontSize="12px">{doctor.hospital}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="flex-end" mt={6}>
        <Button
          background="#073DFC"
          color="white"
          width="150px"
          onClick={handleTransfer}
          isDisabled={!selectedDoctor}
          fontFamily="IBM Plex Sans, sans-serif"
        >
          Transfer
        </Button>
      </Flex>
    </Flex>
  )
}

export default SearchDoctorModal
