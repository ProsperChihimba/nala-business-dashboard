import { Box, Flex, Button, useDisclosure, Spinner, Center, Text as ChakraText } from "@chakra-ui/react";
import { Typography } from "antd";
import { useState, useEffect } from "react";
import LearnArticle from "./article";
import AppModal from "../../../../layout/modal";
import CreateLearnModal from "./create_learn_modal";
import EditLearnModal from "./edit_learn_modal";
import { apiService, LearnArticle as LearnArticleType } from "../../../../../services/api";
import { useAuth } from "../../../../../contexts/AuthContext";

const LearnContent = () => {
  const { Text } = Typography;
  const { token, doctor } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [articles, setArticles] = useState<LearnArticleType[]>([]);
  const [myArticles, setMyArticles] = useState<LearnArticleType[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<LearnArticleType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch all published articles (public access - no authentication required)
      const params = { is_published: true, ordering: '-created_at' };
      const response = await apiService.getLearnArticles(params);
      setArticles(response.results || []);
      console.log('Fetched articles:', response.results);

      // If doctor present, fetch my articles; otherwise derive from all
      if (doctor?.id) {
        try {
          const mine = await apiService.getLearnArticles({ doctor: doctor.id, ordering: '-created_at' });
          setMyArticles(mine.results || []);
        } catch (e) {
          // fallback: filter from all
          setMyArticles((response.results || []).filter((a: any) => a.author?.id === doctor.id));
        }
      } else {
        setMyArticles([]);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    // Refresh articles list after creating new article
    console.log("Learn article created successfully");
    fetchArticles();
  };

  return (
    <Box fontFamily="IBM Plex Sans, sans-serif" marginTop="23px">
      <Flex direction="column">
        {/* header */}
        <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
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
          
          {/* Create Learn Button */}
          <Button
            onClick={onOpen}
            backgroundColor="#073DFC"
            color="white"
            borderRadius="20px"
            fontSize="14px"
            fontWeight="400"
            height="40px"
            px={6}
            _hover={{ bg: "#0630D9" }}
          >
            Create Learn
          </Button>
        </Flex>
      </Flex>

      {/* Create Learn Modal */}
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        modalSize="lg"
        children={<CreateLearnModal onClose={onClose} onSuccess={handleSuccess} />}
      />

      {/* Edit Learn Modal */}
      <AppModal
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedArticle(null); }}
        modalSize="lg"
        children={selectedArticle ? (
          <EditLearnModal
            article={selectedArticle}
            onClose={() => { setIsEditOpen(false); setSelectedArticle(null); }}
            onSuccess={handleSuccess}
          />
        ) : null}
      />

      {/* My Articles */}
      {doctor?.id && (
        <>
          <Flex justifyContent="space-between" alignItems="center" mt={6} mb={2}>
            <ChakraText fontSize="16px" fontWeight={600}>My Articles</ChakraText>
            <ChakraText fontSize="12px" color="#6D6D6D">{myArticles.length} items</ChakraText>
          </Flex>
          <Flex
            display="grid"
            gap={3}
            gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
          >
            {isLoading ? (
              <Center py={8} width="100%">
                <Spinner size="lg" color="blue.500" />
              </Center>
            ) : myArticles.length === 0 ? (
              <Box p={4} width="100%">
                <ChakraText color="gray.500">You have not created any articles yet.</ChakraText>
              </Box>
            ) : (
              myArticles.map((article) => (
                <LearnArticle
                  key={article.id}
                  article={article}
                  isOwner
                  onEdit={(a) => { setSelectedArticle(a); setIsEditOpen(true); }}
                  onDelete={async (a) => {
                    if (!token) return;
                    try {
                      await apiService.deleteLearnArticle(a.id, token, doctor?.id);
                      handleSuccess();
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              ))
            )}
          </Flex>
        </>
      )}

      {/* Other Articles */}
      <Flex
        display="grid"
        gap={3}
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
      >
        {isLoading ? (
          <Center py={8} width="100%">
            <Spinner size="lg" color="blue.500" />
          </Center>
        ) : error ? (
          <Box p={4} width="100%">
            <ChakraText color="red.500">{error}</ChakraText>
          </Box>
        ) : articles.filter(a => !doctor?.id || a.author?.id !== doctor.id).length === 0 ? (
          <Box p={4} width="100%">
            <ChakraText color="gray.500">No other articles found.</ChakraText>
          </Box>
        ) : (
          articles
            .filter(article => !doctor?.id || article.author?.id !== doctor.id)
            .map((article) => (
              <LearnArticle key={article.id} article={article} />
            ))
        )}
      </Flex>
    </Box>
  );
};

export default LearnContent;

