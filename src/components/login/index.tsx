import {
  Box,
  Button,
  Flex,
 
  Link,
 
} from "@chakra-ui/react";
import { Typography } from "antd";
import DepositHeading from "../layout/heading";
import DepositInput from "../layout/input";

const Login = () => {
  const { Text } = Typography;
  const handleNavigation = ()=>{
    window.location.href = '/accounts-page'
  }
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

        {/* inputs */}

        <DepositInput
          title="Email"
          value=""
          placeholder=""
          isReadOnly={false}
          percentage="20%"
          marginBottom="0px"
          marginTop="20px"
          width="100%"
        />

        <DepositInput
          title="Password"
          value=""
          placeholder=""
          isReadOnly={false}
          marginBottom="0px"
          marginTop="20px"
          width="100%"

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
  onClick={handleNavigation}
  _hover={{
    backgroundColor: "navy",
    
  }}
  
>
  Continue
</Button>      </Box>
    </Flex>
  );
};

export default Login;
