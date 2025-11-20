import { Box, Flex } from "@chakra-ui/react";
import { Image, Typography } from "antd";
import learn1 from "../../../../../assets/learn2.png";
import { LearnArticle as LearnArticleType } from "../../../../../services/api";

interface LearnArticleCardProps {
  article: LearnArticleType;
}

const LearnArticleCard = ({ article }: LearnArticleCardProps) => {
  const { Text } = Typography;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Format author name
  const authorName = article.author 
    ? `${article.author.first_name} ${article.author.last_name}`
    : "Unknown Author";

  // Truncate description
  const truncatedDescription = article.description.length > 100 
    ? `${article.description.substring(0, 100)}...` 
    : article.description;

  return (
    <Flex
      direction="column"
      fontFamily="IBM Plex Sans, sans-serif"
      marginTop="15px"
      w="100%"
      border="1px solid #E2E8F0"
      borderRadius="8px"
      overflow="hidden"
      backgroundColor="white"
    >
      {/* image */}
      <Box width="100%" height="150px" overflow="hidden">
        {article.image_url ? (
          <Image 
            src={article.image_url} 
            preview={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Image 
            src={learn1} 
            preview={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
      </Box>

      <Box padding="12px">
        {/* author*/}
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#073DFC",
            marginTop: 6,
          }}
        >
          {authorName} . {formatDate(article.created_at)}
        </Text>

        {/* title */}
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "#000",
            marginBottom: 0,
            marginTop: 4,
          }}
        >
          {article.title}
        </Text>

        {/* desc */}
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "#6D6D6D",
            marginTop: 4,
          }}
        >
          {truncatedDescription}
        </Text>
      </Box>
    </Flex>
  );
};

export default LearnArticleCard;

