import { Flex, FormLabel, Input, ModalCloseButton, useToast } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import AppButton from '../../../../layout/button';
import { useState } from 'react';

const { Text } = Typography;

interface UpdateModelProps {
  onClose: () => void;
  onUpdate: (consultationFee: number) => void;
  isLoading?: boolean;
}

const UpdateModel = ({ onUpdate, isLoading = false }: UpdateModelProps) => {
  const [consultationFee, setConsultationFee] = useState<string>('');
  const toast = useToast();

  const handleUpdate = () => {
    const fee = parseFloat(consultationFee);
    
    if (isNaN(fee) || fee <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid consultation fee",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onUpdate(fee);
  };
  return (
    <Flex direction='column' marginBottom='10px'>
        
        {/* close button */}
        <ModalCloseButton />
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#000',
                width: '90%',
                marginTop: '15px'
            }}
        >
           Update Consultation Price
        </Text>

        {/* tabs */}
         <Flex flexDir="column" mt={5}>
        <FormLabel>Amount in TZS</FormLabel>
        <Input
          value={consultationFee}
          placeholder="Enter consultation fee in TZS"
          isReadOnly={false}
          marginBottom="80px"
          marginTop="20px"
          onChange={(e) => setConsultationFee(e.target.value)}
          type="number"
        />
      </Flex>

        {/* footer */}
        <Divider style={{marginTop: '10px', marginBottom: '15px'}} />
        {/* button */}
        <Flex justifyContent='flex-end'>
            <AppButton
                label={isLoading ? "Updating..." : "Update"}
                background='#073DFC'
                color='#fff'
                width='150px'
                borderColor='#073DFC'
                onClick={handleUpdate}
                disabled={isLoading || !consultationFee}
            />
        </Flex>
    </Flex>
  )
}

export default UpdateModel