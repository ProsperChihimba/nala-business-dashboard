"use client";

import { useState, useRef } from "react";
import { Flex, Text, Input, Textarea, Button, Box, useToast, ModalCloseButton, Divider, FormLabel, Spinner, Image } from "@chakra-ui/react";
import AppButton from "../../../../layout/button";
import { useAuth } from "../../../../../contexts/AuthContext";
import { apiService, LearnArticle as LearnArticleType } from "../../../../../services/api";

interface EditLearnModalProps {
  article: LearnArticleType;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditLearnModal = ({ article, onClose, onSuccess }: EditLearnModalProps) => {
  const toast = useToast();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: article.title || "",
    description: article.description || "",
    content: article.content || "",
    imageUrl: article.image_url || "",
    imageFile: null as File | null,
    imagePreview: article.image_url || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: "Invalid File", description: "Please select an image file", status: "error", duration: 3000, isClosable: true });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "Image must be less than 5MB", status: "error", duration: 3000, isClosable: true });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      toast({ title: "Missing fields", description: "Title, description and content are required", status: "error", duration: 3000, isClosable: true });
      return;
    }

    if (!token) {
      toast({ title: "Authentication Required", description: "Please log in to edit articles", status: "error", duration: 3000, isClosable: true });
      return;
    }

    try {
      setIsLoading(true);

      // Build full payload for PUT, merging existing article fields
      const fullUpdate = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        doctor: doctor?.id,
        image_url: formData.imageUrl.trim() || article.image_url || '',
        is_published: typeof (article as any).is_published === 'boolean' ? (article as any).is_published : true,
      };

      // Prefer PUT (backend expects complete body); fall back to PATCH on failure
      try {
        await apiService.updateLearnArticle(
          article.id,
          fullUpdate,
          token,
          doctor?.id,
          'PUT'
        );
      } catch (e) {
        // Fallback to PATCH with minimal payload
        const patchData = {
          title: fullUpdate.title,
          description: fullUpdate.description,
          content: fullUpdate.content,
          doctor: fullUpdate.doctor,
          image_url: fullUpdate.image_url,
        };
        await apiService.updateLearnArticle(
          article.id,
          patchData,
          token,
          doctor?.id,
          'PATCH'
        );
      }

      toast({ title: "Article Updated", description: "Your article has been updated successfully", status: "success", duration: 3000, isClosable: true });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({ title: "Error Updating Article", description: error instanceof Error ? error.message : "Failed to update article", status: "error", duration: 5000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" marginBottom="10px">
      <ModalCloseButton />
      <Text style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "20px", fontWeight: 500, color: "#000", width: "90%", marginTop: "15px" }}>
        Edit Learn Article
      </Text>

      <Flex flexDir="column" mt={5} gap={4}>
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">Title *</FormLabel>
          <Input value={formData.title} placeholder="Enter article title" onChange={(e) => handleInputChange("title", e.target.value)} marginTop="10px" height="40px" borderRadius="3xl" borderColor="#DCDCDC" _placeholder={{ fontSize: "12px", color: "gray.400" }} isReadOnly={isLoading} />
        </Box>

        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">Description *</FormLabel>
          <Textarea value={formData.description} placeholder="Enter a brief description of the article" onChange={(e) => handleInputChange("description", e.target.value)} marginTop="10px" borderRadius="3xl" borderColor="#DCDCDC" _placeholder={{ fontSize: "12px", color: "gray.400" }} rows={3} isReadOnly={isLoading} />
        </Box>

        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">Content *</FormLabel>
          <Textarea value={formData.content} placeholder="Write your article content here..." onChange={(e) => handleInputChange("content", e.target.value)} marginTop="10px" borderRadius="3xl" borderColor="#DCDCDC" _placeholder={{ fontSize: "12px", color: "gray.400" }} rows={6} isReadOnly={isLoading} />
        </Box>

        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">Article Image (Optional)</FormLabel>
          <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} marginTop="10px" display="none" isDisabled={isLoading} />
          <Flex direction="column" gap={2} marginTop="10px">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" borderColor="#DCDCDC" color="#454545" borderRadius="3xl" fontSize="12px" height="40px" isDisabled={isLoading} _hover={{ borderColor: "#073DFC", color: "#073DFC" }}>Choose Image from Gallery</Button>
            {formData.imagePreview && (
              <Box position="relative" width="100%" maxHeight="200px" borderRadius="8px" overflow="hidden">
                <Image src={formData.imagePreview} alt="Preview" width="100%" maxHeight="200px" objectFit="cover" />
                <Button position="absolute" top="8px" right="8px" size="sm" colorScheme="red" onClick={() => { setFormData(prev => ({ ...prev, imageFile: null, imagePreview: "", imageUrl: "" })); if (fileInputRef.current) fileInputRef.current.value = ""; }}>Remove</Button>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>

      <Divider style={{ marginTop: "20px", marginBottom: "15px" }} />
      <Flex justifyContent="flex-end" gap={3}>
        <Button onClick={onClose} variant="outline" borderColor="#DCDCDC" color="#454545" borderRadius="20px" fontSize="14px" height="40px" px={6} isDisabled={isLoading}>Cancel</Button>
        <AppButton label={isLoading ? "Saving..." : "Save Changes"} background="#073DFC" color="#fff" width="150px" borderColor="#073DFC" onClick={handleSubmit} disabled={isLoading} />
        {isLoading && <Spinner size="sm" />}
      </Flex>
    </Flex>
  );
};

export default EditLearnModal;


