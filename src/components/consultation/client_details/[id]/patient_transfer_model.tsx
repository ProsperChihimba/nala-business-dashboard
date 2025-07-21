import {
  Flex,
  FormLabel,
  Input,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Divider, Typography } from "antd";
import DepositProcessTabs from "../../../deposit/sections/deposit_tabs";
import AppButton from "../../../layout/button";
import AppModal from "../../../layout/modal";
import ProvisionalDetails from "./provisional_model";
import SearchDoctor from "./search_doctor_modal";

const { Text } = Typography;

const PatientTransfer = ({ onClose }: { onClose: () => void }) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  return (
    <Flex direction="column" marginBottom="10px" width="330px" mx="auto">
      {/* close button */}
      <ModalCloseButton />

      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "20px",
          fontWeight: 500,
          color: "#000",
          width: "90%",
          marginTop: "15px",
        }}
      >
        Transfer Patient
      </Text>
      <Text>
        This action will transfer this patient to another doctor and all of the
        infromation
      </Text>

      {/* tabs */}

      <Flex justifyContent="space-between" mt={6}>
        <AppModal
          isOpen={isModalOpen} // Use specific state
          onClose={onModalClose} // Use specific state
          modalSize="md"
          children={<SearchDoctor onClose={onModalClose} />}
        />
        <AppButton
          label="Transfer"
          background="#ffffff"
          color="#000000ff"
          width="150px"
          borderColor="#7e7e7eff"
          onClick={onModalOpen}
        />
        <AppButton
          label="Cancel"
          background="#fc0707ff"
          color="#fff"
          width="150px"
          borderColor="#fc0707ff"
          onClick={onClose}
        />
      </Flex>
    </Flex>
  );
};

export default PatientTransfer;
