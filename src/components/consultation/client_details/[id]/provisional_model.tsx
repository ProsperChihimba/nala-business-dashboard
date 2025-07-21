import { Flex, FormLabel, Input, ModalCloseButton } from "@chakra-ui/react";
import {  Typography } from "antd";
import AppButton from "../../../layout/button";

const { Text } = Typography;

const ProvisionalDetails = ({ onClose }: { onClose: () => void }) => {
  return (
    <Flex direction="column" marginBottom="10px">
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
        Provisional Diagnosis
      </Text>

      {/* tabs */}
      <Flex flexDir="column" mt={5}>
        <FormLabel>Diagnosis</FormLabel>
        <Input
        
          value=""
          placeholder=""
          isReadOnly={false}
          marginBottom="80px"
          marginTop="20px"
        />
      </Flex>

      {/* footer */}
      {/* <Divider style={{marginTop: '10px', marginBottom: '15px'}} /> */}
      {/* button */}
      <Flex justifyContent="flex-end">
        <AppButton
          label="Save"
          background="#073DFC"
          color="#fff"
          width="150px"
          borderColor="#073DFC"
          onClick={onClose}
        />
      </Flex>
    </Flex>
  );
};

export default ProvisionalDetails;
