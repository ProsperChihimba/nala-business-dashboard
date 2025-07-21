"use client";
import { useState, useRef } from "react";
import type React from "react";
import DepositHeading from "../../../layout/heading";
import DepositInput from "../../../layout/input";
import { User, Plus } from "lucide-react"; // Using Lucide React for icons
import { Image } from "antd";
import { Box, Flex, Text } from "@chakra-ui/react";

const LicenceNumber = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

        {/* License number input */}
        <DepositInput
          title="License number"
          value=""
          placeholder=""
          isReadOnly={false}
          marginBottom="40px"
          marginTop="20px"
          width="100%"
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
