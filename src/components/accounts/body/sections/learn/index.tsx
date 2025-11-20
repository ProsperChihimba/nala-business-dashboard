import { Box, Flex, Spinner, Center, Text as ChakraText, Button } from "@chakra-ui/react";
import { Typography } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, LearnArticle as LearnArticleType } from "../../../../../services/api";
// import { useAuth } from "../../../../../contexts/AuthContext";
import LearnArticleCard from "./article_card";

const AccountsLearn = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  // const { token } = useAuth();
  const [articles, setArticles] = useState<LearnArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const params = { is_published: true, ordering: '-created_at' };
      const response = await apiService.getLearnArticles(params);
      setArticles(response.results?.slice(0, 4) || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box fontFamily="IBM Plex Sans, sans-serif" marginTop="23px">
      <Flex direction="column">
        {/* header */}
        <Flex justifyContent="space-between" alignItems="center" marginBottom="10px">
          <Flex direction="column">
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/learn')}
            fontSize="12px"
            borderColor="#073DFC"
            color="#073DFC"
            _hover={{ bg: "#073DFC", color: "white" }}
          >
            View All
          </Button>
        </Flex>

        {/* learn articles */}
        {isLoading ? (
          <Center py={8}>
            <Spinner size="lg" color="blue.500" />
          </Center>
        ) : articles.length === 0 ? (
          <ChakraText fontSize="14px" color="gray.500">
            No articles available
          </ChakraText>
        ) : (
          <Flex
            display="grid"
            gap={3}
            gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)" }}
          >
            {/* pick `3` articles */}
            {articles.slice(0, 3).map((article) => (
              <LearnArticleCard key={article.id} article={article} />
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default AccountsLearn;
