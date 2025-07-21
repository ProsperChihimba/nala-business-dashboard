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
} from "@chakra-ui/react"
import type React from "react"

interface TreatmentModalProps {
  isOpen: boolean
  onClose: () => void
}

const TreatmentModal = ({ onClose }: { onClose: () => void }) => {
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
        Select pharmacy to share Prescription
      </Text>

      <TableContainer
        w="100%"
        fontFamily="IBM Plex Sans, sans-serif"
        border="1px solid #D9D9D9"
        borderRadius="10px"
        mt={4}
      >
        <Table size="sm" bg="transparent" rounded="md" variant="unstyled" mb="20px" >
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
                Lab Name
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
                Distance from Patient
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Working hours
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
            <Tr
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
                <Checkbox />
              </Td>
              <Td fontSize="12px">Kaites pharmacy tche</Td>
              <Td fontSize="12px">82 Sinza C</Td>
              <Td fontSize="12px">1 KM</Td>
              <Td fontSize="12px">08AM - 22PM</Td>
            </Tr>
            <Tr
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
                <Checkbox />
              </Td>
              <Td fontSize="12px">Kaites pharmacy tche</Td>
              <Td fontSize="12px">82 Sinza C</Td>
              <Td fontSize="12px">1 KM</Td>
              <Td fontSize="12px">08AM - 22PM</Td>
            </Tr>
            <Tr
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
                <Checkbox />
              </Td>
              <Td fontSize="12px">Kaites pharmacy tche</Td>
              <Td fontSize="12px">82 Sinza C</Td>
              <Td fontSize="12px">1 KM</Td>
              <Td fontSize="12px">08AM - 22PM</Td>
            </Tr>

              <Tr
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
                <Checkbox />
              </Td>
              <Td fontSize="12px">Kaites pharmacy tche</Td>
              <Td fontSize="12px">82 Sinza C</Td>
              <Td fontSize="12px">1 KM</Td>
              <Td fontSize="12px">08AM - 22PM</Td>
            </Tr>

            
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="flex-end" mt={6}>
        <Button background="#073DFC" color="white" width="150px" onClick={onClose}>
          Share
        </Button>
      </Flex>
    </Flex>
  )
}

export default TreatmentModal
