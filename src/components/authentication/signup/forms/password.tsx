import { Flex, Text, Box } from "@chakra-ui/react";
import DepositHeading from "../../../layout/heading";
import DepositInput from "../../../layout/input";
import { useRegistration } from "../../../../contexts/RegistrationContext";
import { useState } from "react";

const SetPassword = () => {
  const { formData, updateFormData } = useRegistration();
  const { Text } = Typography;
  
  const [username, setUsername] = useState(formData.user?.username || '');
  const [password, setPassword] = useState(formData.user?.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    updateFormData({
      user: {
        ...formData.user,
        username: value,
      }
    });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    updateFormData({
      user: {
        ...formData.user,
        password: value,
      }
    });
  };

  // Password validation
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword;
  return (
    <Flex direction="column" marginTop="23vh">
      {/* heading */}
      <DepositHeading title="Choose a password" />

      {/* header desc */}
      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "#9A9A9A",
          marginBottom: "30px",
        }}
      >
        Enter a secure password to create your account.
      </Text>

      <DepositInput
        title="Username"
        value={username}
        placeholder="Choose a username"
        isReadOnly={false}
        marginBottom="20px"
        marginTop="20px"
        onChange={(e) => handleUsernameChange(e.target.value)}
      />

      <DepositInput
        title="Password"
        value={password}
        placeholder="Enter a secure password"
        isReadOnly={false}
        marginBottom="20px"
        marginTop="20px"
        type="password"
        onChange={(e) => handlePasswordChange(e.target.value)}
      />

      <DepositInput
        title="Confirm Password"
        value={confirmPassword}
        placeholder="Confirm your password"
        isReadOnly={false}
        marginBottom="20px"
        marginTop="20px"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Password validation feedback */}
      <Box mt="10px" mb="20px">
        {password && !isPasswordValid && (
          <Text fontSize="12px" color="red.500" fontFamily="IBM Plex Sans, sans-serif">
            Password must be at least 8 characters long
          </Text>
        )}
        {confirmPassword && !doPasswordsMatch && (
          <Text fontSize="12px" color="red.500" fontFamily="IBM Plex Sans, sans-serif">
            Passwords do not match
          </Text>
        )}
        {password && isPasswordValid && doPasswordsMatch && (
          <Text fontSize="12px" color="green.500" fontFamily="IBM Plex Sans, sans-serif">
            ✓ Password is valid
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default SetPassword;
