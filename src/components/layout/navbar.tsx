import { Flex, Box, Avatar, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiSettings, FiUser, FiEdit } from 'react-icons/fi';
import AppModal from './modal';
import { useState } from 'react';

// Import logo - you'll need to add your company logo to assets
// import CompanyLogo from '../../assets/logo.svg';

const NavBar = () => {
  const { logout, doctor } = useAuth();
  const navigate = useNavigate();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="15px 30px"
      backgroundColor="#fff"
      borderBottom="1px solid #E2E8F0"
      position="sticky"
      top={0}
      zIndex={1000}
      fontFamily="IBM Plex Sans, sans-serif"
    >
      {/* Top Left - Company Logo */}
      <Box>
        {/* <Image src={CompanyLogo} alt="Company Logo" height="40px" /> */}
        <Text
          fontSize="20px"
          fontWeight="600"
          color="#073DFC"
          fontFamily="IBM Plex Sans, sans-serif"
        >
          CareLink
        </Text>
      </Box>

      {/* Top Right - Doctor Profile Dropdown & Bulk Messages Button */}
      <Flex gap="20px" alignItems="center">
        {/* Send Bulk Messages Button */}
        <Box
          as="button"
          padding="8px 16px"
          backgroundColor="#073DFC"
          color="white"
          borderRadius="8px"
          fontSize="14px"
          fontWeight="500"
          cursor="pointer"
          _hover={{ backgroundColor: "#0630D9" }}
          onClick={() => {
            // TODO: Implement bulk messages functionality
            console.log('Send Bulk Messages clicked');
          }}
        >
          Send BULK Messages
        </Box>

        {/* Doctor Profile Dropdown */}
        <Menu>
          <MenuButton>
            <Flex alignItems="center" gap="10px">
              <Avatar
                size="sm"
                name={doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Doctor'}
                src={doctor?.profile_picture}
              />
              <Text fontSize="14px" fontWeight="500">
                {doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Doctor'}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<FiUser />}
              onClick={() => setIsAccountModalOpen(true)}
            >
              My Account
            </MenuItem>
            <MenuItem
              icon={<FiEdit />}
              onClick={() => {
                // TODO: Navigate to edit account page
                console.log('Edit Account clicked');
              }}
            >
              Edit Account
            </MenuItem>
            <MenuItem
              icon={<FiUser />}
              onClick={() => {
                // TODO: Show doctor profile info
                console.log('Doctor Profile info clicked');
              }}
            >
              Doctor Profile info
            </MenuItem>
            <MenuItem
              icon={<FiSettings />}
              onClick={() => setIsSystemSettingsOpen(true)}
            >
              System setting
            </MenuItem>
            <MenuItem
              icon={<FiLogOut />}
              onClick={handleLogout}
              color="red.500"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Account Modal - Placeholder for My Account submenu */}
      <AppModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        modalSize="md"
      >
        <Box padding="20px">
          <Text fontSize="18px" fontWeight="600" marginBottom="20px">
            My Account
          </Text>
          <Flex direction="column" gap="10px">
            <Box
              as="button"
              padding="10px"
              textAlign="left"
              _hover={{ backgroundColor: "#F7FAFC" }}
              onClick={() => {
                setIsAccountModalOpen(false);
                // TODO: Navigate to edit account
                console.log('Edit Account clicked');
              }}
            >
              <Flex alignItems="center" gap="10px">
                <FiEdit />
                <Text>Edit Account</Text>
              </Flex>
            </Box>
            <Box
              as="button"
              padding="10px"
              textAlign="left"
              _hover={{ backgroundColor: "#F7FAFC" }}
              onClick={() => {
                setIsAccountModalOpen(false);
                // TODO: Show doctor profile info
                console.log('Doctor Profile info clicked');
              }}
            >
              <Flex alignItems="center" gap="10px">
                <FiUser />
                <Text>Doctor Profile info</Text>
              </Flex>
            </Box>
            <Box
              as="button"
              padding="10px"
              textAlign="left"
              _hover={{ backgroundColor: "#F7FAFC" }}
              onClick={() => {
                setIsAccountModalOpen(false);
                setIsSystemSettingsOpen(true);
              }}
            >
              <Flex alignItems="center" gap="10px">
                <FiSettings />
                <Text>System setting</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </AppModal>

      {/* System Settings Modal */}
      <AppModal
        isOpen={isSystemSettingsOpen}
        onClose={() => setIsSystemSettingsOpen(false)}
        modalSize="md"
      >
        <Box padding="20px">
          <Text fontSize="18px" fontWeight="600" marginBottom="20px">
            System Settings
          </Text>
          <Flex direction="column" gap="15px">
            <Box>
              <Text fontSize="14px" fontWeight="500" marginBottom="10px">
                Theme
              </Text>
              <Flex gap="10px">
                <Box
                  as="button"
                  padding="10px 20px"
                  border="1px solid #DCDCDC"
                  borderRadius="8px"
                  _hover={{ borderColor: "#073DFC" }}
                >
                  Light
                </Box>
                <Box
                  as="button"
                  padding="10px 20px"
                  border="1px solid #DCDCDC"
                  borderRadius="8px"
                  _hover={{ borderColor: "#073DFC" }}
                >
                  Dark
                </Box>
              </Flex>
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="500" marginBottom="10px">
                Font Size
              </Text>
              <Flex gap="10px">
                <Box
                  as="button"
                  padding="10px 20px"
                  border="1px solid #DCDCDC"
                  borderRadius="8px"
                  _hover={{ borderColor: "#073DFC" }}
                >
                  Small
                </Box>
                <Box
                  as="button"
                  padding="10px 20px"
                  border="1px solid #DCDCDC"
                  borderRadius="8px"
                  _hover={{ borderColor: "#073DFC" }}
                >
                  Medium
                </Box>
                <Box
                  as="button"
                  padding="10px 20px"
                  border="1px solid #DCDCDC"
                  borderRadius="8px"
                  _hover={{ borderColor: "#073DFC" }}
                >
                  Large
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </AppModal>
    </Flex>
  );
};

export default NavBar;

