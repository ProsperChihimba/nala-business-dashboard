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
import { apiService, DoctorRegistrationData } from '../../../../services/api'
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
        // Check each field individually for better error reporting
        const missingFields = [];
        if (!formData.user?.username) missingFields.push('username');
        if (!formData.password || formData.password.trim() === '') missingFields.push('password');
        if (!formData.user?.first_name) missingFields.push('first name');
        if (!formData.user?.last_name) missingFields.push('last name');
        if (!formData.user?.email) missingFields.push('email');
        if (!formData.license_number) missingFields.push('license number');
        if (!formData.specialization) missingFields.push('specialization');
        if (!formData.phone_number) missingFields.push('phone number');
        if (!formData.address) missingFields.push('address');
        if (!formData.experience_years) missingFields.push('experience years');
        
        if (missingFields.length > 0) {
            setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (formData.password!.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        // Note: We can't validate password confirmation here since it's local state
        // The password confirmation validation is handled in the UI component

        // Validate specialization is one of the valid choices
        const validSpecializations = [
            'cardiology', 'dermatology', 'neurology', 'orthopedics', 
            'pediatrics', 'psychiatry', 'general', 'surgery', 
            'oncology', 'ophthalmology'
        ];
        
        if (!validSpecializations.includes(formData.specialization!)) {
            setError('Please select a valid specialization');
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);
        setError(null);

        try {
            const doctorData: DoctorRegistrationData = {
                user: {
                    username: formData.user?.username || '',
                    first_name: formData.user?.first_name || '',
                    last_name: formData.user?.last_name || '',
                    email: formData.user?.email || '',
                },
                password: formData.password || '',
                specialization: formData.specialization || '',
                license_number: formData.license_number || '',
                phone_number: formData.phone_number || '',
                address: formData.address || '',
                experience_years: Number(formData.experience_years || 0),
                // Only include optional fields if they have values
                ...(formData.bio && { bio: formData.bio }),
                ...(formData.profile_picture && { profile_picture: formData.profile_picture }),
                is_available: formData.is_available ?? true,
            };
            

            
            // Validate required fields before sending
            const requiredFields = [
                'user.username', 'user.first_name', 'user.last_name', 
                'user.email', 'password', 'specialization', 
                'license_number', 'phone_number', 'address', 'experience_years'
            ];
            
            const missingFields = requiredFields.filter(field => {
                if (field === 'user.username') return !doctorData.user?.username || doctorData.user.username === '';
                if (field === 'user.first_name') return !doctorData.user?.first_name || doctorData.user.first_name === '';
                if (field === 'user.last_name') return !doctorData.user?.last_name || doctorData.user.last_name === '';
                if (field === 'user.email') return !doctorData.user?.email || doctorData.user.email === '';
                if (field === 'password') return !doctorData.password || doctorData.password === '';
                if (field === 'specialization') return !doctorData.specialization || doctorData.specialization === '';
                if (field === 'license_number') return !doctorData.license_number || doctorData.license_number === '';
                if (field === 'phone_number') return !doctorData.phone_number || doctorData.phone_number === '';
                if (field === 'address') return !doctorData.address || doctorData.address === '';
                if (field === 'experience_years') return doctorData.experience_years === undefined || doctorData.experience_years === 0;
                return false;
            });
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
            
            await apiService.registerDoctor(doctorData);
            
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