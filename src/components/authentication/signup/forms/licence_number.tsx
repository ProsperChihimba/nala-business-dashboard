"use client";
import { useState, useRef } from "react";
import type React from "react";
import DepositHeading from "../../../layout/heading";
import DepositInput from "../../../layout/input";
import {  Plus } from "lucide-react"; // Using Lucide React for icons
import { Image } from "antd";
import { Box, Flex, Text, Select } from "@chakra-ui/react";
import { useRegistration } from "../../../../contexts/RegistrationContext";

const LicenceNumber = () => {
  const { formData, updateFormData } = useRegistration();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [licenseNumber, setLicenseNumber] = useState(formData.license_number || '');
  const [specialization, setSpecialization] = useState(formData.specialization || '');
  const [address, setAddress] = useState(formData.address || '');
  const [experienceYears, setExperienceYears] = useState(formData.experience_years?.toString() || '');
  const [bio, setBio] = useState(formData.bio || '');

  const specializationOptions = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'general', label: 'General Medicine' },
    { value: 'general_practitioner', label: 'General Practitioner (GP)' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'ophthalmology', label: 'Ophthalmology' },
  ];

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // For now, we'll store the base64 but send a placeholder URL
        // In a real app, you'd upload the file to a server first
        updateFormData({
          profile_picture: "https://example.com/doctor-profile.jpg", // Placeholder URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseNumberChange = (value: string) => {
    setLicenseNumber(value);
    updateFormData({
      license_number: value,
    });
  };

  const handleSpecializationChange = (value: string) => {
    setSpecialization(value);
    updateFormData({
      specialization: value,
    });
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    updateFormData({
      address: value,
    });
  };

  const handleExperienceChange = (value: string) => {
    setExperienceYears(value);
    updateFormData({
      experience_years: parseInt(value) || 0,
    });
  };

  const handleBioChange = (value: string) => {
    setBio(value);
    updateFormData({
      bio: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col w-full max-w-md px-4 py-8">
        {/* Progress indicators */}
        {/* <div className="flex justify-center gap-2 mb-12 w-full">
          <div className="h-1 w-10 bg-black rounded-full"></div>
          <div className="h-1 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-1 w-10 bg-gray-300 rounded-full"></div>
        </div> */}

        {/* heading */}
        <Flex mt="50px">
            <DepositHeading title="License Number" />
        </Flex>

        {/* header desc */}
        <p className="font-sans text-[15px] font-normal text-[#9A9A9A] mb-[30px]">
          For us to verify you we will need to get your doctor information
        </p>

        {/* Specialization dropdown */}
        <Box mb="20px" mt="20px">
          <Text
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "black",
              marginBottom: "5px",
            }}
          >
            Specialization
          </Text>
          <Select
            placeholder="Select your specialization"
            value={specialization}
            onChange={(e) => handleSpecializationChange(e.target.value)}
            height="50px"
            borderColor="#D9D9D9"
            background="white"
            focusBorderColor="#073DFC"
            borderRadius="10px"
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize="15px"
            fontWeight="400"
            color="#000"
          >
            {specializationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* License number input */}
        <DepositInput
          title="License number"
          value={licenseNumber}
          placeholder="Enter your license number"
          isReadOnly={false}
          marginBottom="20px"
          marginTop="20px"
          width="100%"
          onChange={(e) => handleLicenseNumberChange(e.target.value)}
        />

        {/* Address input */}
        <DepositInput
          title="Practice Address"
          value={address}
          placeholder="Enter your practice address"
          isReadOnly={false}
          marginBottom="20px"
          marginTop="20px"
          width="100%"
          onChange={(e) => handleAddressChange(e.target.value)}
        />

        {/* Experience years input */}
        <DepositInput
          title="Years of Experience"
          value={experienceYears}
          placeholder="Enter years of experience"
          isReadOnly={false}
          marginBottom="20px"
          marginTop="20px"
          width="100%"
          onChange={(e) => handleExperienceChange(e.target.value)}
        />

        {/* Bio input */}
        <DepositInput
          title="Bio (Optional)"
          value={bio}
          placeholder="Tell us about yourself"
          isReadOnly={false}
          marginBottom="20px"
          marginTop="20px"
          width="100%"
          onChange={(e) => handleBioChange(e.target.value)}
        />

        {/* License image section */}
        <Text
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "black",
          }}
        >
          License image
        </Text>

        <div className="flex gap-3 relative o items-start">
          

          <Box display="flex" gap="30px"  mt="20px">
            <Flex
              backgroundColor="#CCCCCC"
              width="100px"
              height="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={handleImageUploadClick}
            >
              <Plus className="w-5 h-5 text-[#CCCCCC]" strokeWidth={1} />
            </Flex>
            <Flex width="100px" height="100px">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  style={{
                    paddingLeft: 10,
                    marginBottom: 30,
                    width: "auto",
                    height: "100%",
                  }}
                  preview={false}
                />
              )}
            </Flex>
          </Box>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default LicenceNumber;
