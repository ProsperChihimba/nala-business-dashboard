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
        Select a Doctor to transfer Patient
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
              <Td fontSize="12px">E.W-Shasha</Td>
              <Td fontSize="12px">82 Sinza C</Td>
              <Td fontSize="12px">General Practitioner</Td>
              <Td fontSize="12px">Muhimbili</Td>
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
              <Td fontSize="12px">General Practitioner</Td>
              <Td fontSize="12px">Muhimbili</Td>
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
              <Td fontSize="12px">General Practitioner</Td>
              <Td fontSize="12px">Muhimbili</Td>
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
              <Td fontSize="12px">General Practitioner</Td>
              <Td fontSize="12px">Muhimbili</Td>
            </Tr>

            
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="flex-end" mt={6}>
        <Button background="#073DFC" color="white" width="150px" onClick={onClose}>
          Transfer
        </Button>
      </Flex>
    </Flex>
  )
}

export default TreatmentModal
