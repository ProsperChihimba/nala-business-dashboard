import { 
    Box,
    Center,
    Flex, 
    Step, 
    StepSeparator,  
    Stepper, 
    useSteps 
} from '@chakra-ui/react'
import PersonalDetails from './personal_details'

import SetPassword from './password'
import AppButton from '../../../layout/button'
import { useNavigate } from 'react-router-dom'
import LicenceNumber from './licence_number'

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

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const navigate = useNavigate();

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
                    <Flex justifyContent='flex-end'>
                        <AppButton
                            label='Next'
                            background='#073DFC'
                            color='#fff'
                            width='160px'
                            borderColor='#073DFC'
                            onClick={() => {
                                step.index === 3 ? navigate('/email-sent') : setActiveStep(activeStep + 1)
                            }}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Flex>
  )
}

export default SignupForms