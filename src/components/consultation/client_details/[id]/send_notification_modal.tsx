import { Flex, FormLabel, Input, ModalCloseButton, Textarea } from "@chakra-ui/react";
import {  Typography } from "antd";
import AppButton from "../../../layout/button";

const { Text } = Typography;

const SendNotification = ({ onClose }: { onClose: () => void }) => {
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
       Send notification to my patients
      </Text>

      {/* tabs */}
      <Flex flexDir="column" mt={5}>
        <FormLabel>Title</FormLabel>
        <Input
        
          value=""
          placeholder=""
          isReadOnly={false}
        
          marginTop="10px"
        />
      </Flex>
        <Flex flexDir="column" mt={5}>
        <FormLabel>Body</FormLabel>
        <Textarea
        
          value=""
          placeholder=""
          isReadOnly={false}
          marginBottom="80px"
          marginTop="10px"
        />
      </Flex>

   
      {/* button */}
      <Flex justifyContent="flex-end">
        <AppButton
          label="Send"
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

export default SendNotification;
