import {
  Box,
  Button,
  Flex,
  Link,
  Alert,
  AlertIcon,
  Text as ChakraText,
} from "@chakra-ui/react";
import { Typography } from "antd";
import DepositHeading from "../layout/heading";
import DepositInput from "../layout/input";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const { Text } = Typography;
  const { login, isLoading, error, setError } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      await login({ username, password });
      // Navigate to accounts page on successful login
      navigate('/accounts-page');
    } catch (error) {
      // Error is already handled in the context
      console.error('Login error:', error);
    }
  };
  return (
    <Flex
      direction="column"
      marginTop="80px"
      px={400}
     justifyContent="center"
    >
      <Box 
      
      >
        <Flex flexDir="column">
          {/* heading */}
          <DepositHeading title="Welcome back" />

          {/* header desc */}
          <Text
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#9A9A9A",
            }}
          >
            Please enter your account credentials
          </Text>
        </Flex>

        {/* Error display */}
        {error && (
          <Alert status="error" mt="20px" borderRadius="10px">
            <AlertIcon />
            <ChakraText fontFamily="IBM Plex Sans, sans-serif" fontSize="14px">
              {error}
            </ChakraText>
          </Alert>
        )}

        {/* inputs */}
        <DepositInput
          title="Username"
          value={username}
          placeholder="Enter your username"
          isReadOnly={false}
          percentage="20%"
          marginBottom="0px"
          marginTop="20px"
          width="100%"
          onChange={(e) => setUsername(e.target.value)}
        />

        <DepositInput
          title="Password"
          value={password}
          placeholder="Enter your password"
          isReadOnly={false}
          marginBottom="0px"
          marginTop="20px"
          width="100%"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Flex mt={30} justify="end">
          <Link href="#" color="#073DFC" fontSize={15}>
            Forgot password
          </Link>
        </Flex>

<Button 
  width="100%" 
  mt={10} 
  background='#073DFC' 
  color="white" 
  onClick={handleLogin}
  isLoading={isLoading}
  loadingText="Signing in..."
  disabled={isLoading || !username || !password}
  _hover={{
    backgroundColor: "navy",
  }}
>
  {isLoading ? "Signing in..." : "Sign In"}
</Button>

        {/* Signup link */}
        <Flex justify="center" mt="20px">
          <ChakraText fontFamily="IBM Plex Sans, sans-serif" fontSize="14px" color="#9A9A9A">
            Don't have an account?{' '}
            <Link as={RouterLink} to="/" color="#073DFC" textDecoration="underline">
              Sign up here
            </Link>
          </ChakraText>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
