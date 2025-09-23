import { 
    Box,
    Center,
    Flex, 
    Step, 
    StepSeparator,  
    Stepper, 
    useSteps,
    Text,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import PersonalDetails from './personal_details'
import SetPassword from './password'
import AppButton from '../../../layout/button'
import { useNavigate } from 'react-router-dom'
import LicenceNumber from './licence_number'
import { useRegistration } from '../../../../contexts/RegistrationContext'
import { apiService } from '../../../../services/api'
import { useState } from 'react'

const steps = [
    {
        index: 1,
        component: <PersonalDetails />
    },
    {
        index: 2,
        component: <LicenceNumber />
    },
    {
        index: 3,
        component: <SetPassword />
    },
   
    {
        index: 4,
    }
]

const SignupForms = () => {
    const { formData, setIsLoading, setError, resetFormData, error } = useRegistration();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!formData.user?.username || !formData.user?.password || !formData.user?.first_name || 
            !formData.user?.last_name || !formData.user?.email || !formData.license_number || 
            !formData.specialization || !formData.phone_number || !formData.address || 
            !formData.experience_years) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.user.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        // Validate specialization is one of the valid choices
        const validSpecializations = [
            'cardiology', 'dermatology', 'neurology', 'orthopedics', 
            'pediatrics', 'psychiatry', 'general', 'surgery', 
            'oncology', 'ophthalmology'
        ];
        
        if (!validSpecializations.includes(formData.specialization)) {
            setError('Please select a valid specialization');
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);
        setError(null);

        try {
            console.log('Current form data:', formData);
            
            const doctorData = {
                user: {
                    username: formData.user.username,
                    first_name: formData.user.first_name,
                    last_name: formData.user.last_name,
                    email: formData.user.email,
                    password: formData.user.password,
                },
                specialization: formData.specialization,
                license_number: formData.license_number,
                phone_number: formData.phone_number,
                address: formData.address,
                experience_years: Number(formData.experience_years),
                // Only include optional fields if they have values
                ...(formData.bio && { bio: formData.bio }),
                ...(formData.profile_picture && { profile_picture: formData.profile_picture }),
                is_available: formData.is_available ?? true,
            };

            console.log('Submitting doctor data:', JSON.stringify(doctorData, null, 2));
            
            // Log the expected API format for comparison
            console.log('Expected API format:', {
                user: {
                    username: "dr_jones",
                    first_name: "Sarah", 
                    last_name: "Jones",
                    email: "dr.jones@example.com",
                    password: "doctorpass456"
                },
                specialization: "dermatology",
                license_number: "MD789012", 
                phone_number: "+1987654321",
                address: "456 Skin Care Clinic, Dermatology City, DC 54321",
                experience_years: 8,
                bio: "Board-certified dermatologist...",
                profile_picture: "https://example.com/dr_jones.jpg",
                is_available: true
            });
            
            // Validate required fields before sending
            const requiredFields = [
                'user.username', 'user.first_name', 'user.last_name', 
                'user.email', 'user.password', 'specialization', 
                'license_number', 'phone_number', 'address', 'experience_years'
            ];
            
            const missingFields = requiredFields.filter(field => {
                const keys = field.split('.');
                let value: any = doctorData;
                for (const key of keys) {
                    value = value?.[key];
                }
                return !value || value === '';
            });
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
            
            const response = await apiService.registerDoctor(doctorData);
            console.log('Doctor registered successfully:', response);
            
            // Reset form and navigate to success page
            resetFormData();
            navigate('/email-sent');
        } catch (error) {
            console.error('Registration failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

  return (
    <Flex marginTop='40px' direction='column' paddingTop='40px' paddingBottom="20px">

        <Center>
            <Stepper index={activeStep} >
                {steps.map((step) => (
                    <Step key={step.index}>
                        <Box w='50px'>
                            <StepSeparator />
                        </Box>
                    </Step>
                ))}
            </Stepper>
        </Center>

       <Center>
           
            {steps.map((step) => (
                <Flex direction='column' key={step.index} display={activeStep === step.index ? 'inherit' : 'none'}>
                    <Box>
                        {step.component}
                    </Box>
                    
                    {/* Error display */}
                    {error && (
                        <Alert status="error" mt="20px" borderRadius="10px">
                            <AlertIcon />
                            <Text fontFamily="IBM Plex Sans, sans-serif" fontSize="14px">
                                {error}
                            </Text>
                        </Alert>
                    )}
                    
                    <Flex justifyContent='flex-end'>
                        <AppButton
                            label={step.index === 3 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
                            background='#073DFC'
                            color='#fff'
                            width='160px'
                            borderColor='#073DFC'
                            onClick={() => {
                                if (step.index === 3) {
                                    handleSubmit();
                                } else {
                                    setActiveStep(activeStep + 1);
                                }
                            }}
                            disabled={isSubmitting}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Flex>
  )
}

export default SignupForms