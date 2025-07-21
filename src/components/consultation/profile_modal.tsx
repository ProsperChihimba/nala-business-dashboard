import { Flex, ModalCloseButton } from "@chakra-ui/react";
import { Divider, Typography } from "antd";
import { FiPhone, FiShare2, FiGift, FiLogOut } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";

const { Text } = Typography;

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Flex direction="column" marginBottom="10px" padding="20px" width="200px" mx="auto" borderRadius="12px" >
      {/* close button */}
      <ModalCloseButton />
      
      {/* Phone number section */}
      <Flex align="center" py={3} onClick={onClose} cursor="pointer">
        <FiPhone size={20} color="#666" style={{ marginRight: '12px' }} />
        <Text style={{ fontSize: "14px", color: "#666" }}>0714524248</Text>
      </Flex>
      
      <Divider style={{ margin: "0" }} />

      {/* Share profile section */}
      <Flex align="center" py={3} onClick={onClose} cursor="pointer">
        <FiShare2 size={20} color="#666" style={{ marginRight: '12px' }} />
        <Text style={{ fontSize: "14px", color: "#666" }}>Share profile</Text>
      </Flex>
      
      <Divider style={{ margin: "0" }} />

      {/* Referral code section */}
      <Flex align="center" py={3} onClick={onClose} cursor="pointer">
        <FiGift size={20} color="#666" style={{ marginRight: '12px' }} />
        <Text style={{ fontSize: "14px", color: "#666" }}>Referral code</Text>
      </Flex>
      
      <Divider style={{ margin: "0" }} />

      {/* Share profile section (duplicate) */}
      <Flex align="center" py={3} onClick={onClose} cursor="pointer">
        <HiOutlineUser size={20} color="#666" style={{ marginRight: '12px' }} />
        <Text style={{ fontSize: "14px", color: "#666" }}>Share profile</Text>
      </Flex>

      <Divider style={{ margin: "0" }} />

      {/* Logout section */}
      <Flex align="center" py={3}  onClick={onClose} cursor="pointer">
        <FiLogOut size={20} color="#ff6b6b" style={{ marginRight: '12px' }} />
        <Text style={{ fontSize: "14px", color: "#ff6b6b" }}>Logout</Text>
      </Flex>
    </Flex>
  );
};

export default ProfileModal;