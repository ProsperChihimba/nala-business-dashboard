import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { Image, Typography } from "antd";
import learn1 from "../../../../../assets/learn2.png";
import { LearnArticle as LearnArticleType } from "../../../../../services/api";
import { FiEye, FiEdit2, FiTrash2, FiShare2 } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import AppModal from "../../../../layout/modal";
import { useState } from "react";

interface LearnArticleProps {
  article: LearnArticleType;
  isOwner?: boolean;
  onEdit?: (article: LearnArticleType) => void;
  onDelete?: (article: LearnArticleType) => void;
}

const LearnArticle = ({ article, isOwner, onEdit, onDelete }: LearnArticleProps) => {
  const { Text } = Typography;
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  
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

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        fontFamily="IBM Plex Sans, sans-serif"
        marginTop="10px"
        w="100%"
        gap={1}
        border="1px solid #E2E8F0"
        borderRadius="12px"
        overflow="hidden"
        backgroundColor="white"
        _hover={{ boxShadow: "md" }}
      >
        {/* Image with fixed height */}
        <Box
          width="100%"
          height="200px"
          overflow="hidden"
          position="relative"
        >
          {article.image_url ? (
            <Image 
              src={article.image_url} 
              preview={false} 
              alt={article.title}
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
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </Box>

        {/* Content */}
        <Box padding="12px">
          {/* Author and Date */}
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

          {/* Title */}
          <Text
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#000",
              marginBottom: 0,
              marginTop: 4,
            }}
          >
            {article.title}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "#6D6D6D",
              marginTop: 4,
            }}
          >
            {truncatedDescription}
          </Text>

          {/* View Button */}
          <Button
            size="sm"
            variant="outline"
            leftIcon={<FiEye />}
            onClick={onViewOpen}
            marginTop="12px"
            width="100%"
            fontSize="12px"
            borderColor="#073DFC"
            color="#073DFC"
            _hover={{ bg: "#073DFC", color: "white" }}
          >
            View
          </Button>

          {/* Edit and Delete buttons at bottom (only for owner) */}
          {isOwner && (
            <Flex gap={2} marginTop="8px">
              <Button
                size="sm"
                variant="outline"
                leftIcon={<FiEdit2 />}
                onClick={() => onEdit && onEdit(article)}
                flex={1}
                fontSize="12px"
                borderColor="#073DFC"
                color="#073DFC"
                _hover={{ bg: "#073DFC", color: "white" }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<FiTrash2 />}
                onClick={() => onDelete && onDelete(article)}
                flex={1}
                fontSize="12px"
                borderColor="#E53E3E"
                color="#E53E3E"
                _hover={{ bg: "#E53E3E", color: "white" }}
              >
                Delete
              </Button>
            </Flex>
          )}

          {/* Footer: Doctor name (bottom right) and Social media + Share (bottom left) */}
          {isOwner && (
            <Flex justifyContent="space-between" alignItems="center" marginTop="12px" paddingTop="8px" borderTop="1px solid #E2E8F0">
              {/* Social media and Share button (bottom left) */}
              <Flex gap={2} alignItems="center">
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={handleShare}
                  padding="4px"
                  minW="auto"
                >
                  <FiShare2 size={14} color="#073DFC" />
                </Button>
                {/* TODO: Add social media links from doctor profile */}
                <Button size="xs" variant="ghost" padding="4px" minW="auto">
                  <FaFacebook size={14} color="#073DFC" />
                </Button>
                <Button size="xs" variant="ghost" padding="4px" minW="auto">
                  <FaTwitter size={14} color="#073DFC" />
                </Button>
                <Button size="xs" variant="ghost" padding="4px" minW="auto">
                  <FaLinkedin size={14} color="#073DFC" />
                </Button>
              </Flex>

              {/* Doctor name (bottom right) */}
              <Text
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "#6D6D6D",
                }}
              >
                {authorName}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>

      {/* View Article Modal */}
      <AppModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        modalSize="lg"
      >
        <Box padding="20px" fontFamily="IBM Plex Sans, sans-serif">
          <Flex direction="column" gap={4}>
            {article.image_url && (
              <Image 
                src={article.image_url} 
                preview={false} 
                alt={article.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
            <Text style={{ fontSize: "24px", fontWeight: "600" }}>
              {article.title}
            </Text>
            <Text style={{ fontSize: "12px", color: "#6D6D6D" }}>
              {authorName} . {formatDate(article.created_at)}
            </Text>
            <Text style={{ fontSize: "14px", color: "#454545", marginTop: "8px" }}>
              {article.description}
            </Text>
            <Box
              padding="16px"
              backgroundColor="#F7FAFC"
              borderRadius="8px"
              marginTop="16px"
            >
              <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                {article.content}
              </Text>
            </Box>
          </Flex>
        </Box>
      </AppModal>
    </>
  );
};

export default LearnArticle;
