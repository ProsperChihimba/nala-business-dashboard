"use client";

import { useState } from "react";
import { Flex, Text, Input, Textarea, Button, Box, useToast, ModalCloseButton, Divider, FormLabel, HStack, Tag, TagLabel, TagCloseButton, Spinner } from "@chakra-ui/react";
import AppButton from "../../../../layout/button";

interface CreateNewsModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateNewsModal = ({ onClose, onSuccess }: CreateNewsModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: [] as string[],
    imageUrl: "",
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your article",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description for your article",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter the article content",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call to create news/article
      // const response = await apiService.createNewsArticle({
      //   title: formData.title,
      //   description: formData.description,
      //   content: formData.content,
      //   tags: formData.tags,
      //   imageUrl: formData.imageUrl,
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Article Created",
        description: "Your article has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        tags: [],
        imageUrl: "",
      });

      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create article",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" marginBottom="10px">
      {/* close button */}
      <ModalCloseButton />
      <Text
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "20px",
          fontWeight: 500,
          color: "#000",
          width: "90%",
          marginTop: "15px",
        }}
      >
        Create News Article
      </Text>

      {/* Form */}
      <Flex flexDir="column" mt={5} gap={4}>
        {/* Title */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Title *
          </FormLabel>
          <Input
            value={formData.title}
            placeholder="Enter article title"
            onChange={(e) => handleInputChange("title", e.target.value)}
            marginTop="10px"
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "12px", color: "gray.400" }}
            isReadOnly={isLoading}
          />
        </Box>

        {/* Description */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Description *
          </FormLabel>
          <Textarea
            value={formData.description}
            placeholder="Enter a brief description of the article"
            onChange={(e) => handleInputChange("description", e.target.value)}
            marginTop="10px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "12px", color: "gray.400" }}
            rows={3}
            isReadOnly={isLoading}
          />
        </Box>

        {/* Content */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Content *
          </FormLabel>
          <Textarea
            value={formData.content}
            placeholder="Write your article content here..."
            onChange={(e) => handleInputChange("content", e.target.value)}
            marginTop="10px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "12px", color: "gray.400" }}
            rows={6}
            isReadOnly={isLoading}
          />
        </Box>

        {/* Image URL */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Image URL (Optional)
          </FormLabel>
          <Input
            value={formData.imageUrl}
            placeholder="Enter image URL"
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
            marginTop="10px"
            height="40px"
            borderRadius="3xl"
            borderColor="#DCDCDC"
            _placeholder={{ fontSize: "12px", color: "gray.400" }}
            isReadOnly={isLoading}
          />
        </Box>

        {/* Tags */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Tags
          </FormLabel>
          <HStack marginTop="10px" gap={2}>
            <Input
              value={tagInput}
              placeholder="Enter a tag and press Add"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              height="40px"
              borderRadius="3xl"
              borderColor="#DCDCDC"
              _placeholder={{ fontSize: "12px", color: "gray.400" }}
              isReadOnly={isLoading}
            />
            <Button
              onClick={handleAddTag}
              size="md"
              backgroundColor="#073DFC"
              color="white"
              borderRadius="20px"
              fontSize="12px"
              height="40px"
              px={6}
              isDisabled={isLoading || !tagInput.trim()}
              _hover={{ bg: "#0630D9" }}
            >
              Add Tag
            </Button>
          </HStack>
          {formData.tags.length > 0 && (
            <Flex gap={2} marginTop="10px" flexWrap="wrap">
              {formData.tags.map((tag, index) => (
                <Tag
                  key={index}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  backgroundColor="#073DFC"
                  color="white"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveTag(tag)}
                    isDisabled={isLoading}
                  />
                </Tag>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>

      {/* Footer */}
      <Divider style={{ marginTop: "20px", marginBottom: "15px" }} />
      <Flex justifyContent="flex-end" gap={3}>
        <Button
          onClick={onClose}
          variant="outline"
          borderColor="#DCDCDC"
          color="#454545"
          borderRadius="20px"
          fontSize="14px"
          height="40px"
          px={6}
          isDisabled={isLoading}
        >
          Cancel
        </Button>
        <AppButton
          label={isLoading ? "Creating..." : "Create Article"}
          background="#073DFC"
          color="#fff"
          width="150px"
          borderColor="#073DFC"
          onClick={handleSubmit}
          disabled={isLoading}
        />
        {isLoading && <Spinner size="sm" />}
      </Flex>
    </Flex>
  );
};

export default CreateNewsModal;

