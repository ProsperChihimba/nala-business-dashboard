import { Box, Flex } from "@chakra-ui/react";
import { Image, Typography } from "antd";
import learn1 from "../../../../../assets/learn2.png";
import ArticleTag from "./tag";
import { LearnArticle as LearnArticleType } from "../../../../../services/api";

interface LearnArticleProps {
  article: LearnArticleType;
  isOwner?: boolean;
  onEdit?: (article: LearnArticleType) => void;
  onDelete?: (article: LearnArticleType) => void;
}

const LearnArticle = ({ article, isOwner, onEdit, onDelete }: LearnArticleProps) => {
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

  // Truncate description if too long
  const truncatedDescription = article.description.length > 100 
    ? `${article.description.substring(0, 100)}...` 
    : article.description;

  return (
    <Flex
      direction="column"
      fontFamily="IBM Plex Sans, sans-serif"
      marginTop="10px"
      w="100%"
      gap={1}
    >
      {/* owner actions */}
      {isOwner && (
        <Flex justifyContent="flex-end" gap={2}>
          <Text
            onClick={() => onEdit && onEdit(article)}
            style={{ cursor: 'pointer', color: '#073DFC', fontSize: '12px' }}
          >
            Edit
          </Text>
          <Text
            onClick={() => onDelete && onDelete(article)}
            style={{ cursor: 'pointer', color: '#E53E3E', fontSize: '12px' }}
          >
            Delete
          </Text>
        </Flex>
      )}
      {/* image */}
      {article.image_url ? (
        <Image src={article.image_url} preview={false} alt={article.title} />
      ) : (
        <Image src={learn1} preview={false} alt={article.title} />
      )}

      {/* author*/}
      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "10px",
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
          fontSize: "13px",
          fontWeight: 500,
          color: "#000",
          marginBottom: 0,
        }}
      >
        {article.title}
      </Text>

      {/* desc */}
      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "10px",
          fontWeight: 400,
          color: "#6D6D6D",
        }}
      >
        {truncatedDescription}
      </Text>

      {/* tags */}
      {article.tags && article.tags.length > 0 && (
        <Flex gap="6px" marginTop="6px" flexWrap="wrap">
          {article.tags.map((tag, index) => (
            <ArticleTag
              key={index}
              rightElement={<Box boxSize="6px" bg="#F7CB73" rounded="3xl"></Box>}
              text={tag}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default LearnArticle;

