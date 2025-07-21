import {
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { Divider, Typography } from "antd";
import { FiChevronRight } from "react-icons/fi";
import AppDrawer from "../../../../../../layout/drawer";
import ViewTransaction from "./view_transaction";

const TransactionsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { Text } = Typography;
  return (
    <Box
      width="100%"
      fontFamily="IBM Plex Sans, sans-serif"
      border="1px solid #D9D9D9"
      borderRadius="10px"
      marginTop="30px"
    >
      {/* table title */}
      <Flex
        padding="10px 20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#454545",
          }}
        >
          Latest transactions
        </Text>

        <Flex onClick={onOpen} cursor="pointer">
          <Text
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "#073DFC",
            }}
          >
            View All
          </Text>
          <FiChevronRight
            size="15px"
            style={{ marginLeft: 8 }}
            color="#073DFC"
          />
        </Flex>
      </Flex>

      <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />

      {/* rows */}
      <TableContainer w="100%" h="100%">
        <Table
          size="sm"
          bg="transparent"
          rounded="md"
          variant="unstyled"
          mb="20px"
          border="1px"
        >
          <Thead bg="transparent" rounded="3xl" style={{ color: "#000000" }}>
            <Tr
              style={{
                borderRadius: "7px",
                borderWidth: "1px",
                borderColor: "transparent",
              }}
            >
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Date
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                To
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Amount
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              >
                Initiated by
              </Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              ></Th>
              <Th
                style={{
                  fontSize: "10px",
                  color: "#6D6D6D",
                  fontWeight: "500",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              ></Th>
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
              <Td fontSize="10px">Jun 20</Td>
              <Td fontSize="10px">FACEBOOK</Td>
              <Td fontSize="10px">$230</Td>
              <Td fontSize="10px">Prosper Absalom</Td>
              <Td fontSize="10px">
                <Badge
                  colorScheme="green"
                  color="#00BA07"
                  fontWeight="400"
                  fontSize="7px"
                  borderRadius="2px"
                >
                  Success
                </Badge>
              </Td>
              <Td fontSize="10px" onClick={onOpen} cursor="pointer">
                <FiChevronRight
                  size="15px"
                  style={{ marginLeft: 8 }}
                  color="#000"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {/* drawer */}
      <AppDrawer
        isOpenSide={isOpen}
        onCloseSide={onClose}
        modalSize="md"
        children={<ViewTransaction />}
      />
    </Box>
  );
};

export default TransactionsTable;
