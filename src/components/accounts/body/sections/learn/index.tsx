import { Box, Flex } from "@chakra-ui/react";
import { Typography } from "antd";
import LearnArticle from "./article";
import MySchedule from "./schedule";

const AccountsLearn = () => {
  const { Text } = Typography;
  return (
    <Box fontFamily="IBM Plex Sans, sans-serif" marginTop="23px">
      <Flex direction="column">
        {/* header */}
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            color: "#000",
            marginBottom: 0,
          }}
        >
          Learn
        </Text>

        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#000",
          }}
        >
          Write articles so your patients can learn
        </Text>
      </Flex>

      {/* learn articles */}
      <Flex gap={9}>
        <Flex
          display="grid"
          flex={1}
          gap={2}
          gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        >
          <LearnArticle />
          <LearnArticle />
        </Flex>
        <Flex flex={1} >
          <MySchedule />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountsLearn;
