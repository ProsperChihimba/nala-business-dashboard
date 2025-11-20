"use client";

import { useState, useRef } from "react";
import { Flex, Text, Input, Textarea, Button, Box, useToast, ModalCloseButton, Divider, FormLabel, Spinner, Image } from "@chakra-ui/react";
import AppButton from "../../../../layout/button";
import { useAuth } from "../../../../../contexts/AuthContext";
import { apiService } from "../../../../../services/api";

interface CreateLearnModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateLearnModal = ({ onClose, onSuccess }: CreateLearnModalProps) => {
  const toast = useToast();
  const { token, doctor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    imageFile: null as File | null,
    imagePreview: "" as string,
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Image must be less than 5MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string,
          imageUrl: reader.result as string, // Use base64 data URL
        }));
      };
      reader.readAsDataURL(file);
    }
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

    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create articles",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!doctor || !doctor.id) {
      toast({
        title: "Doctor Profile Required",
        description: "Please ensure your doctor profile is loaded. Refreshing profile...",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      
      // Try to refresh doctor profile
      try {
        const storedUsername = localStorage.getItem('doctorUsername');
        if (storedUsername && token) {
          console.log('Attempting to refresh doctor profile...');
          const refreshedDoctor = await apiService.getDoctorByUsername(storedUsername, token);
          console.log('Doctor profile refreshed:', refreshedDoctor);
          
          // Retry submission with refreshed profile
          // Note: This would require moving the rest of the logic into a separate function
          // For now, just show error and let user try again
          toast({
            title: "Profile Refreshed",
            description: "Please try creating the article again.",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      } catch (refreshError) {
        console.error('Failed to refresh doctor profile:', refreshError);
      }
      
      return;
    }

    try {
      setIsLoading(true);
      
      // Verify token exists and is valid
      if (!token || token.trim() === '') {
        toast({
          title: "Invalid Token",
          description: "Authentication token is missing or invalid. Please login again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Verify token is actually a doctor token by checking if we can fetch doctor profile
      console.log('=== Verifying Doctor Token ===');
      try {
        const storedUsername = localStorage.getItem('doctorUsername');
        if (storedUsername) {
          console.log('Verifying token with doctor profile fetch...');
          const verifiedDoctor = await apiService.getDoctorByUsername(storedUsername, token);
          console.log('✅ Token verified! Doctor profile:', verifiedDoctor);
          
          if (!verifiedDoctor || !verifiedDoctor.id) {
            throw new Error('Doctor profile verification failed');
          }
        } else {
          console.warn('⚠️ No stored username found, skipping token verification');
        }
      } catch (verifyError) {
        console.error('❌ Token verification failed:', verifyError);
        toast({
          title: "Token Verification Failed",
          description: "Your authentication token may not be valid or may not belong to a doctor account. Please login again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Log token details (first 10 chars only for security)
      console.log('=== Article Creation Debug Info ===');
      console.log('Token exists:', !!token);
      console.log('Token length:', token.length);
      console.log('Token prefix:', token.substring(0, 10) + '...');
      console.log('Doctor ID:', doctor.id);
      console.log('Doctor name:', doctor.first_name, doctor.last_name);
      console.log('Doctor specialization:', doctor.specialization);
      console.log('Stored token type:', localStorage.getItem('doctorToken') ? 'doctorToken' : 'NOT FOUND');
      
      // Prepare article data
      // Note: According to API spec, backend may automatically set doctor from token
      // But we'll try with doctor ID first, then without if needed
      const articleData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        doctor: doctor.id, // Include doctor ID
        image_url: formData.imageUrl.trim() || undefined,
      };

      console.log('Article data being sent:', articleData);
      console.log('Full request details:', {
        url: 'https://levelsprotech3.pythonanywhere.com/api/learn/articles/',
        method: 'POST',
        headers: {
          'Authorization': `Token ${token.substring(0, 10)}...`,
          'Content-Type': 'application/json'
        },
        body: articleData
      });

      // Try to create article with doctor ID
      let response;
      try {
        response = await apiService.createLearnArticle(articleData, token);
      } catch (error: any) {
        // If 403 error and we included doctor field, try without it
        // (backend might automatically set it from token)
        if (error?.message?.includes('403') || error?.message?.includes('permission')) {
          console.log('403 error received, trying without doctor field...');
          
          const articleDataWithoutDoctor = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            content: formData.content.trim(),
            // Omit doctor field - let backend set it from token
            image_url: formData.imageUrl.trim() || undefined,
          };
          
          console.log('Retrying with article data (without doctor field):', articleDataWithoutDoctor);
          response = await apiService.createLearnArticle(articleDataWithoutDoctor, token);
        } else {
          throw error; // Re-throw if it's not a 403 error
        }
      }
      
      console.log('Article created successfully:', response);

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
        imageUrl: "",
        imageFile: null,
        imagePreview: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error) {
      console.error('Error creating article:', error);
      
      let errorMessage = "Failed to create article";
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide more specific error messages
        if (errorMessage.includes('403') || errorMessage.includes('permission')) {
          errorMessage = "You must be logged in as a doctor to create articles. Please ensure you are using a doctor account.";
        } else if (errorMessage.includes('401') || errorMessage.includes('authentication')) {
          errorMessage = "Authentication failed. Please login again.";
        } else if (errorMessage.includes('token')) {
          errorMessage = "Invalid authentication token. Please login again.";
        }
      }
      
      toast({
        title: "Error Creating Article",
        description: errorMessage,
        status: "error",
        duration: 5000,
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
        Add New Article
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

        {/* Image Upload */}
        <Box>
          <FormLabel fontSize="14px" fontWeight="500" color="#454545">
            Article Image (Optional)
          </FormLabel>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            marginTop="10px"
            display="none"
            isDisabled={isLoading}
          />
          <Flex direction="column" gap={2} marginTop="10px">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              borderColor="#DCDCDC"
              color="#454545"
              borderRadius="3xl"
              fontSize="12px"
              height="40px"
              isDisabled={isLoading}
              _hover={{ borderColor: "#073DFC", color: "#073DFC" }}
            >
              Choose Image from Gallery
            </Button>
            {formData.imagePreview && (
              <Box position="relative" width="100%" maxHeight="200px" borderRadius="8px" overflow="hidden">
                <Image
                  src={formData.imagePreview}
                  alt="Preview"
                  width="100%"
                  maxHeight="200px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top="8px"
                  right="8px"
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      imageFile: null,
                      imagePreview: "",
                      imageUrl: "",
                    }));
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Flex>
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

export default CreateLearnModal;

