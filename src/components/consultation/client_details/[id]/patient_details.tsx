import { Flex, ModalCloseButton, Box, VStack, HStack } from '@chakra-ui/react'
import { Divider, Typography } from 'antd';
import AppButton from '../../../layout/button';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { apiService } from '../../../../services/api';
import { useEffect, useState } from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const { Text } = Typography;

const PatientDetails = ({onClose}: {onClose: () => void}) => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [patientData, setPatientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id || !token) return;
      
      try {
        setIsLoading(true);
        const patientId = parseInt(id);
        const data = await apiService.getPatient(patientId, token);
        setPatientData(data);
      } catch (err) {
        console.error('Error fetching patient data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [id, token]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <Flex direction='column' marginBottom='10px' p={4}>
        <ModalCloseButton />
        <Center py={8}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </Flex>
    );
  }

  if (!patientData) {
    return (
      <Flex direction='column' marginBottom='10px' p={4}>
        <ModalCloseButton />
        <Text style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '20px', fontWeight: 500, color: '#000', marginTop: '15px' }}>
          Patient details
        </Text>
        <Center py={8}>
          <Text>No patient data available</Text>
        </Center>
        <Flex justifyContent='flex-end' mt={4}>
          <AppButton
            label="Done"
            background='#073DFC'
            color='#fff'
            width='150px'
            borderColor='#073DFC'
            onClick={onClose}
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction='column' marginBottom='10px' p={4}>
        {/* close button */}
        <ModalCloseButton />
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#000',
                width: '90%',
                marginTop: '15px',
                marginBottom: '20px'
            }}
        >
            Patient details
        </Text>

        {/* Patient Information */}
        <VStack align="stretch" spacing={4} fontFamily="IBM Plex Sans, sans-serif">
          <Box>
            <Text style={{ fontSize: '14px', fontWeight: 500, color: '#454545', marginBottom: '8px' }}>
              Personal Information
            </Text>
            <Divider style={{ marginBottom: '15px' }} />
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Name:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.user?.first_name} {patientData.user?.last_name}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Email:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.user?.email || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Phone:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.phone_number || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Date of Birth:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {formatDate(patientData.date_of_birth)}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Gender:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.gender || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Address:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.address || 'N/A'}
              </Text>
            </HStack>
          </Box>

          <Box>
            <Text style={{ fontSize: '14px', fontWeight: 500, color: '#454545', marginBottom: '8px', marginTop: '15px' }}>
              Medical Information
            </Text>
            <Divider style={{ marginBottom: '15px' }} />
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Blood Group:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.blood_group || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Allergies:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.allergies || 'None'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Medical History:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.medical_history || 'None'}
              </Text>
            </HStack>
          </Box>

          <Box>
            <Text style={{ fontSize: '14px', fontWeight: 500, color: '#454545', marginBottom: '8px', marginTop: '15px' }}>
              Emergency Contact
            </Text>
            <Divider style={{ marginBottom: '15px' }} />
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Contact Name:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.emergency_contact_name || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Contact Phone:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.emergency_contact_phone || 'N/A'}
              </Text>
            </HStack>
          </Box>

          <Box>
            <Text style={{ fontSize: '14px', fontWeight: 500, color: '#454545', marginBottom: '8px', marginTop: '15px' }}>
              Additional Information
            </Text>
            <Divider style={{ marginBottom: '15px' }} />
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Purpose:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {patientData.purpose || 'N/A'}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Created:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {formatDate(patientData.created_at)}
              </Text>
            </HStack>
            
            <HStack mb="12px" width="100%">
              <Text style={{ fontSize: '12px', fontWeight: 500, color: '#454545', width: '140px' }}>Last Updated:</Text>
              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
                {formatDate(patientData.updated_at)}
              </Text>
            </HStack>
          </Box>
        </VStack>

        {/* footer */}
        <Divider style={{marginTop: '20px', marginBottom: '15px'}} />
        {/* button */}
        <Flex justifyContent='flex-end'>
            <AppButton
                label="Done"
                background='#073DFC'
                color='#fff'
                width='150px'
                borderColor='#073DFC'
                onClick={onClose}
            />
        </Flex>
    </Flex>
  )
}

export default PatientDetails